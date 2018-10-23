<template>
    <div id="pageContainer" class="purchase">
        <div class="header">
            <p class="title">进货单</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="item">
                <div class="box">
                    <div class="source">货源: 浙江众康科诺贸易有限公司</div>
                </div>
                <div class="goods-info flex fcen">
                    <router-link :to="'/detail/'+ ids" class="pic fshrink0">
                        <img v-if="info.productUrl" :src="info.productUrl" alt="商品">
                        <img v-else :src="imgHost + '/def_pro1.png'" alt="商品">
                    </router-link>
                    <div class="info flex1">
                        <router-link :to="'/detail/'+ ids" class="title">{{info.productName}}</router-link>
                        <p class="price" v-if="info.highLevelStock != null">上阶库存: {{info.highLevelStock}}</p>
                        <p class="price" v-else></p>
                        <!-- <a href="javascript:;" class="del" @click="deleteItem(0)"><img src="../assets/img/delete.png" alt="删除"></a> -->
                        <div class="num-box flex fcen">
                            <mu-button fab small color="rgba(0,0,0,0)" class="op" @click="minusNum" data-index="0"><mu-icon value="remove" color="#ccc"></mu-icon></mu-button>
                            <mu-text-field type="number" v-model="num[0]" @change="getNum(0)" class="inp" color="transparent" underline-color="blue"></mu-text-field>
                            <mu-button fab small class="op" @click="addNum" data-index="0"><img src="../assets/img/add.png" alt="增加"></mu-button>
                        </div>
                    </div>
                </div>
                <div class="box box1">
                    <div class="unit-price">
                        <p class="txt">订货单价:</p>
                        <div class="price-box flex fcen fend">
                            <p class="ori-price">￥{{sumInfo.oldPrice}}</p>
                            <p class="price">￥{{sumInfo.price}}</p>
                            <!-- <div class="arr-r"></div> -->
                        </div>
                    </div>
                    <p class="tip" v-if="info.hint">{{info.hint}}</p>
                </div>
                <div class="bb10"></div>
            </div>
            <div class="box">
                <mu-ripple class="rule flex fcen spb" @click="toggleRule">
                    <p class="title">订货规则</p>
                    <div class="arr-d" :class="{ up: showRule }"></div>
                </mu-ripple>
                <div class="bb"></div>
                <ul id="ruleCon">
                    <li>1、上阶库存是指上阶系统库存加公司库存，如果上阶库存跟公司库存一样时，说明上阶系统库存为0。</li>
                    <li>2、某些产品并没有4个价格等级，有可能初级价格、中级价格同特惠价格一致。</li>
                    <li>3、不同头衔能够订到的产品价格区间不同，详情查看各头衔的进货权。</li>
                    <li>4、当订货金额是特约价格时跟公司订货，获得自有积分，否则向上阶订货。</li>
                    <li>5、当月首次订货总价不能低于1400元。</li>
                </ul>
            </div>

            <div class="bot flex" >
                <!-- <div class="warn" v-if="showWarn">*差￥1620.00特惠总价可定初级价格</div> -->
                <div class="left">
                    <p class="sum bold">合计:￥{{sumInfo.amountMoney}}</p>
                    <p class="total">特惠总价:￥{{sumInfo.totalMoney}}</p>
                </div>
                <mu-ripple class="right" @click="sureOrder">
                    <a href="javascript:;" class="btn">立即订货</a>
                </mu-ripple>
            </div>

            <mu-dialog :open.sync="showDialog" :overlay-close="false" width="400" max-width="84%" dialog-class="order-d">
                <p class="title">确认订单</p>
                <div class="prod flex fcen">
                    <div class="pic fshrink0" :style="'background-image: url('+ info.productUrl +')'"></div>
                    <div class="info flex1 fcol spb">
                        <p class="name">{{info.productName}}</p>
                        <p class="price flex spb">
                            <span class="num">￥{{sumInfo.price}}</span>
                            <span>×{{num[0]}}</span>
                        </p>
                    </div>
                </div>
                <p class="other">
                    共 <span class="num">{{num[0]}}</span> 件商品，订货总价：<span class="num">￥{{sumInfo.amountMoney}}</span>
                </p>
                <a href="javascript:;" class="close" @click="closeDialog"><img src="../assets/img/close.png" alt="关闭"></a>
                <mu-button slot="actions" flat color="#9c9c9c" @click="closeDialog">取消</mu-button>
                <mu-button slot="actions" flat color="#ff7421" @click="submit">提交订单</mu-button>
            </mu-dialog>
            <mu-bottom-sheet :open.sync="openSheet" class="bot-s">
                <p class="title">付款详情</p>
                <div class="way flex spb">
                    <p>付款方式</p>
                    <p>余额支付<span class="num"> {{amount}}<template v-if="!enough">(余额不足)</template></span></p>
                </div>
                <div class="money flex spb">
                    <p>需付款</p>
                    <p class="num">{{sumInfo.amountMoney}}元</p>
                </div>
                <div class="btns">
                    <mu-button class="btn" color="#ff7421" textColor="#fff" full-width @click="linkto('recharge')" v-if="!enough">去充值</mu-button>
                    <mu-button class="btn" color="#ff7421" textColor="#fff" full-width @click="linkto('orderDetail', orderId)" v-else>立即订货</mu-button>
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
import { TextField, Button, Snackbar, Icon, Dialog, BottomSheet } from 'muse-ui';
import { imgHost } from '../api/baseUrl';
import { prodInfo, prodPurchase, order } from '../api/product';
import { userState, integral } from '../api/user';
export default {
    data() {
        return {
            num: [1],
            showRule: false,
            showWarn: true,
            imgHost: imgHost,
            ids: '',
            info: {},
            sumInfo: {
                totalMoney: 0,
                amountMoney: 0,
                shipmentNum: 1,
                oldPrice: 980,
                price: 980,
            },
            loading: false,
            showDialog: false,
            state: {},
            openSheet: false,
            enough: false,
            amount: 0,
            orderId: 0,
        }
    },
    methods: {
        getData(id) {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            prodInfo({ productId: this.ids }).then(res => {
                this.loading.close();
                if(res.code == 1){
                    this.info = res.data;
                    this.getUserState();
                    this.getState();
                    this.getSum(1, 0);
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
        minusNum(e) {
            let { index } = $(e.target).closest('.op')[0].dataset;
            if(this.num[index] <= 1) return;
            this.getSum(this.num[index] - 1, index);
        },
        addNum(e) {
            let { index } = $(e.target).closest('.op')[0].dataset;
            this.getSum(this.num[index] + 1, index);
        },
        getNum(index) {
            if(!this.num[index] || !Number.isInteger(Number(this.num[index])) || this.num[index] < 1){
                this.num[index] = 1;
                this.num = [...[], ...this.num];
                this.getSum(1, index);
            }else{
                this.getSum(this.num[index], index);
            }
        },
        deleteItem(idx) {
            this.ids.splice(idx, 1);
            this.list.splice(idx, 1);
        },
        toggleRule() {
            this.showRule = !this.showRule;
            if(this.showRule){
                $('#ruleCon').slideDown();
            }else{
                $('#ruleCon').slideUp();
            }
        },
        getSum(num, index) {
            if(this.prog == 1 || this.loading2) return;
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            this.prog = 1;
            prodPurchase({ productId: this.ids, num: num }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    this.num[index] = res.data.shipmentNum;
                    this.num = [...[], ...this.num];
                    this.sumInfo = res.data;
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name +'&query=ids_'+ this.ids);
                }else if(res.code == 10036){
                    if(this.sumInfo.shipmentNum <= 9){
                        Message.confirm('', '温馨提示', {
                            title: '温馨提示',
                            content: '直升中级经销商，套餐优惠价  580元/件',
                            mode: 'confirm',
                            // type: 'info',
                            okLabel: '我要订货',
                        }).then(({ result }) => {
                            if(result){
                                this.$router.push('/orderArea');
                            }
                        })
                    }
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
                this.prog = 0;
            })
            .catch(err => {
                this.prog = 0;
                if(this.loading){
                    this.loading.close();
                }
                Toast.error('未知异常！');
                console.log(err);
            });
        },
        sureOrder() {
            if(this.num[0] <= 0) {
                Toast.error('订货数量至少为1');
                return;
            }
            this.showDialog = true;
        },
        closeDialog() {
            this.showDialog = false;
        },
        submit() {
            if(this.loading2) return;
            this.loading = Loading({ text: '正在查询...', target: document.getElementById('pageContainer') });
            this.loading2 = true;
            order({ orderType: 5, productId: this.ids, shipmentNum: this.num[0], price: this.sumInfo.price, amountMoney: this.sumInfo.amountMoney }).then(res => {
                this.loading.close();
                if(res.code == 1){
                    this.showDialog = false;
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
                        });
                    }
                }else if(res.code == 10035){
                    this.showDialog = false;
                    this.openSheet = true;
                    this.amount = res.data;
                    this.enough = false;
                    this.loading2 = false;
                    if(this.state.transactState == 0) {
                        Message.confirm('您还未设置过交易密码，是否去设置？', '提示', {}).then(({ result }) => {
                            if(result){
                                this.$router.push('/setTradePsw');
                            }
                        });
                    }
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name +'&query=ids_'+ this.ids);
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
            if(this.orderId){
                this.$router.push('/orderDetail/'+ this.orderId);
            }
        },
        linkto(name, id) {
            if(!id){
                this.$router.push({ name: name, query: { ids: this.ids, from: this.$route.name } });
            }else{
                this.$router.push({ name: name, params: { id: id } });
            }
        }
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
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(TextField);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(BottomSheet);
</script>

<style scoped lang="less">
.wrapper{
    padding-bottom: .96rem;
    .box{
        background: #fff;
        border-top: 1px solid #f3f3f3;
        &.box1{
            padding-bottom: .06rem;
        }
        .source{
            height: .42rem;
            line-height: .42rem;
            padding: 0 .15rem;
            color: #000;
            font-size: .14rem;
            border-top: 1px solid #f3f3f3;
        }
        .unit-price{
            text-align: right;
            font-size: .14rem;
            padding: .1rem .15rem;
            .txt{
                color: #9c9c9c;
                padding-right: .1rem;
            }
            .price-box{
                .ori-price{
                    color: #9c9c9c;
                    font-size: .12rem;
                    text-decoration: line-through;
                }
                .price{
                    color: #ff7421;
                    margin: 0 .1rem;
                }
            }
        }
        .tip{
            background: #f6f6f6;
            color: #9c9c9c;
            font-size: .12rem;
            padding: .08rem .15rem;
        }
        .rule{
            font-size: .14rem;
            color: #000;
            padding: 0 .15rem;
            height: .42rem;
            position: relative;
            .arr-d{
                width: .09rem;
                height: .09rem;
                border-right: 2px solid #555;
                border-bottom: 2px solid #555;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
                -webkit-transform-origin: 50% 50%;
                transform-origin: 50% 50%;
                -webkit-transition: all .4s ease;
                transition: all .4s ease;
                &.up{
                    -webkit-transform: rotate(225deg);
                    transform: rotate(225deg);
                }
            }
        }
        ul{
            padding: 0 .15rem .1rem;
            display: none;
            li{
                font-size: .12rem;
                color: #000;
                margin-top: .1rem;
            }
        }
    }
    .goods-info{
        padding: .1rem .15rem;
        .pic{
            width: .75rem;
            height: .66rem;
            overflow: hidden;
            margin-right: .15rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .info{
            position: relative;
            .title{
                font-size: .14rem;
                color: #000;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                padding-right: .25rem;
                min-height: .22rem;
            }
            .price{
                font-size: .14rem;
                color: #ff7421;
                margin-top: .15rem;
                min-height: .22rem;
            }
            .del{
                position: absolute;
                width: .16rem;
                height: .16rem;
                right: 0;
                top: .05rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .num-box{
                position: absolute;
                bottom: 0;
                right: 0;
                .op{
                    width: .26rem;
                    height: .26rem;
                    position: relative;
                    &:first-child{
                        border: 1px solid #ccc;
                    }
                    img{
                        width: .3rem;
                        height: .3rem;
                        position: relative;
                    }
                }
                .inp{
                    width: .4rem;
                    height: .24rem;
                    margin: 0 .1rem;
                    padding: 0;
                    min-height: auto;
                    font-size: .16rem;
                }
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
        .warn{
            width: 100%;
            height: .26rem;
            line-height: .26rem;
            color: #ff7421;
            font-size: .12rem;
            background: #feefbc;
            text-align: center;
            position: absolute;
            top: -.26rem;
            left: 0;
        }
    }
}
.order-d{
    .title{
        font-size: .14rem;
        color: #000;
        text-align: center;
        padding: .1rem 0;
        border-bottom: 1px solid #f3f3f3;
    }
    .prod{
        margin: .15rem .1rem;
        background: #f6f6f6;
        padding: .06rem 0;
        .pic{
            width: .6rem;
            height: .6rem;
            border: 1px solid #f3f3f3;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            margin-right: .1rem;
        }
        .info{
            font-size: .14rem;
            color: #000;
            height: .6rem;
        }
    }
    .num{
        color: #ff7421;
    }
    .other{
        color: #000;
        font-size: .14rem;
        padding: .05rem 0 .1rem;
        text-align: center;
    }
    .close{
        position: absolute;
        right: 0;
        top: 0;
        width: .36rem;
        height: .36rem;
        -webkit-tap-highlight-color: rgba(0, 0, 0, .05);
        img{
            width: .1rem;
            height: .1rem;
            margin: .13rem;
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
.purchase .mu-input-content .mu-text-field-input{
    padding: .05rem 0;
    height: .24rem;
    text-align: center;
}
.purchase .mu-input-content .mu-input-line{
    background-color: transparent;
}
.order-d .mu-dialog-body{
    padding: 0;
    position: relative;
}
</style>
