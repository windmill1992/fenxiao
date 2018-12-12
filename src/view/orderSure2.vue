<template>
    <div id="pageContainer" class="order-sure2">
        <div class="header">
            <p class="title">确认订单</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box" v-if="ways == 1">
                <mu-ripple class="addr flex fcen" @click="toAddrManage" v-if="hasAddr">
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
                <mu-ripple class="addr flex fcen spb" @click="addAddr" v-else>
                    <p>添加收货地址</p>
                    <div class="arr-r"></div>
                </mu-ripple>
                <div class="source">货源: 浙江众康科诺贸易有限公司</div>
            </div>
            <div class="list">
                <div class="goods-info flex fcen" v-for="item,index in list" :key="item.id">
                    <div class="pic fshrink0">
                        <img v-if="item.bFiles" :src="item.bFiles[0].middleUrl" alt="商品">
                        <img v-else :src="imgHost +'/def_pro1.png'" alt="商品">
                    </div>
                    <div class="info flex1 fcol spb">
                        <p class="title">{{item.productName}}</p>
                        <p class="num txtR">×{{nums[index]}}</p>
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="item flex spb fcen">
                    <p class="txt">发货数量</p>
                    <p class="txt">×{{totalNum}}</p>
                </div>
            </div>
            <div class="bb10"></div>
            <div class="box">
                <div class="item flex spb fcen">
                    <p class="txt">发货方式</p>
                    <select v-model="ways" class="sel" @change="getWays">
                        <option value="1">邮寄（不包邮）</option>
                        <option value="2">自提（杭州市余杭区）</option>
                    </select>
                </div>
                <div class="item flex spb fcen">
                    <p class="txt">快递费</p>
                    <p class="txt" v-if="!loading2">{{way}}</p>
                    <p class="txt l" v-else v-loading="loading2" data-mu-loading-size="18"></p>
                </div>
            </div>
            <mu-button color="#ff7421" textColor="#fff" class="bot" full-width @click="showSheet">立即发货</mu-button>
        </div>
        <mu-bottom-sheet :open.sync="openSheet" class="bot-s">
            <p class="title">付款详情</p>
            <div class="way flex spb">
                <p>付款方式</p>
                <p>余额支付<span class="num"> {{amount}}<template v-if="!enough">(余额不足)</template></span></p>
            </div>
            <div class="money flex spb">
                <p>需付款</p>
                <p class="num">{{money}}元</p>
            </div>
            <div class="btns">
                <mu-button class="btn" color="#ff7421" textColor="#fff" full-width @click="send">立即发货</mu-button>
            </div>
            <a href="javascript:;" class="close" @click="closeSheet"><img src="../assets/img/close.png" alt="关闭"></a>
        </mu-bottom-sheet>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import Vue from 'vue';
import Loading from 'muse-ui-loading';
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import { BottomSheet, TextField, Snackbar, Button, Icon, Dialog } from 'muse-ui';
import { selDefAddress, userState, integral, shipOrderList } from '../api/user';
import { shipOrder, express, payShip, freeShip } from '../api/product';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            hasAddr: false,
            list: [],
            imgHost: imgHost,
            openSheet: false,
            enough: false,
            orderId: 0,
            amount: 0,
            ids: [],
            nums: [],
            way: '',
            ways: '1',
            money: 0,
            totalNum: 0,
            loading2: false,
        }
    },
    methods: {
        getAddr() {
            this.loading2 = true;
            selDefAddress().then(res => {
                this.loading2 = false;
                if(res.code == 1){
                    this.hasAddr = true;
                    this.addrInfo = res.data;
                    this.getExpress();
                }else if(res.code == 2 || res.code == 4){
                    this.hasAddr = false;
                    this.way = '请先添加收货地址';
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
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            shipOrderList({ productIds: this.ids.join(',') }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    this.list = [...[], ...res.data];
                    this.getAddr();
                    this.getUserState();
                    this.getState();
                }else if(res.code == 0){
                    this.$router.push('/login');
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
        getExpress() {
            express({ province: this.addrInfo.province, express: 'SF', productIds: this.ids.join(','), shipmentNums: this.nums.join(',') }).then(res => {
                if(res.code == 1){
                    this.way = res.data + '元';
                    this.money = res.data;
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
        getWays() {
            if(this.ways == 1) {
                this.getAddr();
            }else{
                this.way = 0;
                this.money = 0;
            }
        },
        send() {
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
                    className: 'trade-p2',
                    inputType: 'password',
                    inputPlaceholder: '请输入交易密码',
                }).then(({ result, value }) => {
                    if(result){
                        this.loading = Loading({ text: '正在提交...', target: document.getElementById('pageContainer') });
                        payShip({ shipmentId: this.orderId, transactPassWord: value }).then(res => {
                            if(res.code == 1){
                                this.showSheet = false;
                                sessionStorage.removeItem('sendObj');
                                Toast.success('支付成功！');
                                setTimeout(() => {
                                    this.$router.push('/orderDetail3/'+ this.orderId);
                                }, 1000);
                            }else{
                                if(this.loading){
                                    this.loading.close();
                                }
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
        showSheet() {
            if(!this.user) {
                Toast.error('未登录');
                return;
            }
            if(this.ways == 1) {
                if(this.hasAddr){
                    this.submit();
                }else{
                    Toast.error('请添加收货地址！');
                }
            }else{
                this.submit();
            }
        },
        submit() {
            if(this.loading2) return;
            this.loading = Loading({ text: '正在查询...', target: document.getElementById('pageContainer') });
            this.loading2 = true;
            if(this.money <= 0){
                let data = {
                    productIds: this.ids.join(','),
                    shipmentNums: this.nums.join(','),
                    isSelfMention: 1,
                };
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
                            data.transactPassWord = value;
                            freeShip(data).then(res => {
                                if(res.code == 1){
                                    this.loading2 = false;
                                    this.orderId = res.data2;
                                    sessionStorage.removeItem('sendObj');
                                    Toast.success('发货成功！');
                                    setTimeout(() => {
                                        this.$router.push('/orderDetail3/'+ this.orderId);
                                    }, 1000);
                                }else{
                                    if(this.loading){
                                        this.loading.close();
                                    }
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
            }else{
                let data = {
                    productIds: this.ids.join(','),
                    shipmentNums: this.nums.join(','),
                    receiverName: this.addrInfo.realName,
                    receiverPhone: this.addrInfo.mobileNum,
                    address: `${this.addrInfo.province + this.addrInfo.city + this.addrInfo.area + this.addrInfo.detailAddress}`,
                    money: this.money,
                    isSelfMention: 0,
                };
                shipOrder(data).then(res => {
                    if(this.loading){
                        this.loading.close();
                    }
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
            }
        },
        closeSheet() {
            this.openSheet = false;
        },
        toAddrManage() {
            this.$router.push('/addrManage');
        },
        addAddr() {
            this.$router.push('/address');
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
        if(sessionStorage.sendObj){
            let so = JSON.parse(sessionStorage.sendObj);
            let { ids, nums } = so;
            this.ids = ids;
            this.nums = nums;
            let n = 0;
            for(let v of nums){
                n += Number(v);
            }
            this.totalNum = n;
            this.getData();
        }else{
            this.$router.replace('/myStock');
        }
    }
}
Vue.use(BottomSheet);
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
                &.l{
                    width: .2rem;
                    height: .42rem;
                }
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
            .sel {
                border: none;
                outline: none;
                text-align: right;
            }
        }
    }
    .list{
        background: #fff;
    }
    .goods-info{
        padding: .1rem .15rem;
        background: #f6f6f6;
        &:not(:first-child){
            margin-top: .1rem;
        }
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
            .num{
                font-size: .14rem;
                color: #000;
                margin-top: .05rem;
            }
        }
    }
    .bot{
        position: fixed;
        left: 0;
        bottom: 0;
        height: .5rem;
        font-size: .16rem;
        letter-spacing: 1px;
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
.order-sure2 .mu-input-content{
    padding: 0 .15rem;
}
.order-sure2 .mu-input-content .mu-text-field-input{
    padding: .05rem 0;
    height: .42rem;
    text-align: right;
}
.order-sure2 .mu-input-content .mu-input-prefix-text{
    color: #000;
}
.order-sure2 .mu-input-content .mu-input-line{
    background-color: #f3f3f3;
}
.trade-p2 .mu-input{
    margin: 0;
    padding: 0;
    min-height: auto;
}
.trade-p2 .mu-input-help{
    display: block!important;
}
</style>
