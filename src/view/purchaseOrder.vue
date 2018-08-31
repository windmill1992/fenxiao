<template>
    <div id="pageContainer" class="purchase">
        <div class="header">
            <p class="title">进货单</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="source">货源:杭州微众电子商务有限公司</div>
            </div>
            <div class="goods-info flex fcen">
                <div class="pic fshrink0">
                    <img src="../assets/img/error_zanwusj.png" alt="商品">
                </div>
                <div class="info flex1">
                    <p class="title">【特惠专享季】家庭计划-饼干</p>
                    <p class="price">上阶库存:4650</p>
                    <p class="price">公司库存:4650</p>
                    <a href="javascript:;" class="del" @click="deleteItem"><img src="../assets/img/delete.png" alt="删除"></a>
                    <div class="num-box flex fcen">
                        <a href="javascript:;" class="op" @click="minusNum"><img src="../assets/img/minus.png" alt="减少"></a>
                        <mu-text-field type="number" v-model="num" class="inp" color="transparent" underline-color="blue"></mu-text-field>
                        <a href="javascript:;" class="op" @click="addNum"><img src="../assets/img/add.png" alt="增加"></a>
                    </div>
                </div>
            </div>
            <div class="box box1">
                <div class="unit-price">
                    <p class="txt">订货单价:</p>
                    <div class="price-box flex fcen fend">
                        <p class="ori-price">￥1380</p>
                        <p class="price">￥1380</p>
                        <!-- <div class="arr-r"></div> -->
                    </div>
                </div>
                <p class="tip">初级价格:(一次性满3000元)</p>
            </div>
            <div class="bb10"></div>
            <div class="box">
                <mu-ripple class="rule flex fcen spb" @click="toggleRule">
                    <p class="title">订货规则</p>
                    <div class="arr-d" :class="{ up: showRule }"></div>
                </mu-ripple>
                <div class="bb"></div>
                <ul id="ruleCon">
                    <li>1、上阶库存是指上阶系统库存加公司库存，如果上阶库存跟公司库存一样时，说明上阶系统库存为0。</li>
                    <li>2、某些产品并没有4个价格等级，有可能初级价格、中级价格同特惠价格一致。</li>
                    <li>3、不同头衔能够订到的产品价格区间不同，详情查看各头衔的进货权。</li>
                    <li>4、当订货金额是特约价格时跟公司订货，获得自有积分，否则向上阶订货。</li>
                    <li>5、当月首次订货总价不能低于1400元。</li>
                </ul>
            </div>

            <div class="bot flex">
                <div class="warn" v-if="showWarn">*差￥1620.00特惠总价可定初级价格</div>
                <div class="left">
                    <p class="sum bold">合计:￥13800.00</p>
                    <p class="total">特惠总价:￥22080.00</p>
                </div>
                <mu-ripple class="right">
                    <a href="javascript:;" class="btn">立即订货</a>
                </mu-ripple>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Helpers from 'muse-ui/lib/Helpers';
import { TextField } from 'muse-ui';
export default {
    data() {
        return {
            num: 0,
            showRule: false,
            showWarn: true,
        }
    },
    methods: {
        minusNum() {
            if(this.num <= 0) return;
            this.num--;
            this.getSum();
        },
        addNum() {
            this.num++;
            this.getSum();
        },
        deleteItem() {

        },
        toggleRule() {
            this.showRule = !this.showRule;
            if(this.showRule){
                $('#ruleCon').slideDown();
            }else{
                $('#ruleCon').slideUp();
            }
        },
        getSum() {
            
        }
    },
    mounted() {
        this.getSum();
    }
}
Vue.use(Helpers);
Vue.use(TextField);
</script>

<style scoped lang="less">
.wrapper{
    padding-bottom: .96rem;
    .box{
        background: #fff;
        border-top: 1px solid #f3f3f3;
        &.box1{
            padding-bottom: .1rem;
        }
        .source{
            height: .42rem;
            line-height: .42rem;
            padding: 0 .15rem;
            color: #000;
            font-size: .14rem;
            border-top: 1px solid #f3f3f3;
        }
        .unit-price{
            text-align: right;
            font-size: .14rem;
            padding: .1rem .15rem;
            .txt{
                color: #9c9c9c;
                padding-right: .1rem;
            }
            .price-box{
                .ori-price{
                    color: #9c9c9c;
                    font-size: .12rem;
                    text-decoration: line-through;
                }
                .price{
                    color: #ff7421;
                    margin: 0 .1rem;
                }
            }
        }
        .tip{
            background: #f6f6f6;
            color: #9c9c9c;
            font-size: .12rem;
            padding: .05rem .15rem;
        }
        .rule{
            font-size: .14rem;
            color: #000;
            padding: 0 .15rem;
            height: .42rem;
            position: relative;
            .arr-d{
                width: .09rem;
                height: .09rem;
                border-right: 2px solid #555;
                border-bottom: 2px solid #555;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
                -webkit-transform-origin: 50% 50%;
                transform-origin: 50% 50%;
                -webkit-transition: all .4s ease;
                transition: all .4s ease;
                &.up{
                    -webkit-transform: rotate(225deg);
                    transform: rotate(225deg);
                }
            }
        }
        ul{
            padding: 0 .15rem .1rem;
            display: none;
            li{
                font-size: .12rem;
                color: #000;
                margin-top: .1rem;
            }
        }
    }
    .goods-info{
        padding: .1rem .15rem;
        .pic{
            width: .75rem;
            height: .66rem;
            overflow: hidden;
            margin-right: .15rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .info{
            position: relative;
            .title{
                font-size: .14rem;
                color: #000;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                padding-right: .25rem;
            }
            .price{
                font-size: .14rem;
                color: #ff7421;
                margin-top: .05rem;
            }
            .del{
                position: absolute;
                width: .16rem;
                height: .16rem;
                right: 0;
                top: .05rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .num-box{
                position: absolute;
                bottom: 0;
                right: 0;
                .op{
                    width: .18rem;
                    height: .18rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .inp{
                    width: .4rem;
                    height: .24rem;
                    margin: 0 .1rem;
                    padding: 0;
                    min-height: auto;
                    font-size: .12rem;
                }
            }
        }
    }
    .bot{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: .7rem;
        .left{
            width: 66.66%;
            background: #fff;
            padding: .1rem .15rem;
            .sum{
                color: #ff7421;
                font-size: .16rem;
            }
            .total{
                color: #555;
                font-size: .14rem;
                margin-top: .05rem;
            }
        }
        .right{
            width: 33.33%;
            line-height: .7rem;
            background: #ff7421;
            font-size: .16rem;
            text-align: center;
            position: relative;
            .btn{
                color: #fff;
            }
        }
        .warn{
            width: 100%;
            height: .26rem;
            line-height: .26rem;
            color: #ff7421;
            font-size: .12rem;
            background: #feefbc;
            text-align: center;
            position: absolute;
            top: -.26rem;
            left: 0;
        }
    }
}
</style>
<style>
.purchase .mu-input-content .mu-text-field-input{
    padding: .05rem 0;
    height: .24rem;
    text-align: center;
}
.purchase .mu-input-content .mu-input-line{
    background-color: transparent;
}
</style>
