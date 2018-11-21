<template>
    <div id="pageContainer" class="reset-psw">
        <div class="header">
            <p class="title">重置密码</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="mobile" placeholder="请输入手机号" class="inp" full-width underline-color="blue" prefix="手机号"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="code" placeholder="请输入验证码" class="inp yzm" max-length="6" full-width underline-color="blue" prefix="验证码"></mu-text-field>
                    <a href="javascript:;" class="code-a" v-if="!waiting" @click="getCode">获取验证码</a>
                    <a href="javascript:;" class="code-a no" v-else>{{time}}s重新获取</a>
                </div>
                <div class="bb10"></div>
                <div class="item flex fcen spb">
                    <mu-text-field type="password" v-model="psw" placeholder="输入新密码" class="inp" full-width underline-color="blue" prefix="新密码"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="password" v-model="psw2" placeholder="再次输入新密码" class="inp" full-width underline-color="blue" prefix="确认密码"></mu-text-field>
                </div>
            </div>
            <p class="tip">*密码不少于6位且只能以字母或下划线开头，可以包含~!@#$%^&*-_'.?等特殊符号，不能包含中文！</p>

            <div class="btns-wrapper">
                <mu-button class="btn" color="#ff7421" textColor="#fff" full-width @click="submit">
                    <span class="bold">确认修改</span>
                </mu-button>
            </div>
        </div>

        <mu-dialog title="验证码" width="360" :open.sync="openYzm" dialog-class="yzm-d">
            <div class="flex fcen spb">
                <img :src="yzmUrl" alt="验证码">
                <mu-text-field type="number" v-model="yzmCode" max-length="4" class="inp-yzm" underline-color="blue"></mu-text-field>
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
import { getMobileCode, resetLoginPsw } from '../api/login';
import { userInfo } from '../api/user';
import { baseUrl } from '../api/baseUrl';
import { pswReg } from '../utils/pswReg';
export default {
    data() {
        return {
            mobile: '',
            code: '',
            psw: '',
            psw2: '',
            yzmCode: '',
            openYzm: false,
            time: 60,
            waiting: false,
            loading: false,
            yzmUrl: '',
        }
    },
    methods: {
        getUserInfo() {
            userInfo().then(res => {
                if(res.code == 1){
                    this.mobile = res.data.mobileNum;
                }else if(res.code == 0){
                    // this.$router.push('/login?from='+ this.$route.name);
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        getCode() {
            if(!this.mobile || !this.$util.telValidate(this.mobile)){
                Toast.error('请输入正确的手机号！');
                return;
            }
            this.freshCode();
            this.openYzm = true;
        },
        freshCode() {
            this.yzmUrl = `${baseUrl}/user/reset/code?t=`+ Date.now();
        },
        sureYzm() {
            if(!this.yzmCode || this.yzmCode.length != 4){
                Toast.error('验证码错误！');
                return;
            }
            this.closeDialog();
            getMobileCode({ mobile: this.mobile, code: this.yzmCode, type: 'reset' }).then(res => {
                if(res.code == 1){
                    this.countdown();
                    Toast.success('手机验证码发送成功，请查收！');
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
            })
        },
        closeDialog() {
            this.openYzm = false;
        },
        submit() {
            if(this.loading && this.loading.instance != null) return;
            if(!this.mobile || !this.$util.telValidate(this.mobile)){
                Toast.error('请输入正确的手机号！');
                return;
            }
            if(!this.code || !Number.isInteger(Number(this.code))){
                Toast.error('手机验证码错误！');
                return;
            }
            if(!this.psw || !this.psw2){
                Toast.error('请输入密码！');
                return;
            }
            if(!pswReg.test(this.psw)){
                Toast.error({ message: '密码格式错误！', time: 2000 });
                return;
            }
            if(this.psw != this.psw2){
                Toast.error('两次密码不一致！');
                return;
            }
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            let param = {
                mobile: this.mobile,
                mobileCode: this.code,
                type: 'reset',
                password: this.psw,
                surePassword: this.psw2,
            }
            resetLoginPsw(param).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    Toast.success('密码设置成功!');
                    setTimeout(() => {
                        if(this.from){
                            this.$router.replace({ name: this.from });
                        }else{
                            this.$router.push('/login?from=user');
                        }
                    }, 1000);
                }else if(res.code == 0){
                    // this.$router.push('/login?from='+ this.$route.name);
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
        this.isWx = this.$util.isWx();
        this.from = this.$route.query.from;
        this.getUserInfo();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(TextField);
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
.tip{
    margin-top: .5rem;
    padding: 0 .15rem;
    color: #ff7421;
    font-size: .14rem;
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
.reset-psw .mu-input-content{
    padding: 0 .15rem;
}
.reset-psw .mu-text-field-input{
    padding: .05rem 0 .05rem .1rem;
    height: .44rem;
    text-align: right;
}
.reset-psw .yzm .mu-text-field-input{
    padding-right: 1.1rem;
    text-align: left;
}
.reset-psw .mu-input-prefix-text{
    color: #000;
    letter-spacing: 1px;
    font-size: .16rem;
}
.reset-psw .mu-input-line{
    background-color: #f3f3f3;
}
</style>
