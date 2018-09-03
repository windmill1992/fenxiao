<template>
    <div id="pageContainer">
        <div class="header flex spb fcen">
            <mu-ripple class="set">
                <img src="../assets/img/icon_set.png" alt="设置">
            </mu-ripple>
            <p class="txt">邀请客户</p>
            <mu-ripple class="set">
                <img src="../assets/img/icon_chat.png" alt="消息">
            </mu-ripple>
        </div>
        <mu-ripple class="user-wrapper flex fcen spb">
            <div class="user-info flex1">
                <p class="nick bold">xxxxxx</p>
                <router-link to="" class="link">查看 · 编辑个人资料</router-link>
            </div>
            <div class="avatar fshrink0">
                <img src="../assets/img/fxkh.png" alt="头像">
            </div>
        </mu-ripple>
        <div class="rank-wrapper">
            <mu-ripple class="rank-link"><router-link to="" class="link">排行榜</router-link></mu-ripple>
        </div>
        <div class="menu-wrapper flex">
            <mu-ripple class="menu-item fcol spb fcen">
                <p class="num">0</p>
                <p class="txt">库存指数</p>
            </mu-ripple>
            <mu-ripple class="menu-item fcol spb fcen">
                <p class="num">0</p>
                <p class="txt">已动销积分</p>
            </mu-ripple>
            <mu-ripple class="menu-item fcol spb fcen">
                <p class="num">0</p>
                <p class="txt">总动销指数</p>
            </mu-ripple>
            <mu-ripple class="menu-item2 fcol spb fcen" @click="moreMenu">
                <p class="icon"><img src="../assets/img/icon_more.png" alt="更多"></p>
                <p class="txt">更多</p>
            </mu-ripple>
        </div>
        <div class="bb10"></div>
        <div class="con-wrapper">
            <div class="head flex fcen">
                <div class="line cff7421"></div>
                <div class="title bold">结算中心</div>
                <div class="txt">余额 ￥0</div>
            </div>
            <div class="list flex">
                <mu-ripple class="item">
                    <router-link class="link" to="">
                        <img src="../assets/img/dxrwjs.png" alt="动销任务结算">
                        <p class="txt">动销任务结算</p>
                    </router-link>
                </mu-ripple>
                <mu-ripple class="item">
                    <router-link class="link" to="">
                        <img src="../assets/img/dxrw.png" alt="动销任务">
                        <p class="txt">动销任务</p>
                    </router-link>
                </mu-ripple>
                <mu-ripple class="item">
                    <router-link class="link" to="">
                        <img src="../assets/img/wallet.png" alt="钱包管理">
                        <p class="txt">钱包管理</p>
                    </router-link>
                </mu-ripple>
            </div>
        </div>
        <div class="bb10"></div>
        <div class="con-wrapper">
            <div class="head flex fcen">
                <div class="line cff4521"></div>
                <div class="title bold">订货管理</div>
                <div class="txt">我的库存 0</div>
            </div>
            <div class="list flex">
                <mu-ripple class="item">
                    <router-link class="link" to="">
                        <img src="../assets/img/dh.png" alt="订货">
                        <p class="txt">订货</p>
                    </router-link>
                </mu-ripple>
                <mu-ripple class="item">
                    <router-link class="link" to="">
                        <img src="../assets/img/wddh.png" alt="我的订货">
                        <p class="txt">我的订货</p>
                    </router-link>
                </mu-ripple>
                <mu-ripple class="item">
                    <router-link class="link" to="">
                        <img src="../assets/img/wdkc.png" alt="我的库存">
                        <p class="txt">我的库存</p>
                    </router-link>
                </mu-ripple>
            </div>
        </div>
        <div class="bb10"></div>
        <div class="con-wrapper">
            <div class="head flex fcen">
                <div class="line c80a9f0"></div>
                <div class="title bold">分销管理</div>
            </div>
            <div class="list flex">
                <mu-ripple class="item">
                    <router-link class="link" to="">
                        <img src="../assets/img/invite.png" alt="邀请客户">
                        <p class="txt">邀请客户</p>
                    </router-link>
                </mu-ripple>
                <mu-ripple class="item">
                    <router-link class="link" to="">
                        <img src="../assets/img/fxdd.png" alt="分销订单">
                        <p class="txt">分销订单</p>
                    </router-link>
                </mu-ripple>
                <mu-ripple class="item">
                    <router-link class="link" to="">
                        <img src="../assets/img/fxkh.png" alt="分销客户">
                        <p class="txt">分销客户</p>
                    </router-link>
                </mu-ripple>
            </div>
        </div>
        <div class="bb10"></div>
        <div class="con-wrapper">
            <div class="head flex fcen">
                <div class="line c67c9ba"></div>
                <div class="title bold">零售管理</div>
            </div>
            <div class="list flex">
                <mu-ripple class="item">
                    <router-link class="link" to="">
                        <img src="../assets/img/scls.png" alt="云商城零售">
                        <p class="txt">云商城零售</p>
                    </router-link>
                </mu-ripple>
                <mu-ripple class="item">
                    <router-link class="link" to="">
                        <img src="../assets/img/xxls.png" alt="线下零售">
                        <p class="txt">线下零售</p>
                    </router-link>
                </mu-ripple>
                <mu-ripple class="item">
                    <router-link class="link" to="">
                        <img src="../assets/img/huanfahq.png" alt="换发货区">
                        <p class="txt">换发货区</p>
                    </router-link>
                </mu-ripple>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-loading';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import Helpers from 'muse-ui/lib/Helpers';
import { Alert, Snackbar, Button, Icon } from 'muse-ui';

export default {
    data() {
        return {
            
        }
    },
    methods: {
        getData() {
            
        },
        moreMenu() {
            this.$router.push('/');
        }
    },
    mounted() {
        this.getData();
    }
}
Vue.use(Toast);
Vue.use(Helpers);
Vue.use(Loading);
Vue.use(Alert);
Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Icon);
</script>

<style scoped lang="less">
.header{
    padding: 0 .15rem;
    .set{
        position: relative;
        width: .24rem;
        height: .24rem;
        padding: .02rem;
        border-radius: 100%;
        cursor: pointer;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            vertical-align: top;
        }
    }
    .txt{
        font-family: 'PingFangSC-Medium';
        font-size: .2rem;
        color: #000;
    }
}
.user-wrapper{
    position: relative;
    padding: .05rem .15rem;
    padding-top: .5rem;
    .user-info{
        overflow: hidden;
        .nick{
            font-size: .24rem;
            color: #000;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            white-space: nowrap;
        }
        .link{
            font-size: .16rem;
            color: #555;
            margin-top: .06rem;
        }
    }
    .avatar{
        width: .7rem;
        height: .7rem;
        padding: .005rem;
        border-radius: 100%;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            border-radius: inherit;
        }
    }
}
.rank-wrapper{
    padding: .05rem .15rem;
    .rank-link{
        position: relative;
        width: .63rem;
        height: .26rem;
        line-height: .24rem;
        text-align: center;
        font-size: .16rem;
        border: 1px solid #ff7421;
        border-radius: .05rem;
        .link{
            color: #ff7421;
        }
    }
}
.menu-wrapper{
    border-top: 1px solid #f3f3f3;
    height: .75rem;
    margin-top: .1rem;
    .menu-item{
        width: 27.8%;
        padding: .13rem 0;
        text-align: center;
        position: relative;
        .num{
            font-family: 'PingFangSC-Semibold';
            font-weight: 600;
            font-size: .2rem;
            color: #000;
            line-height: 1;
        }
        .txt{
            font-size: .14rem;
            color: #555;
        }
    }
    .menu-item2{
        width: 16.6%;
        padding: .13rem 0;
        position: relative;
        &::before{
            content: '';
            display: block;
            width: 1px;
            height: .5rem;
            background: #f3f3f3;
            position: absolute;
            top: .1rem;
            left: 0;
        }
        .icon{
            width: .2rem;
            height: .2rem;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
.con-wrapper{
    overflow: hidden;
    .head{
        padding: .1rem .15rem;
        .line{
            width: 4px;
            height: .23rem;
            border-radius: 4px;
            &.cff7421{
                background: #ff7421;
            }
            &.cff4521{
                background: #ff4521;
            }
            &.c80a9f0{
                background: #80a9f0;
            }
            &.c67c9ba{
                background: #67c9ba;
            }
        }
        .title{
            font-size: .16rem;
            color: #000;
            margin-left: .12rem;
        }
        .txt{
            font-size: .14rem;
            color: #9c9c9c;
            margin-left: .12rem;
        }
    }
    .list{
        .item{
            padding: .1rem 0;
            width: 33.33%;
            text-align: center;
            position: relative;
            img{
                height: .26rem;
                width: auto;
            }
            .txt{
                color: #000;
                font-size: .14rem;
            }
        }
    }
}
</style>
