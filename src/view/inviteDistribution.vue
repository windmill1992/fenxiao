<template>
    <div id="pageContainer" class="invite-dist">
        <div class="header">
            <p class="title">邀请分销客户</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="top-bg">
                <img src="../assets/img/bk.png" alt="bk">
            </div>
            <div class="card">
                <p class="txt">邀请更多人一起创业</p>
                <p class="txt2">大健康之路在此起航!</p>
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
                <p class="title">邀请说明</p>
                <p class="txt">1.邀请好友注册成功后，请您在经销中心→邀请客户→待审核下进行分销客户审核。</p>
                <p class="txt">2.一旦审核通过后，双方关系确定，将无法调整。</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            share: {},
        }
    },
    methods: {
        wxSendAppMessage() {
            if(this.isWx){
                WeixinJSBridge.invoke('shareTimeline',{
                    "img_url": this.share.imgUrl,
                    "link": this.share.link,
                    "desc": this.share.desc,
                    "title": this.share.title,
                });
            }else{
                alert('请在微信浏览器打开链接！');
            }
        },
        wxShareTimeline() {
            if(this.isWx){
                WeixinJSBridge.invoke('sendAppMessage',{
                    "img_url": this.share.imgUrl,
                    "link": this.share.link,
                    "desc": this.share.desc,
                    "title": this.share.title,
                });
            }else{
                alert('请在微信浏览器打开链接！');
            }
        },
        copyLink() {
            
        },
        qrcodeInvite() {
            
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
    }
}
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
        font-weight: 600;
        color: #000;
        font-family: 'PingFangSC-Medium';
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
        font-family: 'PingFangSC-Medium';
        line-height: .4rem;
        border-bottom: 1px solid #c9c9c9;
        margin-bottom: .15rem;
        font-weight: 600;
    }
    .txt{
        font-size: .14rem;
        color: #9c9c9c;
        margin-top: .1rem;
    }
}
</style>
<style>
.invite-dist .card{
    background: url(../assets/img/yqfxkh.png) no-repeat 0 0 / 100% 100%;
}
</style>
