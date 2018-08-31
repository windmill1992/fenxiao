<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">个人资料</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <mu-ripple class="avatar-box flex fcen spb">
                <p>头像</p>
                <div class="avatar flex fcen">
                    <img src="../assets/img/fxkh.png" alt="头像">
                    <div class="arrow-r"></div>
                </div>
            </mu-ripple>
            <div class="bb10"></div>
            <div class="box">
                <mu-ripple class="item flex spb fcen">
                    <p>会员名</p>
                    <p>xxxxxxx</p>
                </mu-ripple>
                <mu-ripple class="item flex spb fcen">
                    <p>微信号</p>
                    <div class="flex fcen">
                        <p>xxxxxx</p>
                        <div class="arrow-r"></div>
                    </div>
                </mu-ripple>
            </div>
            <div class="bb10"></div>
            <div class="box">
                <mu-ripple class="item flex spb fcen">
                    <p>姓名</p>
                    <p>xxxxxxx</p>
                </mu-ripple>
                <mu-ripple class="item flex spb fcen">
                    <p>手机号</p>
                    <div class="flex fcen">
                        <p>13333333333</p>
                        <div class="arrow-r"></div>
                    </div>
                </mu-ripple>
                <mu-ripple class="item flex spb fcen">
                    <p>收货地址管理</p>
                    <div class="flex fcen">
                        <div class="arrow-r"></div>
                    </div>
                </mu-ripple>
                <mu-ripple class="item flex spb fcen">
                    <p>我的上阶信息</p>
                    <div class="flex fcen">
                        <div class="arrow-r"></div>
                    </div>
                </mu-ripple>
                <div class="info">
                    <div class="sub-item">姓名:张三</div>
                    <div class="sub-item">会员名:hahaha</div>
                    <div class="sub-item">手机号:12222222222</div>
                    <div class="sub-item">地区:浙江 杭州</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Helpers from 'muse-ui/lib/Helpers';

export default {

}
Vue.use(Helpers);
</script>

<style scoped lang="less">
.avatar-box{
    background: #fff;
    padding: 0 .15rem;
    height: .53rem;
    border-top: 2px solid #f3f3f3;
    color: #000;
    font-size: .14rem;
    position: relative;
    .avatar{
        img{
            width: .33rem;
            height: .33rem;
            border-radius: 100%;
            margin-right: .1rem;
        }
        .arrow-r{
            width: .07rem;
            height: .16rem;
            margin-left: .1rem;
        }
    }
}
.box{
    background: #fff;
    font-size: .14rem;
    color: #000;
    .item{
        height: .41rem;
        padding: 0 .15rem;
        border-top: 1px solid #f3f3f3;
        position: relative;
        div{
            line-height: 1;
            .arrow-r{
                width: .07rem;
                height: .16rem;
                margin-left: .1rem;
            }
        }
    }
    .info{
        background: #fff;
        .sub-item{
            padding: 0 .15rem;
            height: .31rem;
            line-height: .3rem;
            border-top: 1px solid #f3f3f3;
            font-size: .12rem;
            color: #9c9c9c;
        }
    }
}
</style>
