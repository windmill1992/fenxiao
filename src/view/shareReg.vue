<template>
    <div id="pageContainer" class="share-reg">
        <div class="wrapper">
            <div class="top-bg">
                <img :src="imgHost +'/reg_bg2.png'" alt="regbg">
                <div class="mask">
                    <p class="txt bold">您的好友{{inviter}}</p>
                    <p class="txt2">邀请您成为会员!</p>
                </div>
                <a href="javascript:;" class="btns" :style="'background: url('+ imgHost +'/djzc.png) no-repeat 0 0 / 100% 100%;'" @click="toReg"></a>
            </div>
            <div class="con">
                <img :src="imgHost + '/reg_con.png'" alt="">
            </div>
            <div class="dialog" :class="{show: open}">
                <div class="mask" @click="open = false"></div>
                <div class="dialog_inner" @click="open = false">
                    <img :src="imgHost + '/ios_share.png'" v-if="isSelf && isIos" alt="">
                    <img :src="imgHost + '/android_share.png'" v-else-if="isSelf && !isIos" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import { Button, Snackbar, Icon } from 'muse-ui';
import { imgHost } from '../api/baseUrl';
import { inviter } from '../api/user';
export default {
    data() {
        return {
            imgHost: imgHost,
            inviter: '',
            invitationCode: '',
            isSelf: false,
            isIos: false,
            open: false,
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
        toReg() {
            if(!this.invitationCode) {
                alert('邀请人不存在！');
                return;
            }
            this.$router.push({ name: 'register', query: { invitationCode: this.invitationCode } });
        }
    },
    mounted() {
        let { invitationCode } = this.$route.query;
        if(invitationCode){
            this.invitationCode = invitationCode;
            this.getData();
            if(localStorage.getItem('self') == 1){
                this.isSelf = true;
                this.open = true;
            }
            this.isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        }else{
            alert('邀请人不存在！');
        }
    }
}
Vue.use(Toast);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.wrapper{
    padding-top: 0;
}
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
        -webkit-tap-highlight-color: rgba(0, 0, 0, .05);
    }
}
.con{
    img{
        width: 100%;
        height: auto;
    }
}
.dialog{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    display: none;
    .mask{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .6);
        cursor: pointer;
    }
    .dialog_inner{
        position: absolute;
        left: 0;
        bottom: .2rem;
        width: 100%;
        cursor: pointer;
        img{
            width: 90%;
            height: auto;
            margin: 0 5%;
        }
    }
}
</style>
