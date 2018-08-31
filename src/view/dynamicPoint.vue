<template>
    <div id="pageContainer" class="dynamic-point">
        <div class="header">
            <p class="title">动销积分</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <div class="top">
                <div class="date-sel flex spc">
                    <a href="javascript:;" class="sel bold flex fcen" @click="openSheet">{{year}}年{{month}}月</a>
                </div>
                <div class="point-box">
                    <div class="flex fcen spb">
                        <p class="txt">已动销积分</p>
                        <a href="javascript:;" class="icon"><img src="../assets/img/icon_question.png" alt="规则说明"></a>
                    </div>
                    <div class="point">
                        <span class="num bold">0</span>
                        <span class="txt1">(完成:0%)</span>
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="li flex spb">
                    <p class="txt">未动销积分</p>
                    <p class="num">0 <span style="font-size: .12rem">(未完成:0%)</span></p>
                </div>
                <div class="li flex spb">
                    <p class="txt">总动销积分</p>
                    <p class="num">0</p>
                </div>
            </div>
            <div class="tip">积分详情</div>
            <div class="box">
                <div class="th flex spb">
                    <p class="td">会员名</p>
                    <p class="td">推荐人</p>
                    <p class="td">已动销积分</p>
                    <p class="td txtR">未动销积分</p>
                </div>
            </div>
            <div class="box flex1 fcol" v-loading="loading">
                <div class="no-data fcol spc fcen flex1" v-if="list.length == 0">
                    <img src="../assets/img/error_zanwusj.png" alt="暂无数据">
                    <p>暂无数据</p>
                </div>
                <div class="list" v-else></div>
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
import { SlidePicker, BottomSheet } from 'muse-ui';

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
        }
    },
    methods: {
        getData() {
            setTimeout(() => {
                this.loading2.close();
                this.loading = false;
            }, 1000);
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
        }
    },
    mounted() {
        this.loading2 = Loading();
        this.getData();
    }
}
Vue.use(Helpers);
Vue.use(Loading);
Vue.use(SlidePicker);
Vue.use(BottomSheet);
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
    .no-data{
        img{
            width: 1.86rem;
            height: .95rem;
        }
        p{
            font-size: .16rem;
            color: #9c9c9c;
            margin-top: .2rem;
        }
    }
    .li{
        padding: 0 .15rem;
        border-bottom: 1px solid #f3f3f3;
        background: #fff;
        height: .43rem;
        font-size: .14rem;
        line-height: .42rem;
        .txt{
            color: #000;
        }
        .num{
            color: #ff7421;
        }
    }
    .th{
        background: #fff;
        line-height: .42rem;
        padding: 0 .15rem;
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
