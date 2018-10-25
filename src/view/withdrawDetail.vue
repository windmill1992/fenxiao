<template>
    <div id="pageContainer" class="withdraw-detail">
        <div class="header">
            <p class="title">提现详情</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="item">提现金额：{{info.applyMoney}}元</div>
                <div class="item">收款人：{{info.realName}}</div>
                <div class="item item1 flex">
                    <p>银行：</p><p class="txt flex1">{{info.bankName}}</p>
                </div>
                <div class="item">卡号：{{info.card.substr(0, 8)}}****{{info.card.substr(-4)}}</div>
                <div class="item">状态：{{stateTxt[info.state]}}</div>
            </div>
            <p class="txt1" >预计3个工作日到账(周末和节假日顺延)</p>
            <div class="btns">
                <mu-button color="#ff7421" textColor="#fff" full-width class="btn" href="/">返回分销中心</mu-button>
            </div>
            <div class="other">
                <p>客服电话：0571-88581506</p>
                <p>在班时间：9:00-18:00</p>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { Button, Snackbar, Icon } from 'muse-ui';
import { withdrawInfo } from '../api/user';
export default {
    data() {
        return {
            info: {
                card: '',
            },
            stateTxt: {
                '101': '待处理',
                '103': '提现成功',
                '102': '提现失败',
            },
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            withdrawInfo({ payNum: this.payNum }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    this.info = res.data;
                }else if(res.code == 0){
                    this.$router.push('/login');
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
            });
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.payNum = this.$route.params.id;
        if(this.payNum){
            this.getData();
        }else{
            this.$router.replace('/');
        }
    },
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.box{
    background: #fff;
    .item{
        height: .42rem;
        line-height: .42rem;
        padding: 0 .15rem;
        border-bottom: 1px solid #f3f3f3;
        font-size: .16rem;
        color: #000;
        &.item1{
            padding: .08rem .15rem;
            line-height: 1.5;
            height: auto;
            min-height: .42rem;
        }
        .txt{
            word-break: break-all;
        }
    }
}
.txt1{
    font-size: .12rem;
    color: #979797;
    text-align: right;
    padding: .1rem .15rem;
}
.btns{
    margin-top: .15rem;
    padding: 0 .15rem;
    .btn{
        font-size: .16rem;
        letter-spacing: 1px;
        height: .42rem;
    }
}
.other{
    width: 1.5rem;
    font-size: .12rem;
    color: #979797;
    margin: .15rem auto 0;
    line-height: 2;
    white-space: nowrap;
}
</style>
