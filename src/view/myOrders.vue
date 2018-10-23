<template>
    <div id="pageContainer" class="my-orders">
        <div class="header">
            <p class="title">我的订货订单</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper" ref="wrapper">
            <mu-tabs :value.sync="active" color="white" indicator-color="#ff7421" full-width @change="switchTab">
                <mu-tab>全部</mu-tab>
                <mu-tab class="tab">待付款</mu-tab>
                <mu-tab class="tab">已付款</mu-tab>
                <mu-tab class="tab">已取消</mu-tab>
            </mu-tabs>
            
            <mu-load-more class="box flex1 fcol" :loading="loading" @load="load">
                <div class="list" v-if="hasmore != 0">
                    <div class="item" v-for="item,index in list" :key="item.id">
                        <div class="top flex spb">
                            <p>供货商: {{item.highUserName ? item.highUserName : '公司'}}</p>
                            <p>{{stateTxts[item.state]}}</p>
                        </div>
                        <div class="goods-list">
                            <div class="item1 flex fcen">
                                <div class="pic fshrink0">
                                    <img v-if="item.coverImageUrl" :src="item.coverImageUrl" alt="商品">
                                    <img v-else :src="imgHost + '/def_pro1.png'" alt="商品">
                                </div>
                                <div class="info flex1 fcol spb">
                                    <p class="title">{{item.productName}}</p>
                                    <div class="flex spb">
                                        <p class="bold">￥{{item.price}}</p>
                                        <p>×{{item.shipmentNum}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="total">共 {{item.shipmentNum}} 件商品,总价: ￥{{item.amountMoney}}</div>
                        <div class="bot flex fend">
                            <a href="javascript:;" class="btn-a">
                                <mu-ripple class="btn" @click="linkto(item.id)">查看详情</mu-ripple>
                            </a>
                            <a href="javascript:;" class="btn-a" v-if="item.state == 101">
                                <mu-ripple class="btn" @click="cancelOrder(index)">取消订单</mu-ripple>
                            </a>
                            <a href="javascript:;" class="btn-a btn-a-1" v-if="item.state == 101">
                                <mu-ripple class="btn btn1" @click="pay(index)">去付款</mu-ripple>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="no-data flex1 fcol fcen spc" v-else>
                    <img :src="imgHost + '/error_zanwusj.png'" alt="暂无订单数据">
                    <p class="txt">暂无订单数据</p>
                </div>
                <div class="no-more" v-if="hasmore == 1">没有更多数据了</div>
            </mu-load-more>
            <mu-bottom-sheet :open.sync="openSheet" class="bot-s">
                <p class="title">付款详情</p>
                <div class="way flex spb">
                    <p>付款方式</p>
                    <p>余额支付<span class="num"> {{amount}}<template v-if="!enough">(余额不足)</template></span></p>
                </div>
                <div class="money flex spb">
                    <p>需付款</p>
                    <p class="num">{{amountMoney}}元</p>
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
import Loading from 'muse-ui-loading';
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import { Tabs, LoadMore, Button, Snackbar, Icon, BottomSheet, Dialog, TextField } from 'muse-ui';
import { myOrders, userState } from '../api/user';
import { getBalance, cancelOrder, orderGoods } from '../api/product';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            active: 0,
            list: [],
            loading: false,
            imgHost: imgHost,
            state: '',
            page: 1,
            pageSize: 10,
            states: ['', 101, 102, 103],
            stateTxts: {
                '101': '待付款',
                '102': '已付款',
                '103': '已取消',
            },
            hasmore: -1,
            amountMoney: 0,
            openSheet: false,
            state: {},
            amount: 0,
            enough: false,
        }
    },
    methods: {
        getData() {
            this.loading2 = Loading({ target: document.getElementById('pageContainer') });
            let param = {
                pageNum: this.page, 
                pageSize: this.pageSize,
                state: this.states[this.active],
            }
            myOrders(param).then(res => {
                this.loading2.close();
                this.loading = false;
                if(res.code == 1){
                    if(this.page == 1){
                        this.list = [];
                        this.getUserState();
                    }
                    let r = res.data;
                    this.list = [...this.list, ...r.resultData];
                    if(r.total == 0){
                        this.hasmore = 0;
                    }else if(r.total <= this.page * this.pageSize){
                        this.hasmore = 1;
                    }else{
                        this.hasmore = 2;
                    }
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
        switchTab() {
            this.page = 1;
            this.getData();
        },
        load() {
            if(this.hasmore != 2) return;
            this.loading = true;
            this.page++;
            this.getData();
        },
        linkto(id) {
            this.$router.push('/orderDetail/'+ id);
        },
        cancelOrder(index) {
            Message.confirm('确定取消订单吗？', '提示', {}).then(({ result }) => {
                if(result){
                    cancelOrder({ orderId: this.list[index].id }).then(res => {
                        if(res.code == 1){
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
                        Toast.error('未知异常！');
                        console.log(err);
                    })
                }
            })
        },
        pay(index) {
            this.id = this.list[index].id;
            this.loading2 = Loading({ target: document.getElementById('pageContainer') });
            getBalance({ orderId: this.id }).then(res => {
                this.loading2.close();
                this.amountMoney = this.list[index].amountMoney;
                this.openSheet = true;
                if(res.code == 1){
                    this.amount = res.data;
                    this.enough = true;
                }else if(res.code == 10035){
                    this.amount = res.data;
                    this.enough = false;
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
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        cancelOrder(index) {
            let id = this.list[index].id;
            Message.confirm('确定取消订单吗？', '提示', {}).then(({ result }) => {
                if(result){
                    cancelOrder({ orderId: id, orderType: 0 }).then(res => {
                        if(res.code == 1){
                            this.page = 1;
                            this.$refs.wrapper.scrollTop = 0;
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
            if(this.loading3) return;
            if(this.state.transactState == 0) {
                Message.confirm('您还未设置过交易密码，是否去设置？', '提示', {}).then(({ result }) => {
                    if(result){
                        this.$router.push('/setTradePsw');
                    }
                });
                return;
            }
            Message.prompt('', '交易密码', {
                validator(value) {
                    return {
                        valid: /\d{6}/.test(value),
                        message: '请输入6位交易密码！',
                    }
                },
                className: 'trade-p0',
                inputType: 'password',
                inputPlaceholder: '请输入交易密码',
            }).then(({ result, value }) => {
                if(result){
                    this.loading3 = true;
                    orderGoods({ orderId: this.id, transactPassWord: value }).then(res => {
                        this.loading3 = false;
                        if(res.code == 1){
                            Toast.success('订货成功！');
                            this.openSheet = false;
                            this.active = 2;
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
                        this.loading3 = false;
                        Toast.error('未知异常！');
                        console.log(err);
                    })
                }
            })
        },
        closeSheet() {
            this.openSheet = false;
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
        let winh = $(window).height();
        let h = this.isWx ? 0 : $('.header').height() + $('.mu-tabs').height();
        $('.my-orders .box').height(winh - h - 1);

        this.getData();
    }
}
Vue.use(Loading);
Vue.use(Toast);
Vue.use(Message);
Vue.use(Tabs);
Vue.use(LoadMore);
Vue.use(Dialog);
Vue.use(TextField);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(BottomSheet);
</script>

<style scoped lang="less">
.mu-tabs{
    border-bottom: 1px solid #f3f3f3;
    .mu-tab{
        font-size: .16rem;
        letter-spacing: 1px;
        position: relative;
        border-top: 1px solid #f3f3f3;
        &.tab::before{
            content: '';
            display: block;
            width: 1px;
            height: .22rem;
            background: #f3f3f3;
            position: absolute;
            left: 0;
            top: 50%;
            -webkit-transform: translate3d(0, -50%, 0);
            transform: translate3d(0, -50%, 0);
        }
    }
}
.box{
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .list{
        .item{
            border-top: 1px solid #f3f3f3;
            margin-bottom: .1rem;
            background: #fff;
            .top{
                padding: .1rem .15rem;
                color: #000;
                font-size: .12rem;
            }
            .item1{
                background: #f6f6f6;
                margin-bottom: .05rem;
                padding: .1rem .15rem;
                &:last-child{
                    margin-bottom: 0;
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
                    height: .62rem;
                    font-size: .14rem;
                    color: #000;
                    .title{
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        line-height: 2;
                        overflow: hidden;
                    }
                }
            }
            .total{
                font-size: .12rem;
                color: #000;
                text-align: right;
                padding: .1rem .15rem;
            }
            .bot{
                padding: .1rem .15rem;
                border-top: 1px solid #f3f3f3;
                .btn-a{
                    color: #000;
                    font-size: .12rem;
                    display: block;
                    width: .8rem;
                    height: .26rem;
                    line-height: .24rem;
                    border: 1px solid #555;
                    border-radius: .05rem;
                    text-align: center;
                    overflow: hidden;
                    margin-left: .15rem;
                    &.btn-a-1{
                        border-color: #ff7421;
                    }
                    .btn{
                        position: relative;
                        &.btn1{
                            background: #ff7421;
                            color: #fff;
                        }
                    }
                }
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
.my-orders .mu-tabs, .my-orders .mu-tab-active{
    color: #000;
}
.my-orders .mu-tab-link-highlight{
    width: .5rem!important;
    height: 3px;
    left: 12.5%;
    margin-left: -.25rem;
}
.order-d .mu-dialog-body{
    padding: 0;
    position: relative;
}
.trade-p0 .mu-input{
    margin: 0;
    padding: 0;
    min-height: auto;
}
.trade-p0 .mu-input-help{
    display: block!important;
}
</style>
