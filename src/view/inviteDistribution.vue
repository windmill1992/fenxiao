<template>
    <div id="pageContainer" class="invite-dist">
        <div class="wrapper">
            <div class="top-bg">
                <img :src="imgHost + '/bk.png'" alt="bk">
                <a href="javascript:;" class="back-a" onclick="history.go(-1)"></a>
            </div>
            <div class="card" :style="'background: url('+ imgHost +'/yqfxkh.png) no-repeat 0 0 / 100% 100%;'">
                <p class="txt">邀请更多人一起创业</p>
                <p class="txt2 bold">大健康之路在此起航!</p>
                <div class="share-box flex">
                    <a href="javascript:;" class="item" @click="showShare">
                        <img src="../assets/img/wechat.png" alt="微信好友">
                        <p>微信好友</p>
                    </a>
                    <a href="javascript:;" class="item" @click="showShare">
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
        <div class="share-dialog" :class="{show: showDialog}">
            <div class="mask"></div>
            <div class="con" @click="showDialog = false;">
                <img src="../assets/img/hand.png" class="hand" />
                <div class="txt">
                    <p class="flex fcen">1.点击右上角的<img src="../assets/img/dot.png" class="dot"></p>
                    <p>2.您可转发至朋友圈、QQ空间</p>
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
import { myCode } from '../api/user';
import VueClipboard from 'vue-clipboard2';
export default {
    data() {
        return {
            imgHost: imgHost,
            inviteCode: '',
            showDialog: false,
        }
    },
    methods: {
        getData() {
            let host = location.protocol + "//" + location.hostname;
            let url = location.href;
            if(this.isWx && !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && localStorage.getItem('ios') != 1){
                localStorage.setItem('ios', 1);
                location.href = host + '/inviteDistribution';
                return;
            }
            myCode({ url: url }).then(res => {
                localStorage.removeItem('ios');
                if(res.code == 1){
                    this.inviteCode = res.data.code;
                    this.inviter = res.data.userName;
                    let share = {
                        "img_url": `${imgHost}/logo.png`,
                        "link": `${host}/shareReg?inviter=${this.inviter}&invitationCode=${this.inviteCode}`,
                        "desc": `您的好友${this.inviter}邀请您注册成为经销商啦~`,
                        "title": "享瘦伴侣",
                    }
                    if(this.isWx){
                        wx.config({
                            debug: false,
                            appId: res.data2.appId,
                            nonceStr: res.data2.nonceStr,
                            signature: res.data2.signature,
                            timestamp: res.data2.timeStamp,
                            jsApiList: ["updateTimelineShareData", "updateAppMessageShareData", "onMenuShareTimeline", "onMenuShareAppMessage"],
                        });
                        wx.ready(function(){
                            wx.checkJsApi({
                                jsApiList: [
                                    'updateAppMessageShareData',
                                    'updateTimelineShareData',
                                    'onMenuShareAppMessage',
                                    'onMenuShareTimeline'
                                ],
                                success: function(res) {
                                    console.log(res);
                                    let r = res.checkResult;
                                    if(r.updateAppMessageShareData){
                                        wx.updateAppMessageShareData({
                                            imgUrl: share.img_url,
                                            link: share.link,
                                            desc: share.desc,
                                            title: share.title,
                                        });
                                    }
                                    if(r.updateTimelineShareData){
                                        wx.updateTimelineShareData({
                                            imgUrl: share.img_url,
                                            link: share.link,
                                            title: share.title,
                                        });
                                    }
                                    if(r['menu:share:appmessage'] || r.onMenuShareAppMessage){
                                        wx.onMenuShareAppMessage({
                                            imgUrl: share.img_url,
                                            link: share.link,
                                            desc: share.desc,
                                            title: share.title,
                                        });
                                    }
                                    if(r['menu:share:timeline'] || r.onMenuShareTimeline){
                                        wx.onMenuShareTimeline({
                                            imgUrl: share.img_url,
                                            link: share.link,
                                            title: share.title,
                                        });
                                    }
                                }
                            });
                        });
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
                sessionStorage.removeItem('ios');
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        showShare() {
            this.showDialog = true;
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
        if(this.isWx && (navigator.userAgent.indexOf('Android') > -1 || u.indexOf('Linux') > -1)){
            Toast.info('安卓微信版本6.7.2部分机型分享功能暂不可用，请升级或降低版本！');
        }
    },
}
Vue.use(Toast);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(VueClipboard);
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
    }
    .back-a{
        position: absolute;
        top: .2rem;
        left: .15rem;
        width: .15rem;
        height: .15rem;
        border-left: 2px solid #fff;
        border-bottom: 2px solid #fff;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
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
.share-dialog{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    .mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .6);
    }
    .con{
        color: #fff;
        font-size: .16rem;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
        .txt{
            max-width: 1.57rem;
            position: absolute;
            top: 1.1rem;
            right: .2rem;
        }
        .hand{
            width: .53rem;
            height: .9rem;
            position: absolute;
            top: .05rem;
            right: .3rem;
        }
        .dot{
            width: .23rem;
            height: .17rem;
            margin-left: .05rem;
        }
    }
}
</style>
