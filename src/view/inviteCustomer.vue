<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">邀请客户</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="bb10"></div>
            <mu-ripple class="item">
                <router-link class="link flex fcen spb" to="">
                    <div class="left flex fcen">
                        <img src="../assets/img/shinvite.png" alt="邀请">
                        <p class="txt">邀请</p>
                    </div>
                    <div class="arrow-r"></div>
                </router-link>
            </mu-ripple>
            <div class="bb10"></div>
            <mu-ripple class="item">
                <router-link class="link flex fcen spb" to="">
                    <div class="left flex fcen">
                        <img src="../assets/img/dsh.png" alt="待审核">
                        <p class="txt">待审核</p>
                    </div>
                    <div class="arrow-r"></div>
                </router-link>
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
    mounted() {
        
    }
}
Vue.use(Helpers);
</script>

<style scoped lang="less">
.item{
    position: relative;
    padding: 0 .15rem;
    height: .55rem;
    background: #fff;
    .link{
        height: .55rem;
        .left{
            img{
                width: .35rem;
                height: .35rem;
                border-radius: 5px;
            }
            p{
                font-size: .16rem;
                color: #000;
                margin-left: .1rem;
            }
        }
    }
}
</style>
