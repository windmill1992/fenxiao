<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">{{title}}</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="top">
                <img src="../assets/img/bk.png" alt="商品">
                <p class="title bold">饼干套餐换饮料</p>
            </div>
            <p class="tip">您将减少</p>
            <div class="con flex fcen spb">
                <p class="txt">饼干套组方案</p>
                <p class="txt arr-r gray flex fcen">x3</p>
            </div>
            <p class="tip">您将发出</p>
            <div class="con flex fcen spb">
                <p class="txt">饮料套组方案</p>
                <p class="txt arr-r gray flex fcen">x1</p>
            </div>
            <p class="warn">*健康季,健康好礼换购(但请注意，换购后不能再换回原来的套餐,也不能退换货)换购产品限时限量</p>

            <mu-button class="btn" full-width color="#ff7421" textColor="#fff" @click="exchange">
                <span class="bold">确认换货</span>
            </mu-button>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Button } from 'muse-ui';
export default {
    data() {
        return {
            title: '换货',
        }
    },
    methods: {
        exchange() {
            
        }
    },
    mounted() {
        
    }
}
Vue.use(Button);
</script>

<style scoped lang="less">
.top{
    border-top: 2px solid #f6f6f6;
    background: #fff;
    position: relative;
    img{
        width: 100%;
        vertical-align: top;
    }
    .title{
        font-size: .24rem;
        color: #000;
        padding: .1rem .15rem;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, .3);
    }
}
.tip{
    line-height: .34rem;
    padding: 0 .15rem;
    font-size: .14rem;
    color: #ff7421;
}
.con{
    background: #fff;
    line-height: .42rem;
    padding: 0 .15rem;
    color: #000;
    font-size: .16rem;
}
.warn{
    padding: .15rem;
    color: #ff7421;
    font-size: .12rem;
}
.btn{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .48rem;
    font-size: .16rem;
    letter-spacing: 1px;
}
</style>
