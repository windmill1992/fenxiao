<template>
    <div id="pageContainer" class="update-trade-psw">
        <div class="header">
            <p class="title">修改交易密码</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="item flex fcen spb">
                    <mu-text-field type="password" v-model="oldpsw" max-length="6" placeholder="请输入原始交易密码(6位数字)" class="inp" full-width underline-color="blue" prefix="原交易密码"></mu-text-field>
                </div>
                <div class="bb10"></div>
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
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { TextField, Button, Snackbar, Icon } from 'muse-ui';
import { updateTradePsw } from '../api/login';
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
            if(this.f) return;
            if(!this.oldpsw || this.psw.length != 6 || !Number.isInteger(Number(this.psw))){
                Toast.error('请输入正确的原交易密码！');
                return;
            }
            if(!this.psw || !this.psw2){
                Toast.error('请输入交易密码！');
                return;
            }
            if(this.psw.length != 6 || !Number.isInteger(Number(this.psw))){
                Toast.error({ message: '交易密码为6位数字！', time: 5000 });
                return;
            }
            if(this.psw != this.psw2){
                Toast.error('两次交易密码不一致！');
                return;
            }
            this.loading = Loading({ text: '请稍等...', target: document.getElementById('pageContainer') });
            this.f = true;
            updateTradePsw({ oldPassWord: this.oldpsw, password: this.psw, surePassword: this.psw2 }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    Toast.success('设置成功！');
                    setTimeout(() => {
                        this.$router.push('/setting');
                    }, 1000);
                }else if(res.code == 0){
                    this.$router.push('/login');
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
            })
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
    }
}
Vue.use(TextField);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Snackbar);
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
.update-trade-psw .mu-input-content{
    padding: 0 .15rem;
}
.update-trade-psw .mu-text-field-input{
    padding: .05rem 0 .05rem .1rem;
    height: .44rem;
    text-align: right;
}
.update-trade-psw .yzm .mu-text-field-input{
    padding-right: 1.1rem;
    text-align: left;
}
.update-trade-psw .mu-input-prefix-text{
    color: #000;
    letter-spacing: 1px;
    font-size: .16rem;
}
.update-trade-psw .mu-input-line{
    background-color: #f3f3f3;
}
</style>
