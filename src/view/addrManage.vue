<template>
    <div id="pageContainer" class="addr-manage">
        <div class="header">
            <p class="title">地址管理</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <div class="list" v-if="hasmore > 0">
                <div class="item" v-for="item,index in list" :key="item.id">
                    <div class="info">
                        <div class="flex spb fcen">
                            <p class="name">{{item.realName}}</p>
                            <p class="mobile">{{item.mobileNum.substr(0, 3)}}-{{item.mobileNum.substr(3, 4)}}-{{item.mobileNum.substr(7)}}</p>
                        </div>
                        <div class="addr">{{item.province}} {{item.city}} {{item.area}} {{item.detailAddress}}</div>
                    </div>
                    <div class="op flex fcen spb">
                        <mu-radio :label="check == index + 1 ? '默认地址' : '设为默认'" :value="index + 1" v-model="check" color="#ff7421" uncheck-icon="1" checked-icon="2" @change="setDef(index)"></mu-radio>
                        <div class="flex">
                            <router-link :to="'/address?id='+ item.id" class="op-a flex fcen">
                                <img src="../assets/img/bianji.png" alt="编辑">
                                <p>编辑</p>
                            </router-link>
                            <a href="javascript:;" class="op-a flex fcen" @click="deleteAddr(item.id)">
                                <img src="../assets/img/delete.png" alt="删除">
                                <p>删除</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="no-data flex1 fcol spc fcen" v-else>
                <img :src="imgHost + '/error_zanwusj.png'" alt="暂无数据">
                <p class="txt">暂无地址信息</p>
            </div>
            <mu-button class="btn bold" to="/address" color="#ff7421" textColor="#fff" full-width>新增收货地址</mu-button>
        </div>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-message/dist/muse-ui-message.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import Message from 'muse-ui-message';
import { Radio, Dialog, Icon, Button, Snackbar } from 'muse-ui';
import { addressList, defaultAddress, deleteAddress } from '../api/user';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            check: 0,
            pageNum: 1,
            pageSize: 10,
            list: [],
            hasmore: -1,
            imgHost: imgHost,
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            addressList({ pageNum: this.pageNum, pageSize: this.pageSize }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    if(this.pageNum == 1){
                        this.list = [];
                    }
                    this.list = [...this.list, ...res.data.resultData];
                    if(res.data.total == 0){
                        this.hasmore = 0;
                    }else if(res.data.total <= this.pageNum * this.pageSize){
                        this.hasmore = 1;
                    }else{
                        this.hasmore = 2;
                    }
                    for(let i=0; i<this.list.length; i++){
                        if(this.list[i].isSelected == 1){
                            this.check = i + 1;
                        }
                    }
                }else if(res.code == 4){
                    this.hasmore = 0;
                    this.list = [];
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
                this.loading.close();
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        setDef(idx) {
            if(this.loading2) return;
            this.loading2 = true;
            defaultAddress({ id: this.list[idx].id }).then(res => {
                this.loading2 = false;
                if(res.code == 1){
                    Message.alert('设置默认地址成功！', '提示');
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
                this.loading2 = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        deleteAddr(id) {
            Message.confirm('确定删除此地址吗？', '提示', { type: 'warning' })
            .then(({ result, value }) => {
                if(result){
                    deleteAddress({ id: id }).then(res => {
                        if(res.code == 1){
                            Toast.success('删除成功！');
                            this.pageNum = 1;
                            this.getData();
                        }else if(res.code == 0){
                            this.$router.push('/login?from='+ this.$route.name);
                        }else{
                            if(res.msg){
                                Toast.error(res.msg);
                            }else{
                                Toast.error('服务器错误，删除失败！');
                            }
                        }
                    })
                    .catch(err => {
                        Toast.error('未知异常！');
                        console.log(err);
                    })
                }
            })
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.getData();
    }
}
Vue.use(Message);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(Icon);
Vue.use(Snackbar);
Vue.use(Button);
</script>

<style scoped lang="less">
.list{
    padding-bottom: .5rem;
    border-top: 1px solid #f3f3f3;
    .item{
        background: #fff;
        margin-bottom: .15rem;
        .info{
            color: #000;
            padding: .1rem .15rem;
            .name{
                font-size: .16rem;
            }
            .mobile{
                font-size: .14rem;
            }
            .addr{
                font-size: .14rem;
                margin-top: 2px;
            }
        }
        .op{
            border-top: 1px solid #f3f3f3;
            padding: 0 .15rem;
            height: .44rem;
            line-height: .44rem;
            .op-a{
                color: #9c9c9c;
                margin-left: .15rem;
                img{
                    height: .16rem;
                    vertical-align: top;
                    margin-right: 5px;
                }
            }
        }
    }
}
.no-data{
    img{
        width: 1.95rem;
        height: 1.05rem;
        vertical-align: top;
    }
    .txt{
        font-size: .16rem;
        color: #9c9c9c;
        margin-top: .2rem;
    }
}
.btn{
    position: fixed;
    bottom: 0;
    left: 0;
    height: .48rem;
    line-height: .48rem;
    text-align: center;
    font-size: .16rem;
    letter-spacing: 1px;
}
</style>
<style>
.addr-manage .mu-radio-label{
    color: #9c9c9c;
    font-size: .14rem;
}
.addr-manage .mu-radio-icon{
    width: .16rem;
    height: .16rem;
    position: relative;
}
.addr-manage .mu-radio-icon-uncheck{
    width: .16rem;
    height: .16rem;
    background: url(../assets/img/unchoose.png) no-repeat 0 0 / 100% 100%;
}
.addr-manage .mu-radio-icon-checked{
    width: .16rem;
    height: .16rem;
    background: url(../assets/img/choose.png) no-repeat 0 0 / 100% 100%;
}
.addr-manage .mu-radio-ripple-wrapper{
    width: .44rem;
    height: .44rem;
    left: -.14rem;
    top: -.14rem;
}
</style>
