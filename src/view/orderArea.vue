<template>
    <div id="pageContainer" class="order-area">
        <div class="header">
            <p class="title">订货区</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol" ref="wrapper">
            <mu-tabs :value.sync="active" color="white" indicator-color="#ff7421" full-width>
                <mu-tab><span class="bold">促销套组</span></mu-tab>
                <mu-tab class="tab"><span class="bold">普通订货</span></mu-tab>
            </mu-tabs>
            
            <mu-load-more class="box flex1 fcol" @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
                <div class="box flex1 fcol" v-show="active == 0">
                    <div class="list">
                        <div class="item flex fcen">
                            <div class="pic fshrink0">
                                <img src="../assets/img/error_zanwusj.png" alt="商品">
                            </div>
                            <div class="info flex1">
                                <p class="title bold">【特惠专享季】家庭计划-饼干</p>
                                <p class="txt">饼干服务套组(16盒),直升中级经销商,厉害！</p>
                                <p class="tag">套组价</p>
                                <div class="flex spb">
                                    <p class="price fcol fend">￥14800</p>
                                    <a href="javascript:;" class="btn">去订货</a>
                                </div>
                            </div>
                        </div>
                        <div class="item flex fcen">
                            <div class="pic fshrink0">
                                <img src="../assets/img/error_zanwusj.png" alt="商品">
                            </div>
                            <div class="info flex1">
                                <p class="title bold">【特惠专享季】家庭计划-饼干</p>
                                <p class="txt">饼干服务套组(16盒),直升中级经销商,厉害！</p>
                                <p class="tag">套组价</p>
                                <div class="flex spb">
                                    <p class="price fcol fend">￥14800</p>
                                    <a href="javascript:;" class="btn">去订货</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box box1" v-show="active == 1">
                    <div class="list">
                        <div class="item flex fcen">
                            <div class="pic fshrink0">
                                <img src="../assets/img/error_zanwusj.png" alt="商品">
                            </div>
                            <div class="info flex1">
                                <p class="title bold">【特惠专享季】家庭计划-饼干</p>
                                <p class="tag">套组价</p>
                                <div class="flex spb">
                                    <p class="price fcol fend">￥14800</p>
                                    <mu-checkbox v-model="selects[0]" class="chk" color="#ff4521" @change="getSum"></mu-checkbox>
                                </div>
                            </div>
                        </div>
                        <div class="item flex fcen">
                            <div class="pic fshrink0">
                                <img src="../assets/img/error_zanwusj.png" alt="商品">
                            </div>
                            <div class="info flex1">
                                <p class="title bold">【特惠专享季】家庭计划-饼干</p>
                                <p class="txt">饼干服务套组(16盒),直升中级经销商,厉害！</p>
                                <p class="tag">套组价</p>
                                <div class="flex spb">
                                    <p class="price fcol fend">￥14800</p>
                                    <mu-checkbox v-model="selects[1]" class="chk" color="#ff4521" @change="getSum"></mu-checkbox>
                                </div>
                            </div>
                        </div>
                        <div class="item flex fcen">
                            <div class="pic fshrink0">
                                <img src="../assets/img/error_zanwusj.png" alt="商品">
                            </div>
                            <div class="info flex1">
                                <p class="title bold">【特惠专享季】家庭计划-饼干</p>
                                <p class="txt">饼干服务套组(16盒),直升中级经销商,厉害！</p>
                                <p class="tag">套组价</p>
                                <div class="flex spb">
                                    <p class="price fcol fend">￥14800</p>
                                    <mu-checkbox v-model="selects[2]" class="chk" color="#ff4521" @change="getSum"></mu-checkbox>
                                </div>
                            </div>
                        </div>
                        <div class="item flex fcen">
                            <div class="pic fshrink0">
                                <img src="../assets/img/error_zanwusj.png" alt="商品">
                            </div>
                            <div class="info flex1">
                                <p class="title bold">【特惠专享季】家庭计划-饼干</p>
                                <p class="txt">饼干服务套组(16盒),直升中级经销商,厉害！</p>
                                <p class="tag">套组价</p>
                                <div class="flex spb">
                                    <p class="price fcol fend">￥14800</p>
                                    <mu-checkbox v-model="selects[3]" class="chk" color="#ff4521" @change="getSum"></mu-checkbox>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
             </mu-load-more>

            <mu-ripple class="btns" v-if="active == 1">
                <a href="javascript:;" class="btn bold">进货单({{total}})</a>
            </mu-ripple>
        </div>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Helpers from 'muse-ui/lib/Helpers';
import Loading from 'muse-ui-loading';
import { Tabs, Checkbox, LoadMore } from 'muse-ui';
export default {
    data() {
        return {
            active: 0,
            selects: [false, true, false, false],
            list: [],
            loading: false,
            refreshing: false,
            total: 0,
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
        },
        getSum() {
            let count = 0;
            for(let v of this.selects){
                if(v){
                    count++;
                }
            }
            this.total = count;
        }
    },
    mounted() {
        let winh = $(window).height();
        let h = $('.header').height() + $('.mu-tabs').height() + $('.btns').height();
        $('.box').height(winh - h - 5);

        this.loading2 = Loading();
        this.getData();
        this.getSum();
    }
}
Vue.use(Helpers);
Vue.use(Loading);
Vue.use(Tabs);
Vue.use(Checkbox);
Vue.use(LoadMore);
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
    .list{
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
                max-width: 2rem;
                .title{
                    font-size: .14rem;
                    color: #000;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    line-height: 2;
                    overflow: hidden;
                }
                .txt{
                    font-size: .12rem;
                    color: #555;
                }
                .tag{
                    display: inline-block;
                    padding: 0 .03rem;
                    border: 1px solid #ff7421;
                    color: #ff7421;
                    border-radius: .05rem;
                    font-size: .14rem;
                    margin-top: .05rem;
                }
                div{
                    margin-top: .05rem;
                    .price{
                        color: #ff7421;
                        font-size: .14rem;
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
</style>
