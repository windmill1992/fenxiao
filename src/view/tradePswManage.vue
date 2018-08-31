<template>
    <div id="pageContainer" class="trade-psw-manage">
        <div class="header">
            <p class="title">交易密码管理</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <mu-ripple class="item flex fcen spb" @click="addTradePsw" v-if="!isEdit">
                <p class="label">新增交易密码</p>
                <p class="arr-r gray"></p>
            </mu-ripple>
            <template v-else>
                <mu-ripple class="item flex fcen spb" @click="updateTradePsw">
                    <p class="label">修改交易密码</p>
                    <p class="arr-r gray"></p>
                </mu-ripple>
                <mu-ripple class="item flex fcen spb" @click="forgetTradePsw">
                    <p class="label">忘记交易密码</p>
                    <p class="arr-r gray"></p>
                </mu-ripple>
            </template>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Helpers } from 'muse-ui';
export default {
    data() {
        return {
            isEdit: false,
        }
    },
    methods: {
        addTradePsw() {
            this.$router.push('/setTradePsw');
        },
        updateTradePsw() {
            this.$router.push('/updateTradePsw');
        },
        forgetTradePsw() {
            this.$router.push('/forgetTradePsw');
        }
    },
    mounted() {
        this.isEdit = this.$route.params.edit;
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
