<template>
    <div id="pageContainer" class="recharge">
        <div class="header">
            <p class="title">充值</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
            <a href="javascript:;" class="refresh" @click="refresh">刷新</a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="item flex fcen spb">
                    <mu-text-field v-model="uname" placeholder="会员名" class="inp" full-width underline-color="blue" prefix="会员名" readonly></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="mobile" placeholder="手机号" class="inp" full-width underline-color="blue" prefix="手机号" readonly></mu-text-field>
                </div>
                <!-- <div class="bb10"></div>
                <div class="item flex fcen spb">
                    <mu-text-field v-model="way" placeholder="请选择充值方式" class="inp inp2" full-width underline-color="blue" readonly prefix="充值方式" @click="showSheet"></mu-text-field>
                    <div class="arr-r gray"></div>
                </div> -->
                <div class="bb10"></div>
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="amount" placeholder="充值1元起" class="inp" full-width underline-color="blue" prefix="充值金额" suffix="元"></mu-text-field>
                </div>
                <!-- <div class="bb10"></div>
                <mu-ripple class="item flex fcen spb" @click="toTradePsw">
                    <p class="txt">交易密码设置/修改</p>
                    <div class="arr-r gray"></div>
                </mu-ripple> -->
            </div>

            <div class="btn-wrapper">
                <mu-button color="#ff7421" textColor="#fff" class="btn" full-width @click="submit">
                    <span class="bold">确认充值</span>
                </mu-button>
            </div>

            <div class="txts">
                <p class="txt flex fcen">充值如果要提现需收取0.5%手续费；</p>
                <p class="txt flex fcen">POS、信用卡充值无法提现。</p>
            </div>
        </div>
        <mu-bottom-sheet :open.sync="open">
            <div class="top">
                <p class="title">请选择充值方式</p>
                <mu-ripple class="close" @click="open = false"><img src="../assets/img/close.png" alt="关闭"></mu-ripple>
            </div>
            <mu-list @item-click="closeSheet">
                <mu-list-item button :data-index="0" data-name="微信支付">
                    <mu-list-item-title class="flex fcen spb">
                        <p>微信支付(单日限额3000元)</p>
                        <mu-radio :value="0" v-model="wayRad" class="rad" color="#ff4521" uncheck-icon="1"></mu-radio>
                    </mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :data-index="1" data-name="储蓄卡快捷支付">
                    <mu-list-item-title class="flex fcen spb">
                        <p>储蓄卡快捷支付</p>
                        <mu-radio :value="1" v-model="wayRad" class="rad" color="#ff4521" uncheck-icon="1"></mu-radio>
                    </mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :data-index="2" data-name="信用卡快捷支付">
                    <mu-list-item-title class="flex fcen spb">
                        <p>信用卡快捷支付<span style="color: #9c9c9c;">(无法提现)</span></p>
                        <mu-radio :value="2" v-model="wayRad" class="rad" color="#ff4521" uncheck-icon="1"></mu-radio>
                    </mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :data-index="3" data-name="银行卡绑卡支付">
                    <mu-list-item-title class="flex fcen spb">
                        <p>银行卡绑卡支付</p>
                        <mu-radio :value="3" v-model="wayRad" class="rad" color="#ff4521" uncheck-icon="1"></mu-radio>
                    </mu-list-item-title>
                </mu-list-item>
                <mu-list-item button :data-index="4" data-name="POS支付">
                    <mu-list-item-title class="flex fcen spb">
                        <p>POS支付<span style="color: #9c9c9c;">(公司线下活动现场当面使用)</span></p>
                        <mu-radio :value="4" v-model="wayRad" class="rad" color="#ff4521" uncheck-icon="1"></mu-radio>
                    </mu-list-item-title>
                </mu-list-item>
            </mu-list>
        </mu-bottom-sheet>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { TextField, Select, Radio, List, BottomSheet, Button, Snackbar, Icon } from 'muse-ui';
import { recharge, userInfo } from '../api/user';
export default {
    data() {
        return {
            open: false,
            wayRad: 0,
            uname: '',
            mobile: '',
            way: '',
            amount: '',
            loading: false,
        }
    },
    methods: {
        refresh() {
            this.getData();
        },
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            userInfo().then(res => {
                this.loading.close();
                if(res.code == 1){
                    this.uname = res.data.userName;
                    this.mobile = res.data.mobileNum;
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
                Toast.error('')
            })
        },
        showSheet() {
            this.open = true;
        },
        closeSheet(e) {
            this.open = false;
            this.wayRad = Number(e.$el.dataset.index);
            this.way = e.$el.dataset.name;
        },
        toTradePsw() {

        },
        submit() {
            if(this.loading && this.loading.instance != null) return;
            if(!this.uname){
                Toast.error('请输入会员名！');
                return;
            }
            if(!this.mobile || !this.$util.telValidate(this.mobile)){
                Toast.error('请输入正确的手机号！');
                return;
            }
            // if(!this.way){
            //     Toast.error('请选择充值方式！');
            //     return;
            // }
            if(!this.amount || this.amount < 0.01){
                Toast.error('请输入有效充值金额！');
                return;
            }
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            recharge({ orderType: 1, orderAmount: this.amount }).then(res => {
                this.loading.close();
                if(res.code == 1){
                    // window.location.href = encodeURI(res.data);
                    let link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                    link.href = encodeURI(res.data);
                    let event = document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    link.dispatchEvent(event);
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
        }
    },
    mounted() {
        this.getData();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(TextField);
Vue.use(Select);
Vue.use(Radio);
Vue.use(List);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(BottomSheet);
</script>

<style scoped lang="less">
.header .refresh{
    position: absolute;
    right: .15rem;
    top: 0;
    line-height: .45rem;
    color: #ff7421;
    font-size: .14rem;
}
.box{
    background: #fff;
    border-top: 2px solid #f3f3f3;
    .item{
        height: .42rem;
        line-height: .42rem;
        padding: 0 .15rem;
        position: relative;
        .inp{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: .42rem;
            margin: 0;
            padding: 0;
            color: #000;
            font-size: .16rem;
            min-height: auto;
        }
        .arr-r{
            position: absolute;
            right: .15rem;
            top: 0;
        }
        .txt{
            font-size: .16rem;
            color: #000;
        }
    }
}
.btn-wrapper{
    padding: 0 .15rem;
    margin-top: .2rem;
    margin-bottom: .1rem;
    .btn{
        height: .42rem;
        font-size: .18rem;
        border-radius: .05rem;
        letter-spacing: 1px;
    }
}
.txts{
    padding: 0 .15rem;
    .txt{
        font-size: .12rem;
        color: #555;
        line-height: 2;
        &::before{
            content: '';
            display: inline-block;
            width: .07rem;
            height: .07rem;
            background: #ff7421;
            border-radius: 100%;
            margin-right: .05rem;
        }
    }
}
.mu-bottom-sheet{
    .top{
        width: 100%;
        height: .48rem;
        line-height: .48rem;
        position: relative;
        color: #000;
        font-size: .16rem;
        text-align: center;
        border-bottom: 1px solid #f3f3f3;
        .close{
            position: absolute;
            width: .48rem;
            height: .48rem;
            right: 0;
            top: 0;
            img{
                width: .14rem;
                height: .14rem;
                vertical-align: top;
                margin: .17rem;
            }
        }
    }
    .mu-list{
        padding: 0;
        li{
            margin-left: .15rem;
            border-bottom: 1px solid #f3f3f3;
            .mu-item-title{
                font-size: .14rem;
                padding-right: .15rem;
            }
        }
    }
}
</style>
<style>
.recharge .mu-input-content{
    padding: 0 .15rem;
}
.recharge .mu-input-content .mu-text-field-input{
    padding: .05rem 0;
    height: .42rem;
    text-align: right;
}
.recharge .inp2 .mu-input-content .mu-text-field-input{
    padding: .05rem .15rem .05rem 0;
}
.recharge .mu-input-content .mu-input-prefix-text, .recharge .mu-input-content .mu-input-suffix-text{
    color: #000;
}
.recharge .mu-input-content .mu-input-line{
    background-color: #f3f3f3;
}
.mu-item{
    padding: 0;
}
.rad .mu-radio-icon-uncheck{
    background-image: url(../assets/img/unchoose.png);
    background-repeat: no-repeat;
    background-size: 20px 20px;
    background-position: center;
}
</style>
