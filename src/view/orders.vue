<template>
    <div id="pageContainer" class="orders">
        <div class="header">
            <p class="title">分销客户的订货订单</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol" ref="wrapper">
            <mu-tabs :value.sync="active" color="white" indicator-color="#ff7421" full-width @change="switchTab">
                <mu-tab>全部</mu-tab>
                <mu-tab class="tab">已完成</mu-tab>
                <mu-tab class="tab">待补单</mu-tab>
                <mu-tab class="tab">已取消</mu-tab>
            </mu-tabs>
            
            <mu-load-more class="box flex1 fcol" :loading="loading" @load="load" :refreshing="refreshing" @refresh="refresh">
                <div class="list" v-if="hasmore != 0">
                    <div class="item" v-for="item in list" :key="item.id">
                        <div class="top flex spb">
                            <p>订货人: {{item.orderName}}</p>
                            <p>{{stateTxt[item.state]}}</p>
                        </div>
                        <div class="goods-list">
                            <div class="item1 flex fcen">
                                <div class="pic fshrink0">
                                    <img v-if="item.coverImageUrl" :src="item.coverImageUrl" alt="商品">
                                    <img v-else :src="imgHost + '/def_pro1.png'" alt="商品">
                                </div>
                                <div class="info flex1 fcol spb">
                                    <p class="title">{{item.productName}}</p>
                                    <div class="flex spb fcen">
                                        <p class="bold">￥{{item.price}}</p>
                                        <div class="txt-tip">
                                            <p v-if="item.stockState == 1">(您的库存不足需补货)</p>
                                            <p v-if="item.priceState == 1">(订货价与您利润不符)</p>
                                        </div>
                                        <p>×{{item.orderNum}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="total flex spb fcen">
                            <!-- <p>收入：{{(item.price) * item.orderNum}}</p> -->
                            <p>共 {{item.orderNum}} 件商品,总价: ￥{{item.amountMoney}}</p>
                        </div>
                        <div class="bot flex fend">
                            <template v-if="item.state == 101">
                                <router-link to="/orderArea" class="btn-a">
                                    <mu-ripple class="btn">去补货</mu-ripple>
                                </router-link>
                                <a href="javascript:;" class="btn-a">
                                    <mu-ripple class="btn" @click="sureOrder(item.id)">确认出货</mu-ripple>
                                </a>
                                <a href="javascript:;" class="btn-a">
                                    <mu-ripple class="btn" @click="refuseOrder(item.id)">拒绝出货</mu-ripple>
                                </a>
                            </template>
                            <router-link :to="'/orderDetail2/'+ item.id" class="btn-a" >
                                <mu-ripple class="btn">查看详情</mu-ripple>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div class="no-data flex1 fcol fcen spc" v-else>
                    <img :src="imgHost + '/error_zanwusj.png'" alt="暂无数据">
                    <p class="txt">暂无订单数据~</p>
                </div>
                <div class="no-more" v-if="hasmore == 1">没有更多数据了</div>
            </mu-load-more>
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
import { Tabs, LoadMore, Button, Snackbar, Icon, Dialog } from 'muse-ui';
import { imgHost } from '../api/baseUrl';
import { order2List } from '../api/user';
import { cancelOrder2 } from '../api/product';
export default {
    data() {
        return {
            active: 0,
            list: [],
            loading: false,
            imgHost: imgHost,
            state: ['', '102', '101', '103'],
            stateTxt: {
                '102': '已完成',
                '101': '待补单',
                '103': '已取消',
            },
            hasmore : -1,
            page: 1,
            pageSize: 10,
            refreshing: false,
        }
    },
    methods: {
        getData() {
            this.loading2 = Loading({ target: document.getElementById('pageContainer') });
            order2List({ pageNum: this.page, pageSize: this.pageSize, state: this.state[this.active] }).then(res => {
                this.loading2.close();
                this.loading = false;
                this.refreshing = false;
                if(res.code == 1){
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
                }else if(res.code == 2){
                    this.hasmore = 1;
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
                this.loading2.close();
                this.loading = false;
                this.refreshing = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        sureOrder(id) {
            Message.confirm('确认出货吗？', '提示', {}).then(({ result }) => {
                if(result){
                    cancelOrder2({ orderId: id, orderType: 1 }).then(res => {
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
        refuseOrder(id) {
            Message.confirm('确定拒绝出货吗？', '提示', {
                type: 'error',
            }).then(({ result }) => {
                if(result){
                    cancelOrder2({ orderId: id, orderType: 0 }).then(res => {
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
        load() {
            if(this.hasmore != 2 || (this.loading2 && this.loading2.instance != null)) return;
            this.loading = true;
            this.page++;
            this.getData();
        },
        refresh() {
            this.refreshing = true;
            this.page = 1;
            this.getData();
        },
        switchTab() {
            this.page = 1;
            this.getData();
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
        let winh = $(window).height();
        let h = this.isWx ? 0 : $('.header').height() + $('.mu-tabs').height();
        $('.orders .box').eq(0).height(winh - h - 1);

        this.getData();
    }
}
Vue.use(Loading);
Vue.use(Toast);
Vue.use(Message);
Vue.use(Dialog);
Vue.use(Tabs);
Vue.use(LoadMore);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
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
                    /*! autoprefixer: off */
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    /*! autoprefixer: on */
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
                width: .87rem;
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
    }
    .txt-tip{
        font-size: .12rem;
        color: #ff4521;
    }
}
</style>
<style>
.orders .mu-tabs, .orders .mu-tab-active{
    color: #000;
}
.orders .mu-tab-link-highlight{
    width: .5rem!important;
    height: 3px;
    left: 12.5%;
    margin-left: -.25rem;
}
</style>
