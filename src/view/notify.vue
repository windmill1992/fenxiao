<template>
    <div id="pageContainer" class="notice">
        <div class="header">
            <p class="title">通知中心</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol" ref="wrapper">
            <mu-load-more class="box flex1 fcol" @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
                <div class="box" v-if="list.length > 0">
                    <div class="item flex spb">
                        <div class="con flex fcen">
                            <div class="icon fshrink0">
                                <img src="../assets/img/gonggao.png" alt="重要公告">
                            </div>
                            <div class="info flex1">
                                <div class="title">重要公告</div>
                                <div class="txt">《瘦身小知识》</div>
                            </div>
                        </div>
                        <div class="time">1天前</div>
                    </div>
                    <div class="item flex spb">
                        <div class="con flex fcen">
                            <div class="icon fshrink0">
                                <img src="../assets/img/activity.png" alt="活动公告">
                            </div>
                            <div class="info flex1">
                                <div class="title">活动公告</div>
                                <div class="txt">意见征集表</div>
                            </div>
                        </div>
                        <div class="time">1天前</div>
                    </div>
                    <div class="item flex spb">
                        <div class="con flex fcen">
                            <div class="icon fshrink0">
                                <img src="../assets/img/update.png" alt="版本更新">
                            </div>
                            <div class="info flex1">
                                <div class="title">版本更新</div>
                                <div class="txt">1.0版本发布啦！</div>
                            </div>
                        </div>
                        <div class="time">1天前</div>
                    </div>
                    <div class="item flex spb">
                        <div class="con flex fcen">
                            <div class="icon fshrink0">
                                <img src="../assets/img/xitong.png" alt="系统通知">
                            </div>
                            <div class="info flex1">
                                <div class="title">系统通知</div>
                                <div class="txt">暂无消息</div>
                            </div>
                        </div>
                        <div class="time">1天前</div>
                    </div>
                    <div class="item flex spb">
                        <div class="con flex fcen">
                            <div class="icon fshrink0">
                                <img src="../assets/img/jilu.png" alt="操作记录">
                            </div>
                            <div class="info flex1">
                                <div class="title">操作记录</div>
                                <div class="txt">xxx注册啦！</div>
                            </div>
                        </div>
                        <div class="time">1天前</div>
                    </div>
                </div>
                <div class="no-data fcol spc fcen flex1" v-else>
                    <img src="../assets/img/error_zwxx.png" alt="暂无消息">
                    <p class="txt">暂无消息</p>
                </div>
            </mu-load-more>
        </div>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Loading from 'muse-ui-loading';
import { LoadMore } from 'muse-ui';
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
        this.loading2 = Loading();
        this.getData();
    }
}
Vue.use(Loading);
Vue.use(LoadMore);
</script>

<style scoped lang="less">
.box{
    border-top: 1px solid #f3f3f3;
    background: #fff;
    .item{
        padding: .1rem .15rem;
        border-top: 1px solid #f3f3f3;
        .time{
            color: #c9c9c9;
            font-size: .12rem;
        }
        .con{
            .icon{
                width: .35rem;
                height: .35rem;
                overflow: hidden;
                margin-right: .1rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .title{
                font-size: .16rem;
                color: #000;
            }
            .txt{
                font-size: .14rem;
                color: #9c9c9c;
            }
        }
    }
}
.no-data{
    img{
        width: 1.96rem;
        height: 1.25rem;
    }
    .txt{
        font-size: .16rem;
        color: #9c9c9c;
        margin-top: .2rem;
    }
}
</style>
