<template>
    <div id="pageContainer" class="notice">
        <div class="header">
            <p class="title">{{title}}</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol" ref="wrapper">
            <mu-load-more class="box flex1 fcol" :loading="loading" @load="load" :refreshing="refreshing" @refresh="refresh">
                <div class="box" v-if="hasmore > 0">
                    <div class="item" v-for="item in list" :key="item.id">
                        <div class="time">{{item.createTime | fmt}}</div>
                        <div class="con">
                            <div class="title">{{item.title}}</div>
                            <div class="txt" v-if="item.content" v-html="item.content"></div>
                            <div class="txt" v-else>暂无内容</div>
                            <div class="link txtR">
                                <router-link :to="'/msgDetail/'+ item.id" class="link-a arr-r gray">查看详情</router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="no-data fcol spc fcen flex1" v-else>
                    <img :src="imgHost +'/error_zwxx.png'" alt="暂无消息">
                    <p class="txt">暂无{{title}}</p>
                </div>
                <div class="more no" v-if="hasmore == 1">没有更多数据了</div>
            </mu-load-more>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Loading from 'muse-ui-loading';
import Toast from 'muse-ui-toast';
import { LoadMore, Button, Snackbar, Icon } from 'muse-ui';
import { setTitle } from '../utils/setTitle';
import { msgList } from '../api/message';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            list: [],
            loading: false,
            title: '消息',
            page: 1,
            pageSize: 20,
            hasmore: -1,
            imgHost: imgHost,
            refreshing: false,
        }
    },
    methods: {
        getData() {
            msgList({ type: this.type, page: this.page, pageSize: this.pageSize }).then(res => {
                this.loading = false;
                this.loading2.close();
                this.refreshing = false;
                if(res.code == 1){
                    let r = res.data;
                    if(this.page == 1){
                        this.list = [];
                    }
                    let arr = [...this.list, ...r.resultData];
                    this.list = arr;
                    if(r.total == 0){
                        this.hasmore = 0;
                    }else if(r.total <= this.page * this.pageSize){
                        this.hasmore = 1;
                    }else{
                        this.hasmore = 2;
                    }
                }else if(res.code == 4){
                    this.hasmore = 0;
                    this.list = [];
                }else if(res.code == 2){
                    this.hasmore = 1;
                }else if(res.code == 0){
                    this.$router.push('/login');
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.loading = false;
                this.loading2.close();
                this.refreshing = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        load() {
            if(this.hasmore == 2 && !this.loading){
                this.loading = true;
                this.page++;
                this.getData();
            }
        },
        refresh() {
            this.refreshing = true;
            this.page = 1;
            this.getData();
        }
    },
    filters: {
        fmt(t) {
            let now = Date.now();
            let time = (now - t) / 1000;
            if (time > 0 && time <= 5) {
                return '刚刚';
            } 
            if (time > 5 && time < 60) {
                return time + '秒前';
            }
            if (time >= 60 && time < 3600) {
                return Number.parseInt(time / 60) + '分钟前';
            }
            if (time >= 3600 && time < 3600 * 24) {
                return Number.parseInt(time / 3600) + '小时前';
            }
            if (time >= 3600 * 24 && time < 3600 * 24 * 7) {
                return Number.parseInt(time / 3600 / 24) + '天前';
            }
            if (time >= 3600 * 24 * 7) {
                let dd = new Date(time);
                let y = dd.getFullYear();
                let m = dd.getMonth() + 1;
                let d = dd.getDate();
                m = m.toString()[1] ? m : ('0' + m);
                d = d.toString()[1] ? d : ('0' + d);
                return y + '-' + m + '-' + d;
            }
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
        let t = this.$route.query.type;
        if(!t){
            this.$router.replace({ path: '/notify' });
            return;
        }
        let title = '';
        switch(t) {
            case '1':
                title = '重要公告';
                break;
            case '2':
                title = '活动公告';
                break;
            case '3':
                title = '版本更新';
                break;
            case '4':
                title = '系统通知';
                break;
            case '5':
                title = '操作记录';
                break;
            default: title = '消息'
        }
        this.title = title;
        this.type = t;
        setTitle(title);

        this.loading2 = Loading({ target: document.getElementById('pageContainer') });
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
.box{
    padding-bottom: .2rem;
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
                /*! autoprefixer: off */
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 5;
                /*! autoprefixer: on */
                overflow: hidden;
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
