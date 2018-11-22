<template>
    <div id="pageContainer" class="register">
        <div class="header">
            <p class="title">申请注册</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="item flex fcen spb">
                    <mu-text-field v-model="inviter" max-length="20" placeholder="邀请人" class="inp" full-width underline-color="blue" prefix="邀请人" readonly></mu-text-field>
                </div>
                <div class="error">*请核实邀请人是否正确,会员只能和一个邀请人(购买)关联,无法再修改!</div>
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="mobile" placeholder="请输入手机号" class="inp" full-width underline-color="blue" prefix="手机号"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="code" placeholder="请输入验证码" class="inp yzm" max-length="6" full-width underline-color="blue" prefix="验证码"></mu-text-field>
                    <a href="javascript:;" class="code-a" v-if="loading2" v-loading="loading2" data-mu-loading-size="20"></a>
                    <a href="javascript:;" class="code-a" @click="getCode" v-else-if="!waiting">获取验证码</a>
                    <a href="javascript:;" class="code-a no" v-else>{{time}}s重新获取</a>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field v-model="uname" placeholder="用户名不可修改,请谨慎输入" class="inp" full-width underline-color="blue" prefix="会员名"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="password" v-model="psw" placeholder="密码建议数字和字母组合使用" class="inp" full-width underline-color="blue" prefix="密码"></mu-text-field>
                </div>
                <p class="tip">*密码不少于6位且只能以字母或下划线开头，可以包含~!@#$%^&*-_'.?等特殊符号，不能包含中文！</p>
            </div>
            <div class="prot">
                <mu-checkbox label="我已阅读并同意" v-model="protocol" color="#ff7421"></mu-checkbox>
                <router-link to="/help/manage_term" class="link">《众康科诺经营规则》</router-link>
                <router-link to="/help/register_term" class="link">《众康科诺商城服务协议》</router-link>
                <router-link to="/help/basic_standard" class="link">《经销商服务规范》</router-link>
                <router-link to="/help/illegal_term" class="link">《经销商违规行为及处理规则》</router-link>
                <router-link to="/help/disclaimer" class="link">《免责声明》</router-link>
            </div>
            <div class="btns-wrapper">
                <mu-button class="btn" full-width :color="protocol ? '#ff7421' : '#ccc'" textColor="#fff" @click="submit">
                    <span class="bold">注册</span>
                </mu-button>
            </div>
            <p class="to-index">已是会员？<router-link to="/" class="link">前往经销中心</router-link></p>
        </div>
        <mu-dialog title="验证码" width="360" :open.sync="openYzm" dialog-class="yzm-d">
            <div class="flex fcen spb">
                <img :src="yzmUrl" alt="验证码">
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
import { regist, getMobileCode, isRegistered } from '../api/login';
import { inviter } from '../api/user';
import { baseUrl } from '../api/baseUrl';
import { pswReg } from '../utils/pswReg';
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
            loading2: false,
            loading3: false,
            time: 60,
            waiting: false,
            yzmUrl: '',
        }
    },
    methods: {
        getData() {
            inviter({ code: this.invitationCode }).then(res => {
                if(res.code == 1) {
                    this.inviter = res.data.userName;
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
        getCode() {
            if(!this.mobile || !this.$util.telValidate(this.mobile)){
                Toast.error('请输入正确的手机号！');
                return;
            }
            this.loading2 = true;
            isRegistered({ mobile: this.mobile }).then(res => {
                this.loading2 = false;
                if(res.code == 1){
                    this.freshCode();
                    this.openYzm = true;
                    setTimeout(() => {
                        $('.yzm-d .inp-yzm2').focus();
                    }, 500);
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
            this.yzmUrl = `${baseUrl}/user/register/code?t=`+ Date.now();
        },
        sureYzm() {
            if(!this.yzmCode || this.yzmCode.length != 4){
                Toast.error('验证码错误！');
                return;
            }
            this.closeDialog();
            getMobileCode({ mobile: this.mobile, code: this.yzmCode, type: 'register' }).then(res => {
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
            if(!this.protocol){
                return;
            }
            if(this.loading2 || this.loading3) return;
            if(!this.mobile || !this.$util.telValidate(this.mobile)){
                Toast.error('请输入正确的手机号！');
                return;
            }
            if(!this.code || !Number.isInteger(Number(this.code))){
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
            if(!pswReg.test(this.psw)){
                Toast.error({ message: '密码格式错误！', time: 2000 });
                return;
            }
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            this.loading3 = true;
            let param = {
                invitationCode: this.invitationCode,
                mobileNum: this.mobile,
                phoneCode: this.code,
                userName: this.uname,
                password: this.psw,
            }
            regist(param).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    Toast.success('注册成功，正在跳转...');
                    setTimeout(() => {
                        this.$router.push('/regSuc');
                    }, 1000);
                }else{
                    this.loading3 = false;
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.loading.close();
                this.loading3 = false;
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
        this.invitationCode = this.$route.query.invitationCode;
        this.getData();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
}
Vue.use(Toast);
Vue.use(Loading);
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
            font-size: .14rem;
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
            font-size: .14rem;
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
.mu-checkbox{
    height: 16px;
    line-height: 16px;
    top: 5px;
}
.prot{
    padding: .15rem .15rem 0;
    font-size: .12rem;
    vertical-align: bottom;
    .link{
        color: #579bd6;
        line-height: 22px;
        vertical-align: top;
    }
}
.btns-wrapper{
    margin-top: .15rem;
    padding: 0 .15rem;
    .btn{
        height: .42rem;
        font-size: .16rem;
        border-radius: .05rem;
        letter-spacing: 1px;
    }
}
.tip{
    margin-top: .2rem;
    padding: 0 .15rem .1rem;
    color: #ff7421;
    font-size: .14rem;
}
.to-index{
    text-align: center;
    color: #9c9c9c;
    font-size: .12rem;
    margin: .15rem 0;
    .link{
        color: #ff7421;
        text-decoration: underline;
    }
}
</style>
<style>
.register .mu-checkbox-wrapper{
    height: 14px;
}
.register .mu-input-content{
    padding: 0 .15rem;
}
.register .mu-text-field-input{
    padding: .05rem 0 .05rem .1rem;
    height: .44rem;
    text-align: right;
}
.register .yzm .mu-text-field-input{
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
.register .mu-checkbox-label{
    color: #000;
}
.register .mu-checkbox-icon{
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
    margin-right: 0;
}
</style>
