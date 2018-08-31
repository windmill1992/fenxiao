<template>
    <div id="pageContainer" class="monthly-point">
        <div class="header">
            <p class="title">分销客户月度积分情况</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <mu-tabs :value.sync="active" color="white" indicator-color="#ff7421" full-width @change="changeTab">
                <mu-tab><span :class="{bold: active == 0}">我的客户</span></mu-tab>
                <mu-tab class="tab"><span :class="{bold: active == 1}">其他客户</span></mu-tab>
            </mu-tabs>
            <div class="date-sel flex spc">
                <a href="javascript:;" class="sel bold flex fcen" @click="openSheet">{{year}}年{{month}}月</a>
            </div>
            <div class="edu-point">
                <p class="txt">教育积分</p>
                <p class="txt1 bold">未结算</p>
            </div>
            <div class="bb10"></div>
            <div class="point-total">
                <div class="item flex spb">
                    <p class="txt">积分合计</p>
                    <p class="txt1">0</p>
                </div>
                <div class="item flex spb">
                    <p class="txt2">会员名</p>
                    <p class="txt2">积分</p>
                </div>
            </div>
            <div class="box flex1 fcol" v-loading="loading">
                <div class="list"></div>
                <div class="no-data fcol spc fcen flex1">
                    <img src="../assets/img/error_zanwujf.png" alt="暂无积分">
                    <p>暂无积分情况记录</p>
                </div>
            </div>

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
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Helpers from 'muse-ui/lib/Helpers';
import Loading from 'muse-ui-loading';
import { Tabs, SlidePicker, BottomSheet } from 'muse-ui';

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
            loading: false,
            active: 0,
            open: false,
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
        }
    },
    methods: {
        getData() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
        changeTab() {
            
            this.getData();
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
            if(this._year != this.year || this._month != this.month){
                this.year = this._year;
                this.month = this._month;
                this.getData();
            }else{
                if(this.list.length == 0){
                    this.getData();
                }
            }
            this.open = false;
        }
    },
    mounted() {
        
    }
}
Vue.use(Helpers);
Vue.use(Loading);
Vue.use(Tabs);
Vue.use(SlidePicker);
Vue.use(BottomSheet);
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
.date-sel{
    background: #fff;
    border-top: 1px solid #f3f3f3;
    height: .44rem;
    line-height: .44rem;
    font-size: .14rem;
    .sel{
        color: #000;
        letter-spacing: 1px;
        &::after{
            content: '';
            display: inline-block;
            width: .08rem;
            height: .08rem;
            border-right: 2px solid #000;
            border-bottom: 2px solid #000;
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
            margin-left: .05rem;
            position: relative;
            top: -2px;
        }
    }
}
.edu-point{
    background: #fff;
    border-top: 1px solid #f3f3f3;
    padding: .05rem 0;
    text-align: center;
    .txt{
        color: #9c9c9c;
        font-size: .14rem;
    }
    .txt1{
        color: #000;
        font-size: .16rem;
    }
}
.point-total{
    background: #fff;
    .item{
        padding: 0 .15rem;
        border-top: 1px solid #f3f3f3;
        line-height: .42rem;
        font-size: .16rem;
        .txt{
            color: #000;
        }
        .txt1{
            color: #ff7421;
        }
        .txt2{
            color: #555;
        }
    }
}
.box{
    border-top: 1px solid #f3f3f3;
    position: relative;
    .list{
        position: absolute;
        width: 100%;
        left: 0;
        top: 1px;
        background: #fff;
        .item{
            color: #000;
            font-size: .14rem;
            line-height: .42rem;
        }
    }
    .no-data{
        img{
            width: 2.3rem;
            height: 1.47rem;
        }
        p{
            font-size: .16rem;
            color: #9c9c9c;
            margin-top: .2rem;
        }
    }
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
<style>
.monthly-point .mu-tabs{
    color: #555;
}
.monthly-point .mu-tab-active{
    color: #000;
}
.monthly-point .mu-tab-link-highlight{
    width: .88rem!important;
    height: 3px;
    left: 24.5%;
    margin-left: -.44rem;
}
</style>
