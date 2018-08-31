<template>
    <div id="pageContainer" class="withdraw-cash">
        <div class="header">
            <p class="title">提现</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="item">
                    <mu-text-field v-model="uname" placeholder="姓名" class="inp" full-width underline-color="blue" prefix="姓名"></mu-text-field>
                </div>
                <div class="item">
                    <mu-text-field type="number" v-model="bankNo" placeholder="银行卡号" class="inp" full-width underline-color="blue" prefix="银行卡号"></mu-text-field>
                </div>
                <div class="item">
                    <mu-text-field v-model="bankName" placeholder="招商银行" class="inp" full-width underline-color="blue" prefix="银行"></mu-text-field>
                </div>
                <div class="item">
                    <mu-text-field v-model="amount" placeholder="账户金额" class="inp" full-width underline-color="blue" prefix="账户金额" readonly></mu-text-field>
                </div>
                <div class="bb10"></div>
                <div class="item">
                    <mu-text-field type="number" v-model="money" placeholder="本次最多可提现0" class="inp" full-width underline-color="blue" prefix="充值金额" suffix="元"></mu-text-field>
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
import { TextField, Button, Snackbar, Icon } from 'muse-ui';
export default {
    data() {
        return {
            open: true,
            uname: '',
            bankNo: '',
            bankName: '',
            amount: 100,
            money: '',
        }
    },
    methods: {
        withdrawAll() {
            this.money = this.amount;
        },
        submit() {
            if(!this.uname){
                Toast.error('请输入姓名！');
                return;
            }
            if(!this.bankNo){
                Toast.error('请输入银行卡号！');
                return;
            }
            if(!this.backName){
                Toast.error('请输入银行名称！');
                return;
            }
            if(!this.money || !Number.isNaN(Number(this.money))){
                Toast.error('请输入有效的提现金额！');
                return;
            }
            this.loading = Loading();
        }
    }
}
Vue.use(Loading);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(TextField);
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
</style>
