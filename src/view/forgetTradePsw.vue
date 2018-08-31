<template>
    <div id="pageContainer" class="forget-trade-psw">
        <div class="header">
            <p class="title">忘记交易密码</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="bank" placeholder="请输入现绑定银行卡号" class="inp" full-width underline-color="blue" prefix="银行卡号"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="mobile" placeholder="请输入手机号" class="inp" full-width underline-color="blue" prefix="手机号"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="code" placeholder="请输入验证码" class="inp yzm" max-length="6" full-width underline-color="blue" prefix="验证码"></mu-text-field>
                    <a href="javascript:;" class="code-a" v-if="!waiting" @click="getCode">获取验证码</a>
                    <a href="javascript:;" class="code-a no" v-else>{{time}}s重新获取</a>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="password" v-model="psw" max-length="6" placeholder="请输入新交易密码(6位数字)" class="inp" full-width underline-color="blue" prefix="新交易密码"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="password" v-model="psw2" max-length="6" placeholder="请再次输入新交易密码(6位数字)" class="inp" full-width underline-color="blue" prefix="确认新交易密码"></mu-text-field>
                </div>
            </div>
            <div class="btns-wrapper">
                <mu-button class="btn" color="#ff7421" textColor="#fff" full-width @click="submit">
                    <span class="bold">确认修改</span>
                </mu-button>
            </div>
        </div>

        <mu-dialog title="验证码" width="360" :open.sync="openYzm" dialog-class="yzm-d">
            <div class="flex fcen">
                <img src="" alt="验证码">
                <mu-text-field type="number" v-model="yzmCode" max-length="4" class="inp2" underline-color="blue"></mu-text-field>
            </div>
            <mu-button slot="actions" flat color="#555" @click="closeDialog">取消</mu-button>
            <mu-button slot="actions" flat color="primary" @click="sureYzm">确定</mu-button>
        </mu-dialog>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { TextField, Button, Dialog, Snackbar, Icon } from 'muse-ui';
export default {
    data() {
        return {
            bank: '',
            mobile: '',
            code: '',
            psw: '',
            psw2: '',
            yzmCode: '',
            openYzm: false,
            time: 60,
            waiting: false,
        }
    },
    methods: {
        getCode() {
            if(!this.mobile || this.$util.telValidate(this.mobile)){
                Toast.error('请输入正确的手机号！');
                return;
            }
            this.openYzm = true;
        },
        sureYzm() {
            this.countdown();
            this.closeDialog();
        },
        closeDialog() {
            this.openYzm = false;
        },
        submit() {
            if(this.loading) return;
            if(!this.bank){
                Toast.error('请输入银行卡号！');
                return;
            }
            if(!this.mobile || this.$util.telValidate(this.mobile)){
                Toast.error('请输入正确的手机号！');
                return;
            }
            if(!this.code || !Number.isInteger(this.code)){
                Toast.error('手机验证码错误！');
                return;
            }
            if(!this.psw || !this.psw2){
                Toast.error('请输入交易密码！');
                return;
            }
            if(this.psw.length != 6 || !Number.isInteger(this.psw)){
                Toast.error({ message: '请输入6位数字密码！', time: 5000 });
                return;
            }
            if(this.psw != this.psw2){
                Toast.error('两次密码不一致！');
                return;
            }
            this.loading = Loading();
        },
        countdown() {
            this.waiting = true;
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.time--;
                if(this.time == -1){
                    clearInterval(this.timer);
                    this.waiting = false;
                    this.time = 60;
                }
            }, 1000);
        }
    },
    mounted() {
        
    }
}
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(TextField);
Vue.use(Loading);
</script>

<style scoped lang="less">
.box{
    background: #fff;
    border-top: 2px solid #f6f6f6;
    .item{
        height: .44rem;
        line-height: .44rem;
        padding: 0 .15rem;
        position: relative;
        .inp{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: .44rem;
            margin: 0;
            padding: 0;
            color: #000;
            font-size: .14rem;
            min-height: auto;
        }
        .code-a{
            position: absolute;
            right: .15rem;
            top: 0;
            line-height: .43rem;
            color: #ff7421;
            font-size: .14rem;
            padding-left: .15rem;
            &.no{
                color: #9c9c9c;
            }
        }
    }
}
.btns-wrapper{
    margin-top: .2rem;
    padding: 0 .15rem;
    .btn{
        height: .42rem;
        font-size: .18rem;
        border-radius: .05rem;
        letter-spacing: 1px;
    }
}
</style>
<style>
.forget-trade-psw .mu-input-content{
    padding: 0 .15rem;
}
.forget-trade-psw .mu-text-field-input{
    padding: .05rem 0 .05rem .1rem;
    height: .44rem;
    text-align: right;
}
.yzm-d .mu-text-field-input{
    padding: 0;
    height: .4rem;
    text-align: right;
}
.forget-trade-psw .yzm .mu-text-field-input{
    padding-right: 1.1rem;
    text-align: left;
}
.forget-trade-psw .mu-input-prefix-text{
    color: #000;
    letter-spacing: 1px;
    font-size: .16rem;
}
.forget-trade-psw .mu-input-line{
    background-color: #f3f3f3;
}
.forget-trade-psw .mu-input-help, .yzm-d .mu-input-help{
    display: none;
}
.yzm-d img{
    width: 1rem;
    height: .4rem;
    margin-right: .2rem;
}
</style>
