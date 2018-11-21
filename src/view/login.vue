<template>
    <div id="pageContainer" class="login">
        <div class="wrap fcol spb">
            <div>
                <div class="box">
                    <div class="logo">
                        <img :src="imgHost + '/logo.png'" alt="logo">
                    </div>
                    <div class="item flex fcen spb">
                        <mu-text-field v-model="account" @input="getAccount" placeholder="请输入登录手机号/会员名" class="inp" full-width underline-color="blue" prefix="账号"></mu-text-field>
                    </div>
                    <div class="item flex fcen spb">
                        <mu-text-field type="password" v-model="psw" @input="getPsw" placeholder="请输入密码" class="inp" full-width underline-color="blue" prefix="密码"></mu-text-field>
                    </div>
                </div>
                <div class="btns-wrapper">
                    <mu-button @click="login" class="btn" :class="{ no: disabled }" color="#ff7421" textColor="#fff" full-width>
                        <span class="bold">登录</span>
                    </mu-button>
                </div>
                <div class="forget txtR">
                    <router-link to="/resetPsw" class="for-a">忘记密码</router-link>
                </div>
            </div>
            <div class="quick-login">
                <p class="txt1 flex fcen">快捷登录</p>
                <div class="way flex">
                    <a href="javascript:;" class="btn" v-if="isWx">
                        <mu-ripple class="rip" @click="wxLogin">
                            <img src="../assets/img/wechat.png" alt="微信登录">
                            <p class="txt">微信登录</p>
                        </mu-ripple>
                    </a>
                    <a href="javascript:;" class="btn" @click="codeLogin">
                        <mu-ripple class="rip">
                            <img src="../assets/img/dl_yzm.png" alt="验证码登录">
                            <p class="txt">验证码登录</p>
                        </mu-ripple>
                    </a>
                </div>
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
import { login, wxlogin } from '../api/login';
import { str2json } from '../utils/str2json';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            account: '',
            psw: '',
            disabled: true,
            loading: false,
            imgHost: imgHost,
            isWx: false,
        }
    },
    methods: {
        getAccount(v) {
            this.account = v;
            this.valid();
        },
        getPsw(v) {
            this.psw = v;
            this.valid();
        },
        valid() {
            if(this.account && this.psw && this.psw.length >= 6){
                this.disabled = false;
            }
        },
        login() {
            if(this.disabled || this.f) return;
            this.loading = Loading({ text: '正在登录...', target: document.getElementById('pageContainer') });
            this.f = true;
            login({ userName: this.account, password: this.psw }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    localStorage.setItem('account', this.account);
                    Toast.success('登录成功，正在跳转...');
                    setTimeout(() => {
                        // this.$router.replace({ name: this.from ? this.from : 'index', params: str2json(this.params), query: str2json(this.query) });
                        if(this.admin){
                            let arr = this.admin.split('_');
                            this.$router.replace(`/admin/${arr[0]}/${arr[1]}`);
                        }else{
                            this.$router.replace('/');
                        }
                    }, 1000);
                }else{
                    this.f = false;
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.f = false;
                this.loading.close();
                Toast.error('未知异常！');
                console.log(err);
            });
        },
        codeLogin() {
            let query = '';
            if(this.from){
                query = '?from='+ this.from + (this.params ? '&params=' + this.params : '') + (this.query ? '&query=' + this.query : '');
            }
            if(this.admin){
                query = '?admin='+ this.admin;
            }
            this.$router.push('/loginByMobile'+ query);
        },
        wxLogin(code) {
            let param = {
                url: location.href,
            }
            if(code){
                param.code = code;
            }
            this.loading = Loading({ text: '正在登录...', target: document.getElementById('pageContainer') });
            wxlogin(param).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    Toast.success('登录成功，正在跳转...');
                    sessionStorage.setItem('code', 1);
                    setTimeout(() => {
                        // if(this.from){
                        //     this.$router.push({ name: this.from, params: str2json(this.params), query: str2json(this.query) });
                        // }else{}
                        if(this.admin){
                            let arr = this.admin.split('_');
                            this.$router.replace(`/admin/${arr[0]}/${arr[1]}`);
                        }else{
                            this.$router.replace('/');
                        }
                    }, 1000);
                }else if(res.code == 10025 || res.code == 10007){
                    location.href = res.data;
                }else if(res.code == 10026){
                    Toast.success('登录成功，正在跳转...');
                    setTimeout(() => {
                        let query = '';
                        this.$router.replace('/bindMobile');
                    }, 1000);
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
        keyFn(e) {
            if(e.keyCode == 13){
                this.login();
            }
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.from = this.$route.query.from;
        this.params = this.$route.query.params;
        this.query = this.$route.query.query;
        let code = this.$route.query.code;
        this.admin = this.$route.query.admin;
        let c = sessionStorage.getItem('code');
        if(code && c != 1){
            this.wxLogin(code);
        }else if(c == 1){
            sessionStorage.removeItem('code');
            this.$router.replace('/');
        }
        if(localStorage.getItem('account')){
            this.account = localStorage.getItem('account');
        }
        window.addEventListener('keypress', this.keyFn);
    },
    beforeDestroy() {
        window.removeEventListener('keypress', this.keyFn);
    },
}
Vue.use(Loading);
Vue.use(TextField);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Icon);
Vue.use(Snackbar);
</script>

<style scoped lang="less">
.wrap{
    height: 100%;
}
.box{
    background: #fff;
    overflow: hidden;
    padding-bottom: .2rem;
    .logo{
        width: .85rem;
        height: .85rem;
        margin: .4rem auto;
        overflow: hidden;
        border-radius: .15rem;
        img{
            width: 100%;
            height: 100%;
        }
    }
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
    }
}
.btns-wrapper{
    margin-top: .15rem;
    padding: 0 .15rem;
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
        &.no{
            background-color: #c9c9c9!important;
            color: #9c9c9c!important;
        }
    }
}
.forget{
    margin-top: .2rem;
    padding-right: .15rem;
    .for-a{
        color: #9c9c9c;
        font-size: .14rem;
    }
}
.quick-login{
    width: 100%;
    padding: 0;
    .txt1{
        font-size: .14rem;
        color: #9c9c9c;
        padding: 0 .15rem;
        &::before{
            content: '';
            display: inline-block;
            -webkit-flex: 1;
            flex: 1;
            height: 1px;
            background: #f3f3f3;
            margin-right: .15rem;
        }
        &::after{
            content: '';
            display: inline-block;
            -webkit-flex: 1;
            flex: 1;
            height: 1px;
            background: #f3f3f3;
            margin-left: .15rem;
        }
    }
    .way{
        .btn{
            width: 100%;
            text-align: center;
            img{
                width: .47rem;
                height: .47rem;
            }
            .txt{
                font-size: .14rem;
                color: #9c9c9c;
                margin-top: .05rem;
            }
        }
        .rip{
            position: relative;
            width: 1.38rem;
            margin: 0 auto;
            padding: .2rem;
        }
    }
}
</style>
<style>
.login .mu-input-content{
    padding: 0 .15rem;
}
.login .mu-input-content .mu-text-field-input{
    padding: .05rem 0 .05rem .1rem;
    height: .44rem;
}
.login .yzm .mu-input-content .mu-text-field-input{
    padding-right: 1.1rem;
}
.login .mu-input-content .mu-input-prefix-text{
    color: #000;
    letter-spacing: 1px;
}
.login .mu-input-content .mu-input-line{
    background-color: #f3f3f3;
    left: .15rem;
    right: .15rem;
}
.login .mu-input-content .mu-input-focus-line {
    left: .15rem;
    right: .15rem;
}
</style>
