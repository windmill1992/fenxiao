<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">认证成功</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <img :src="imgHost +'/tongguos.png'" alt="success">
                <p class="txt bold">资格认证成功！</p>
                <p class="txt1">认证通过后方可收到货款</p>
            </div>
            <div class="btns">
                <mu-ripple class="btn" @click="toOrder">
                    <a href="javascript:;" class="btn-a btn1 bold">立即订货</a>
                </mu-ripple>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            imgHost: imgHost,
        }
    },
    methods: {
        toOrder() {
            this.$router.push('/orderArea');
        }
    }
}
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
        font-size: .24rem;
        color: #000;
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
        display: block;
        position: relative;
        .btn-a{
            display: block;
            width: 100%;
            height: .42rem;
            line-height: .42rem;
            text-align: center;
            color: #fff;
            font-size: .16rem;
            border-radius: .05rem;
            background: #ff7421;
            letter-spacing: 1px;
            position: relative;
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
