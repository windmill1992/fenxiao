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
                <mu-ripple class="btn" @click="linkto">
                    <a href="javascript:;" class="btn-a btn1 bold" v-if="hasHigh">立即订货</a>
                    <a href="javascript:;" class="btn-a btn1 bold" v-else>返回首页</a>
                </mu-ripple>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { integral } from '../api/user';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            imgHost: imgHost,
            hasHigh: false,
        }
    },
    methods: {
        getData() {
            integral().then(res => {
                if(res.code == 1){
                    if(res.data.highLevelId || res.data.highLevelId == 0){
                        this.hasHigh = true;
                    }
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
        linkto() {
            if(this.hasHigh){
                this.$router.replace('/orderArea');
            }else{
                this.$router.replace('/');
            }
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
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
