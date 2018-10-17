<template>
    <div id="pageContainer" class="team-sales">
        <div class="header">
            <p class="title">我的补贴</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <mu-load-more class="flex1 fcol" :loading="loading" @load="load">
                <div class="top">
                    <div class="date-sel flex spc">
                        <a href="javascript:;" class="sel">{{info.monthTime}}</a>
                    </div>
                    <div class="point-box">
                        <div class="point">
                            <span class="num bold">￥{{info.rewardMoney}}</span>
                        </div>
                        <p class="txt">未结算</p>
                    </div>
                </div>
                <div class="bb10"></div>
                <div class="box">
                    <div class="th flex spb">
                        <p class="td">时间</p>
                        <p class="td txtC">团队补贴</p>
                        <p class="td txtR">积分补贴</p>
                    </div>
                </div>
                <div class="box" v-if="hasmore != 0">
                    <div class="th flex spb" v-for="item in list" :key="'all'+ item.id">
                        <p class="td flex fcen">{{item.monthTime}}</p>
                        <p class="td txtC">￥{{item.teamReward}}</p>
                        <p class="td txtR">{{item.integralReward}} ({{item.rewardScale == 1 ? '100%' : (item.rewardScale == 2 ? '80%' : '0%')}})</p>
                    </div>
                </div>
                <div class="box flex1 fcol" v-else>
                    <div class="no-data fcol spc fcen flex1" v-if="list.length == 0">
                        <img :src="imgHost + '/error_zanwusj.png'" alt="暂无数据">
                        <p class="txt">暂无补贴数据</p>
                    </div>
                </div>
                <p class="no-more" v-if="hasmore == 1">没有更多数据了</p>
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
import { Button, Snackbar, Icon, LoadMore } from 'muse-ui';
import { imgHost } from '../api/baseUrl';
import { myAllowance } from '../api/user';
import { util } from '../utils/base';

export default {
    data() {
        return {
            loading: false,
            list: [],
            imgHost: imgHost,
            hasmore: -1,
            page: 1,
            pageSize: 12,
            info: {
                money: 0,
                time: '',
            },
        }
    },
    methods: {
        getData() {
            this.loading2 = Loading({ target: document.getElementById('pageContainer') });
            myAllowance({ pageNum: this.page, pageSize: this.pageSize }).then(res => {
                this.loading2.close();
                this.loading = false;
                if(res.code == 1){
                    let r = res.data;
                    if(this.page == 1){
                        this.list = [];
                    }
                    this.money = res.data2;
                    if(r.total == 0){
                        this.hasmore = 0;
                    }else if(r.total <= this.page * this.pageSize){
                        this.hasmore = 1;
                    }else{
                        this.hasmore = 2;
                    }
                    this.list = [...this.list, ...r.resultData];
                    this.info = res.data2;
                }else if(res.code == 4){
                    this.hasmore = 0;
                    this.list = [];
                    this.money = 0;
                }else if(res.code == 2){
                    this.hasmore = 1;
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name);
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
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        load() {
            if(this.hasmore != 2 || this.loading) return;
            this.page++;
            this.loading = true;
            this.getData();
        }
    },
    filters: {
        fmt(t) {
            return util.formatTime(t).substr(6);
        }
    },
    mounted() {
        const dd = new Date();
        const year = dd.getFullYear().toString();
        let month = dd.getMonth() + 1;
        month = month < 10 ? '0' + month : month.toString();
        this.time = `${year}年${month}月`;
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
.top{
    height: 1.4rem;
    background-image: linear-gradient(-183deg, #F87500 2%, #FEA04B 78%);
    .date-sel{
        height: .44rem;
        line-height: .44rem;
        font-size: .16rem;
        .sel{
            color: #fff;
            letter-spacing: 1px;
        }
    }
    .point-box{
        padding: .15rem;
        text-align: center;
        .txt{
            color: #fff;
            font-size: .14rem;
            margin-top: .15rem;
        }
        .point{
            color: #fff;
            line-height: 1;
            .num{
                font-size: .3rem;
            }
        }
    }

}
.box{
    border-top: 1px solid #f3f3f3;
    position: relative;
    .list{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: #fff;
    }
    .th{
        background: #fff;
        line-height: .42rem;
        padding: 0 .15rem;
        border-bottom: 1px solid #f3f3f3;
        .td{
            color: #555;
        }
    }
    .td{
        width: 25%;
        font-size: .12rem;
        color: #000;
        white-space: nowrap;
        img{
            width: .24rem;
            height: .24rem;
            margin-right: 5px;
        }
    }
}
</style>
