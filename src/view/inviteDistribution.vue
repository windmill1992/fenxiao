<template>
    <div id="pageContainer" class="invite-dist">
        <div class="header">
            <p class="title">邀请分销客户</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="top-bg">
                <img :src="imgHost + '/bk.png'" alt="bk">
            </div>
            <div class="card" :style="'background: url('+ imgHost +'/yqfxkh.png) no-repeat 0 0 / 100% 100%;'">
                <p class="txt">邀请更多人一起创业</p>
                <p class="txt2 bold">大健康之路在此起航!</p>
                <div class="share-box flex">
                    <a href="javascript:;" class="item" @click="wxSendAppMessage">
                        <img src="../assets/img/wechat.png" alt="微信好友">
                        <p>微信好友</p>
                    </a>
                    <a href="javascript:;" class="item" @click="wxShareTimeline">
                        <img src="../assets/img/pyq.png" alt="朋友圈">
                        <p>朋友圈</p>
                    </a>
                    <a href="javascript:;" class="item" @click="copyLink">
                        <img src="../assets/img/link.png" alt="复制链接">
                        <p>复制链接</p>
                    </a>
                    <a href="javascript:;" class="item" @click="qrcodeInvite">
                        <img src="../assets/img/erweima.png" alt="二维码邀请">
                        <p>二维码邀请</p>
                    </a>
                </div>
            </div>
            <div class="intro">
                <p class="title bold">邀请说明</p>
                <p class="txt">1.邀请好友注册成功后，请您在经销中心→邀请客户→待审核下进行分销客户审核。</p>
                <p class="txt">2.一旦审核通过后，双方关系确定，将无法调整。</p>
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
import { myCode } from '../api/user';
import VueClipboard from 'vue-clipboard2';
export default {
    data() {
        return {
            share: {},
            imgHost: imgHost,
            inviteCode: '',
            wxConfig: {},
        }
    },
    methods: {
        getData() {
            let host = location.protocol + "//" + location.hostname;
            myCode({ url: location.href }).then(res => {
                if(res.code == 1){
                    this.inviteCode = res.data.code;
                    this.inviter = res.data.userName;
                    this.wxConfig = res.data2;
                    this.share = {
                        "img_url": "",
                        "link": `${host}/shareReg?inviter=${this.inviter}&invitationCode=${this.inviteCode}`,
                        "desc": `您的好友${this.inviter}邀请您注册成为经销商啦~`,
                        "title": "享瘦伴侣",
                    }
                    if(this.isWx){
                        wx.config({
                            appId: res.data2.appId,
                            nonceStr: res.data2.nonceStr,
                            signature: res.data2.signature,
                            timestamp: res.data2.timeStamp,
                            jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"],
                        })
                    }
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
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        wxSendAppMessage() {
            const _this = this;
            if(this.isWx){
                wx.ready(function(){
                    // WeixinJSBridge.invoke('sendAppMessage',{
                    //     "img_url": _this.share.imgUrl,
                    //     "link": _this.share.link,
                    //     "desc": _this.share.desc,
                    //     "title": _this.share.title,
                    // });
                    wx.onMenuShareAppMessage({
                        "img_url": _this.share.imgUrl,
                        "link": _this.share.link,
                        "desc": _this.share.desc,
                        "title": _this.share.title,
                    })
                })
            }else{
                alert('请在微信浏览器打开链接！');
            }
        },
        wxShareTimeline() {
            const _this = this;
            if(this.isWx){
                wx.ready(function(){
                    // WeixinJSBridge.invoke('shareTimeline',{
                    //     "img_url": _this.share.imgUrl,
                    //     "link": _this.share.link,
                    //     "desc": _this.share.desc,
                    //     "title": _this.share.title,
                    // });
                    wx.onMenuShareTimeline({
                        "img_url": _this.share.imgUrl,
                        "link": _this.share.link,
                        "desc": _this.share.desc,
                        "title": _this.share.title,
                    })
                })
            }else{
                alert('请在微信浏览器打开链接！');
            }
        },
        copyLink() {
            let link = location.hostname + '/shareReg?invitationCode='+ this.inviteCode +'&inviter='+ this.inviter;
            this.$copyText(link).then(e => {
                Toast.success('链接复制成功！');
            }, err => {
                Toast.error('链接复制失败！');
                console.log(err);
            })
        },
        qrcodeInvite() {
            this.$router.push('/myQrcode');
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.getData();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(VueClipboard);
</script>

<style scoped lang="less">
.top-bg{
    img{
        width: 100%;
        height: auto;
    }
}
.card{
    position: relative;
    margin: 0 .1rem;
    padding: .2rem .1rem .25rem;
    text-align: center;
    top: -.5rem;
    .txt{
        font-size: .16rem;
        color: #000;
        letter-spacing: 1px;
    }
    .txt2{
        font-size: .2rem;
        color: #000;
        letter-spacing: 1px;
        margin-top: .05rem;
    }
    .share-box{
        margin-top: .15rem;
        .item{
            color: #555;
            font-size: .12rem;
            width: 25%;
            img{
                width: .47rem;
                height: .47rem;
            }
        }
    }
}
.intro{
    padding: 0 .15rem;
    .title{
        font-size: .16rem;
        color: #555;
        text-align: center;
        line-height: .4rem;
        border-bottom: 1px solid #c9c9c9;
        margin-bottom: .15rem;
    }
    .txt{
        font-size: .14rem;
        color: #9c9c9c;
        margin-top: .1rem;
    }
}
</style>
