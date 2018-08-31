<template>
    <div id="pageContainer" class="orders">
        <div class="header">
            <p class="title">分销客户的订货订单</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper" ref="wrapper">
            <mu-tabs :value.sync="active" color="white" indicator-color="#ff7421" full-width>
                <mu-tab>全部</mu-tab>
                <mu-tab class="tab">代付款</mu-tab>
                <mu-tab class="tab">代补单</mu-tab>
                <mu-tab class="tab">已付款</mu-tab>
            </mu-tabs>
            
            <mu-load-more class="box flex1" @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
                <div class="box" v-show="active == 0">
                    <div class="list">
                        <div class="item">
                            <div class="top flex spb">
                                <p>订货人:杨荣琴</p>
                                <p>订货完成</p>
                            </div>
                            <div class="goods-list">
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="total">共 16 件商品,总价: ￥14880.00</div>
                            <div class="bot flex fend">
                                <a href="javascript:;" class="btn-a">
                                    <mu-ripple class="btn">查看详情</mu-ripple>
                                </a>
                            </div>
                        </div>
                        <div class="item">
                            <div class="top flex spb">
                                <p>订货人:杨荣琴</p>
                                <p>订货完成</p>
                            </div>
                            <div class="goods-list">
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="total">共 16 件商品,总价: ￥14880.00</div>
                            <div class="bot flex fend">
                                <a href="javascript:;" class="btn-a">
                                    <mu-ripple class="btn">查看详情</mu-ripple>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box" v-show="active == 1">
                    <div class="list">
                        <div class="item">
                            <div class="top flex spb">
                                <p>订货人:杨荣琴</p>
                                <p>代付款</p>
                            </div>
                            <div class="goods-list">
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="total">共 16 件商品,总价: ￥14880.00</div>
                            <div class="bot flex fend">
                                <a href="javascript:;" class="btn-a">
                                    <mu-ripple class="btn">查看详情</mu-ripple>
                                </a>
                            </div>
                        </div>
                        <div class="item">
                            <div class="top flex spb">
                                <p>订货人:杨荣琴</p>
                                <p>代付款</p>
                            </div>
                            <div class="goods-list">
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="total">共 16 件商品,总价: ￥14880.00</div>
                            <div class="bot flex fend">
                                <a href="javascript:;" class="btn-a">
                                    <mu-ripple class="btn">查看详情</mu-ripple>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box" v-show="active == 2">
                    <div class="list">
                        <div class="item">
                            <div class="top flex spb">
                                <p>订货人:杨荣琴</p>
                                <p>代补单</p>
                            </div>
                            <div class="goods-list">
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="total">共 16 件商品,总价: ￥14880.00</div>
                            <div class="bot flex fend">
                                <a href="javascript:;" class="btn-a">
                                    <mu-ripple class="btn">查看详情</mu-ripple>
                                </a>
                            </div>
                        </div>
                        <div class="item">
                            <div class="top flex spb">
                                <p>订货人:杨荣琴</p>
                                <p>代补单</p>
                            </div>
                            <div class="goods-list">
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="total">共 16 件商品,总价: ￥14880.00</div>
                            <div class="bot flex fend">
                                <a href="javascript:;" class="btn-a">
                                    <mu-ripple class="btn">查看详情</mu-ripple>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box" v-show="active == 3">
                    <div class="list">
                        <div class="item">
                            <div class="top flex spb">
                                <p>订货人:杨荣琴</p>
                                <p>已付款</p>
                            </div>
                            <div class="goods-list">
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="total">共 16 件商品,总价: ￥14880.00</div>
                            <div class="bot flex fend">
                                <a href="javascript:;" class="btn-a">
                                    <mu-ripple class="btn">查看详情</mu-ripple>
                                </a>
                            </div>
                        </div>
                        <div class="item">
                            <div class="top flex spb">
                                <p>订货人:杨荣琴</p>
                                <p>已付款</p>
                            </div>
                            <div class="goods-list">
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="item1 flex fcen">
                                    <div class="pic fshrink0">
                                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                                    </div>
                                    <div class="info flex1 fcol spb">
                                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                                        <div class="flex spb">
                                            <p class="bold">￥930.00</p>
                                            <p>x16</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="total">共 16 件商品,总价: ￥14880.00</div>
                            <div class="bot flex fend">
                                <a href="javascript:;" class="btn-a">
                                    <mu-ripple class="btn">查看详情</mu-ripple>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </mu-load-more>
        </div>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Helpers from 'muse-ui/lib/Helpers';
import Loading from 'muse-ui-loading';
import { Tabs, LoadMore } from 'muse-ui';
export default {
    data() {
        return {
            active: 0,
            list: [],
            loading: false,
            refreshing: false,
        }
    },
    methods: {
        getData() {
            setTimeout(() => {
                this.loading2.close();
            }, 2000);
        },
        refresh() {
            this.refreshing = true;
            this.$refs.wrapper.scrollTop = 0;
            this.getData();
            setTimeout(() => {
                this.refreshing = false;
            }, 2000)
        },
        load() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000)
        }
    },
    mounted() {
        let winh = $(window).height();
        let h = $('.header').height() + $('.mu-tabs').height();
        $('.box').height(winh - h - 1);

        this.loading2 = Loading();
        this.getData();
    }
}
Vue.use(Helpers);
Vue.use(Loading);
Vue.use(Tabs);
Vue.use(LoadMore);
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
                    width: .87rem;
                    height: .26rem;
                    line-height: .24rem;
                    border: 1px solid #555;
                    border-radius: .05rem;
                    text-align: center;
                    overflow: hidden;
                    .btn{
                        position: relative;
                    }
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
