<template>
    <div id="pageContainer" class="order-sure">
        <div class="header">
            <p class="title">确认订单</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <mu-ripple class="addr flex fcen" @click="toAddrManage" v-if="hasAddr">
                    <img src="../assets/img/map.png" class="fshrink0" alt="地址">
                    <div class="info flex1">
                        <div class="flex spb">
                            <p>收货人:张三</p>
                            <p>15903318201</p>
                        </div>
                        <div class="detail">收货地址：浙江省杭州市西湖区96号互联网金融大厦10F</div>
                    </div>
                    <div class="arr-r"></div>
                </mu-ripple>
                <mu-ripple class="addr flex fcen spb" v-else>
                    <p>添加收货地址</p>
                    <div class="arr-r"></div>
                </mu-ripple>
                <div class="source">货源:杭州微众电子商务有限公司</div>
            </div>
            <div class="goods-info flex fcen">
                <div class="pic fshrink0">
                    <img src="../assets/img/error_zanwusj.png" alt="商品">
                </div>
                <div class="info flex1">
                    <p class="title">【特惠专享季】家庭计划-饼干</p>
                    <p class="price">套组价:￥930</p>
                    <p class="ori-price">￥1380</p>
                </div>
            </div>
            <div class="box">
                <div class="item flex spb fcen">
                    <p class="txt">订货数量</p>
                    <p class="txt">x16</p>
                </div>
                <div class="bb"></div>
                <div class="item flex spb fcen">
                    <p class="txt">发货数量</p>
                    <p class="txt">x9</p>
                </div>
            </div>
            <div class="bb10"></div>
            <div class="box">
                <div class="item flex spb fcen">
                    <p class="txt">选择配送方式</p>
                    <div class="txt flex fcen" @click="openBottomSheet">
                        <p>{{way}}</p>
                        <p class="arr-r"></p>
                    </div>
                </div>
                <div class="bb"></div>
                <div class="item flex spb fcen">
                    <mu-text-field v-model="leaveword" placeholder="选填:本次交易特别说明" class="inp" full-width underline-color="blue" prefix="购买留言"></mu-text-field>
                </div>
            </div>

            <div class="bot flex">
                <div class="left">
                    <p class="sum bold">合计:￥13800.00</p>
                    <p class="total">特惠总价:￥22080.00</p>
                </div>
                <mu-ripple class="right">
                    <a href="javascript:;" class="btn">立即订货</a>
                </mu-ripple>
            </div>
        </div>
        <mu-bottom-sheet :open.sync="open">
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
        </mu-bottom-sheet>
    </div>
</template>

<script>
import Vue from 'vue';
import Helpers from 'muse-ui/lib/Helpers';
import { BottomSheet, List, TextField } from 'muse-ui';
export default {
    data() {
        return {
            open: false,
            leaveword: '',
            hasAddr: false,
            way: '快递A:￥20.5',
        }
    },
    methods: {
        toAddrManage() {
            this.$router.push('/addrManage');
        },
        openBottomSheet() {
            this.open = true;
        },
        closeBottomSheet(e) {
            this.open = false;
            this.way = e.$el.dataset.way;
        }
    }
}
Vue.use(Helpers);
Vue.use(BottomSheet);
Vue.use(List);
Vue.use(TextField);
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
