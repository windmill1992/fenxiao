<template>
    <div id="pageContainer" class="dynamic-point">
        <div class="header">
            <p class="title">自有积分</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <mu-load-more class="flex1 fcol" :refreshing="refreshing" :loading="loading" @refresh="refresh" @load="load">
                <div class="top">
                    <div class="point-box">
                        <div class="flex fcen spb">
                            <p class="txt">当月自有积分合计</p>
                            <!-- <a href="javascript:;" class="icon"><img src="../assets/img/icon_question.png" alt="规则说明"></a> -->
                        </div>
                        <div class="point">
                            <span class="num bold">{{point.num}}</span>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="li flex spb">
                        <p class="txt">自有积分合计</p>
                        <p class="num">{{point.totalNum}}</p>
                    </div>
                </div>
                <div class="tip">积分详情</div>
                <div class="box">
                    <div class="th flex spb">
                        <p class="td">月份</p>
                        <p class="td">自有积分</p>
                    </div>
                </div>
                <div class="box" v-if="hasmore != 0">
                    <div class="th flex spb" v-for="item in list" :key="item.monthTime">
                        <p class="td">{{item.monthTime}}</p>
                        <p class="td">{{item.num}}</p>
                    </div>
                </div>
                <div class="box flex1 fcol" v-else>
                    <div class="no-data fcol spc fcen flex1">
                        <img :src="imgHost +'/error_zanwusj.png'" alt="暂无数据">
                        <p class="txt">暂无数据</p>
                    </div>
                </div>
            </mu-load-more>
            <p class="no-more" v-if="hasmore == 1">没有更多数据了</p>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { Button, Snackbar, Icon, LoadMore } from 'muse-ui';
import { imgHost } from '../api/baseUrl';
import { ownPoint } from '../api/user';
export default {
    data() {
        return {
            imgHost: imgHost,
            list: [],
            hasmore: -1,
            page: 1,
            pageSize: 12,
            point: 0,
            refreshing: false,
            loading: false,
        }
    },
    methods: {
        getData() {
            this.loading2 = Loading();
            ownPoint({ pageNum: this.page, pageSize: this.pageSize }).then(res => {
                this.loading2.close();
                this.loading = false;
                this.refreshing = false;
                if(res.code == 1){
                    this.point = res.data2;
                    if(this.page == 1){
                        this.list = [];
                    }
                    let r = res.data;
                    if(r.total == 0){
                        this.hasmore = 0;
                    }else if(r.total <= this.page * this.pageSize){
                        this.hasmore = 1;
                    }else{
                        this.hasmore = 2;
                    }
                    this.list = [...this.list, ...r.resultData];
                }else if(res.code == 4){
                    this.hasmore = 0;
                    this.list = [];
                    this.point = 0;
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
                this.loading = false;
                this.refreshing = false;
                this.loading2.close();
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        refresh() {
            this.page = 1;
            this.refreshing = true;
            this.getData();
        },
        load() {
            if(this.hasmore != 2 || this.loading) return;
            this.loading = true;
            this.page++;
            this.getData();
        },
    },
    mounted() {
        this.getData();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(LoadMore);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.top{
    height: 1.19rem;
    background-image: linear-gradient(-183deg, #F87500 2%, #FEA04B 78%);
    .point-box{
        padding: .15rem;
        .txt{
            color: #fff;
            font-size: .16rem;
        }
        .icon{
            width: .16rem;
            height: .16rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .point{
            padding: .3rem 0 .2rem;
            color: #fff;
            line-height: 1;
            .num{
                font-size: .3rem;
            }
            .txt{
                font-size: .14rem;
            }
        }
    }
}
.box{
    .li{
        padding: 0 .15rem;
        background: #fff;
        height: .42rem;
        font-size: .14rem;
        line-height: .42rem;
        .txt{
            color: #000;
        }
        .num{
            color: #ff7421;
        }
    }
    .th{
        background: #fff;
        line-height: .42rem;
        padding: 0 .15rem;
        border-bottom: 1px solid #f3f3f3;
        .td{
            color: #555;
        }
    }
    .td{
        width: 50%;
        font-size: .12rem;
        color: #000;
    }
}
.tip{
    line-height: .38rem;
    text-align: center;
    font-size: .12rem;
    color: #555;
}
</style>
