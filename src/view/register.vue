<template>
    <div id="pageContainer" class="register">
        <div class="header">
            <p class="title">申请注册</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="item flex fcen spb">
                    <mu-text-field v-model="inviter" placeholder="邀请人" class="inp" full-width underline-color="blue" prefix="邀请人"></mu-text-field>
                </div>
                <div class="error">*请核实邀请人是否正确,会员只能和一个邀请人(购买)关联,无法再修改!</div>
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="mobile" placeholder="请输入手机号" class="inp" full-width underline-color="blue" prefix="手机号"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="code" placeholder="请输入验证码" class="inp yzm" max-length="6" full-width underline-color="blue" prefix="验证码"></mu-text-field>
                    <a href="javascript:;" class="code-a" @click="getCode" v-if="!waiting">获取验证码</a>
                    <a href="javascript:;" class="code-a no" v-else>{{time}}s重新获取</a>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field v-model="uname" placeholder="用户名不可修改,请谨慎输入" class="inp" full-width underline-color="blue" prefix="会员名"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="password" v-model="psw" placeholder="密码建议数字和字母组合使用" class="inp" full-width underline-color="blue" prefix="密码"></mu-text-field>
                </div>
            </div>
            <div class="prot flex fcen">
                <mu-checkbox label="我已阅读并同意" v-model="protocol" color="#ff7421"></mu-checkbox>
                <a href="" class="link">《用户协议》</a>
            </div>
            <div class="btns-wrapper">
                <mu-button class="btn" full-width color="#ff7421" textColor="#fff" @click="submit">
                    <span class="bold">注册</span>
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
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import Vue from 'vue';
import Loading from 'muse-ui-loading';
import Toast from 'muse-ui-toast';
import { TextField, Checkbox, Dialog, Snackbar, Button, Icon } from 'muse-ui';
export default {
    data() {
        return {
            protocol: true,
            inviter: '',
            mobile: '',
            code: '',
            uname: '',
            psw: '',
            yzmCode: '',
            openYzm: false,
            loading: false,
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
            if(!this.mobile || this.$util.telValidate(this.mobile)){
                Toast.error('请输入正确的手机号！');
                return;
            }
            if(!this.code || !Number.isInteger(this.code)){
                Toast.error('手机验证码错误！');
                return;
            }
            if(!this.uname){
                Toast.error('请输入会员名！');
                return;
            }
            if(!this.psw){
                Toast.error('请输入密码！');
                return;
            }
            if(this.psw.length < 6 || !Number.isNaN(Number.parseInt(this.psw))){
                Toast.error({ message: '密码不能少于6位且不能以数字开头！', time: 5000 });
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
    .error{
        color: #f00;
        font-size: .12rem;
        padding: .1rem .15rem;
        background: #f6f6f6;
        letter-spacing: 1px;
    }
}
.prot{
    padding: .15rem .15rem 0;
    font-size: .12rem;
    .link{
        color: #ff7421;
        line-height: 24px;
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
.register .mu-input-content{
    padding: 0 .15rem;
}
.register .mu-input-content .mu-text-field-input{
    padding: .05rem 0 .05rem .1rem;
    height: .44rem;
    text-align: right;
}
.register .yzm .mu-input-content .mu-text-field-input{
    padding-right: 1.1rem;
}
.register .mu-input-content .mu-input-prefix-text{
    color: #000;
    min-width: .6rem;
    letter-spacing: 1px;
}
.register .mu-input-content .mu-input-line{
    background-color: #f3f3f3;
    left: .15rem;
}
.register .mu-input-content .mu-input-focus-line {
    left: .15rem;
}
.register .mu-input-help, .yzm-d .mu-input-help{
    display: none;
}
.register .mu-checkbox-label{
    color: #000;
}
.register .mu-checkbox-icon{
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
    margin-right: 0;
}
</style>
