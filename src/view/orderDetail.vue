<template>
    <div id="pageContainer" class="order-detail">
        <div class="header">
            <p class="title">订货详情</p><!-- 我是买家 -->
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <div class="top flex spb fcen" v-if="info.state == 102">
                <div class="left">
                    <p class="txt1 bold">订货成功</p>
                    <p class="txt2">共{{info.shipmentNum}}件商品 订货总价：￥{{info.amountMoney}}</p>
                </div>
                <img :src="imgHost + '/icon_xq.png'" class="right" alt="">
            </div>
            <div class="top flex spb fcen" v-else-if="info.state == 103">
                <div class="left">
                    <p class="txt1 bold">已取消</p>
                </div>
                <img :src="imgHost + '/cancel.png'" class="right" alt="">
            </div>
            <div class="top flex spb fcen" v-else-if="info.state == 101">
                <div class="left">
                    <p class="txt1 bold">待付款</p>
                    <p class="txt2">共{{info.shipmentNum}}件商品 订货总价：￥{{info.amountMoney}}</p>
                    <div class="txt2 flex fcen">
                        <p>自动关闭时间：</p>
                        <div class="time-box flex fcen">
                            <p class="time">{{times[0]}}</p>
                            <p>:</p>
                            <p class="time">{{times[1]}}</p>
                            <p>:</p>
                            <p class="time">{{times[2]}}</p>
                        </div>
                    </div>
                </div>
                <img :src="imgHost + '/atm.png'" class="right" alt="">
            </div>
            <div class="box">
                <p class="source">货源: 浙江众康科诺贸易有限公司</p>
                <div class="prod flex">
                    <div class="pic fshrink0" :style="'background-image: url(' + (info.coverImageUrl ? info.coverImageUrl : imgHost + '/def_pro1.png') + ')'"></div>
                    <div class="info flex1 fcol spb">
                        <p class="title">{{info.productName}}</p>
                        <p class="flex spb bold">
                            <span>￥{{info.price}}</span>
                            <span class="num">X{{info.shipmentNum}}</span>
                        </p>
                    </div>
                </div>
                <div class="other txtR">
                    <p>共{{info.shipmentNum}}件商品 订货总价: <span class="price bold">￥{{info.amountMoney}}</span></p>
                </div>
                <div class="bb10"></div>
                <div class="order-info">
                    <p class="txt flex spb fcen">
                        <span>订单号: {{info.payNum}}</span>
                        <a href="javascript:;" class="copy" @click="copyText">复制</a>
                    </p>
                    <p class="txt">供货商: {{info.highUserName}} <template v-if="info.mobileNum">(TEL: {{info.mobileNum}})</template></p>
                    <p class="txt">下单时间: {{info.createTime | fmt}}</p>
                    <p class="txt" v-if="info.lastUpdateTime">
                        <template v-if="info.state == 102">付款</template>
                        <template v-if="info.state == 103">取消</template>
                        时间: {{info.lastUpdateTime | fmt}}
                    </p>
                </div>
            </div>
            <div class="btns1 flex fend" v-if="info.state == 101">
                <mu-button class="btn" textColor="#000" @click="cancelOrder">取消订单</mu-button>
                <mu-button class="btn" color="#ff7421" textColor="#fff" @click="openSheet">去付款</mu-button>
            </div>
            <mu-bottom-sheet :open.sync="showSheet" class="bot-s">
                <p class="title">付款详情</p>
                <div class="way flex spb">
                    <p>付款方式</p>
                    <p>余额支付<span class="num"> {{amount}}<template v-if="!enough">(余额不足)</template></span></p>
                </div>
                <div class="money flex spb">
                    <p>需付款</p>
                    <p class="num">{{info.amountMoney}}元</p>
                </div>
                <div class="btns">
                    <mu-button class="btn" color="#ff7421" textColor="#fff" full-width @click="linkto('recharge')" v-if="!enough">去充值</mu-button>
                    <mu-button class="btn" color="#ff7421" textColor="#fff" full-width @click="submit" v-else>立即订货</mu-button>
                </div>
                <a href="javascript:;" class="close" @click="closeSheet"><img src="../assets/img/close.png" alt="关闭"></a>
            </mu-bottom-sheet>
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
import { Button, Snackbar, Icon, BottomSheet, Dialog, TextField } from 'muse-ui';
import { imgHost } from '../api/baseUrl';
import { orderDetail, userState } from '../api/user';
import { cancelOrder, orderGoods, salesOrderGoods, getBalance } from '../api/product';
import { util } from '../utils/base';
export default {
    data() {
        return {
            imgHost: imgHost,
            info: {},
            times: [],
            showSheet: false,
            amount: 0,
            enough: false,
            state: {},
        }
    },
    methods: {
        getData() {
            this.loading = Loading();
            orderDetail({ orderId: this.id }).then(res => {
                this.loading.close();
                if(res.code == 1){
                    this.info = res.data;
                    let end = +res.data.createTime + 86400000;
                    let rest = end - Date.now();
                    this.getUserState();
                    if(res.data.state == 101){
                        this.countdown(rest);
                    }
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name +'&params=id_'+ this.id);
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
        getUserState() {
            userState().then(res => {
                if(res.code == 1){
                    this.state = res.data;
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
            });
        },
        copyText() {
            this.$copyText(this.info.payNum).then(e => {
                Toast.success('订单号复制成功！');
            }, err => {
                Toast.error('订单号复制失败！');
                console.log(err);
            })
        },
        countdown(t) {
            this.timer = setInterval(() => {
                t -= 1000;
                if(t <= 0){
                    clearInterval(this.timer);
                    this.getData();
                    return;
                }
                let h = Number.parseInt(t / 1000 / 60 / 60);
                let m = Number.parseInt(t / 1000 / 60 % 60);
                let s = Number.parseInt(t / 1000 % 60);
                h = h < 10 ? '0' + h : h;
                m = m < 10 ? '0' + m : m;
                s = s < 10 ? '0' + s : s;
                this.times = [h, m, s];
            }, 1000);
        },
        cancelOrder() {
            Message.confirm('确定取消订单吗？', '提示', {}).then(({ result }) => {
                if(result){
                    cancelOrder({ orderId: this.id }).then(res => {
                        if(res.code == 1){
                            this.getData();
                        }else if(res.code == 0){
                            this.$router.push('/login?from='+ this.$route.name +'&params=id_'+ this.id);
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
        submit() {
            if(this.state.transactState == 0) {
                Message.confirm('您还未设置过交易密码，是否去设置？', '提示', {}).then(({ result }) => {
                    if(result){
                        this.$router.push('/setTradePsw');
                    }
                });
                return;
            }
            Message.prompt('', '', {
                validator(value) {
                    return {
                        valid: /\d{6}/.test(value),
                        message: '交易密码不正确！',
                    }
                },
                className: 'trade-p',
                inputType: 'password',
                inputPlaceholder: '请输入交易密码',
            }).then(({ result, value }) => {
                if(result){
                    let reqUrl = this.sale ? salesOrderGoods : orderGoods;
                    reqUrl({ orderId: this.id, transactPassWord: value }).then(res => {
                        if(res.code == 1){
                            this.showSheet = false;
                            Toast.success('订货成功！');
                            this.getData();
                        }else if(res.code == 0){
                            this.$router.push('/login?from='+ this.$route.name +'&params=id_'+ this.id);
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
        openSheet() {
            this.loading = Loading();
            getBalance({ orderId: this.id }).then(res => {
                this.loading.close();
                if(res.code == 1){
                    this.amount = res.data;
                    this.enough = true;
                    this.showSheet = true;
                    if(this.state.transactState == 0) {
                        Message.confirm('您还未设置过交易密码，是否去设置？', '提示', {}).then(({ result }) => {
                            if(result){
                                this.$router.push('/setTradePsw');
                            }
                        });
                    }
                }else if(res.code == 10035){
                    this.amount = res.data;
                    this.enough = false;
                    this.showSheet = true;
                    if(this.state.transactState == 0) {
                        Message.confirm('您还未设置过交易密码，是否去设置？', '提示', {}).then(({ result }) => {
                            if(result){
                                this.$router.push('/setTradePsw');
                            }
                        });
                    }
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
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        closeSheet() {
            this.showSheet = false;
        },
        linkto(name) {
            this.$router.push({ name: name, query: { id: this.id, from: this.$route.name } });
        },
    },
    filters: {
        fmt(t) {
            return util.formatTime(t, '-');
        }
    },
    mounted() {
        this.id = this.$route.params.id;
        if(this.id){
            this.sale = this.$route.query.sale;
            this.getData();
        }else{
            this.$router.replace('/myOrders');
        }
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Message);
Vue.use(Dialog);
Vue.use(TextField);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(BottomSheet);
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
        .time-box{
            line-height: .2rem;
            p{
                padding: 0 .05rem;
                font-size: .12rem;
            }
            .time{
                color: #000;
                width: .2rem;
                height: .2rem;
                background: #fff;
                border-radius: .05rem;
                text-align: center;
                padding: 0;
            }
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
.btns1{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .48rem;
    padding: .1rem .15rem;
    background: #fff;
    border-top: 1px solid #f3f3f3;
    .btn{
        margin-left: .15rem;
        height: .28rem;
        font-size: .12rem;
        border-radius: .05rem;
        &:first-child{
            border: 1px solid #f3f3f3;
        }
    }
}
.bot-s{
    padding: 0 0 .2rem;
    .title{
        text-align: center;
        color: #000;
        font-size: .14rem;
        line-height: .4rem;
        border-bottom: 1px solid #f3f3f3;
    }
    .way{
        line-height: .4rem;
        color: #000;
        font-size: .12rem;
        border-bottom: 1px solid #f3f3f3;
        padding: 0 .1rem;
        .num{
            color: #9c9c9c;
        }
    }
    .money{
        padding: .4rem .1rem;
        color: #000;
        font-size: .12rem;
        .num{
            font-size: .2rem;
            padding-top: .05rem;
        }
    }
    .btns{
        padding: 0 .1rem;
        .btn{
            font-size: .12rem;
            height: .36rem;
        }
    }
    .close{
        position: absolute;
        top: 0;
        right: 0;
        width: .4rem;
        height: .4rem;
        img{
            width: .14rem;
            height: .14rem;
            margin: .13rem;
        }
    }
}
</style>
<style>
.order-d .mu-dialog-body{
    padding: 0;
    position: relative;
}
.trade-p .mu-input{
    margin: 0;
    padding: 0;
    min-height: auto;
}
.trade-p .mu-input-help{
    display: block!important;
}
</style>
