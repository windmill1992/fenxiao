<template>
    <div id="pageContainer">
        <div class="wrapper">
            <div class="box">
                <div class="bb10"></div>
                <div class="item flex spb fcen" v-for="item,index in info.shipmentProducts" :key="'pro'+ index">
                    <p class="label">发货商品{{index + 1}}：</p>
                    <p class="txt">{{item.productName.substr(0, 14)}}{{item.productName.length > 14 ? '...' : ''}} <span class="num">/{{item.shipmentNum}}件</span></p>
                </div>
                <div class="bb10"></div>
                <div class="item flex spb fcen">
                    <p class="label">收件人：</p>
                    <p class="txt">{{info.receiverName}}</p>
                </div>
                <div class="item flex spb fcen">
                    <p class="label">联系电话：</p>
                    <p class="txt">{{info.receiverPhone}}</p>
                </div>
                <div class="item flex spb fcen">
                    <p class="label">收件地址：</p>
                    <p class="txt">{{info.addresseeAddress}}</p>
                </div>
                <div class="bb10"></div>
                <div class="item flex spb fcen">
                    <p class="label">订单编号：</p>
                    <p class="txt">{{info.payNum}}</p>
                </div>
                <div class="item flex spb fcen">
                    <p class="label">订单状态：</p>
                    <p class="state" v-if="info.state == 103">待发货</p>
                    <p class="state" v-else-if="info.state == 104">发货成功</p>
                    <p class="state" v-else-if="info.state == 105">待确认</p>
                    <p class="state" v-else-if="info.state == 106">已收货</p>
                </div>
            </div>
            <div class="btns flex spc" v-if="info.state == 103">
                <mu-button class="btn bold" color="#ff7421" textColor="#fff" full-width @click="openSure = true;">确认发货</mu-button>
            </div>
        </div>
        <mu-dialog :open.sync="openSure" dialog-class="admin-sure-d" width="345" max-width="90%">
            <p class="title">发货确认</p>
            <div class="item flex spc">
                <input type="text" v-model="trackNo" class="inp" placeholder="请输入快递单号" />
            </div>
            <div class="btns1 flex spc">
                <mu-ripple class="btn" @click="submit">确认提交</mu-ripple>
            </div>
        </mu-dialog>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { Button, Snackbar, Icon, Dialog } from 'muse-ui';
import { shipInfo, shipSend } from '../../api/admin';
import { util } from '../../utils/base';
export default {
    data() {
        return {
            info: {},
            openSure: false,
            trackNo: '',
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            shipInfo({ payNum: this.id }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1) {
                    this.info = res.data;
                }else if(res.code == 10036){
                    Toast.error(res.msg);
                    setTimeout(() => {
                        this.$router.replace('/');
                    }, 1000);
                }else if(res.code == 0){
                    this.$router.replace('/login?admin=delivery_'+ this.id);
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.loading.close();
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        submit() {
            if(this.trackNo == ''){
                Toast.error('请输入快递单号！');
                return;
            }
            this.openSure = false;
            this.loading = Loading({ text: '正在提交...', target: document.getElementById('pageContainer') });
            shipSend({ courierNum: this.trackNo, payNum: this.id }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    Toast.success('发货成功！');
                    window.location.reload();
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.loading.close();
                Toast.error('未知异常！');
                console.log(err);
            })
        },
    },
    filters: {
        fmt(t) {
            if(!t) return '';
            return util.formatTime(t, '-');
        },
    },
    mounted() {
        this.id = this.$route.params.id;
        this.getData();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Icon);
</script>

<style scoped lang="less">
.wrapper{
    padding-top: 0;
}
.box{
    border-top: 2px solid #f6f6f6;
    background: #fff;
    color: #000;
    .item{
        font-size: .16rem;
        border-bottom: 1px solid #f3f3f3;
        height: .44rem;
        line-height: .44rem;
        white-space: nowrap;
        padding: 0 .15rem;
        .label{
            min-width: .8rem;
        }
        .txt{
            font-size: .14rem;
        }
        .num{
            font-size: .12rem;
            color: #979797;
        }
        .state{
            font-size: .14rem;
            color: #ff7421;
        }
    }
}
.btns{
    margin-top: .4rem;
    padding: 0 .15rem;
    .btn{
        font-size: .16rem;
        letter-spacing: 1px;
        height: .43rem;
    }
}
.admin-sure-d{
    .title{
        font-size: .16rem;
        text-align: center;
        line-height: .42rem;
        border-bottom: 1px solid #f3f3f3;
        margin-bottom: .2rem;
    }
    .item{
        padding: .1rem .35rem;
        font-size: .16rem;
        white-space: nowrap;
        .inp{
            width: 100%;
            height: .4rem;
            line-height: .4rem;
            border: 1px solid #dedede;
            padding: .05rem .1rem;
            text-align: center;
        }
    }
    .btns1{
        margin: .25rem 0 .15rem;
        .btn{
            position: relative;
            width: 1.82rem;
            max-width: 60%;
            font-size: .16rem;
            letter-spacing: 1px;
            height: .38rem;
            line-height: .38rem;
            text-align: center;
            background: #ff7421;
            color: #fff;
        }
    }
}
</style>
<style>
.admin-sure-d{
    border-radius: .05rem;
}
.admin-sure-d .mu-dialog-body{
    padding: 0;
    color: #000;
}
</style>