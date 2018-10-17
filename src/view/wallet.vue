<template>
    <div id="pageContainer" class="wallet">
        <div class="header">
            <p class="title">我的钱包</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
            <!-- <a href="javascript:;" class="help">帮助</a> -->
        </div>
        <div class="wrapper">
            <div class="account">
                <div class="balance">
                    <p class="num bold">{{info.balance}}</p>
                    <p class="txt">账户余额(元)</p>
                </div>
                <div class="flex">
                    <a href="javascript:;" class="link flex1">
                        <p class="num1">0</p>
                        <p class="arr-r white">结算区</p>
                    </a>
                    <a href="javascript:;" class="link flex1">
                        <p class="num1">0</p>
                        <p class="arr-r white">应补缴</p>
                    </a>
                </div>
                
                <div class="go">
                    <div class="card flex fcen">
                        <div class="fcol flex1">
                            <a href="javascript:;" class="item flex fcen spc flex1" @click="linkto('recharge')">
                                <img src="../assets/img/chongzhi.png" alt="充值">
                                <p class="txt">充值</p>
                            </a>
                        </div>
                        <div class="fcol flex1">
                            <a href="javascript:;" class="item flex fcen spc flex1" @click="linkto('withdrawCash')" v-if="info.powerState == 103">
                                <img src="../assets/img/tixian.png" alt="提现">
                                <p class="txt">提现</p>
                            </a>
                            <a href="javascript:;" class="item flex fcen spc flex1" @click="inReal" v-else-if="info.powerState == 102">
                                <img src="../assets/img/tixian.png" alt="提现">
                                <p class="txt gray">提现(待审核)</p>
                            </a>
                            <a href="javascript:;" class="item flex fcen spc flex1" @click="noCert" v-else-if="info.powerState == 101">
                                <img src="../assets/img/tixian.png" alt="提现">
                                <p class="txt gray">提现(未开通)</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bb10"></div>
            <div class="bb10"></div>
            <div class="bb10"></div>
            <div class="box">
                <div class="title flex fcen">
                    <div class="line"></div>
                    <p class="bold">我的资产</p>
                </div>
                <div class="list flex">
                    <mu-ripple class="item flex1" @click="linkto('myBank')">
                        <img src="../assets/img/card.png" alt="银行卡">
                        <p class="txt">银行卡</p>
                    </mu-ripple>
                    <mu-ripple class="item flex1" @click="linkto('tradeRecord')">
                        <img src="../assets/img/jyjl.png" alt="交易记录">
                        <p class="txt">交易记录</p>
                    </mu-ripple>
                    <!-- <mu-ripple class="rip">
                        <img src="../assets/img/koukuantz.png" alt="扣款通知">
                        <p class="txt">扣款通知</p>
                    </mu-ripple> -->
                </div>
            </div>
            <!-- <div class="box">
                <div class="title flex fcen">
                    <div class="line"></div>
                    <p class="bold">本年收益(元)</p>
                </div>
                <p class="income">0</p>
                <div class="income-box">
                    <p class="txt">商品累计收益(元)</p>
                    <div class="list-box flex">
                        <div class="item1 flex1">
                            <p class="txt1">分销收益</p>
                            <p class="txt2">0</p>
                        </div>
                        <div class="item1 flex1 txtC">
                            <p class="txt1">分销收益</p>
                            <p class="txt2">0</p>
                        </div>
                        <div class="item1 flex1 txtR">
                            <p class="txt1">分销收益</p>
                            <p class="txt2">0</p>
                        </div>
                    </div>
                </div>
                <div class="income-box">
                    <p class="txt">分红累计收益(元)</p>
                    <div class="list-box flex">
                        <div class="item1 flex1">
                            <p class="txt1">月度</p>
                            <p class="txt2">0</p>
                        </div>
                        <div class="item1 flex1 txtC">
                            <p class="txt1">年度</p>
                            <p class="txt2">0</p>
                        </div>
                        <div class="item1 flex1 txtR">
                            <p class="txt1">额外市场补贴</p>
                            <p class="txt2">0</p>
                        </div>
                    </div>
                </div>
            </div>
            <p class="tip">收益仅供参考</p> -->
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
        noCert() {
            this.$router.push('/qualifacationCert');
        },
        inReal() {
            alert('实名认证审核中。')
        },
        linkto(name) {
            this.$router.push('/'+ name);
        }
    },
    mounted() {
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
.help{
    position: absolute;
    right: .15rem;
    top: 0;
    height: .45rem;
    line-height: .45rem;
    font-size: .14rem;
    color: #ff7421;
}
.account{
    height: 1.94rem;
    position: relative;
    background-image: linear-gradient(-183deg, #F87500 2%, #FEA04B 78%);
    .balance{
        color: #fff;
        padding: .25rem 0 0;
        text-align: center;
        .num{
            font-size: .3rem;
        }
        .txt{
            font-size: .16rem;
        }
    }
    .link{
        padding: .1rem 0;
        color: #fff;
        font-size: .14rem;
        text-align: center;
        .num1{
            font-size: .16rem;
        }
    }
    .go{
        position: absolute;
        height: .6rem;
        width: 100%;
        left: 0;
        bottom: -.3rem;
        padding: 0 .15rem;
        .card{
            height: .6rem;
            .fcol{
                height: 100%;
                padding: .02rem .03rem .03rem;
            }
            .item{
                position: relative;
                cursor: pointer;
                -webkit-tap-highlight-color: rgba(0, 0, 0, .08);
                img{
                    height: .22rem;
                    margin-right: .05rem;
                }
                .txt{
                    color: #000;
                    font-size: .16rem;
                    &.gray{
                        color: #9c9c9c;
                        font-size: .14rem;
                        line-height: .24rem;
                    }
                }
            }
        }
    }
}
.box{
    margin-top: .1rem;
    background: #fff;
    .title{
        padding: 0 .15rem;
        line-height: .42rem;
        color: #000;
        font-size: .16rem;
        .line{
            width: 4px;
            height: .23rem;
            border-radius: 4px;
            background: #ff7421;
            margin-right: .1rem;
        }
    }
    .list{
        padding: .1rem .15rem 0;
    }
    .item{
        display: block;
        height: .6rem;
        text-align: center;
        font-size: .14rem;
        color: #000;
        position: relative;
        img{
            height: .23rem;
        }
    }
    .income{
        font-size: .24rem;
        color: #ff7421;
        padding-left: .29rem;
        padding-bottom: .1rem;
    }
    .income-box{
        border-top: 1px solid #f3f3f3;
        padding: 0 .15rem .1rem .29rem;
        .txt{
            font-size: .16rem;
            color: #000;
            padding: .1rem 0;
        }
        .list-box{
            width: 100%;
            .txt1{
                font-size: .12rem;
                color: #9c9c9c;
            }
            .txt2{
                font-size: .14rem;
                color: #000;
                margin-top: .05rem;
            }
        }
    }
}
.tip{
    font-size: .12rem;
    padding: .1rem .3rem;
    color: #ff7421;
}
</style>
<style>
.wallet .card{
    background: url(../assets/img/qianbao.png) no-repeat 0 0 / 100% 100%;
}
</style>
