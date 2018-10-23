<template>
    <div id="pageContainer" class="order-area">
        <div class="header">
            <p class="title">订货区</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol" ref="wrapper">
            <mu-tabs :value.sync="active" color="white" indicator-color="#ff7421" full-width>
                <mu-tab><span :class="{bold: active == 0}">促销套组</span></mu-tab>
                <mu-tab class="tab"><span :class="{bold: active == 1}">普通订货</span></mu-tab>
            </mu-tabs>
            
            <mu-load-more class="box flex1 fcol" :loading="loading" @load="load">
                <div class="box flex1 fcol" v-show="active == 0">
                    <div class="list" v-if="hasmore1 > 0">
                        <div class="item flex fcen" v-for="item in list1" :key="'box'+ item.id">
                            <div class="pic fshrink0">
                                <img v-if="item.bFiles" :src="item.bFiles[0].middleUrl" alt="商品">
                                <img v-else :src="imgHost + '/def_pro1.png'" alt="商品">
                            </div>
                            <div class="info flex1">
                                <p class="title title1 bold">{{item.productName}}</p>
                                <p class="txt">直升中级经销商,厉害！</p>
                                <p class="tag">套组价</p>
                                <div class="flex spb">
                                    <p class="price fcol fend bold">￥{{item.price}}</p>
                                    <router-link :to="'/orderSure?ids='+ item.id" class="btn" v-if="hasHighLevel">去订货</router-link>
                                    <a href="javascript:;" class="btn" v-else @click="noorder">去订货</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="no-data flex1 fcol fcen spc" v-else>
                        <img :src="imgHost + '/error_zanwusj.png'" alt="暂无数据">
                        <p class="txt">暂无商品数据</p>
                    </div>
                    <p class="no-more" v-if="hasmore1 == 1">没有更多商品了</p>
                </div>

                <div class="box box1" v-show="active == 1">
                    <div class="list" v-if="hasmore2 > 0">
                        <div class="item flex fcen" v-for="item in list2" :key="'box1'+ item.id">
                            <div class="pic fshrink0">
                                <img v-if="item.bFiles" :src="item.bFiles[0].middleUrl" alt="商品">
                                <img v-else :src="imgHost + '/def_pro1.png'" alt="商品">
                            </div>
                            <div class="info info1 flex1">
                                <p class="title bold">{{item.productName}}</p>
                                <p class="tag">特惠价</p>
                                <div class="flex spb">
                                    <p class="price fcol fend bold">￥{{item.salesPrice}}</p>
                                    <mu-radio v-model="selects" :value="item.id" uncheck-icon="1" checked-icon="2" class="chk" color="#ff4521"></mu-radio>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="no-data flex1 fcol fcen spc" v-else>
                        <img :src="imgHost + '/error_zanwusj.png'" alt="暂无数据">
                        <p class="txt">暂无商品数据</p>
                    </div>
                    <p class="no-more" v-if="hasmore2 == 1">没有更多商品了</p>
                </div>
             </mu-load-more>
            <template v-if="active == 1">
                <mu-ripple class="btns" v-if="hasHighLevel" @click="linktoOrder">
                    <a href="javascript:;" class="btn bold">进货单</a>
                </mu-ripple>
                <mu-ripple class="btns" v-else @click="noorder">
                    <a href="javascript:;" class="btn bold">进货单</a>
                </mu-ripple>
            </template>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { Tabs, Radio, LoadMore, Snackbar, Button, Icon } from 'muse-ui';
import { prodList, salesProdList } from '../api/product';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            active: 0,
            selects: 0,
            list1: [],
            list2: [],
            loading: false,
            total: 0,
            page1: 1,
            pageSize1: 15,
            page2: 1,
            pageSize2: 15,
            imgHost: imgHost,
            hasmore1: -1,
            hasmore2: -1,
            hasHighLevel: false,
        }
    },
    methods: {
        getData1() {
            this.loading2 = Loading({ target: document.getElementById('pageContainer') });
            this.loading = true;
            salesProdList({ pageNum: this.page1, pageSize: this.pageSize1 }).then(res => {
                this.hasHighLevel = res.data2 == 1;
                this.loading2.close();
                this.loading = false;
                if(!this.hasHighLevel){
                    this.$router.replace('/');
                    return;
                }
                if(res.code == 1){
                    if(this.page1 == 1){
                        this.list1 = [];
                    }
                    let r = res.data;
                    this.list1 = [...this.list1, ...r.resultData];
                    if(r.total == 0){
                        this.hasmore1 = 0;
                    }else if(r.total <= this.page1 * this.pageSize1){
                        this.hasmore1 = 1;
                    }else{
                        this.hasmore1 = 2;
                    }
                }else if(res.code == 4){
                    this.list1 = [];
                    this.hasmore1 = 0;
                }else if(res.code == 2){
                    this.hasmore1 = 1;
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
        getData2() {
            prodList({ pageNum: this.page2, pageSize: this.pageSize2 }).then(res => {
                this.hasHighLevel = res.data2 == 1;
                if(this.active == 1){
                    this.loading2.close();
                }
                this.loading = false;
                this.refreshing = false;
                if(!this.hasHighLevel){
                    this.$router.replace('/');
                    return;
                }
                if(res.code == 1){
                    if(this.page2 == 1){
                        this.list2 = [];
                    }
                    let r = res.data;
                    this.list2 = [...this.list2, ...r.resultData];
                    if(r.total == 0){
                        this.hasmore2 = 0;
                    }else if(r.total <= this.page2 * this.pageSize2){
                        this.hasmore2 = 1;
                    }else{
                        this.hasmore2 = 2;
                    }
                }else if(res.code == 4){
                    this.list2 = [];
                    this.hasmore2 = 0;
                }else if(res.code == 2){
                    this.hasmore2 = 1;
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
                if(this.active == 1){
                    this.loading2.close();
                }
                this.loading = false;
                this.refreshing = false;
                Toast.error('未知异常！');
                console.log(err);
            });
        },
        load() {
            if(this.loading) return;
            if(this.active == 0){
                if(this.hasmore1 != 2) return;
                this.loading = true;
                this.getData1();
            }else{
                if(this.hasmore2 != 2) return;
                this.loading2 = Loading({ target: document.getElementById('pageContainer') });
                this.loading = true;
                this.getData2();
            }
        },
        linktoOrder() {
            if(this.selects == 0) {
                Toast.warning('请选择商品！');
                return;
            }
            this.$router.push('/purchaseOrder?ids='+ this.selects);
        },
        noorder() {
            alert('您还未成为经销商,请联系客服！');
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
        let winh = $(window).height();
        let h = this.isWx ? 0 : $('.header').height() + $('.mu-tabs').height() + $('.btns').height();
        $('.order-area .box').eq(0).height(winh - h - 5);

        this.getData1();
        this.getData2();
    }
}
Vue.use(Loading);
Vue.use(Tabs);
Vue.use(Radio);
Vue.use(LoadMore);
Vue.use(Toast);
Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Icon);
</script>

<style scoped lang="less">
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
.box{
    background: #fff;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &.box1{
        padding-bottom: .5rem;
    }
    .item{
        padding: .15rem;
        border-top: 1px solid #f3f3f3;
        .pic{
            width: 1.3rem;
            height: 1.15rem;
            overflow: hidden;
            margin-right: .15rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .info{
            overflow: hidden;
            &.info1{
                height: 1.15rem;
            }
            .title{
                font-size: .16rem;
                color: #000;
                display: -webkit-box;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
                -webkit-line-clamp: 2;
                line-height: 1.5;
                height: .42rem;
                overflow: hidden;
                &.title1{
                    -webkit-line-clamp: 1;
                    height: .24rem;
                }
            }
            .txt{
                font-size: .12rem;
                color: #555;
                margin-top: 5px;
            }
            .tag{
                display: inline-block;
                padding: 0 .03rem;
                border: 1px solid #ff7421;
                color: #ff7421;
                border-radius: .05rem;
                font-size: .14rem;
                margin-top: .1rem;
            }
            div{
                margin-top: .05rem;
                .price{
                    color: #ff7421;
                    font-size: .16rem;
                }
                .btn{
                    width: .54rem;
                    height: .25rem;
                    line-height: .25rem;
                    text-align: center;
                    color: #fff;
                    font-size: .12rem;
                    background: #ff4521;
                    border-radius: .05rem;
                }
            }
        }
    }
}
.btns{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .48rem;
    line-height: .48rem;
    text-align: center;
    font-size: .18rem;
    .btn{
        display: block;
        color: #fff;
        background: #ff7421;
    }
}
</style>
<style>
.order-area .mu-tabs, .order-area .mu-tab-active{
    color: #000;
}
.order-area .mu-tab-link-highlight{
    width: .9rem!important;
    left: 24.5%;
    margin-left: -.45rem;
}
.order-area .mu-radio-icon-uncheck{
    background: url(../assets/img/unchoose.png) no-repeat 0 0 / 100% 100%;
}
.order-area .mu-radio-icon-checked{
    background: url(../assets/img/choose.png) no-repeat 0 0 / 100% 100%;
}
</style>
