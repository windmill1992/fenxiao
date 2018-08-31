<template>
    <div id="pageContainer" class="addr-manage">
        <div class="header">
            <p class="title">地址管理</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="list">
                <div class="item">
                    <div class="info">
                        <div class="flex spb fcen">
                            <p class="name">张三</p>
                            <p class="mobile">136-0581-2778</p>
                        </div>
                        <div class="addr">北京市 北京城区 东城区 哈哈哈</div>
                    </div>
                    <div class="op flex fcen spb">
                        <mu-checkbox :label="check ? '默认地址' : '设为默认'" v-model="check[0]" color="#ff7421" uncheck-icon="1" checked-icon="2" @change="setDef(0)"></mu-checkbox>
                        <div class="flex">
                            <router-link to="/address?id=1" class="op-a flex fcen">
                                <img src="../assets/img/bianji.png" alt="编辑">
                                <p>编辑</p>
                            </router-link>
                            <a href="javascript:;" class="op-a flex fcen" @click="deleteAddr(1)">
                                <img src="../assets/img/delete.png" alt="删除">
                                <p>删除</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <div class="info">
                        <div class="flex spb fcen">
                            <p class="name">张三</p>
                            <p class="mobile">136-0581-2778</p>
                        </div>
                        <div class="addr">北京市 北京城区 东城区 哈哈哈</div>
                    </div>
                    <div class="op flex fcen spb">
                        <mu-checkbox :label="check ? '默认地址' : '设为默认'" v-model="check[1]" color="#ff7421" uncheck-icon="1" checked-icon="2" @change="setDef(1)"></mu-checkbox>
                        <div class="flex">
                            <router-link to="/address?id=2" class="op-a flex fcen">
                                <img src="../assets/img/bianji.png" alt="编辑">
                                <p>编辑</p>
                            </router-link>
                            <a href="javascript:;" class="op-a flex fcen" @click="deleteAddr(2)">
                                <img src="../assets/img/delete.png" alt="删除">
                                <p>删除</p>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <router-link to="/address" class="btns">
                <mu-ripple class="btn"><span class="bold">新增收货地址</span></mu-ripple>
            </router-link>
        </div>
    </div>
</template>

<script>
import 'muse-ui-message/dist/muse-ui-message.css';
import Vue from 'vue';
import Message from 'muse-ui-message';
import Helpers from 'muse-ui/lib/Helpers';
import { Checkbox, Dialog, Icon, Button } from 'muse-ui';
export default {
    data() {
        return {
            check: [false, true],
        }
    },
    methods: {
        setDef(idx) {
            if(this.check.includes(true) && this.check.indexOf(true) != idx){
                this.check[this.check.indexOf(true)] = false;
            }
            if(this.check[idx]){
                for(let i=0; i<this.check.length; i++){
                    if(i == idx) continue;
                    this.check[i] = false;
                }
            }
            Message.alert('设置成功！', '提示');
        },
        deleteAddr(id) {
            console.log(id);
            Message.confirm('确定删除此地址吗？', '提示', {
                type: 'warning'
            }).then(({ result, value }) => {
                if(result){
                    console.log('删除了id='+ id + '的地址！');

                }
            })
        }
    }
}
Vue.use(Helpers);
Vue.use(Message);
Vue.use(Checkbox);
Vue.use(Dialog);
Vue.use(Icon);
Vue.use(Button);
</script>

<style scoped lang="less">
.list{
    padding-bottom: .5rem;
    border-top: 1px solid #f3f3f3;
    .item{
        background: #fff;
        margin-bottom: .15rem;
        .info{
            color: #000;
            padding: .1rem .15rem;
            .name{
                font-size: .16rem;
                
            }
            .mobile{
                font-size: .14rem;
            }
            .addr{
                font-size: .14rem;
                margin-top: 2px;
            }
        }
        .op{
            border-top: 1px solid #f3f3f3;
            padding: 0 .15rem;
            height: .44rem;
            line-height: .44rem;
            .op-a{
                color: #9c9c9c;
                margin-left: .15rem;
                img{
                    height: .16rem;
                    vertical-align: top;
                    margin-right: 5px;
                }
            }
        }
    }
}
.btns{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .48rem;
    .btn{
        display: block;
        position: relative;
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
.addr-manage .mu-checkbox-label{
    color: #9c9c9c;
}
.addr-manage .mu-checkbox-icon{
    width: .16rem;
    height: .16rem;
    position: relative;
}
.addr-manage .mu-checkbox-icon-uncheck{
    width: .16rem;
    height: .16rem;
    background: url(../assets/img/unchoose.png) no-repeat 0 0 / 100% 100%;
}
.addr-manage .mu-checkbox-icon-checked{
    width: .16rem;
    height: .16rem;
    background: url(../assets/img/choose.png) no-repeat 0 0 / 100% 100%;
}
.addr-manage .mu-checkbox-ripple-wrapper{
    width: .44rem;
    height: .44rem;
    left: -.14rem;
    top: -.14rem;
}
</style>
