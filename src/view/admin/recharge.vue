<template>
    <div id="pageContainer">
        <div class="wrapper">
            <div class="box">
                <div class="item flex spb fcen">
                    <p>充值账号</p>
                    <p class="txt">{{info.userName}}</p>
                </div>
                <div class="item flex spb fcen">
                    <p>充值金额</p>
                    <p class="txt">{{info.applyMoney}}元</p>
                </div>
                <div class="item flex spb fcen">
                    <p>申请时间</p>
                    <p class="txt">{{info.createTime | fmt}}</p>
                </div>
                <div class="item flex spb fcen">
                    <p>打款人</p>
                    <p class="txt">{{info.realName}}</p>
                </div>
                <div class="item flex spb fcen">
                    <p>开户行</p>
                    <p class="txt">{{info.accountName}}</p>
                </div>
                <div class="item flex spb fcen">
                    <p>卡号</p>
                    <p class="txt">{{info.card}}</p>
                </div>
                <div class="item flex spb fcen">
                    <p>处理状态</p>
                    <p class="state" v-if="info.state == 103 || info.state == 102">已处理</p>
                    <p class="state" v-else>待处理</p>
                </div>
                <template v-if="info.state == 103">
                    <div class="item flex spb fcen">
                        <p>实收金额</p>
                        <p class="txt">{{info.payMoney}}元</p>
                    </div>
                    <div class="item flex spb fcen">
                        <p>操作人</p>
                        <p class="txt">{{info.operateActionName}}</p>
                    </div>
                    <div class="item flex spb fcen">
                        <p>操作时间</p>
                        <p class="txt">{{info.updateTime | fmt}}</p>
                    </div>
                </template>
            </div>
            <div class="btns flex spc" v-if="info.state == 101">
                <mu-button class="btn bold" color="#ff7421" textColor="#fff" full-width @click="openSure = true;">给他充值</mu-button>
            </div>
        </div>
        <mu-dialog :open.sync="openSure" dialog-class="admin-sure-d" width="345" max-width="90%">
            <p class="title">充值确认</p>
            <div class="item flex spb">
                <p>充值账号</p>
                <p class="txt">{{info.userName}}</p>
            </div>
            <div class="item flex spb">
                <p>充值金额</p>
                <p class="txt">{{info.applyMoney}}元</p>
            </div>
            <div class="item item1 flex fcen">
                <p>实收金额</p>
                <input type="number" v-model="money" class="inp" />
            </div>
            <div class="btns1 flex spc">
                <mu-button class="btn" color="#ff7421" textColor="#fff" @click="submit">确认充值</mu-button>
            </div>
        </mu-dialog>
        <mu-dialog :open.sync="openSure2" dialog-class="admin-sure2-d" width="315" max-width="90%">
            <p class="txt">实收金额与申请金额不符，是否确认按照实收金额充值？</p>
            <div class="btns1 flex">
                <mu-ripple class="btn btn1" @click="openSure3 = true; openSure2 = false;">确认</mu-ripple>
                <mu-ripple class="btn" @click="openSure2 = false;">取消</mu-ripple>
            </div>
        </mu-dialog>
        <mu-dialog :open.sync="openSure3" dialog-class="admin-sure3-d" width="315" max-width="90%">
            <div class="item flex spb">
                <p>充值账号</p>
                <p class="txt">{{info.userName}}</p>
            </div>
            <div class="item flex spb">
                <p>充值金额</p>
                <p class="txt">{{money}}元</p>
            </div>
            <div class="btns1 flex">
                <mu-ripple class="btn btn1" @click="sureSubmit">确认</mu-ripple>
                <mu-ripple class="btn" @click="openSure3 = false;">取消</mu-ripple>
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
import { recInfo, recharge } from '../../api/admin';
import { util } from '../../utils/base';
export default {
    data() {
        return {
            openSure: false,
            openSure2: false,
            openSure3: false,
            info: {},
            money: '',
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('#pageContainer') });
            recInfo({ payNum: this.id }).then(res => {
                this.loading.close();
                if(res.code == 1) {
                    this.info = res.data;
                }else if(res.code == 10036){
                    Toast.error(res.msg);
                    this.$router.replace('/');
                }else if(res.code == 0){
                    this.$router.replace('/login?admin=recharge_'+ this.id);
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
            if(!this.money || this.money < 0.01 || isNaN(this.money)) {
                Toast.error('请输入有效的实收金额！');
                return;
            }
            this.openSure = false;
            if(this.money != this.info.applyMoney) {
                this.openSure2 = true;
            }else{
                this.openSure3 = true;
            }
        },
        sureSubmit() {
            this.openSure3 = false;
            this.loading = Loading({ text: '正在提交...', target: document.getElementById('#pageContainer') });
            recharge({ payMoney: this.money, payNum: this.id }).then(res => {
                this.loading.close();
                if(res.code == 1){
                    Toast.success('充值成功！');
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
        .txt{
            font-size: .14rem;
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
    }
    .item{
        padding: .1rem .15rem;
        font-size: .16rem;
        border-bottom: 1px solid #f3f3f3;
        .txt{
            font-size: .14rem;
        }
        .inp{
            margin-left: .15rem;
            height: .32rem;
            line-height: .32rem;
            border: 1px solid #dedede;
            padding: .05rem .1rem;
        }
    }
    .item1{
        border-bottom: none;
    }
    .btns1{
        margin: .25rem 0 .15rem;
        .btn{
            width: 1.82rem;
            max-width: 60%;
            font-size: .16rem;
            letter-spacing: 1px;
            height: .38rem;
        }
    }
}
.admin-sure2-d{
    .txt{
        padding: .15rem;
        font-size: .16rem;
    }
    .btns1{
        border-top: 1px solid #f3f3f3;
        .btn{
            width: 100%;
            text-align: center;
            font-size: .16rem;
            color: #555;
            position: relative;
            height: .44rem;
            line-height: .44rem;
        }
        .btn1{
            color: #ff7421;
            &::after{
                content: '';
                display: inline-block;
                width: 1px;
                height: .44rem;
                position: absolute;
                right: 0;
                top: 0;
                background: #f3f3f3;
            }
        }
    }
}
.admin-sure3-d{
    .item{
        padding: .1rem .15rem;
        font-size: .16rem;
        border-bottom: 1px solid #f3f3f3;
        .txt{
            font-size: .14rem;
        }
    }
    .btns1{
        .btn{
            width: 100%;
            text-align: center;
            font-size: .16rem;
            color: #555;
            position: relative;
            height: .44rem;
            line-height: .44rem;
        }
        .btn1{
            color: #ff7421;
            &::after{
                content: '';
                display: inline-block;
                width: 1px;
                height: .44rem;
                position: absolute;
                right: 0;
                top: 0;
                background: #f3f3f3;
            }
        }
    }
}
</style>
<style>
.admin-sure-d, .admin-sure2-d, .admin-sure3-d{
    border-radius: .05rem;
}
.admin-sure-d .mu-dialog-body, .admin-sure2-d .mu-dialog-body, .admin-sure3-d .mu-dialog-body{
    padding: 0;
    color: #000;
}
</style>
