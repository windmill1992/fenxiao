<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">注册成功</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <div class="top">
                <p class="title">欢迎您加入众康科诺</p>
                <p class="txt">成为经销商之前，您还不能订货，请尽快联系上阶审核</p>
            </div>
            <div class="box flex1" :style="'background-image: url('+ imgHost +'/reg_bg.png)'">
                <div class="btns">
                    <mu-button class="btn" href="/" color="#ff7421" textColor="#fff" full-width>立即订货</mu-button>
                </div>
                <div class="qr-box fcol fcen">
                    <a><img :src="imgHost + '/qrcode.jpg'" alt="公众号"></a>
                    <p class="txt1">扫一扫关注公众号</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Button } from 'muse-ui';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            imgHost: imgHost,
        }
    },
    methods: {
        
    },
    mounted() {
        this.isWx = this.$util.isWx();
    }
}
Vue.use(Button);
</script>

<style scoped lang="less">
.top{
    border-top: 2px solid #f6f6f6;
    background: #fff;
    padding: .15rem;
    .title{
        color: #ff7421;
        text-align: center;
        font-size: .2rem;
    }
    .txt{
        font-size: .14rem;
        color: #ff7421;
        margin-top: .05rem;
    }
}
.box{
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 0 0;
    .btns{
        margin-top: .45rem;
        padding: 0 .15rem;
        .btn{
            font-size: .16rem;
            height: .43rem;
            line-height: .43rem;
            border-radius: .05rem;
        }
    }
    .qr-box{
        margin-top: 1.75rem;
        img{
            width: 1.14rem;
            height: 1.14rem;
            vertical-align: top;
        }
        .txt1{
            font-size: .12rem;
            color: #fff;
            margin-top: .1rem;
        }
    }
}
</style>
