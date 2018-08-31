<template>
    <div id="pageContainer" class="trade-psw-manage">
        <div class="header">
            <p class="title">登录密码管理</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <mu-ripple class="item flex fcen spb" @click="updateLoginPsw">
                <p class="label">修改登录密码</p>
                <p class="arr-r gray"></p>
            </mu-ripple>
            <mu-ripple class="item flex fcen spb" @click="forgetLoginPsw">
                <p class="label">忘记登录密码</p>
                <p class="arr-r gray"></p>
            </mu-ripple>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Helpers } from 'muse-ui';
export default {
    data() {
        return {
            
        }
    },
    methods: {
        updateLoginPsw() {
            this.$router.push('/updateLoginPsw');
        },
        forgetLoginPsw() {
            this.$router.push('/resetPsw');
        }
    },
    mounted() {
        
    }
}
Vue.use(Helpers);
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
}
</style>
