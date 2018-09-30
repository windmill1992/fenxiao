<template>
    <div id="pageContainer" class="share-reg">
        <div class="header">
            <p class="title">注册会员</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="top-bg">
                <img :src="imgHost +'/picture.png'" alt="regbg">
                <div class="mask">
                    <p class="txt bold">您的好友{{inviter}}</p>
                    <p class="txt2">邀请您成为会员!</p>
                </div>
                <a href="javascript:;" class="btns" :style="'background: url('+ imgHost +'/djzc.png) no-repeat 0 0 / 100% 100%;'" @click="toReg">
                    <span class="btn bold">点击注册</span>
                </a>
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
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            imgHost: imgHost,
            inviter: '',
            invitationCode: '',
        }
    },
    methods: {
        toReg() {
            if(!this.inviter || !this.invitationCode) {
                alert('邀请人不存在！');
                return;
            }
            this.$router.push({ name: 'register', query: { inviter: this.inviter, invitationCode: this.invitationCode } });
        }
    },
    mounted() {
        let { inviter, invitationCode } = this.$route.query;
        if(inviter && invitationCode){
            this.inviter = inviter;
            this.invitationCode = invitationCode;
        }else{
            alert('邀请人不存在！');
        }
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.top-bg{
    position: relative;
    img{
        width: 100%;
        height: auto;
        vertical-align: top;
    }
    .mask{
        position: absolute;
        height: .94rem;
        width: 100%;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, .5);
        color: #fff;
        padding: .05rem .15rem;
        .txt{
            font-size: .2rem;
        }
        .txt2{
            font-size: .16rem;
        }
    }
    .btns{
        height: .7rem;
        width: 100%;
        line-height: .62rem;
        position: absolute;
        bottom: -.4rem;
        left: 0;
        text-align: center;
        z-index: 9;
        .btn{
            display: block;
            color: #fff;
            font-size: .2rem;
        }
    }
}
</style>
