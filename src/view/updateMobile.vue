<template>
    <div id="pageContainer" class="update-mobile">
        <div class="header">
            <p class="title">修改手机号</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="item flex fcen spb">
                    <mu-text-field v-model="mobile" placeholder="请输入新手机号" class="inp" full-width underline-color="blue" prefix="新手机号"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="code" placeholder="输入验证码" class="inp" max-length="6" full-width underline-color="blue" prefix="验证码"></mu-text-field>
                    <a href="javascript:;" class="code-a" @click="getCode" v-if="!waiting">获取验证码</a>
                    <a href="javascript:;" class="code-a no" v-else>{{time}}s重新获取</a>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="password" v-model="psw" placeholder="输入登录密码" class="inp" full-width underline-color="blue" prefix="登录密码"></mu-text-field>
                </div>
                <div class="flex" v-if="state.passwordState == 0">
                    <p class="tip flex fcen"><img src="../assets/img/warn.png" alt="">您还未设置过登录密码，请先去</p>
                    <router-link to="/resetPsw?from=updateMobile" class="nav">设置登录密码</router-link>
                </div>
            </div>

            <div class="btns-wrapper">
                <mu-ripple color="blue" class="btns" @click="submit">
                    <a href="javascript:;" class="btn bold">确认</a>
                </mu-ripple>
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
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import Vue from 'vue';
import Loading from 'muse-ui-loading';
import Toast from 'muse-ui-toast';
import { TextField, Dialog, Snackbar, Button, Icon } from 'muse-ui';
import { updateMobile, getMobileCode, mobileIsRegistered } from '../api/login';
import { userState } from '../api/user';
import { baseUrl } from '../api/baseUrl';
export default {
    data() {
        return {
            mobile: '',
            code: '',
            psw: '',
            yzmCode: '',
            openYzm: false,
            loading: false,
            time: 60,
            waiting: false,
            yzmUrl: '',
            state: {},
        }
    },
    methods: {
        getUserState() {
            userState().then(res => {
                if(res.code == 1){
                    this.state = res.data;
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
                console.log(err);
            })
        },
        getCode() {
            if(!this.mobile || !this.$util.telValidate(this.mobile)){
                Toast.error('请输入正确的手机号！');
                return;
            }
            this.loading2 = true;
            mobileIsRegistered({ mobile: this.mobile }).then(res => {
                this.loading2 = false;
                if(res.code == 1){
                    this.freshCode();
                    this.openYzm = true;
                }else if(res.code == 10015){
                    Toast.warning('该手机号已被注册！');
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.loading2 = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        freshCode() {
            this.yzmUrl = `${baseUrl}/user/edit/code?t=`+ Date.now();
        },
        sureYzm() {
            if(!this.yzmCode || this.yzmCode.length != 4){
                Toast.error('验证码错误！');
                return;
            }
            this.closeDialog();
            getMobileCode({ mobile: this.mobile, code: this.yzmCode, type: 'edit' }).then(res => {
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
            if(!this.psw){
                Toast.error('请输入登录密码！');
                return;
            }
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            updateMobile({ mobile: this.mobile, code: this.code, password: this.psw, type: 'edit' }).then(res => {
                this.loading.close();
                if(res.code == 1){
                    Toast.success('修改成功，正在跳转...');
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 1500);
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
        this.getUserState();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(TextField);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.box{
    background: #fff;
    border-top: 2px solid #f6f6f6;
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
            font-size: .14rem;
            min-height: auto;
        }
        .code-a{
            position: absolute;
            right: .15rem;
            top: 0;
            line-height: .42rem;
            color: #ff7421;
            font-size: .14rem;
            &.no{
                color: #9c9c9c;
            }
        }
    }
    .tip{
        font-size: .12rem;
        color: #9c9c9c;
        padding: .1rem 0 .1rem .15rem;
        img{
            width: .14rem;
            height: .14rem;
            margin-right: .05rem;
        }
    }
    .nav{
        font-size: .12rem;
        color: #ff4521;
        padding: .1rem 0;
    }
}
.btns-wrapper{
    margin-top: .2rem;
    padding: 0 .15rem;
    .btns{
        position: relative;
        .btn{
            display: block;
            width: 100%;
            height: .42rem;
            line-height: .42rem;
            color: #fff;
            font-size: .2rem;
            text-align: center;
            border-radius: .05rem;
            background: #ff7421;
            letter-spacing: 1px;
        }
    }
}
</style>
<style>
.update-mobile .mu-input-content{
    padding: 0 .15rem;
}
.update-mobile .mu-text-field-input{
    padding: .05rem 0 .05rem .1rem;
    height: .42rem;
}
.update-mobile .mu-input-prefix-text{
    color: #000;
    min-width: .6rem;
}
.update-mobile .mu-input-line{
    background-color: #f3f3f3;
}
</style>
