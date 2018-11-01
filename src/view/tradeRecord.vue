<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">交易记录</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <div class="hd-tab">
                <div class="tabs flex">
                    <p class="on flex1">{{typeName}}</p>
                    <a href="javascript:;" class="tab flex1 flex fcen spc" @click="showTab">分类<span class="arr"></span></a>
                </div>
            </div>
            <mu-load-more class="box flex1 fcol" :loading="loading" @load="load" :refreshing="refreshing" @refresh="refresh">
                <div class="list" v-if="hasmore != 0">
                    <div class="item" :class="{nav: (item.type == 1 && item.payType == 6) || item.type == 3}" v-for="item,index in list" :key="item.id" @click="detail(index)">
                        <div class="top flex spb">
                            <div class="title" :class="{green: item.state == 202}">{{item.inTypeChinese}}<span class="state"> ({{stateTxt[item.state]}})</span></div>
                            <div class="price" v-if="item.type != 1 && item.type != 4">-{{item.money}}</div>
                            <div class="price red" v-else>+{{item.money}}</div>
                        </div>
                        <div class="mid" v-if="item.type == 3">预计3个工作日到账(周末和节假日顺延)</div>
                        <div class="bot flex spb">
                            <p class="time">{{item.lastUpdateTime | fmt}}</p>
                            <p class="money">余额：{{item.balance != null ? item.balance : '---'}}</p>
                        </div>
                    </div>
                </div>
                 <div class="no-data flex1 fcol fcen spc" v-else>
                    <img :src="imgHost + '/error_zanwusj.png'" alt="暂无交易记录">
                    <p class="txt">您还没有相关消费记录</p>
                </div>
                <div class="no-more" v-if="hasmore == 1">没有更多数据了</div>
            </mu-load-more>
        </div>
        <div class="tabs-box" v-show="tabShow">
            <a href="javascript:;" class="mask" @click="closeTab"></a>
            <div class="con flex spb">
                <mu-button class="tab" :class="{ on: type == '' }" data-type="" data-name="全部" @click="changTab">全部</mu-button>
                <mu-button class="tab" :class="{ on: type == 1 }" data-type="1" data-name="充值" @click="changTab">充值</mu-button>
                <mu-button class="tab" :class="{ on: type == 2 }" data-type="2" data-name="支出" @click="changTab">支出</mu-button>
                <mu-button class="tab" :class="{ on: type == 3 }" data-type="3" data-name="提现" @click="changTab">提现</mu-button>
                <mu-button class="tab" :class="{ on: type == 4 }" data-type="4" data-name="系统退回" @click="changTab">系统退回</mu-button>
            </div>
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
import { myTradeRecord } from '../api/user';
import { imgHost } from '../api/baseUrl';
import { util } from '../utils/base';
export default {
    data() {
        return {
            list: [],
            hasmore: -1,
            imgHost: imgHost,
            tabShow: false,
            type: '',
            typeName: '全部',
            page: 1,
            pageSize: 20,
            loading: false,
            stateTxt: {
                '201': '未完成',
                '202': '成功',
                '203': '失败',
                '204': '待打款',
                '205': '待处理',
            },
            refreshing: false,
        }
    },
    methods: {
        getData() {
            this.loading2 = Loading({ target: document.getElementById('pageContainer') });
            myTradeRecord({ pageNum: this.page, pageSize: this.pageSize, type: this.type }).then(res => {
                if(this.loading2){
                    this.loading2.close();
                }
                this.loading = false;
                this.refreshing = false;
                if(res.code == 1){
                    if(this.page == 1){
                        this.list = [];
                    }
                    let r = res.data;
                    this.list = [...this.list, ...r.resultData];
                    if(r.total == 0){
                        this.hasmore = 0;
                    }else if(r.total <= this.page * this.pageSize){
                        this.hasmore = 1;
                    }else{
                        this.hasmore = 2;
                    }
                }else if(res.code == 4){
                    this.list = [];
                    this.hasmore = 0;
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
                this.loading2.close();
                this.loading = false;
                this.refreshing = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        changTab(e) {
            let { type, name } = $(e.target).closest('.tab')[0].dataset;
            this.typeName = name;
            this.type = type;
            this.tabShow = false;
            this.page = 1;
            this.getData();
        },
        showTab() {
            this.tabShow = !this.tabShow;
        },
        closeTab() {
            this.tabShow = false;
        },
        load() {
            if(this.hasmore != 2) return;
            this.loading = true;
            this.page++;
            this.getData();
        },
        refresh() {
            this.refreshing = true;
            this.page = 1;
            this.getData();
        },
        detail(index) {
            let a = this.list[index];
            if(a.type == 3){
                this.$router.push('/withdrawDetail/'+ a.payNum);
            }else if(a.type == 1 && a.payType == 6){
                this.$router.push('/rechargeDetail/'+ a.payNum);
            }
        },
    },
    filters: {
        fmt(t) {
            return util.formatTime(t);
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
        if(this.isWx){
            wx.miniProgram.getEnv(res => {
				if(!res.miniprogram){
					$('.hd-tab').css({ 'top': 0 });
                    $('.tabs-box').css({ 'top': '.72rem' });
				}
			});
        }
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
.hd-tab{
    border-top: 1px solid #f6f6f6;
    background: #fff;
    padding: .15rem;
    position: fixed;
    top: .45rem;
    left: 0;
    width: 100%;
    z-index: 9;
    .tabs{
        height: .32rem;
        line-height: .3rem;
        font-size: .14rem;
        border: 1px solid #ff7421;
        border-radius: .05rem;
        overflow: hidden;
        text-align: center;
        .on{
            color: #fff;
            background: #ff7421;
        }
        .tab{
            color: #ff7421;
            -webkit-tap-highlight-color: rgba(0, 0, 0, .05);
            .arr{
                display: inline-block;
                width: 0;
                height: 0;
                border-top: .08rem solid #ff7421;
                border-right: .08rem solid transparent;
                border-left: .08rem solid transparent;
                margin-left: .05rem;
                border-radius: .04rem;
            }
        }
    }
}
.box{
    margin-top: .72rem;
    background: #fff;
    .item{
        background: #fff;
        padding: .1rem .15rem;
        border-bottom: 1px solid #f3f3f3;
        &.nav{
            background: rgba(128, 169, 240, .2);
        }
        .top{
            margin-bottom: 5px;
            .title{
                font-size: .16rem;
                color: #ff4521;
                word-break: break-all;
                max-width: 66%;
                &.green{
                    color: #47883d;
                }
                .state{
                    color: #ff4521;
                    font-size: .12rem;
                }
            }
            .price{
                font-size: .14rem;
                color: #47883d;
                &.red{
                    color: #ff4521;
                }
            }
        }
        .mid{
            font-size: .14rem;
            color: #9c9c9c;
        }
        .bot{
            margin-top: 5px;
            font-size: .14rem;
            color: #9c9c9c;
        }
    }
}
.tabs-box{
    position: fixed;
    top: .45rem;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    border-top: 1px solid #f6f6f6;
    .mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .7);
    }
    .con{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: #fff;
        padding: .15rem .15rem 0;
        overflow: hidden;
        .tab{
            width: .6rem;
            height: .26rem;
            line-height: .24rem;
            min-width: auto;
            color: #000;
            font-size: .12rem;
            border: 1px solid #c9c9c9;
            border-radius: .05rem;
            text-align: center;
            margin-bottom: .15rem;
            white-space: nowrap;
            z-index: 19;
            -webkit-tap-highlight-color: rgba(0, 0, 0, .05);
            &.on{
                color: #fff;
                background: #ff7421;
            }
        }
    }
}
</style>
