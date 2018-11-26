<template>
    <div id="pageContainer" class="customers">
        <div class="header">
            <p class="title">分销客户</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <mu-tabs :value.sync="active" color="white" indicator-color="#ff7421" full-width @change="switchTab">
                <mu-tab><span :class="{bold: active == 0}">全部</span></mu-tab>
                <mu-tab class="tab"><span :class="{bold: active == 1}">即将取消资格</span></mu-tab>
            </mu-tabs>

            <div class="op flex spb">
                <p>一阶分销客户: {{list.length}}人</p>
                <a href="javascript:;" class="flex fcen" @click="filterData">
                    <img src="../assets/img/shaixuan.png" alt="筛选">
                    <p class="txt">筛选</p>
                </a>
            </div>
            <div class="box flex1" v-loading="loading" v-if="list.length > 0">
                <div class="list">
                    <mu-ripple class="item flex fcen" v-for="item,index in list" :key="'cus' + index">
                        <div class="avatar fshrink0">
                            <img v-if="item.coverImageUrl" :src="item.coverImageUrl" alt="头像">
                            <img v-else :src="imgHost + '/def_tx.png'" alt="头像">
                        </div>
                        <div class="info flex1">
                            <p class="nick">
                                <span class="sp bold">{{item.userName}}<span class="tag">{{levels[item.level]}}</span></span>
                            </p>
                            <p class="txt">姓名: {{item.realName}}</p>
                            <p class="txt">手机号: {{item.mobileNum}}</p>
                        </div>
                    </mu-ripple>
                </div>
            </div>
            <div class="no-data flex1 fcol fcen spc" v-else>
                <img :src="imgHost +'/error_zanwusj.png'" alt="暂无数据">
                <p class="txt">您还没有<template v-if="levelsTxt[type]">{{levelsTxt[type]}}</template>分销客户</p>
            </div>
        </div>
        <div class="tabs-box" v-show="tabShow">
            <a href="javascript:;" class="mask" @click="closeTab"></a>
            <div class="con flex fwrap">
                <mu-button class="tab" :class="{ on: type == '-1' }" data-type="-1" @click="changTab">全部</mu-button>
                <mu-button class="tab" :class="{ on: type == '4' }" data-type="4" @click="changTab">合伙人</mu-button>
                <mu-button class="tab" :class="{ on: type == '3' }" data-type="3" @click="changTab">高级</mu-button>
                <mu-button class="tab" :class="{ on: type == '2' }" data-type="2" @click="changTab">中级</mu-button>
                <mu-button class="tab" :class="{ on: type == '1' }" data-type="1" @click="changTab">初级</mu-button>
                <mu-button class="tab" :class="{ on: type == '0' }" data-type="0" @click="changTab">会员</mu-button>
                <mu-button class="tab" :class="{ on: type == '-2' }" data-type="-2" @click="changTab">即将取消</mu-button>
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
import { Tabs, Button, Snackbar, Icon } from 'muse-ui';
import { customers } from '../api/user';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            active: 0,
            loading: false,
            tabShow: false,
            type: '-1',
            list: [],
            levels: ['会员', '初级', '中级', '高级', '合伙人'],
            levelsTxt: {
                '0': '会员',
                '1': '初级',
                '2': '中级',
                '3': '高级',
                '4': '合伙人',
            },
            imgHost: imgHost,
        }
    },
    methods: {
        getData() {
            if(this.type == '-2'){
                this.list = [];
                return;
            }
            this.loading = true;
            customers({ level: Number(this.type) }).then(res => {
                this.loading = false;
                if(res.code == 1){
                    this.list = res.data.oneUser;
                }else if(res.code == 4){
                    this.list = [];
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
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        changTab(e) {
            let { type } = $(e.target).closest('.tab')[0].dataset;
            this.type = type;
            this.tabShow = false;
            if(type != '-2') {
                this.active = 0;
            }else{
                this.active = 1;
            }
            this.getData();
        },
        switchTab() {
            if(this.active == 1){
                this.type = '-2';
            }else{
                this.type = '-1';
            }
            this.getData();
        },
        filterData() {
            this.tabShow = true;
        },
        closeTab() {
            this.tabShow = false;
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.getData();
    }
}
Vue.use(Loading);
Vue.use(Toast);
Vue.use(Tabs);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.mu-tab{
    font-size: .16rem;
    letter-spacing: 1px;
    position: relative;
    border-top: 1px solid #f3f3f3;
    &.tab::before{
        content: '';
        display: block;
        width: 1px;
        height: .22rem;
        background: #f3f3f3;
        position: absolute;
        left: 0;
        top: 50%;
        -webkit-transform: translate3d(0, -50%, 0);
        transform: translate3d(0, -50%, 0);
    }
}
.menus{
    background: #fff;
    border-top: 2px solid #f6f6f6;
    .menu{
        .rip{
            position: relative;
            padding: .15rem 0;
            text-align: center;
            img{
                height: .28rem;
                width: auto;
            }
            .txt{
                color: #000;
                font-size: .14rem;
            }
        }
    }
}
.op{
    background: #fff;
    border-top: 1px solid #f3f3f3;
    padding: 0 .15rem;
    height: .42rem;
    line-height: .42rem;
    font-size: .14rem;
    color: #000;
    img{
        height: .16rem;
        vertical-align: top;
        margin-right: .05rem;
    }
    .txt{
        color: #9c9c9c;
    }
}
.box{
    position: relative;
    .list{
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
    }
    .item{
        background: #fff;
        border-top: 1px solid #f3f3f3;
        padding: .1rem .15rem;
        position: relative;
        .avatar{
            width: .44rem;
            height: .44rem;
            background: #d8d8d8;
            border-radius: 100%;
            overflow: hidden;
            margin-right: .1rem;
            img{
                width: 100%;
                height: 100%;
                border-radius: inherit;
            }
        }
        .info{
            .nick{
                position: relative;
                font-size: .16rem;
                color: #000;
                display: inline-block;
                .sp{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                    height: .22rem;
                    line-height: .22rem;
                    padding-right: .55rem;
                    position: relative;
                    word-break: break-all;
                }
                .tag{
                    position: absolute;
                    right: 0;
                    top: 50%;
                    -webkit-transform: translate3d(0, -50%, 0);
                    transform: translate3d(0, -50%, 0);
                    color: #ff7421;
                    border: 1px solid #ff7421;
                    border-radius: .04rem;
                    padding: 0 .05rem;
                    line-height: .16rem;
                    font-size: .12rem;
                    font-weight: 400;
                }
            }
            .txt{
                color: #555;
                font-size: .14rem;
                margin-top: .05rem;
            }
        }
    }
}
.tabs-box{
    position: fixed;
    top: .45rem;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 199;
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
            width: .7rem;
            height: .26rem;
            line-height: .24rem;
            min-width: auto;
            color: #000;
            font-size: .13rem;
            border: 1px solid #c9c9c9;
            border-radius: .05rem;
            text-align: center;
            margin-bottom: .15rem;
            margin-right: .2rem;
            z-index: 19;
            white-space: nowrap;
            -webkit-tap-highlight-color: rgba(0, 0, 0, .05);
            &.on{
                color: #fff;
                background: #ff7421;
            }
            &:nth-child(4n){
                margin-right: 0;
            }
        }
    }
}
</style>
<style>
.customers .mu-tabs{
    color: #555;
}
.customers .mu-tab-active{
    color: #000;
}
.customers .mu-tab-link-highlight{
    width: 1.22rem!important;
    left: 24.5%;
    margin-left: -.61rem;
}
</style>