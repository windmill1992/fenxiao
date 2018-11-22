<template>
    <div id="pageContainer" class="login-mobile">
        <div class="header">
            <p class="title">验证码登录</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="mobile" placeholder="请输入手机号" class="inp" full-width underline-color="blue" prefix="手机号"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="code" placeholder="请输入验证码" class="inp yzm" max-length="6" full-width underline-color="blue" prefix="验证码"></mu-text-field>
                    <a href="javascript:;" class="code-a" v-if="loading" v-loading="loading" data-mu-loading-size="20"></a>
                    <a href="javascript:;" class="code-a" @click="getCode" v-else-if="!waiting">获取验证码</a>
                    <a href="javascript:;" class="code-a no" v-else>{{time}}s重新获取</a>
                </div>
            </div>
            <div class="btns-wrapper">
                <mu-button class="btn" full-width color="#ff7421" textColor="#fff" @click="submit">
                    <span class="bold">登录</span>
                </mu-button>
            </div>
        </div>
        <mu-dialog title="验证码" width="360" :open.sync="openYzm" dialog-class="yzm-d">
            <div class="flex fcen spb">
                <img :src="yzmUrl" alt="验证码" @click="freshCode">
                <!-- <mu-text-field type="number" v-model="yzmCode" max-length="4" class="inp-yzm" underline-color="blue"></mu-text-field> -->
                <input type="number" v-model="yzmCode" class="inp-yzm2" maxlength="4">
            </div>
            <mu-button slot="actions" flat color="#555" @click="closeDialog">取消</mu-button>
            <mu-button slot="actions" flat color="primary" @click="sureYzm">确定</mu-button>
        </mu-dialog>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import Vue from 'vue';
import Loading from 'muse-ui-loading';
import Toast from 'muse-ui-toast';
import { TextField, Checkbox, Dialog, Snackbar, Button, Icon } from 'muse-ui';
import { codeLogin, getMobileCode } from '../api/login';
import { baseUrl } from '../api/baseUrl';
import { str2json } from '../utils/str2json';
export default {
    data() {
        return {
            mobile: '',
            code: '',
            yzmCode: '',
            openYzm: false,
            loading: false,
            time: 60,
            waiting: false,
            yzmUrl: '',
        }
    },
    methods: {
        getCode() {
            if(!this.mobile || !this.$util.telValidate(this.mobile)){
                Toast.error('请输入正确的手机号！');
                return;
            }
            this.freshCode();
            this.openYzm = true;
            setTimeout(() => {
                $('.yzm-d .inp-yzm2').focus();
            }, 500);
        },
        freshCode() {
            this.yzmUrl = `${baseUrl}/user/login/code?t=` + Date.now();
        },
        sureYzm() {
            if(!this.yzmCode || this.yzmCode.length != 4){
                Toast.error('验证码错误！');
                return;
            }
            this.closeDialog();
            this.loading = true;
            getMobileCode({ mobile: this.mobile, code: this.yzmCode, type: 'login' }).then(res => {
                this.loading = false;
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
                this.loading = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        closeDialog() {
            this.openYzm = false;
        },
        submit() {
            if(this.loading2) return;
            if(!this.mobile || !this.$util.telValidate(this.mobile)){
                Toast.error('请输入正确的手机号！');
                return;
            }
            if(!this.code || !Number.isInteger(Number(this.code))){
                Toast.error('手机验证码错误！');
                return;
            }
            this.loading2 = true;
            this.loading3 = Loading({ target: document.getElementById('pageContainer') });
            codeLogin({ mobile: this.mobile, code: this.code, type: 'login' }).then(res => {
                this.loading3.close();
                if(res.code == 1){
                    Toast.success('登录成功，正在跳转...');
                    setTimeout(() => {
                        // if(this.from){
                        //     this.$router.push({ name: this.from, params: str2json(this.params), query: str2json(this.query) });
                        // }else{
                        //     this.$router.replace('/');
                        // }
                        if(this.admin){
                            let arr = this.admin.split('_');
                            this.$router.replace(`/admin/${arr[0]}/${arr[1]}`);
                        }else{
                            this.$router.replace('/');
                        }
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
                this.loading3.close();
                this.loading2 = false;
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
        this.params = this.$route.query.params;
        this.query = this.$route.query.query;
        this.admin = this.$route.query.admin;
    }
}
Vue.use(Loading);
Vue.use(Toast);
Vue.use(TextField);
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Icon);
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
            font-size: .16rem;
            min-height: auto;
        }
        .code-a{
            position: absolute;
            right: .15rem;
            top: 0;
            min-width: .9rem;
            height: .43rem;
            line-height: .43rem;
            color: #fc4444;
            font-size: .16rem;
            padding-left: .15rem;
            border-left: 1px solid #f3f3f3;
            &.no{
                color: #9c9c9c;
            }
        }
    }
}
.btns-wrapper{
    margin-top: .15rem;
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
.login-mobile .mu-input-content{
    padding: 0 .15rem;
}
.login-mobile .mu-input-content .mu-text-field-input{
    padding: .05rem 0 .05rem .1rem;
    height: .44rem;
}
.login-mobile .yzm .mu-input-content .mu-text-field-input{
    padding-right: 1.1rem;
}
.login-mobile .mu-input-content .mu-input-prefix-text{
    color: #000;
    min-width: .6rem;
    letter-spacing: 1px;
}
.login-mobile .mu-input-content .mu-input-line{
    background-color: #f3f3f3;
    left: .15rem;
}
.login-mobile .mu-input-content .mu-input-focus-line {
    left: .15rem;
}
</style>
