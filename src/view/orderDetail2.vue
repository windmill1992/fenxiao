<template>
    <div id="pageContainer" class="order-detail">
        <div class="header">
            <p class="title">分销客户订货详情</p><!-- 我是卖家 -->
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <div class="top flex spb fcen" v-if="info.state == 102">
                <div class="left">
                    <p class="txt1 bold">订货成功</p>
                    <p class="txt2">共{{info.orderNum}}件商品 订货总价：￥{{info.amountMoney}}</p>
                </div>
                <img :src="imgHost + '/icon_xq.png'" class="right" alt="">
            </div>
            <div class="top flex spb fcen" v-else-if="info.state == 101">
                <div class="left">
                    <p class="txt1 bold">待补单</p>
                </div>
                <img :src="imgHost + '/atm.png'" class="right" alt="">
            </div>
            <div class="top flex spb fcen" v-else-if="info.state == 103">
                <div class="left">
                    <p class="txt1 bold">已取消</p>
                </div>
                <img :src="imgHost + '/cancel.png'" class="right" alt="">
            </div>
            <div class="box">
                <p class="source">货源: 浙江众康科诺贸易有限公司</p>
                <div class="prod flex">
                    <div class="pic fshrink0" :style="'background-image: url(' + (info.coverImageUrl ? info.coverImageUrl : imgHost + '/def_pro1.png') + ')'"></div>
                    <div class="info flex1 fcol spb">
                        <p class="title">{{info.productName}}</p>
                        <p class="flex spb bold">
                            <span>￥{{info.price}}</span>
                            <span class="num">×{{info.orderNum}}</span>
                        </p>
                    </div>
                </div>
                <div class="other txtR">
                    <p>共{{info.orderNum}}件商品 订货总价: <span class="price bold">￥{{info.amountMoney}}</span></p>
                </div>
                <div class="bb10"></div>
                <div class="order-info">
                    <p class="txt flex spb fcen">
                        <span>订单号: {{info.payNum}}</span>
                        <a href="javascript:;" class="copy" @click="copyText">复制</a>
                    </p>
                    <p class="txt">订货人: {{info.orderName}} <template v-if="info.mobileNum">(TEL: {{info.mobileNum}})</template></p>
                    <p class="txt">下单时间: {{info.createTime | fmt}}</p>
                    <p class="txt" v-if="info.lastUpdateTime">付款时间: {{info.lastUpdateTime | fmt}}</p>
                </div>
            </div>
            <div class="btns0 flex spc" v-if="info.state == 102">
                <mu-button class="btn" textColor="#fff" color="#ff7421" href="/">返回分销中心</mu-button>
            </div>
            <div class="btns1 flex fend" v-if="info.state == 101">
                <a href="javascript:;" class="btn-a">
                    <mu-ripple class="btn" @click="sureOrder">确认出货</mu-ripple>
                </a>
                <a href="javascript:;" class="btn-a">
                    <mu-ripple class="btn" @click="refuseOrder">拒绝出货</mu-ripple>
                </a>
                <router-link to="/orderArea" class="btn-a">
                    <mu-ripple class="btn">去补货</mu-ripple>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import Message from 'muse-ui-message';
import VueClipboard from 'vue-clipboard2';
import { Button, Snackbar, Icon, Dialog } from 'muse-ui';
import { imgHost } from '../api/baseUrl';
import { order2Detail } from '../api/user';
import { cancelOrder2 } from '../api/product';
import { util } from '../utils/base';
export default {
    data() {
        return {
            imgHost: imgHost,
            info: {},
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            order2Detail({ stockInfoId: this.id }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    this.info = res.data;
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
        sureOrder() {
            Message.confirm('确认出货吗？', '提示', {}).then(({ result }) => {
                if(result){
                    cancelOrder2({ orderId: this.id, orderType: 1 }).then(res => {
                        if(res.code == 1){
                            Toast.success('操作成功');
                            this.getData();
                        }else{
                            if(res.msg){
                                Toast.error(res.msg);
                            }else{
                                Toast.error('服务器开了小差，请稍后再试！');
                            }
                        }
                    })
                    .catch(err => {
                        Toast.error('未知异常！');
                        console.log(err);
                    })
                }
            })
        },
        refuseOrder() {
            Message.confirm('确定拒绝出货吗？', '提示', {
                type: 'error',
            }).then(({ result }) => {
                if(result){
                    cancelOrder2({ orderId: this.id, orderType: 0 }).then(res => {
                        if(res.code == 1){
                            Toast.success('操作成功');
                            this.getData();
                        }else{
                            if(res.msg){
                                Toast.error(res.msg);
                            }else{
                                Toast.error('服务器开了小差，请稍后再试！');
                            }
                        }
                    })
                    .catch(err => {
                        Toast.error('未知异常！');
                        console.log(err);
                    })
                }
            })
        },
        copyText() {
            this.$copyText(this.info.payNum).then(e => {
                Toast.success('订单号复制成功！');
            }, err => {
                Toast.error('订单号复制失败！');
                console.log(err);
            })
        }
    },
    filters: {
        fmt(t) {
            return util.formatTime(t, '-');
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.id = this.$route.params.id;
        if(this.id){
            this.getData();
        }else{
            this.$router.replace('/orders');
        }
    },
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Message);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(VueClipboard);
</script>

<style scoped lang="less">
.top{
    padding: .1rem .3rem;
    background-image: linear-gradient(-183deg, #F87500 2%, #FEA04B 78%);
    .left{
        color: #fff;
        .txt1{
            font-size: .16rem;
        }
        .txt2{
            font-size: .14rem;
        }
    }
    .right{
        width: .68rem;
        height: .65rem;
    }
}
.box{
    margin-top: .1rem;
    background: #fff;
    .source{
        line-height: .4rem;
        color: #000;
        font-size: .14rem;
        padding: 0 .15rem;
    }
    .prod{
        background: #f6f6f6;
        padding: .1rem .15rem;
        .pic{
            width: .75rem;
            height: .66rem;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            margin-right: .1rem;
            border: 1px solid #f3f3f3;
        }
        .info{
            height: .66rem;
            color: #000;
            font-size: .16rem;
            .title{
                font-size: .14rem;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .num{
                font-size: .14rem;
            }
        }
    }
    .other{
        line-height: .4rem;
        padding: 0 .15rem;
        .price{
            color: #ff7421;
        }
    }
    .order-info{
        font-size: .12rem;
        color: #555;
        line-height: 2;
        padding: .05rem .15rem;
        .copy{
            color: #ff7421;
            font-size: .12rem;
        }
    }
}
.btns0{
    margin-top: .3rem;
    .btn{
        width: 1.4rem;
        height: .36rem;
        line-height: .36rem;
        position: relative;
        font-size: .14rem;
        letter-spacing: 1px;
    }
}
.btns1{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .48rem;
    padding: .1rem .15rem;
    background: #fff;
    border-top: 1px solid #f3f3f3;
    .btn-a{
        color: #000;
        font-size: .12rem;
        display: block;
        width: .82rem;
        height: .26rem;
        line-height: .24rem;
        border: 1px solid #555;
        border-radius: .05rem;
        text-align: center;
        overflow: hidden;
        margin-left: .1rem;
        .btn{
            position: relative;
        }
    }
}
</style>
