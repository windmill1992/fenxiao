<template>
    <div id="pageContainer" class="exchange-zone">
        <div class="header">
            <p class="title">换发货区</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
            <router-link to="/exchangeRecord" class="record">换货记录</router-link>
        </div>
        <div class="wrapper fcol" ref="wrapper">
            <div class="warn flex spb">
                <div class="flex fcen">
                    <img src="../assets/img/question.png" alt="帮助">
                    <p>换得商品不可退换及补单!</p>
                </div>
                <a href="javascript:;" class="arr-r ff7">查看补单教程</a>
            </div>
            <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load" class="flex1">
                <div class="list">
                    <div class="item flex">
                        <div class="pic fshrink0"></div>
                        <div class="info flex1">
                            <p class="title">好吃饼干套组</p>
                            <p class="txt">好几盒饼干</p>
                            <div class="flex spb">
                                <div class="flex fbot">
                                    <p class="tag">换完即发</p>
                                </div>
                                <mu-ripple class="btns">
                                    <a href="javascrit:;" class="btn">去换货</a>
                                </mu-ripple>
                            </div>
                        </div>
                    </div>
                    <div class="item flex">
                        <div class="pic fshrink0"></div>
                        <div class="info flex1">
                            <p class="title">好吃饼干套组</p>
                            <p class="txt">好几盒饼干</p>
                            <div class="flex spb">
                                <div class="flex fbot">
                                    <p class="tag">换完即发</p>
                                </div>
                                <mu-ripple class="btns">
                                    <a href="javascrit:;" class="btn">去换货</a>
                                </mu-ripple>
                            </div>
                        </div>
                    </div>
                </div>
            </mu-load-more>
        </div>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading';
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
Vue.use(LoadMore);
Vue.use(Loading);
</script>

<style scoped lang="less">
.record{
    position: absolute;
    color: #ff7421;
    font-size: .14rem;
    line-height: .45rem;
    right: .15rem;
    top: 0;
}
.warn{
    margin: .05rem 0 .1rem;
    background: #feefbc;
    color: #ff7421;
    font-size: .12rem;
    padding: 0 .15rem;
    height: .3rem;
    line-height: .3rem;
    img{
        width: .16rem;
        height: .16rem;
        margin-right: .1rem;
    }
    .arr-r{
        color: #ff7421;
    }
}
.list{
    .item{
        background: #fff;
        margin-bottom: 1px;
        padding: .1rem .15rem;
        .pic{
            width: .88rem;
            height: .76rem;
            overflow: hidden;
            background-size: 100%;
            background-position: cover;
            background-repeat: no-repeat;
            margin-right: .15rem;
        }
        .info{
            .title{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                font-size: .14rem;
                color: #000;
                line-height: 1;
                margin-bottom: .06rem;
            }
            .txt{
                color: #9c9c9c;
                font-size: .12rem;
            }
            .tag{
                display: inline-block;
                height: .18rem;
                line-height: .16rem;
                padding: 0 .05rem;
                color: #ff7624;
                border: 1px solid #ff7624;
                border-radius: .05rem;
                font-size: .12rem;
            }
            .btns{
                position: relative;
                .btn{
                    display: block;
                    width: .69rem;
                    height: .3rem;
                    line-height: .3rem;
                    text-align: center;
                    color: #fff;
                    background: #ff7421;
                    border-radius: .05rem;
                }
            }
        }
    }
}
</style>
<style>
.exchange-zone .item .pic{
    background-image: url(../assets/img/error_zanwusj.png);
}
</style>
