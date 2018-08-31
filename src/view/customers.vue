<template>
    <div id="pageContainer" class="customers">
        <div class="header">
            <p class="title">分销客户</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <div class="menus flex">
                <a href="" class="menu flex1">
                    <mu-ripple class="rip">
                        <img src="../assets/img/ydjf.png" alt="月度积分">
                        <p class="txt">月度积分</p>
                    </mu-ripple>
                </a>
                <a href="" class="menu flex1">
                    <mu-ripple class="rip">
                        <img src="../assets/img/ndjf.png" alt="年度积分">
                        <p class="txt">年度积分</p>
                    </mu-ripple>
                </a>
                <a href="" class="menu flex1">
                    <mu-ripple class="rip">
                        <img src="../assets/img/yddx.png" alt="月度动销">
                        <p class="txt">月度动销</p>
                    </mu-ripple>
                </a>
                <a href="" class="menu flex1">
                    <mu-ripple class="rip">
                        <img src="../assets/img/yydx.png" alt="月月动销">
                        <p class="txt">月月动销</p>
                    </mu-ripple>
                </a>
            </div>
            <div class="bb10"></div>
            <mu-tabs :value.sync="active" color="white" indicator-color="#ff7421" full-width>
                <mu-tab>全部</mu-tab>
                <mu-tab class="tab">即将取消资格</mu-tab>
            </mu-tabs>

            <div class="op flex spb">
                <p>一阶分销客户:1人</p>
                <a href="javascript:;" class="flex fcen" @click="filterData">
                    <img src="../assets/img/shaixuan.png" alt="筛选">
                    <p class="txt">筛选</p>
                </a>
            </div>
            
            <div class="box flex1" v-show="active == 0" v-loading="loading">
                <div class="list">
                    <mu-ripple class="item flex fcen">
                        <div class="avatar fshrink0">
                            <img src="../assets/img/fxkh.png" alt="头像">
                        </div>
                        <div class="info flex1">
                            <p class="nick">
                                <span class="sp bold">MmmmmmmMmmmmmmMmmmmmmMmmmmmmMmmmmmm<span class="tag">会员</span></span>
                            </p>
                            <p class="txt">姓名:张三</p>
                            <p class="txt">手机号:13222222222</p>
                        </div>
                    </mu-ripple>
                </div>
            </div>
            <div class="box flex1" v-show="active == 1" v-loading="loading">
                <div class="list">
                    <mu-ripple class="item flex fcen">
                        <div class="avatar fshrink0">
                            <img src="../assets/img/fxkh.png" alt="头像">
                        </div>
                        <div class="info flex1">
                            <p class="nick">
                                <span class="sp bold">Mmmmmmm<span class="tag">会员</span></span>
                            </p>
                            <p class="txt">姓名:张三</p>
                            <p class="txt">手机号:13222222222</p>
                        </div>
                    </mu-ripple>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Helpers from 'muse-ui/lib/Helpers';
import Loading from 'muse-ui-loading';
import { Tabs } from 'muse-ui';
export default {
    data() {
        return {
            active: 0,
            loading: false,
        }
    },
    methods: {
        getData() {
            this.loading = true;

            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        filterData() {
            this.getData();
        }
    },
    mounted() {
        this.getData();
    }
}
Vue.use(Helpers);
Vue.use(Loading);
Vue.use(Tabs);
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
.menus{
    background: #fff;
    border-top: 2px solid #f6f6f6;
    .menu{
        .rip{
            position: relative;
            padding: .15rem 0;
            text-align: center;
            img{
                height: .28rem;
                width: auto;
            }
            .txt{
                color: #000;
                font-size: .14rem;
            }
        }
    }
}
.op{
    background: #fff;
    border-top: 1px solid #f3f3f3;
    padding: 0 .15rem;
    height: .42rem;
    line-height: .42rem;
    font-size: .14rem;
    color: #000;
    img{
        height: .16rem;
        vertical-align: top;
        margin-right: .05rem;
    }
    .txt{
        color: #9c9c9c;
    }
}
.box{
    position: relative;
    .list{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }
    .item{
        background: #fff;
        border-top: 1px solid #f3f3f3;
        padding: .1rem .15rem;
        position: relative;
        .avatar{
            width: .44rem;
            height: .44rem;
            background: #d8d8d8;
            border-radius: 100%;
            overflow: hidden;
            margin-right: .1rem;
            img{
                width: 100%;
                height: 100%;
                border-radius: inherit;
            }
        }
        .info{
            .nick{
                position: relative;
                font-size: .16rem;
                color: #000;
                display: inline-block;
                .sp{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    height: .22rem;
                    line-height: .22rem;
                    padding-right: .45rem;
                    position: relative;
                    word-break: break-all;
                }
                .tag{
                    position: absolute;
                    right: 0;
                    top: 50%;
                    -webkit-transform: translate3d(0, -50%, 0);
                    transform: translate3d(0, -50%, 0);
                    color: #ff7421;
                    border: 1px solid #ff7421;
                    border-radius: .04rem;
                    padding: 0 .05rem;
                    line-height: .16rem;
                    font-size: .12rem;
                    font-weight: 400;
                }
            }
            .txt{
                color: #555;
                font-size: .14rem;
                margin-top: .05rem;
            }
        }
    }
}
</style>
<style>
.customers .mu-tabs{
    color: #555;
}
.customers .mu-tab-active{
    color: #000;
}
.customers .mu-tab-link-highlight{
    width: 1.22rem!important;
    left: 24.5%;
    margin-left: -.61rem;
}
</style>