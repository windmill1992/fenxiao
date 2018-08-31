<template>
    <div id="pageContainer" class="notice">
        <div class="header">
            <p class="title">重要公告</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol" ref="wrapper">
            <mu-load-more class="box flex1 fcol" @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
                <div class="box" v-if="list.length > 0">
                    <div class="item">
                        <div class="time">1天前</div>
                        <div class="con">
                            <div class="title">瘦身小知识</div>
                            <div class="txt">瘦身饼干啦啦啦</div>
                            <div class="link txtR">
                                <a href="" class="link-a arr-r gray">查看详情</a>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="time">1天前</div>
                        <div class="con">
                            <div class="title">瘦身小知识</div>
                            <div class="txt">瘦身饼干啦啦啦</div>
                            <div class="link txtR">
                                <a href="" class="link-a arr-r gray">查看详情</a>
                            </div>
                        </div>
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
    .item{
        padding: 0 .15rem;
        .time{
            line-height: .42rem;
            text-align: center;
            color: #9c9c9c;
            font-size: .12rem;
        }
        .con{
            background: #fff;
            border-radius: .05rem;
            border: 1px solid #f3f3f3;
            .title{
                font-size: .16rem;
                color: #000;
                padding: .1rem;
            }
            .txt{
                font-size: .14rem;
                color: #9c9c9c;
                border-top: 1px solid #f3f3f3;
                padding: .1rem;
            }
            .link{
                line-height: .42rem;
                padding: 0 .1rem;
                .link-a{
                    color: #9c9c9c;
                    font-size: .12rem;
                }
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
