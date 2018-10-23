<template>
    <div id="pageContainer" class="withdraw-cash">
        <div class="header">
            <p class="title">提现</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="item">
                    <mu-text-field v-model="info.realName" placeholder="姓名" class="inp" full-width underline-color="blue" prefix="姓名" readonly></mu-text-field>
                </div>
                <div class="item">
                    <mu-text-field type="number" v-model="info.card" placeholder="银行卡号" class="inp" full-width underline-color="blue" prefix="银行卡号" readonly></mu-text-field>
                </div>
                <div class="item">
                    <mu-text-field v-model="info.bankName" placeholder="招商银行" class="inp" full-width underline-color="blue" prefix="银行" readonly></mu-text-field>
                </div>
                <div class="item">
                    <mu-text-field v-model="info.balance" placeholder="账户金额" class="inp" full-width underline-color="blue" prefix="账户金额" readonly></mu-text-field>
                </div>
                <div class="bb10"></div>
                <div class="item">
                    <mu-text-field type="number" v-model="money" :placeholder="'本次最多可提现'+ info.balance" class="inp" full-width underline-color="blue" prefix="提现金额" suffix="元"></mu-text-field>
                </div>
            </div>
            <div class="tip flex fcen spb">
                <p class="txt">手续费:0元</p>
                <a href="javascript:;" class="all" @click="withdrawAll">全部提出</a>
            </div>

            <div class="btn-wrapper">
                <mu-button class="btn" full-width color="#ff7421" textColor="#fff" @click="submit">
                    <span class="bold">确认提现</span>
                </mu-button>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Loading from 'muse-ui-loading';
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import { TextField, Button, Snackbar, Icon, Dialog } from 'muse-ui';
import { userInfo, myBank, userState, cashApply } from '../api/user';
export default {
    data() {
        return {
            open: true,
            money: '',
            info: {
                balance: 0,
            },
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            myBank().then(res => {
                this.loading.close();
                if(res.code == 1){
                    this.info = res.data;
                    if(!this.state){
                        this.getUserState();
                    }
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name);
                }else if(res.code == 4){
                    Toast.error('您还未绑定过银行卡，不能提现！');
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
        getUserState() {
            userState().then(res => {
                if(res.code == 1){
                    this.state = res.data;
                    if(this.state.transactState == 0) {
                        Message.confirm('您还未设置过交易密码，是否去设置？', '提示', {}).then(({ result }) => {
                            if(result){
                                this.$router.push('/setTradePsw');
                            }
                        })
                    }
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                Toast.error('未知异常！');
                console.log(err);
            });
        },
        withdrawAll() {
            this.money = this.info.balance;
        },
        submit() {
            if(this.loading2) return;
            if(this.state.transactState == 0) {
                Message.confirm('您还未设置过交易密码，是否去设置？', '提示', {}).then(({ result }) => {
                    if(result){
                        this.$router.push('/setTradePsw');
                    }
                })
                return;
            }
            if(!this.money || Number.isNaN(Number(this.money)) || this.money < 0.01){
                Toast.error('请输入有效的提现金额！');
                return;
            }
            if(this.money > this.info.balance){
                Toast.error('提现金额不能超过账户余额！');
                return;
            }
            Message.prompt('', '交易密码', {
                validator(value) {
                    return {
                        valid: /\d{6}/.test(value),
                        message: '请输入6位交易密码！',
                    }
                },
                className: 'trade-p4',
                inputType: 'password',
                inputPlaceholder: '请输入交易密码',
            }).then(({ result, value }) => {
                if(result){
                    this.loading = Loading({ text: '正在提交...', target: document.getElementById('pageContainer') });
                    this.loading2 = true;
                    cashApply({ type: 200, applyMoney: this.money, transactPassWord: value }).then(res => {
                        this.loading.close();
                        if(res.code == 1){
                            Toast.success('提交成功，请等待审核。');
                            setTimeout(() => {
                                this.$router.push('/withdrawDetail/'+ res.data);
                            }, 1000);
                        }else{
                            this.loading2 = false;
                            if(res.msg){
                                Toast.error(res.msg);
                            }else{
                                Toast.error('服务器开了小差，请稍后再试！');
                            }
                        }
                    })
                    .catch(err => {
                        this.loading.close();
                        this.loading2 = false;
                        Toast.error('未知异常！');
                        console.log(err);
                    });
                }
            })
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.getData();
    }
}
Vue.use(Loading);
Vue.use(Toast);
Vue.use(Message);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(TextField);
Vue.use(Dialog);
</script>

<style scoped lang="less">
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
.tip{
    padding: .15rem .15rem 0;
    font-size: .12rem;
    color: #9c9c9c;
    .all{
        color: #80a9f0;
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
</style>
<style>
.withdraw-cash .mu-input-content{
    padding: 0 .15rem;
}
.withdraw-cash .mu-text-field-input{
    padding: .05rem 0;
    height: .42rem;
    text-align: right;
}
.withdraw-cash .inp2 .mu-text-field-input{
    padding: .05rem .15rem .05rem 0;
}
.withdraw-cash .mu-input-prefix-text, .withdraw-cash .mu-input-suffix-text{
    color: #000;
}
.withdraw-cash .mu-input-suffix-text{
    padding-left: .1rem;
}
.withdraw-cash .mu-input-line{
    background-color: #f3f3f3;
}
.withdraw-cash .mu-input-line, .withdraw-cash .mu-input-focus-line{
    left: .15rem;
}
.trade-p4 .mu-input{
    margin: 0;
    padding: 0;
    min-height: auto;
}
.trade-p4 .mu-input-help{
    display: block!important;
}
</style>
