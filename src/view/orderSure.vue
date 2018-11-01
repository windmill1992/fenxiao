<template>
    <div id="pageContainer" class="order-sure">
        <div class="header">
            <p class="title">确认订单</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <!-- <mu-ripple class="addr flex fcen" @click="toAddrManage" v-if="hasAddr">
                    <img src="../assets/img/map.png" class="fshrink0" alt="地址">
                    <div class="info flex1">
                        <div class="flex spb">
                            <p>收货人: {{addrInfo.realName}}</p>
                            <p>{{addrInfo.mobileNum}}</p>
                        </div>
                        <div class="detail">收货地址：{{addrInfo.province}}{{addrInfo.city}}{{addrInfo.area}}{{addrInfo.detailAddress}}</div>
                    </div>
                    <div class="arr-r"></div>
                </mu-ripple>
                <mu-ripple class="addr flex fcen spb" v-else>
                    <p>添加收货地址</p>
                    <div class="arr-r"></div>
                </mu-ripple> -->
                <div class="source">货源: 浙江众康科诺贸易有限公司</div>
            </div>
            <div class="goods-info flex fcen">
                <div class="pic fshrink0">
                    <img v-if="info.bFiles" :src="info.bFiles[0].middleUrl" alt="商品">
                    <img v-else :src="imgHost +'/def_pro1.png'" alt="商品">
                </div>
                <div class="info flex1">
                    <p class="title">{{info.productName}}</p>
                    <p class="price">套组价:￥{{info.priceOne}}</p>
                    <p class="ori-price">￥{{info.costPrice}}</p>
                </div>
            </div>
            <div class="box">
                <div class="item flex spb fcen">
                    <p class="txt">订货数量</p>
                    <p class="txt">×{{info.salesNum}}</p>
                </div>
                <!-- <div class="bb"></div>
                <div class="item flex spb fcen">
                    <p class="txt">发货数量</p>
                    <p class="txt">x9</p>
                </div> -->
            </div>
            <div class="bb10"></div>
            <div class="box">
                <!-- <div class="item flex spb fcen">
                    <p class="txt">选择配送方式</p>
                    <div class="txt flex fcen" @click="openBottomSheet">
                        <p>{{way}}</p>
                        <p class="arr-r"></p>
                    </div>
                </div>
                <div class="bb"></div>
                <div class="item flex spb fcen">
                    <mu-text-field v-model="leaveword" placeholder="选填:本次交易特别说明" class="inp" full-width underline-color="blue" prefix="购买留言"></mu-text-field>
                </div> -->
            </div>

            <div class="bot flex">
                <div class="left">
                    <p class="sum bold">合计:￥{{info.price}}</p>
                    <p class="total">特惠总价:￥{{info.priceTotal}}</p>
                </div>
                <mu-ripple class="right" @click="submit">
                    <a href="javascript:;" class="btn">立即订货</a>
                </mu-ripple>
            </div>
        </div>
        <mu-bottom-sheet :open.sync="openSheet" class="bot-s">
            <p class="title">付款详情</p>
            <div class="way flex spb">
                <p>付款方式</p>
                <p>余额支付<span class="num"> {{amount}}<template v-if="!enough">(余额不足)</template></span></p>
            </div>
            <div class="money flex spb">
                <p>需付款</p>
                <p class="num">{{info.price}}元</p>
            </div>
            <div class="btns">
                <mu-button class="btn" color="#ff7421" textColor="#fff" full-width @click="linkto('recharge')" v-if="!enough">去充值</mu-button>
                <mu-button class="btn" color="#ff7421" textColor="#fff" full-width @click="linkto('orderDetail', orderId)" v-else>立即订货</mu-button>
            </div>
            <a href="javascript:;" class="close" @click="closeSheet"><img src="../assets/img/close.png" alt="关闭"></a>
        </mu-bottom-sheet>
        <!-- <mu-bottom-sheet :open.sync="open">
            <mu-list @item-click="closeBottomSheet">
                <mu-list-item button data-way="快递A:￥20.5">
                    <mu-list-item-title>快递A:￥20.5</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button data-way="货到付款">
                    <mu-list-item-title>货到付款</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button data-way="包邮">
                    <mu-list-item-title>包邮</mu-list-item-title>
                </mu-list-item>
                <mu-list-item button data-way="快递B:￥10.5">
                    <mu-list-item-title>快递B:￥10.5</mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-bottom-sheet> -->
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import Vue from 'vue';
import Loading from 'muse-ui-loading';
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import { BottomSheet, List, TextField, Snackbar, Button, Icon, Dialog } from 'muse-ui';
import { selDefAddress, userState, integral } from '../api/user';
import { imgHost } from '../api/baseUrl';
import { prodDetail2 , salesOrder } from '../api/product';
export default {
    data() {
        return {
            open: false,
            leaveword: '',
            hasAddr: false,
            info: {},
            imgHost: imgHost,
            openSheet: false,
            enough: false,
            orderId: 0,
            sumInfo: {},
            amount: 0,
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            prodDetail2({ id: this.ids }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    this.info = res.data;
                    this.getUserState();
                    this.getState();
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name +'&query=ids_'+ this.ids);
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
            });
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
        getState() {
            integral().then(res => {
                if(res.code == 1){
                    this.user = res.data;
                }else if(res.code == 0){
                    
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
        linkto(name, id) {
            if(id) {
                this.$router.push({ name: name, params: { id: id }, query: { sale: true } });
            }else{
                this.$router.push({ name: name });
            }
        },
        submit() {
            if(this.loading2) return;
            this.loading = Loading({ text: '正在查询...', target: document.getElementById('pageContainer') });
            this.loading2 = true;
            salesOrder({ orderType: 5, id: this.ids }).then(res => {
                this.loading.close();
                if(res.code == 1){
                    this.openSheet = true;
                    this.amount = res.data;
                    this.enough = true;
                    this.loading2 = false;
                    this.orderId = res.data2;
                    if(this.state.transactState == 0) {
                        Message.confirm('您还未设置过交易密码，是否去设置？', '提示', {}).then(({ result }) => {
                            if(result){
                                this.$router.push('/setTradePsw');
                            }
                        })
                    }
                }else if(res.code == 10035){
                    this.openSheet = true;
                    this.amount = res.data;
                    this.enough = false;
                    this.loading2 = false;
                    if(this.state.transactState == 0) {
                        Message.confirm('您还未设置过交易密码，是否去设置？', '提示', {}).then(({ result }) => {
                            if(result){
                                this.$router.push('/setTradePsw');
                            }
                        })
                    }
                }else if(res.code == 0){
                    this.$router.push('/login');
                }else{
                    this.loading2 = false;
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.loading.close();
                this.loading2 = false;
                Toast.error('未知异常！');
                console.log(err);
            });
        },
        closeSheet() {
            this.openSheet = false;
        },
        toAddrManage() {
            this.$router.push('/addrManage');
        },
        openBottomSheet() {
            this.open = true;
        },
        closeBottomSheet(e) {
            this.open = false;
            this.way = e.$el.dataset.way;
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
        let ids = this.$route.query.ids;
        if(ids){
            this.ids = ids;
            this.getData();
        }else{
            this.$router.replace('/orderArea');
        }
    }
}
Vue.use(BottomSheet);
Vue.use(List);
Vue.use(TextField);
Vue.use(Loading);
Vue.use(Toast);
Vue.use(Message);
Vue.use(Dialog);
Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Icon);
</script>

<style scoped lang="less">
.wrapper{
    padding-bottom: .7rem;
    .box{
        background: #fff;
        border-top: 1px solid #f3f3f3;
        .addr{
            position: relative;
            padding: .1rem .15rem;
            img{
                height: .18rem;
                margin-right: .1rem;
            }
            .info{
                color: #000;
                font-size: .14rem;
                padding-right: .1rem;
                .detail{
                    margin-top: .05rem;
                }
            }
        }
        .source{
            height: .42rem;
            line-height: .42rem;
            padding: 0 .15rem;
            color: #000;
            font-size: .14rem;
            border-top: 1px solid #f3f3f3;
        }
        .item{
            padding: 0 .15rem;
            height: .42rem;
            line-height: .42rem;
            position: relative;
            .txt{
                color: #000;
                font-size: .14rem;
                position: relative;
                .arr-r{
                    margin-left: .05rem;
                }
            }
            .inp{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: .42rem;
                margin: 0;
                padding: 0;
                color: #000;
                font-size: .14rem;
                min-height: auto;
            }
        }
    }
    .goods-info{
        padding: .1rem .15rem;
        .pic{
            width: .7rem;
            height: .62rem;
            overflow: hidden;
            margin-right: .15rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .info{
            .title{
                font-size: .14rem;
                color: #000;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }
            .price{
                font-size: .14rem;
                color: #ff7421;
                margin-top: .05rem;
            }
            .ori-price{
                font-size: .12rem;
                color: #9c9c9c;
                text-decoration: line-through;
            }
        }
    }
    .bot{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: .7rem;
        .left{
            width: 66.66%;
            background: #fff;
            padding: .1rem .15rem;
            .sum{
                color: #ff7421;
                font-size: .16rem;
            }
            .total{
                color: #555;
                font-size: .14rem;
                margin-top: .05rem;
            }
        }
        .right{
            width: 33.33%;
            line-height: .7rem;
            background: #ff7421;
            font-size: .16rem;
            text-align: center;
            position: relative;
            .btn{
                color: #fff;
            }
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
.order-sure .mu-input-content{
    padding: 0 .15rem;
}
.order-sure .mu-input-content .mu-text-field-input{
    padding: .05rem 0;
    height: .42rem;
    text-align: right;
}
.order-sure .mu-input-content .mu-input-prefix-text{
    color: #000;
}
.order-sure .mu-input-content .mu-input-line{
    background-color: #f3f3f3;
}
</style>
