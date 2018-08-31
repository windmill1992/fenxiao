<template>
    <div id="pageContainer" class="my-stock">
        <div class="header">
            <p class="title">我的库存</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol" ref="wrapper">
            <mu-load-more class="box flex1" @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
                <div class="list">
                    <div class="item">
                        <div class="top flex fcen">
                            <div class="pic fshrink0">
                                <img src="../assets/img/error_zanwusj.png" alt="商品">
                            </div>
                            <div class="info flex1 fcol spb">
                                <p class="title bold">【特惠专享季】家庭计划-饼干</p>
                                <div class="price-box">
                                    <p class="price">进货均价:￥285</p>
                                    <p class="txt">(下阶订货价≥￥285.00才供货)</p>
                                </div>
                            </div>
                        </div>
                        <div class="bot flex fcen spb">
                            <div class="left">
                                <p class="txt">剩余库存x125</p>
                                <p class="txt1">冻结库存x0</p>
                                <a href="" class="icon"><img src="../assets/img/icon_in.png" alt=""></a>
                            </div>
                            <mu-ripple class="right">
                                <a href="javascript:;" class="btn">设置利润</a>
                            </mu-ripple>
                        </div>
                    </div>
                    <div class="item">
                        <div class="top flex fcen">
                            <div class="pic fshrink0">
                                <img src="../assets/img/error_zanwusj.png" alt="商品">
                            </div>
                            <div class="info flex1 fcol spb">
                                <p class="title bold">【特惠专享季】家庭计划-饼干</p>
                                <div class="price-box">
                                    <p class="price">进货均价:￥285</p>
                                    <p class="txt">(下阶订货价≥￥285.00才供货)</p>
                                </div>
                            </div>
                        </div>
                        <div class="bot flex fcen spb">
                            <div class="left">
                                <p class="txt">剩余库存x125</p>
                                <p class="txt1">冻结库存x0</p>
                                <a href="" class="icon"><img src="../assets/img/icon_in.png" alt=""></a>
                            </div>
                            <mu-ripple class="right">
                                <a href="javascript:;" class="btn">设置利润</a>
                            </mu-ripple>
                        </div>
                    </div>
                </div>
            </mu-load-more>
            
            <div class="btn-wrapper flex">
                <mu-ripple class="btns flex1">
                    <a href="javascript:;" class="btn flex fcen spc">
                        <img src="../assets/img/huanhuo.png" alt="换货区">
                        <p>换货区</p>
                    </a>
                </mu-ripple>
                <mu-ripple class="btns flex1">
                    <a href="javascript:;" class="btn btn1">订货</a>
                </mu-ripple>
                <mu-ripple class="btns flex1">
                    <a href="javascript:;" class="btn btn2">发货</a>
                </mu-ripple>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Helpers from 'muse-ui/lib/Helpers';
import Loading from 'muse-ui-loading';
import { LoadMore } from 'muse-ui';
export default {
    data() {
        return {
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
        this.loading2 = Loading();
        this.getData();
    }
}
Vue.use(Helpers);
Vue.use(Loading);
Vue.use(LoadMore);
</script>

<style scoped lang="less">
.box{
    padding-bottom: .5rem;
    border-top: 1px solid #f6f6f6;
    .list{
        .item{
            background: #fff;
            padding: .1rem 0;
            margin-bottom: .1rem;
            .top{
                padding: 0 .15rem .1rem;
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
                    max-width: 2rem;
                    height: 1.15rem;
                    .title{
                        font-size: .14rem;
                        color: #000;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        line-height: 1.5;
                        overflow: hidden;
                    }
                    .price-box{
                        .price{
                            color: #ff7421;
                            font-size: .14rem;
                        }
                        .txt{
                            font-size: .12rem;
                            color: #9c9c9c;
                        }
                    }
                }
            }
            .bot{
                padding: .1rem .15rem 0;
                border-top: 1px solid #f3f3f3;
                .left{
                    font-size: .12rem;
                    position: relative;
                    .txt{
                        color: #ff7421;
                    }
                    .txt1{
                        color: #9c9c9c;
                        margin-top: .05rem;
                    }
                    .icon{
                        position: absolute;
                        width: .14rem;
                        height: .14rem;
                        top: 50%;
                        right: -.2rem;
                        -webkit-transform: translate3d(0, -50%, 0);
                        transform: translate3d(0, -50%, 0);
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .right{
                    position: relative;
                    .btn{
                        display: block;
                        width: .9rem;
                        height: .4rem;
                        line-height: .4rem;
                        text-align: center;
                        color: #fff;
                        font-size: .14rem;
                        background: #ff7421;
                        border-radius: .05rem;
                    }
                }
            }
        }
    }
}
.btn-wrapper{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    .btns{
        position: relative;
        .btn{
            background: #fff;
            font-size: .14rem;
            color: #fff;
            line-height: .5rem;
            &.btn1{
                display: block;
                background: #ff7421;
                font-size: .16rem;
            }
            &.btn2{
                display: block;
                background: #ff4521;
                font-size: .16rem;
            }
            img{
                height: .27rem;
                margin-right: .1rem;
            }
            p{
                color: #9c9c9c;
            }
        }
    }
}
</style>
