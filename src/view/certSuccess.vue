<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">认证成功</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <img src="../assets/img/tongguos.png" alt="success">
                <p class="txt">资格认证成功！</p>
                <p class="txt1">您可以继续进行提现资质认证</p>
                <p class="txt1">该认证通过后方可收到货款</p>
            </div>
            <div class="btns">
                <mu-ripple class="btn" @click="toOrder">
                    <a href="javascript:;" class="btn-a btn1">立即订货</a>
                </mu-ripple>
                <mu-ripple class="btn">
                    <a href="javascript:;" class="btn-a btn2">提现资质认证</a>
                </mu-ripple>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Helpers from 'muse-ui/lib/Helpers';
export default {
    data() {
        return {

        }
    },
    methods: {
        toOrder() {
            this.$router.push();
        }
    }
}
Vue.use(Helpers);
</script>

<style scoped lang="less">
.box{
    text-align: center;
    padding: .45rem 0 .2rem;
    img{
        width: 1.16rem;
        height: 1.16rem;
    }
    .txt{
        font-family: 'PingFangSC-Medium';
        font-size: .24rem;
        color: #000;
        font-weight: 600;
        letter-spacing: 1px;
        margin-top: .1rem;
        margin-bottom: .1rem;
    }
    .txt1{
        font-size: .14rem;
        color: #555;
    }
}
.btns{
    margin-top: .2rem;
    padding: 0 .15rem;
    .btn{
        position: relative;
        .btn-a{
            display: block;
            width: 100%;
            height: .42rem;
            line-height: .42rem;
            text-align: center;
            color: #fff;
            font-size: .16rem;
            font-family: 'PingFangSC-Medium';
            font-weight: 600;
            border-radius: .05rem;
            background: #ff7421;
            letter-spacing: 1px;
            &.btn2{
                color: #ff7421;
                border: 1px solid #ff7421;
                line-height: .4rem;
                margin-top: .15rem;
                background: transparent;
            }
        }
    }
}
</style>
