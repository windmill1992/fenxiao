<template>
    <div id="pageContainer" class="setting">
        <div class="header">
            <p class="title">设置</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <mu-ripple class="item flex fcen spb" @click="linkto('user')">
                <p class="label">个人资料</p>
                <p class="arr-r gray"></p>
            </mu-ripple>
            <div class="bb10"></div>
            <mu-ripple class="item flex fcen spb" @click="unbind" v-if="state.bindWxState == 1">
                <p class="label">微信登录</p>
                <p class="arr-r gray"><span class="txt">解绑</span></p>
            </mu-ripple>
            <mu-ripple class="item flex fcen spb" @click="wxlogin" v-else>
                <p class="label">微信登录</p>
                <p class="arr-r gray"><span class="txt">未绑定</span></p>
            </mu-ripple>
            <mu-ripple class="item flex fcen spb" @click="linkto('loginPswManage')">
                <p class="label">登录密码管理</p>
                <p class="arr-r gray"></p>
            </mu-ripple>
            <mu-ripple class="item flex fcen spb" @click="linkto('tradePswManage')">
                <p class="label">交易密码管理</p>
                <p class="arr-r gray"><span class="txt" v-if="state.transactState == 0">未设置</span></p>
            </mu-ripple>
            <div class="bb10"></div>
            <mu-ripple class="item flex fcen spb">
                <p class="label">客服电话</p>
                <p class="txt1">0571-88581506</p>
            </mu-ripple>
            <mu-ripple class="item flex fcen spb" @click="linkto('user_protocol')">
                <p class="label">隐私协议</p>
                <p class="arr-r gray"></p>
            </mu-ripple>
            
            <div class="btns">
                <mu-button class="btn" full-width color="#ff7421" textColor="#fff" @click="logout">
                    <span class="bold">退出登录</span>
                </mu-button>
            </div>
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
import { wxBindLogin, logout } from '../api/login';
import { unbindWx, userState } from '../api/user';
export default {
    data() {
        return {
            state: {},
        }
    },
    methods: {
        getUserState() {
            let loading2 = Loading({ target: document.getElementById('pageContainer') });
            userState().then(res => {
                if(loading2){
                    loading2.close();
                }
                if(res.code == 1){
                    this.state = Object.assign({}, res.data);
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
                loading2.close();
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        linkto(name) {
            this.$router.push({ name: name });
        },
        wxlogin(code) {
            if(!this.$util.isWx()){
                Toast.error('请在微信浏览器打开！');
                return;
            }
            let param = {
                url: location.href,
            }
            if(code){
                param.code = code;
            }
            this.loading = Loading({ text: '正在登录...', target: document.getElementById('pageContainer') });
            wxBindLogin(param).then(res => {
                this.loading.close();
                if(res.code == 1 || res.code == 10026){
                    Toast.success('微信绑定成功');
                    this.getUserState();
                    sessionStorage.setItem('wx', 1);
                }else if(res.code == 10025 || res.code == 10007){
                    sessionStorage.removeItem('wx');
                    location.href = res.data;
                }else{
                    sessionStorage.removeItem('wx');
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
        unbind() {
            let loading = Loading({ text: '正在解绑...', target: document.getElementById('pageContainer') });
            unbindWx().then(res => {
                loading.close();
                if(res.code == 1){
                    Toast.success('解绑成功！');
                    sessionStorage.removeItem('wx');
                    this.getUserState();
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
                loading.close();
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        logout() {
            this.loading = Loading({ text: '正在退出...', target: document.getElementById('pageContainer') });
            logout().then(res => {
                this.loading.close();
                if(res.code == 1){
                    Toast.success('退出成功！');
                    sessionStorage.removeItem('wx');
                    sessionStorage.removeItem('code');
                    localStorage.removeItem('self');
                    setTimeout(() => {
                        this.$router.replace('/login');
                    }, 1000);
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
        let code = this.$route.query.code;
        let wx = sessionStorage.getItem('wx');
        if(code && wx != 1){
            this.wxlogin(code);
        }
        this.getUserState();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.wrapper{
    border-top: 1px solid #f3f3f3;
}
.item{
    position: relative;
    background: #fff;
    line-height: .42rem;
    font-size: .16rem;
    color: #000;
    padding: 0 .15rem;
    border-top: 1px solid #f3f3f3;
    .txt{
        font-size: .14rem;
        color: #ff7421;
    }
    .txt1{
        font-size: .14rem;
        color: #9c9c9c;
    }
}
.btns{
    margin: .2rem .15rem;
    .btn{
        font-size: .18rem;
        height: .42rem;
        border-radius: .05rem;
        letter-spacing: 1px;
    }
}
</style>
