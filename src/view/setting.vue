<template>
    <div id="pageContainer" class="setting">
        <div class="header">
            <p class="title">设置</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <mu-ripple class="item flex fcen spb">
                <p class="label">个人资料</p>
                <p class="arr-r gray"></p>
            </mu-ripple>
            <div class="bb10"></div>
            <mu-ripple class="item flex fcen spb">
                <p class="label">微信登录</p>
                <p class="arr-r gray"><span class="txt">解绑</span></p>
            </mu-ripple>
            <mu-ripple class="item flex fcen spb">
                <p class="label">登录密码管理</p>
                <p class="arr-r gray"></p>
            </mu-ripple>
            <mu-ripple class="item flex fcen spb">
                <p class="label">交易密码管理</p>
                <p class="arr-r gray"><span class="txt">未设置</span></p>
            </mu-ripple>
            <div class="bb10"></div>
            <mu-ripple class="item flex fcen spb">
                <p class="label">客服电话</p>
                <p class="txt1">13345678963</p>
            </mu-ripple>
            <mu-ripple class="item flex fcen spb">
                <p class="label">公司简介</p>
                <p class="arr-r gray"></p>
            </mu-ripple>
            
            <div class="btns">
                <mu-button class="btn" full-width color="#ff7421" textColor="#fff" @click="logout">
                    <span class="bold">退出登录</span>
                </mu-button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Button, Helpers } from 'muse-ui';
export default {
    data() {
        return {

        }
    },
    methods: {
        logout() {
            
        }
    },
    mounted() {

    }
}
Vue.use(Helpers);
Vue.use(Button);
</script>

<style scoped lang="less">
.wrapper{
    border-top: 1px solid #f3f3f3;
}
.item{
    position: relative;
    background: #fff;
    line-height: .42rem;
    font-size: .16rem;
    color: #000;
    padding: 0 .15rem;
    border-top: 1px solid #f3f3f3;
    .txt{
        font-size: .14rem;
        color: #ff7421;
    }
    .txt1{
        font-size: .14rem;
        color: #9c9c9c;
    }
}
.btns{
    margin: .2rem .15rem;
    .btn{
        font-size: .18rem;
        height: .42rem;
        border-radius: .05rem;
        letter-spacing: 1px;
    }
}
</style>
