<template>
    <div id="pageContainer" class="certification">
        <div class="header">
            <p class="title">实名认证</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <p class="tip">身份证上传</p>
            <div class="box">
                <p class="txt">请按照图文指示上传</p>
                <p class="txt1">注册人姓名:张三</p>
                <label for="zm" class="item zm"></label>
                <input type="file" id="zm" class="file-input">
                <p class="txt2">点击上传身份证正面</p>

                <label for="fm" class="item fm"></label>
                <input type="file" id="fm" class="file-input">
                <p class="txt2">点击上传身份证反面</p>

                <label for="sc" class="item sc"></label>
                <input type="file" id="sc" class="file-input">
                <p class="txt2">点击上传手持身份证正面</p>
            </div>
            
            <p class="tip">银行卡上传</p>
            <div class="box">
                <label for="bank" class="item bank"></label>
                <input type="file" id="bank" class="file-input">
                <p class="txt2">点击上传银行卡正面</p>
            </div>

            <mu-ripple class="btns" @click="submit">
                <a href="javascript:;" class="btn bold">立即认证</a>
            </mu-ripple>
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
        submit() {
            console.log('submit');
        }
    }
}
Vue.use(Helpers);
</script>

<style scoped lang="less">
.tip{
    line-height: .5rem;
    padding: 0 .15rem;
    color: #000;
    font-weight: 600;
    font-family: 'PingFangSC-Medium';
    font-size: .16rem;
}
.box{
    background: #fff;
    padding: .1rem .15rem .15rem;
    .txt{
        color: #555;
        font-size: .14rem;
    }
    .txt1{
        color: #ff7421;
        font-size: .14rem;
        margin: .05rem 0;
    }
    .item{
        display: block;
        width: 100%;
        height: 1.95rem;
        border: 1px solid #979797;
        border-radius: .1rem;
        margin-top: .15rem;
        &.sc{
            height: 2.8rem;
        }
        &.bank{
            height: 1.8rem;
        }
    }
    .file-input{
        display: none;
    }
    .txt2{
        font-size: .16rem;
        color: #ff7421;
        margin-top: .15rem;
        text-align: center;
        font-family: 'PingFangSC-Medium';
        font-weight: 500;
    }
}
.btns{
    width: 100%;
    height: .48rem;
    position: relative;
    .btn{
        display: block;
        line-height: .48rem;
        text-align: center;
        color: #fff;
        font-size: .18rem;
        background: #ff7421;
    }
}
</style>
<style>
.certification .item{
    background-size: 80% 90%;
    background-position: center;
    background-repeat: no-repeat;
}
.certification .zm{
    background-image: url(../assets/img/sfzzhengmian.png);
}
.certification .fm{
    background-image: url(../assets/img/sfzbeimian.png);
}
.certification .sc{
    background-image: url(../assets/img/shouchisfz.png);
}
.certification .bank{
    background-image: url(../assets/img/creditcard.png);
}
</style>
