<template>
    <div id="pageContainer" class="login">
        <div class="box">
            <div class="logo">
                <img src="../assets/img/dsh.png" alt="logo">
            </div>
            <div class="item flex fcen spb">
                <mu-text-field v-model="account" @input="getAccount" placeholder="请输入登录手机号/会员名" class="inp" full-width underline-color="blue" prefix="账号"></mu-text-field>
            </div>
            <div class="item flex fcen spb">
                <mu-text-field type="password" v-model="psw" @input="getPsw" placeholder="请输入密码" class="inp" full-width underline-color="blue" prefix="密码"></mu-text-field>
            </div>
        </div>
        <div class="btns-wrapper">
            <mu-button @click="login" class="btn" :class="{ no: disabled }" color="#ff7421" textColor="#fff" full-width v-loading="loading" data-mu-loading-class="btn-load" data-mu-loading-size="20" data-mu-loading-text="正在登录">
                <span class="bold">登录</span>
            </mu-button>
        </div>
        <div class="forget txtR">
            <a href="" class="for-a">忘记密码</a>
        </div>

        <div class="quick-login">
            <p class="txt1 flex fcen">快捷登录</p>
            <div class="way flex">
                <a href="javascript:;" class="btn">
                    <mu-ripple class="rip">
                        <img src="../assets/img/wechat.png" alt="微信登录">
                        <p class="txt">微信登录</p>
                    </mu-ripple>
                </a>
                <a href="javascript:;" class="btn">
                    <mu-ripple class="rip">
                        <img src="../assets/img/dl_yzm.png" alt="验证码登录">
                        <p class="txt">验证码登录</p>
                    </mu-ripple>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Loading from 'muse-ui-loading';
import { TextField, Button } from 'muse-ui';
export default {
    data() {
        return {
            account: '',
            psw: '',
            disabled: true,
            loading: false,
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
            if(this.account && this.psw){
                this.disabled = false;
            }
        },
        login() {
            if(this.disabled) return;
            this.loading = true;
            
        }
    },
    mounted() {
        
    }
}
Vue.use(Loading);
Vue.use(TextField);
Vue.use(Button);
</script>

<style scoped lang="less">
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
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: .2rem 0 0;
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
