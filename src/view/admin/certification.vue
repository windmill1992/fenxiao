<template>
    <div id="pageContainer">
        <div class="wrapper">
            <div class="box">
                <div class="item flex fcen">
                    <p class="label">用户名：</p>
                    <p class="txt">{{info.userName}}</p>
                </div>
                <div class="item flex fcen">
                    <p class="label">真实姓名：</p>
                    <p class="txt">{{info.realName}}</p>
                </div>
                <div class="item flex fcen">
                    <p class="label">身份证号码：</p>
                    <p class="txt">{{info.idCard}}</p>
                </div>
                <div class="item flex fcen">
                    <p class="label">手机号：</p>
                    <p class="txt">{{info.mobileNum}}</p>
                </div>
                <div class="item flex fcen">
                    <p class="label">开户名：</p>
                    <p class="txt">{{info.accName}}</p>
                </div>
                <div class="item flex fcen">
                    <p class="label">开户行：</p>
                    <p class="txt">{{info.accountName}}</p>
                </div>
                <div class="item flex fcen">
                    <p class="label">银行卡号：</p>
                    <p class="txt">{{info.card}}</p>
                </div>
                <div class="item flex fcen">
                    <p class="label">处理状态：</p>
                    <p class="state" v-if="info.powerState == 102">待审核</p>
                    <p class="state" v-else-if="info.powerState == 101">待提交</p>
                    <p class="state" v-else-if="info.powerState == 103">审核通过</p>
                    <p class="state" v-else-if="info.powerState == 104">审核不通过</p>
                </div>
                <div class="item">
                    <p class="label">身份证照片：</p>
                    <a class="preview"><img :src="info.idfaceUrl" alt="身份证照片"></a>
                </div>
            </div>
            <div class="btns flex spc" v-if="info.powerState == 102">
                <mu-button class="btn" color="#ff7421" textColor="#fff" @click="openSure = true;">审核</mu-button>
            </div>
        </div>
        <mu-dialog :open.sync="openSure" dialog-class="admin-cert-d" width="315" max-width="90%">
            <p class="txt">个人信息真实无误后再审核通过</p>
            <div class="btns1 flex">
                <mu-ripple class="btn" @click="submit(0)">不通过</mu-ripple>
                <mu-ripple class="btn btn1" @click="submit(1)">确认通过</mu-ripple>
            </div>
        </mu-dialog>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { Button, Snackbar, Icon, Dialog } from 'muse-ui';
import { certInfo, certification } from '../../api/admin';
import { util } from '../../utils/base';
export default {
    data() {
        return {
            openSure: false,
            info: {},
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            certInfo({ userId: this.uid }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1) {
                    this.info = res.data;
                }else if(res.code == 10036){
                    Toast.error(res.msg);
                    this.$router.replace('/');
                }else if(res.code == 0){
                    this.$router.replace('/login?admin=certification_'+ this.uid);
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
        submit(f) {
            let t = f == 1 ? '103' : '104';
            this.openSure = false;
            this.loading = Loading({ text: '正在提交...', target: document.getElementById('pageContainer') });
            certification({ userId: this.uid, type: t }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    Toast.success('操作成功！');
                    window.location.reload();
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
    filters: {
        fmt(t) {
            if(!t) return '';
            return util.formatTime(t, '-');
        },
    },
    mounted() {
        this.uid = this.$route.params.uid;
        this.getData();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Icon);
</script>

<style scoped lang="less">
.wrapper{
    padding-bottom: .3rem;
    padding-top: 0;
}
.box{
    border-top: 2px solid #f6f6f6;
    background: #fff;
    .item{
        border-bottom: 1px solid #f3f3f3;
        padding: .1rem .15rem;
        font-size: .16rem;
        color: #000;
        .label{
            min-width: 1.1rem;
        }
        .txt{
            font-size: .14rem;
        }
        .state{
            font-size: .14rem;
            color: #ff7421;
        }
        .preview{
            display: block;
            width: 100%;
            overflow: hidden;
        }
        img{
            width: 100%;
            max-width: 100%;
            height: auto;
            vertical-align: top;
        }
    }
}
.btns{
    margin-top: .4rem;
    .btn{
        width: 1.4rem;
        max-width: 150px;
        height: .38rem;
        font-size: .16rem;
        letter-spacing: 1px;
    }
}
.admin-cert-d{
    .txt{
        padding: .15rem;
        font-size: .16rem;
    }
    .btns1{
        border-top: 1px solid #f3f3f3;
        margin-top: .1rem;
        .btn{
            width: 100%;
            text-align: center;
            font-size: .16rem;
            color: #555;
            position: relative;
            height: .44rem;
            line-height: .44rem;
        }
        .btn1{
            color: #ff7421;
            &::after{
                content: '';
                display: inline-block;
                width: 1px;
                height: .44rem;
                position: absolute;
                left: 0;
                top: 0;
                background: #f3f3f3;
            }
        }
    }
}
</style>
<style>
.admin-cert-d{
    border-radius: .05rem;
}
.admin-cert-d .mu-dialog-body{
    padding: 0;
    color: #000;
}
</style>
