<template>
    <div id="pageContainer" class="update-mobile">
        <div class="header">
            <p class="title">修改手机号</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="item flex fcen spb">
                    <mu-text-field placeholder="请输入新手机号" class="inp" full-width underline-color="blue" prefix="新手机号"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="number" placeholder="输入验证码" class="inp" max-length="6" full-width underline-color="blue" prefix="验证码"></mu-text-field>
                    <a href="javascript:;" class="code-a" >获取验证码</a>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="password" placeholder="输入登录密码" class="inp" full-width underline-color="blue" prefix="登录密码"></mu-text-field>
                </div>
            </div>

            <div class="btns-wrapper">
                <mu-ripple color="blue" class="btns">
                    <a href="javascript:;" class="btn bold">确认</a>
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
            
        }
    },
    methods: {
        
    }
}
Vue.use(Helpers);
Vue.use(TextField);
</script>

<style scoped lang="less">
.box{
    background: #fff;
    border-top: 2px solid #f6f6f6;
    .item{
        height: .42rem;
        line-height: .42rem;
        padding: 0 .15rem;
        position: relative;
        .inp{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: .42rem;
            margin: 0;
            padding: 0;
            color: #000;
            font-size: .14rem;
            min-height: auto;
        }
        .code-a{
            position: absolute;
            right: .15rem;
            top: 0;
            line-height: .42rem;
            color: #ff7421;
            font-size: .14rem;
            &.no{
                color: #9c9c9c;
            }
        }
    }
}
.btns-wrapper{
    margin-top: .2rem;
    padding: 0 .15rem;
    .btns{
        position: relative;
        .btn{
            display: block;
            width: 100%;
            height: .42rem;
            line-height: .42rem;
            color: #fff;
            font-size: .2rem;
            text-align: center;
            border-radius: .05rem;
            background: #ff7421;
        }
    }
}
</style>
<style>
.update-mobile .mu-input-content{
    padding: 0 .15rem;
}
.update-mobile .mu-input-content .mu-text-field-input{
    padding: .05rem 0 .05rem .1rem;
    height: .42rem;
}
.update-mobile .mu-input-content .mu-input-prefix-text{
    color: #000;
    min-width: .6rem;
}
.update-mobile .mu-input-content .mu-input-line{
    background-color: #f3f3f3;
}
.update-mobile .mu-input-help{
    display: none;
}
</style>
