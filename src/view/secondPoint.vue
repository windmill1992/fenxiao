<template>
    <div id="pageContainer" class="second-point">
        <div class="header">
            <p class="title">二阶积分</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <mu-load-more class="flex1 fcol" :loading="loading" @load="load">
                <div class="top">
                    <div class="date-sel flex spc">
                        <a href="javascript:;" class="sel bold flex fcen" @click="openSheet">{{year}}年{{month}}月</a>
                    </div>
                    <div class="point-box">
                        <div class="flex fcen spb">
                            <p class="txt">二阶积分</p>
                        </div>
                        <div class="point">
                            <span class="num bold">{{point}}</span>
                        </div>
                    </div>
                </div>
                <div class="tip">积分详情</div>
                <div class="box">
                    <div class="th flex spb">
                        <p class="td">会员名</p>
                        <p class="td">推荐人</p>
                        <p class="td txtC">奖励积分</p>
                        <p class="td txtR">时间</p>
                    </div>
                </div>
                <div class="box" v-if="hasmore != 0">
                    <div class="th flex spb" v-for="item in list" :key="'second'+ item.id">
                        <p class="td">{{item.secondUserName}}</p>
                        <p class="td">{{item.firstUserName}}</p>
                        <p class="td txtC">{{item.num}}</p>
                        <p class="td txtR">{{item.createTime | fmt}}</p>
                    </div>
                </div>
                <div class="box flex1 fcol" v-else>
                    <div class="no-data fcol spc fcen flex1" v-if="list.length == 0">
                        <img :src="imgHost + '/error_zanwusj.png'" alt="暂无数据">
                        <p class="txt">暂无数据</p>
                    </div>
                </div>
                <p class="no-more" v-if="hasmore == 1">没有更多数据了</p>
            </mu-load-more>
        </div>
        <mu-bottom-sheet :open.sync="open" class="date-container">
            <div class="btn-box flex spb">
                <a href="javascript:;" class="btn-a cancel" @click="closeSheet">取消</a>
                <a href="javascript:;" class="btn-a sure" @click="sureSelect">确定</a>
            </div>
            <mu-slide-picker :slots="dateSlots" :visible-item-count="7" @change="dateChange" :values="dates"></mu-slide-picker>
        </mu-bottom-sheet>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { SlidePicker, BottomSheet, Button, Snackbar, Icon, LoadMore } from 'muse-ui';
import { imgHost } from '../api/baseUrl';
import { secondPoint } from '../api/user';
import { util } from '../utils/base';

const dates = {};
const dd = new Date();
const year = dd.getFullYear().toString();
let month = dd.getMonth() + 1;
month = month < 10 ? '0' + month : month.toString();
const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
(() => {
    let [start, end] = [2010, year];
    for (let i = start; i <= end; i++) {
        dates[i] = months;
    }
})();
export default {
    data() {
        return {
            open: false,
            loading: false,
            dateSlots: [{
                width: '100%',
                textAlign: 'center',
                values: Object.keys(dates),
            }, {
                width: '100%',
                textAlign: 'center',
                values: months,
            }],
            dates: [year, month],
            year: year,
            month: month,
            list: [],
            imgHost: imgHost,
            hasmore: -1,
            page: 1,
            pageSize: 12,
            point: 0,
        }
    },
    methods: {
        getData() {
            this.loading2 = Loading({ target: document.getElementById('pageContainer') });
            let time = this.year + '-' + this.month;
            secondPoint({ monthTime: time, pageNum: this.page, pageSize: this.pageSize }).then(res => {
                this.loading2.close();
                this.loading = false;
                if(res.code == 1){
                    let r = res.data;
                    if(this.page == 1){
                        this.list = [];
                    }
                    this.point = res.data2;
                    if(r.total == 0){
                        this.hasmore = 0;
                    }else if(r.total <= this.page * this.pageSize){
                        this.hasmore = 1;
                    }else{
                        this.hasmore = 2;
                    }
                    this.list = [...this.list, ...r.resultData];
                }else if(res.code == 4){
                    this.hasmore = 0;
                    this.list = [];
                    this.point = 0;
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
        dateChange(value, index) {
            switch (index) {
                case 0:
                    const arr = dates[value];
                    this.dateSlots[1].values = arr;
                    this._year = value;
                    this._month = this.dates[1];
                    break;
                case 1:
                    this._year = this.dates[0];
                    this._month = value;
                    break;
            }
            this.dates = [this._year, this._month];
        },
        openSheet() {
            this.open = true;
        },
        closeSheet() {
            this.open = false;
        },
        sureSelect() {
            if(this._year != this.year || this._month != this.year){
                this.year = this._year;
                this.month = this._month;
                this.loading = true;
                this.getData();
            }else{
                if(this.list.length == 0){
                    this.getData();
                }
            }
            this.open = false;
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
            return util.formatTime(t).substr(5);
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.getData();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(LoadMore);
Vue.use(SlidePicker);
Vue.use(BottomSheet);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.top{
    height: 1.63rem;
    background-image: linear-gradient(-183deg, #F87500 2%, #FEA04B 78%);
    .date-sel{
        height: .44rem;
        line-height: .44rem;
        font-size: .16rem;
        .sel{
            color: #fff;
            letter-spacing: 1px;
            &::after{
                content: '';
                display: inline-block;
                width: .08rem;
                height: .08rem;
                border-right: 2px solid #fff;
                border-bottom: 2px solid #fff;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
                margin-left: .05rem;
                position: relative;
                top: -2px;
            }
        }
    }
    .point-box{
        border-top: 1px solid rgba(255, 255, 255, .2);
        padding: .15rem;
        .txt{
            color: #fff;
            font-size: .16rem;
        }
        .icon{
            width: .16rem;
            height: .16rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .point{
            padding: .3rem 0 .2rem;
            color: #fff;
            line-height: 1;
            .num{
                font-size: .3rem;
            }
            .txt{
                font-size: .14rem;
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
    }
}
.tip{
    line-height: .38rem;
    text-align: center;
    font-size: .12rem;
    color: #555;
}
.date-container{
    .btn-box{
        height: .42rem;
        line-height: .42rem;
        background: #fff;
        padding: 0 .15rem;
        font-size: .16rem;
        .cancel{
            color: #555;
        }
        .sure{
            color: #ff7421;
        }
    }
}
</style>
