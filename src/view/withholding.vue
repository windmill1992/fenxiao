<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">扣款通知</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <mu-ripple class="tip flex fcen spb" @click="showState = true;">
                <div class="left flex fcen">
                    <img src="../assets/img/info.png" alt="提示">
                    <p>关于补缴说明！</p>
                </div>
                <p class="right flex fcen arr-r ff7">去看看</p>
            </mu-ripple>
            <mu-load-more class="box flex1 fcol" :refreshing="refreshing" :loading="loading" @refresh="refresh" @load="load">
                <div class="list" v-if="hasmore != 0">
                    
                </div>
                <div class="no-data flex1 fcol fcen spc" v-else>
                    <img :src="imgHost + '/error_zanwujf.png'" alt="暂无扣款通知记录">
                    <p class="txt">暂无扣款通知记录</p>
                </div>
            </mu-load-more>
        </div>
        
        <transition name="fade">
            <div class="statement" v-show="showState">
                <p class="title">补缴说明</p>
                <p class="txt">当产生扣款记录时，所有的收益（分销贷款、零售贷款、退款、市场补贴、当前余额）都会自动进行补缴，直到补缴金额为0</p>
                <p class="txt">应补缴金额为0时方可订发货</p>
                <p class="txt">应补缴金额：已扣款金额-已补缴金额</p>
                <div class="btns">
                    <mu-button class="btn" color="#ff7421" textColor="#fff" full-width @click="close">我知道了</mu-button>
                </div>
                <div class="close-box">
                    <mu-ripple class="close" @click="close">
                        <img src="../assets/img/close2.png" alt="关闭">
                    </mu-ripple>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { Button, Snackbar, Icon, LoadMore } from 'muse-ui';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            refreshing: false,
            loading: false,
            page: 1,
            pageSize: 20,
            list: [],
            hasmore: -1,
            imgHost: imgHost,
            showState: false,
        }
    },
    methods: {
        getData() {
            this.hasmore = 0;
        },
        refresh() {
            this.refreshing = true;
            this.page = 1;
            this.getData();
        },
        load() {
            if(this.hasmore != 2) return;
            this.loading = true;
            this.page++;
            this.getData();
        },
        close() {
            this.showState = false;
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.getData();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(LoadMore);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.tip{
    position: fixed;
    top: .45rem;
    left: 0;
    width: 100%;
    background: #feefbc;
    font-size: .14rem;
    color: #ff7421;
    padding: .1rem .15rem;
    img{
        width: .16rem;
        height: .16rem;
        margin-right: 3px;
    }
}
.box{
    margin-top: .41rem;
    .list{
        background: #fff;
    }
    .item{
        padding: .1rem .15rem;
    }
}
.statement{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    z-index: 9999;
    overflow: hidden;
    .title{
        font-size: .2rem;
        color: #000;
        letter-spacing: 1px;
        margin-top: 1rem;
        padding-bottom: .3rem;
        border-bottom: 1px solid #ddd;
        margin-bottom: .4rem;
        text-align: center;
    }
    .txt{
        font-size: .14rem;
        color: #9c9c9c;
        line-height: 1.6;
        margin-top: .25rem;
        padding: 0 .3rem 0 .45rem;
        position: relative;
        &::before{
            content: '';
            display: inline-block;
            width: .05rem;
            height: .05rem;
            background: #9c9c9c;
            border-radius: 100%;
            position: absolute;
            top: .08rem;
            left: .3rem;
        }
    }
    .btns{
        padding: 0 .3rem;
        margin-top: .4rem;
        .btn{
            font-size: .16rem;
            letter-spacing: 2px;
            height: .44rem;
            border-radius: .06rem;
        }
    }
    .close-box{
        width: .4rem;
        height: .4rem;
        position: absolute;
        top: .2rem;
        right: .25rem;
        border-radius: 100%;
        overflow: hidden;
        .close{
            position: relative;
        }
        img{
            width: .25rem;
            height: .25rem;
            margin: .08rem;
        }
    }
}
</style>
