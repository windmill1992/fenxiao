<template>
    <div id="pageContainer" class="offline-retail">
        <div class="header">
            <p class="title">线下零售</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="link-box flex fcen">
                <a href="" class="link flex1">
                    <mu-ripple class="rip flex fcen spc">
                        <img src="../assets/img/fhdd.png" alt="发货订单">
                        <p class="txt">发货订单</p>
                    </mu-ripple>
                </a>
                <a href="" class="link flex1">
                    <mu-ripple class="rip flex fcen spc">
                        <img src="../assets/img/address.png" alt="地址管理">
                        <p class="txt">地址管理</p>
                    </mu-ripple>
                </a>
            </div>
            <div class="list">
                <div class="item flex fcen">
                    <div class="pic fshrink0">
                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                    </div>
                    <div class="info flex1">
                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                        <p class="limit">限发3件/人/月</p>
                        <p class="stock">可用库存x38</p>
                        <div class="num-box flex fcen">
                            <a href="javascript:;" class="op"><img src="../assets/img/minus.png" alt="减少"></a>
                            <mu-text-field type="number" v-model="num" class="inp" color="transparent" underline-color="blue"></mu-text-field>
                            <a href="javascript:;" class="op"><img src="../assets/img/add.png" alt="增加"></a>
                        </div>
                    </div>
                </div>
                <div class="item flex fcen">
                    <div class="pic fshrink0">
                        <img src="../assets/img/error_zanwusj.png" alt="商品">
                    </div>
                    <div class="info flex1">
                        <p class="title">【特惠专享季】家庭计划-饼干</p>
                        <p class="limit">限发3件/人/月</p>
                        <p class="stock">可用库存x38</p>
                        <div class="num-box flex fcen">
                            <a href="javascript:;" class="op"><img src="../assets/img/minus.png" alt="减少"></a>
                            <mu-text-field type="number" v-model="num" class="inp" color="transparent" underline-color="blue"></mu-text-field>
                            <a href="javascript:;" class="op"><img src="../assets/img/add.png" alt="增加"></a>
                        </div>
                    </div>
                </div>
            </div>

            <mu-ripple class="btns">
                <a href="javascript:;" class="btn bold">下一步</a>
            </mu-ripple>
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
        }
    },
    methods: {
        
    },
    mounted() {
        
    }
}
Vue.use(Helpers);
Vue.use(TextField);
</script>

<style scoped lang="less">
.wrapper{
    padding-bottom: .48rem;
    .link-box{
        margin: .15rem;
        background: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.20);
        border-radius: .05rem;
        height: .52rem;
        line-height: .52rem;
        .rip{
            position: relative;
        }
        .link{
            font-size: .16rem;
            color: #000;
            position: relative;
            &:last-child::before{
                content: '';
                display: inline-block;
                width: 1px;
                height: .31rem;
                position: absolute;
                left: 0;
                top: .1rem;
                background: #f3f3f3;
            }
            img{
                height: .19rem;
                margin-right: .1rem;
            }
        }
    }
    .item{
        padding: .1rem .15rem;
        margin-bottom: .1rem;
        background: #fff;
        .pic{
            width: .88rem;
            height: .76rem;
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
            .limit{
                font-size: .12rem;
                height: .2rem;
                color: #ff7421;
                margin-top: .12rem;
            }
            .stock{
                font-size: .12rem;
                color: #9c9c9c;
                margin-top: .05rem;
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
}
.btns{
    position: fixed;
    width: 100%;
    height: .48rem;
    left: 0;
    bottom: 0;
    .btn{
        display: block;
        height: .48rem;
        line-height: .48rem;
        text-align: center;
        color: #fff;
        font-size: .16rem;
        background: #ff7421;
        letter-spacing: 1px;
    }
}
</style>
<style>
.offline-retail .mu-input-content .mu-text-field-input{
    padding: .05rem 0;
    height: .24rem;
    text-align: center;
}
.offline-retail .mu-input-content .mu-input-line{
    background-color: transparent;
}
</style>
