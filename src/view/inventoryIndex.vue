<template>
    <div id="pageContainer" class="dynamic-point">
        <div class="header">
            <p class="title">库存指数</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <div class="top">
                <div class="point-box">
                    <div class="flex fcen spb">
                        <p class="txt">库存指数</p>
                        <a href="javascript:;" class="icon"><img src="../assets/img/icon_question.png" alt="规则说明"></a>
                    </div>
                    <div class="point">
                        <span class="num bold">0</span>
                    </div>
                </div>
            </div>
            <div class="box">
                <div class="li flex spb">
                    <p class="txt">当前库存指数上限</p>
                    <p class="num">7,000</p>
                </div>
            </div>
            <div class="tip">指数详情</div>
            <div class="box">
                <div class="th flex spb">
                    <p class="td">产品名称</p>
                    <p class="td txtC">剩余库存</p>
                    <p class="td txtR">库存指数</p>
                </div>
            </div>
            <div class="box flex1 fcol" v-loading="loading">
                <div class="list"></div>
                <div class="no-data fcol spc fcen flex1">
                    <img src="../assets/img/error_zanwusj.png" alt="暂无数据">
                    <p>暂无数据</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Helpers from 'muse-ui/lib/Helpers';
import Loading from 'muse-ui-loading';
export default {
    data() {
        return {
           loading: false,
           list: [],
        }
    },
    methods: {
        getData() {
            this.loading2 = Loading();
            setTimeout(() => {
                this.loading2.close();
            }, 2000);
        },
    },
    mounted() {
        this.getData();
    }
}
Vue.use(Helpers);
Vue.use(Loading);
</script>

<style scoped lang="less">
.top{
    height: 1.19rem;
    background-image: linear-gradient(-183deg, #F87500 2%, #FEA04B 78%);
    .point-box{
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
    position: relative;
    .list{
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
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
        background: #fff;
        height: .42rem;
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
        width: 50%;
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
</style>
