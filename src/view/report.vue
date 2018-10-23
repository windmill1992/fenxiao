<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">报表中心</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="flex fcen spb">
                    <div class="left flex fcen">
                        <div class="line c80a9f0"></div>
                        <p class="txt bold">我的积分</p>
                    </div>
                    <!-- <div class="right flex fcen">
                        <p class="txt1">规则说明</p>
                        <div class="arr-r gray"></div>
                    </div> -->
                </div>
                <div class="list flex spb fwrap">
                    <router-link to="/firstPoint" class="item fcol">
                        <mu-ripple class="rip fcol spb flex1">
                            <p class="txt">一阶积分</p>
                            <p class="num bold">{{info.firstIntegral ? info.firstIntegral : 0}}</p>
                            <div class="btn">查看详情</div>
                        </mu-ripple>
                    </router-link>
                    <router-link to="/secondPoint" class="item fcol">
                        <mu-ripple class="rip fcol spb flex1">
                            <p class="txt">二阶积分</p>
                            <p class="num bold">{{info.secondIntegral ? info.secondIntegral : 0}}</p>
                            <div class="btn">查看详情</div>
                        </mu-ripple>
                    </router-link>
                    <router-link to="/ownPoint" class="item fcol">
                        <mu-ripple class="rip fcol spb flex1">
                            <p class="txt">本月自有积分</p>
                            <p class="num bold">{{info.integralSelf ? info.integralSelf : 0}}</p>
                            <div class="btn">查看详情</div>
                        </mu-ripple>
                    </router-link>
                    <router-link to="/teamSales" class="item fcol">
                        <mu-ripple class="rip fcol spb flex1">
                            <p class="txt">团队销售额</p>
                            <p class="num bold">{{info.teamSale ? info.teamSale : 0}}</p>
                            <div class="btn">查看详情</div>
                        </mu-ripple>
                    </router-link>
                </div>
            </div>
            <!-- <div class="bb10"></div>
            <div class="box">
                <div class="flex fcen spb">
                    <div class="left flex fcen">
                        <div class="line cff4521"></div>
                        <p class="txt bold">我的指数</p>
                    </div>
                    <div class="right flex fcen">
                        <p class="txt1">规则说明</p>
                        <div class="arr-r gray"></div>
                    </div>
                </div>
                <div class="list list2 flex spb fwrap">
                    <a href="" class="item fcol">
                        <mu-ripple class="rip fcol spb flex1">
                            <p class="txt">库存指数</p>
                            <p class="num bold">0</p>
                            <div class="btn">查看详情</div>
                        </mu-ripple>
                    </a>
                    <a href="" class="item fcol">
                        <mu-ripple class="rip fcol spb flex1">
                            <p class="txt">本月动销指数</p>
                            <p class="num bold">0</p>
                            <div class="btn">查看详情</div>
                        </mu-ripple>
                    </a>
                    <a href="" class="item fcol">
                        <mu-ripple class="rip fcol spb flex1">
                            <p class="txt">本月总动销指数</p>
                            <p class="num bold">0</p>
                            <div class="btn">查看详情</div>
                        </mu-ripple>
                    </a>
                    <a href="" class="item fcol">
                        <mu-ripple class="rip fcol spb flex1">
                            <p class="txt">本月订货指数</p>
                            <p class="num bold">0</p>
                            <div class="btn">查看详情</div>
                        </mu-ripple>
                    </a>
                    <a href="" class="item fcol">
                        <mu-ripple class="rip fcol spb flex1">
                            <p class="txt">本月分销指数</p>
                            <p class="num bold">0</p>
                            <div class="btn">查看详情</div>
                        </mu-ripple>
                    </a>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { Button, Snackbar, Icon } from 'muse-ui';
import { integral } from '../api/user';
export default {
    data() {
        return {
            info: {},
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            integral().then(res => {
                this.loading.close();
                if(res.code == 1){
                    this.info = res.data;
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
                this.loading.close();
                Toast.error('未知异常！');
                console.log(err);
            })
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.getData();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.box{
    background: #fff;
    border-top: 1px solid #f3f3f3;
    padding: 0 .15rem;
    .left{
        height: .42rem;
        .line{
            width: 4px;
            height: .23rem;
            border-radius: 4px;
            margin-right: .1rem;
            &.c80a9f0{
                background: #80a9f0;
            }
            &.cff4521{
                background: #ff4521;
            }
        }
        .txt{
            font-size: .16rem;
            color: #000;
        }
    }
    .right{
        color: #555;
        font-size: .12rem;
    }
    .list{
        .item{
            width: 1.6rem;
            height: 1.21rem;
            border: 1px solid #f3f3f3;
            margin-bottom: .15rem;
            .rip{
                position: relative;
                padding: .15rem 0;
                text-align: center;
            }
            .txt{
                color: #000;
                font-size: .14rem;
            }
            .num{
                color: #809af0;
                font-size: .2rem;
            }
            .btn{
                color: #809af0;
                border: 1px solid #809af0;
                font-size: .12rem;
                width: .8rem;
                height: .23rem;
                line-height: .21rem;
                text-align: center;
                border-radius: .21rem;
                margin: 0 auto;
            }
        }
        &.list2{
            .num{
                color: #ff4521;
            }
            .btn{
                border-color: #ff4521;
                color: #ff4521;
            }
        }
    }
}
</style>
