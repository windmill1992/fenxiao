<template>
    <div id="pageContainer" class="share-reg">
        <div class="header">
            <p class="title">注册会员</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="top-bg">
                <img src="../assets/img/picture.png" alt="regbg">
                <div class="mask">
                    <p class="txt">您的好友Brocong</p>
                    <p class="txt2">邀请您成为会员!</p>
                </div>
                <div class="btns">
                    <a href="javascript:;" class="btn">点击注册</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
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
            font-family: 'PingFangSC-Medium';
            font-weight: 600;
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
            font-family: 'PingFangSC-Medium';
            font-weight: 600;
        }
    }
}
</style>
<style>
.share-reg .btns{
    background: url(../assets/img/djzc.png) no-repeat 0 0 / 100% 100%;
}
</style>
