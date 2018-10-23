<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">换货记录</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol" ref="wrapper">
            <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load" class="flex1">
                <div class="list">
                    <a href="" class="item">
                        <mu-ripple class="box flex fcen spb">
                            <div class="left">
                                <p class="title">饼干套组</p>
                                <p class="time">2018-08-23 10:11:56</p>
                            </div>
                            <div class="arr-r gray"></div>
                        </mu-ripple>
                    </a>
                    <a href="" class="item">
                        <mu-ripple class="box flex fcen spb">
                            <div class="left">
                                <p class="title">饼干套组</p>
                                <p class="time">2018-08-23 10:11:56</p>
                            </div>
                            <div class="arr-r gray"></div>
                        </mu-ripple>
                    </a>
                    <a href="" class="item">
                        <mu-ripple class="box flex fcen spb">
                            <div class="left">
                                <p class="title">饼干套组</p>
                                <p class="time">2018-08-23 10:11:56</p>
                            </div>
                            <div class="arr-r gray"></div>
                        </mu-ripple>
                    </a>
                </div>
            </mu-load-more>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { LoadMore, Button, Snackbar, Icon } from 'muse-ui';
export default {
    data() {
        return {
            list: [],
            loading: false,
            refreshing: false,
        }
    },
    methods: {
        getData() {
            setTimeout(() => {
                this.loading2.close();
            }, 2000);
        },
        refresh() {
            this.refreshing = true;
            this.$refs.wrapper.scrollTop = 0;
            this.getData();
            setTimeout(() => {
                this.refreshing = false;
            }, 2000)
        },
        load() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000)
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.loading2 = Loading();
        this.getData();
    }
}
Vue.use(Loading);
Vue.use(LoadMore);
Vue.use(Toast);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.list{
    border-top: 1px solid #f3f3f3;
    background: #fff;
    .item{
        border-top: 1px solid #f3f3f3;
        line-height: 1;
        display: block;
        .box{
            padding: .15rem;
            position: relative;
        }
        .title{
            font-size: .16rem;
            color: #000;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }
        .time{
            font-size: .12rem;
            color: #9c9c9c;
            margin-top: .1rem;
        }
    }
}
</style>
