<template>
    <div id="pageContainer" class="check-pending">
        <div class="header">
            <p class="title">待审核</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol" ref="wrapper" v-if="hasmore > 0">
            <mu-load-more class="box flex1 fcol" @load="load" :loading="loading">
                <div class="list">
                    <div class="item flex spb fcen" v-for="item in list" :key="item.id">
                        <mu-ripple class="rip flex fcen flex1">
                            <div class="avatar fshrink0">
                                <img :src="item.coverImageUrl" v-if="item.coverImageUrl" alt="头像">
                                <img :src="imgHost + '/def_tx.png'" v-else alt="头像">
                            </div>
                            <div class="user flex1">
                                <p class="nick">{{item.nickName ? item.nickName : item.userName}}</p>
                                <p class="tel flex fcen">
                                    <img src="../assets/img/tel.png" alt="手机号">
                                    <span>{{item.mobileNum}}</span>
                                </p>
                            </div>
                        </mu-ripple>
                        <mu-checkbox color="#ff7421" v-model="select" :value="item.id" class="chk"></mu-checkbox>
                    </div>
                </div>
            </mu-load-more>

            <mu-button class="btn" color="#ff7421" textColor="#fff" @click="checkSure">审核通过</mu-button>
        </div>
        <div class="wrapper fcol" ref="wrapper" v-else>
            <div class="no-data flex1 fcol fcen spc">
                <img :src="imgHost + '/error_zanwusj.png'" alt="暂无数据" />
                <p class="txt">暂无数据</p>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Loading from 'muse-ui-loading';
import Toast from 'muse-ui-toast';
import { LoadMore, Snackbar, Button, Icon, Checkbox } from 'muse-ui';
import { auditUsers, auditPass } from '../api/user';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            loading: false,
            page: 1,
            pageSize: 10,
            list: [],
            select: [],
            imgHost: imgHost,
            hasmore: -1,
        }
    },
    methods: {
        getData() {
            this.loading2 = Loading({ target: document.getElementById('pageContainer') });
            auditUsers({ pageNum: this.page, pageSize: this.pageSize }).then(res => {
                this.loading2.close();
                this.loading = false;
                if(res.code == 1){
                    if(this.page == 1){
                        this.list = [];
                    }
                    let r = res.data;
                    let arr = [...this.list, ...r.resultData];
                    if(r.total == 0){
                        this.hasmore == 0;
                    }else if(r.total <= this.page * this.pageSize){
                        this.hasmore = 1;
                    }else{
                        this.hasmore = 2;
                    }
                    this.list = arr;
                }else if(res.code == 4){
                    this.list = [];
                    this.hasmore = 0;
                }else if(res.code == 2){
                    this.hasmore = 1;
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name);
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.loading2.close();
                this.loading = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        load() {
            if(this.hasmore != 2) return;
            this.loading = true;
            this.page++;
            this.getData();
        },
        checkSure() {
            if(this.loading) return;
            this.loading = true;
            auditPass({ userIds: this.select.join(',') }).then(res => {
                this.loading = false;
                if(res.code == 1){
                    Toast.success('审核通过成功！');
                    this.page = 1;
                    this.getData();
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name);
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.loading = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.getData();
    }
}
Vue.use(Loading);
Vue.use(LoadMore);
Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Checkbox);
</script>

<style scoped lang="less">
.box{
    margin-top: .1rem;
    padding-bottom: .5rem;
    .item{
        background: #fff;
        margin-bottom: .1rem;
        position: relative;
        .rip{
            padding: .1rem .15rem;
            position: relative;
        }
        .avatar{
            width: .5rem;
            height: .5rem;
            border-radius: 100%;
            overflow: hidden;
            margin-right: .1rem;
            img{
                width: 100%;
                height: 100%;
                border-radius: inherit;
            }
        }
        .user{
            height: .5rem;
            overflow: hidden;
            padding-right: .4rem;
            .nick{
                font-size: .16rem;
                color: #000;
                line-height: 1;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }
            .tel{
                font-size: .12rem;
                color: #555;
                margin-top: .1rem;
                img{
                    height: .14rem;
                    margin-right: 3px;
                    vertical-align: top;
                    
                }
            }
        }
        .chk{
            position: absolute;
            right: .15rem;
            top: 50%;
            -webkit-transform: translate3d(0, -50%, 0);
            transform: translate3d(0, -50%, 0);
        }
    }
}
.btn{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .48rem;
    line-height: .48rem;
    text-align: center;
    font-size: .16rem;
    letter-spacing: 1px;
}
</style>
