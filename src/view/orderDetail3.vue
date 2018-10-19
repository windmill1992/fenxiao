<template>
    <div id="pageContainer" class="order-detail">
        <div class="header">
            <p class="title">发货详情</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <div class="top flex spb fcen" v-if="info.state == 106">
                <div class="left">
                    <p class="txt1 bold">已签收</p>
                    <p class="txt2">共{{info.orderNum}}件商品</p>
                </div>
                <img :src="imgHost + '/delivery.png'" class="right" alt="">
            </div>
            <div class="top flex spb fcen" v-if="info.state == 105">
                <div class="left">
                    <p class="txt1 bold">待确认</p>
                    <p class="txt2">共{{info.orderNum}}件商品</p>
                </div>
                <img :src="imgHost + '/delivery.png'" class="right" alt="">
            </div>
            <div class="top flex spb fcen" v-if="info.state == 104">
                <div class="left">
                    <p class="txt1 bold">已发货</p>
                    <p class="txt2">共{{info.orderNum}}件商品</p>
                </div>
                <img :src="imgHost + '/delivery.png'" class="right" alt="">
            </div>
            <div class="top flex spb fcen" v-else-if="info.state == 103">
                <div class="left">
                    <p class="txt1 bold">待发货</p>
                </div>
                <img :src="imgHost + '/delivery.png'" class="right" alt="">
            </div>
            <div class="top flex spb fcen" v-else-if="info.state == 102">
                <div class="left">
                    <p class="txt1 bold">已失败</p>
                </div>
                <img :src="imgHost + '/cancel.png'" class="right" alt="">
            </div>
            <div class="top flex spb fcen" v-else-if="info.state == 101">
                <div class="left">
                    <p class="txt1 bold">待付款</p>
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
            <mu-ripple class="logistics flex fcen" v-if="trace">
                <img src="../assets/img/car.png" class="fshrink0" alt="物流">
                <div class="states">{{trace}}</div>
            </mu-ripple>
            <mu-ripple class="addr flex fcen">
                <img src="../assets/img/pos.png" class="fshrink0" alt="地址">
                <div class="info flex1">
                    <div class="flex spb">
                        <p>{{info.receiverName}}</p>
                        <p>{{info.receiverPhone}}</p>
                    </div>
                    <div class="detail">{{info.addresseeAddress}}</div>
                </div>
            </mu-ripple>
            <div class="box">
                <p class="source">货源: 浙江众康科诺贸易有限公司</p>
                <div class="list">
                    <div class="prod flex" v-for="item,index in info.shipmentInfos" :key="'pro'+ index">
                        <div class="pic fshrink0" :style="'background-image: url(' + (item.coverImageUrl ? item.coverImageUrl : imgHost + '/def_pro1.png') + ')'"></div>
                        <div class="info flex1 fcol spb">
                            <p class="title">{{item.productName}}</p>
                            <p class="txtR">
                                <span class="num">×{{item.shipmentNum}}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="other txtR">
                    <p>运费: <span class="price">￥{{info.postage}}</span></p>
                </div>
                <div class="bb10"></div>
                <div class="order-info">
                    <p class="txt flex spb fcen">
                        <span>订单号: {{info.payNum}}</span>
                        <a href="javascript:;" class="copy" @click="copyText">复制</a>
                    </p>
                    <p class="txt">下单时间: {{info.createTime | fmt}}</p>
                    <p class="txt" v-if="info.state == 103 || info.state == 104">付款时间: {{info.lastUpdateTime | fmt}}</p>
                </div>
            </div>
            <div class="btns1 flex fend" v-if="info.state == 101">
                <mu-button class="btn" color="#ff7421" textColor="#fff" @click="openSheet">立即付款</mu-button>
            </div>
            <div class="btns1 flex fend" v-else-if="info.state == 105">
                <mu-button class="btn" color="#ff7421" textColor="#fff" @click="sure" v-if="!loading3">确认收货</mu-button>
                <mu-button class="btn1" v-else v-loading="loading3" data-mu-loading-size="20"></mu-button>
            </div>
            <mu-bottom-sheet :open.sync="showSheet" class="bot-s">
                <p class="title">付款详情</p>
                <div class="way flex spb">
                    <p>付款方式</p>
                    <p>余额支付<span class="num"> {{amount}}<template v-if="!enough">(余额不足)</template></span></p>
                </div>
                <div class="money flex spb">
                    <p>需付款</p>
                    <p class="num">{{info.postage}}元</p>
                </div>
                <div class="btns">
                    <mu-button class="btn" color="#ff7421" textColor="#fff" full-width @click="submit">立即发货</mu-button>
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
import { Button, Snackbar, Icon, BottomSheet, TextField, Dialog } from 'muse-ui';
import { imgHost } from '../api/baseUrl';
import { shipInfo, userState, confirmShip } from '../api/user';
import { getShipBalance, cancelShipOrder, payShip, trackInfo } from '../api/product';
import { util } from '../utils/base';
export default {
    data() {
        return {
            imgHost: imgHost,
            info: {},
            showSheet: false,
            amount: 0,
            enough: false,
            times: [],
            trace: '',
            loading3: false,
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            shipInfo({ shipmentId: this.id }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    this.info = res.data;
                    
                    if(!this.state){
                        this.getUserState();
                    }
                    if(res.data.state == 101){
                        let end = +res.data.createTime + 86400000 * 2;
                        let rest = end - Date.now();
                        this.countdown(rest);
                    }else if(res.data.state == 104 || res.data.state == 105 || res.data.state == 106){
                        this.getTrack();
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
        submit() {
            if(this.loading && this.loading.instance != null) return;
            if(this.state.transactState == 0) {
                Message.confirm('您还未设置过交易密码，是否去设置？', '提示', {}).then(({ result }) => {
                    if(result){
                        this.$router.push('/setTradePsw');
                    }
                })
            }else{
                Message.prompt('', '交易密码', {
                    validator(value) {
                        return {
                            valid: /\d{6}/.test(value),
                            message: '请输入6位交易密码！',
                        }
                    },
                    className: 'trade-p3',
                    inputType: 'password',
                    inputPlaceholder: '请输入交易密码',
                }).then(({ result, value }) => {
                    if(result){
                        this.loading = Loading({ text: '正在提交...', target: document.getElementById('pageContainer') });
                        payShip({ shipmentId: this.id, transactPassWord: value }).then(res => {
                            this.loading.close();
                            if(res.code == 1){
                                this.showSheet = false;
                                sessionStorage.removeItem('sendObj');
                                Toast.success('发货成功！');
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
                            this.loading.close();
                            Toast.error('未知异常！');
                            console.log(err);
                        })
                    }
                })
            }
        },
        sure() {
            this.loading3 = true;
            confirmShip({ shipmentId: this.id }).then(res => {
                this.loading3 = false;
                if(res.code == 1){
                    Toast.success('已确认');
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
                this.loading3 = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        cancelOrder() {
            cancelShipOrder({ shipmentId: this.id }).then(res => {
                if(res.code == 1){
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
        },
        openSheet() {
            if(this.amount){
                this.showSheet = true;
                return;
            }
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            getShipBalance({ shipmentId: this.id }).then(res => {
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
                }else if(res.code == 10042){
                    Toast.error(res.msg);
                    Message.confirm('您的库存不足，是否去订货？', '提示', {}).then(({ result }) => {
                        if(result){
                            this.$router.push('/orderArea');
                        }
                    })
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
        getTrack() {
            trackInfo({ express: this.info.courierName, expressNo: this.info.courierNum }).then(res => {
                if(res.code == 1){
                    this.trace = res.data.Traces[res.data.Traces.length - 1].AcceptStation;
                }else if(res.code == 4 || res.code == 2){
                    this.trace = '';
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
        countdown(t) {
            this.timer = setInterval(() => {
                t -= 1000;
                if(t <= 0){
                    clearInterval(this.timer);
                    this.cancelOrder();
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
        copyText() {
            this.$copyText(this.info.payNum).then(e => {
                Toast.success('订单号复制成功！');
            }, err => {
                Toast.error('订单号复制失败！');
                console.log(err);
            })
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
            this.getData();
        }else{
            this.$router.replace('/sendOrders');
        }
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Message);
Vue.use(BottomSheet);
Vue.use(TextField);
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
.addr{
    position: relative;
    padding: .1rem .15rem;
    background: #fff;
    img{
        height: .18rem;
        margin-right: .1rem;
    }
    .info{
        color: #979797;
        font-size: .14rem;
        .detail{
            margin-top: .05rem;
        }
    }
}
.logistics{
    position: relative;
    background: #fff;
    padding: .1rem .15rem;
    color: #ff7421;
    font-size: .14rem;
    border-bottom: 1px solid #f3f3f3;
    img{
        width: .16rem;
        height: .16rem;
        margin-right: 5px;
    }
}
.box{
    margin-top: .1rem;
    background: #fff;
    margin-bottom: .5rem;
    .source{
        line-height: .4rem;
        color: #000;
        font-size: .14rem;
        padding: 0 .15rem;
    }
    .prod{
        background: #f6f6f6;
        padding: .1rem .15rem;
        &:not(:first-child){
            margin-top: .05rem;
        }
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
                font-size: .16rem;
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
        &:first-child:not(:last-child){
            border: 1px solid #f3f3f3;
        }
    }
    .btn1{
        width: .6rem;
        height: .28rem;
        border-radius: .05rem;
        border: 1px solid #f3f3f3;
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
.order-detail3 .mu-input-content{
    padding: 0 .15rem;
}
.order-detail3 .mu-input-content .mu-text-field-input{
    padding: .05rem 0;
    height: .42rem;
    text-align: right;
}
.order-detail3 .mu-input-content .mu-input-prefix-text{
    color: #000;
}
.order-detail3 .mu-input-content .mu-input-line{
    background-color: #f3f3f3;
}
.trade-p3 .mu-input{
    margin: 0;
    padding: 0;
    min-height: auto;
}
.trade-p3 .mu-input-help{
    display: block!important;
}
</style>
