<template>
    <div id="pageContainer" class="update-login-psw">
        <div class="header">
            <p class="title">修改登录密码</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="item flex fcen spb">
                    <mu-text-field type="password" v-model="oldpsw" placeholder="输入原密码" class="inp" full-width underline-color="blue" prefix="原密码"></mu-text-field>
                </div>
                <div class="bb10"></div>
                <div class="item flex fcen spb">
                    <mu-text-field type="password" v-model="psw"placeholder="输入新密码" class="inp" full-width underline-color="blue" prefix="新密码"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="password" v-model="psw2" placeholder="再次输入新密码" class="inp" full-width underline-color="blue" prefix="确认密码"></mu-text-field>
                </div>
            </div>
            <p class="tip">*新密码的长度至少为6位</p>
            <div class="btns-wrapper">
                <mu-button class="btn" color="#ff7421" textColor="#fff" full-width @click="submit">
                    <span class="bold">确认修改</span>
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
import { TextField, Button, Snackbar, Icon } from 'muse-ui';
import { updateLoginPsw } from '../api/login';
export default {
    data() {
        return {
            oldpsw: '',
            psw: '',
            psw2: '',
            loading: false,
        }
    },
    methods: {
        submit() {
            if(this.loading) return;
            if(!this.oldpsw){
                Toast.error('请输入原密码！');
                return;
            }
            if(!this.psw || !this.psw2){
                Toast.error('请输入新密码！');
                return;
            }
            if(this.psw.length < 6 || !Number.isNaN(Number.parseInt(this.psw))){
                Toast.error({ message: '密码不能少于6位且不能以数字开头！', time: 5000 });
                return;
            }
            if(this.psw != this.psw2){
                Toast.error('两次密码不一致！');
                return;
            }
            this.loading = Loading();
            let param = {
                password: this.psw,
                surePassword: this.psw2,
                oldPassWord: this.oldpsw,
            }
            updateLoginPsw(param).then(res => {
                this.loading.close();
                if(res.code == 1) {
                    Toast.success('密码修改成功！');
                    setTimeout(() => {
                        this.$router.push('/login?from=user');
                    }, 1500);
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name);
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器错误，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                Toast.error('未知异常！');
                console.log(err);
            })
        },
    },
    mounted() {
        
    }
}
Vue.use(Button);
Vue.use(TextField);
Vue.use(Snackbar);
Vue.use(Icon);
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
    }
}
.tip{
    padding: .1rem .15rem;
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
.update-login-psw .mu-input-content{
    padding: 0 .15rem;
}
.update-login-psw .mu-text-field-input{
    padding: .05rem 0 .05rem .1rem;
    height: .44rem;
    text-align: right;
}
.yzm-d .mu-text-field-input{
    padding: 0;
    height: .4rem;
    text-align: right;
}
.update-login-psw .yzm .mu-text-field-input{
    padding-right: 1.1rem;
    text-align: left;
}
.update-login-psw .mu-input-prefix-text{
    color: #000;
    letter-spacing: 1px;
    font-size: .16rem;
}
.update-login-psw .mu-input-line{
    background-color: #f3f3f3;
}
.update-login-psw .mu-input-help, .yzm-d .mu-input-help{
    display: none;
}
.yzm-d img{
    width: 1rem;
    height: .4rem;
    margin-right: .2rem;
}
</style>
