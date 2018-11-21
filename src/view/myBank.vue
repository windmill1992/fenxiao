<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">银行卡</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <div class="box">
                <p class="txt">提现银行卡</p>
                <mu-ripple class="bank-box flex fcen spb" v-if="bindBank" @click="linkto('updateBank')">
                    <div class="flex fcen">
                        <img :src="bankUrl" alt="">
                        <div class="info">
                            <p class="name">{{info.bankName}}</p>
                            <p class="num">{{info.card.substr(0, 3)}} **** **** {{info.card.substr(-4)}}</p>
                        </div>
                    </div>
                    <p class="arr-r ff7">更换</p>
                </mu-ripple>
                <p class="txt1" v-else>还未绑定提现银行卡</p>
                <div class="bb10"></div>
                <p class="txt flex fcen">支付银行卡 <a href="javascript:;" @click="showHelp"><img src="../assets/img/question.png" alt="问号"></a></p>
            </div>
            <div class="list" v-if="hasBank">
                <mu-ripple class="item bank-box">
                    <div class="flex fcen">
                        <img :src="bankUrl" alt="">
                        <div class="info">
                            <p class="name">农业银行</p>
                            <p class="num">621 *** **** 1980</p>
                        </div>
                    </div>
                </mu-ripple>
            </div>
            <div class="no-data flex1 fcol fcen spc" v-else>
                <img :src="imgHost + '/none.png'" alt="">
                <p class="txt">您还没有用银行卡支付过</p>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import Message from 'muse-ui-message';
import { Button, Snackbar, Icon, Dialog } from 'muse-ui';
import { bankHost, imgHost } from '../api/baseUrl';
import { myBank } from '../api/user';
export default {
    data() {
        return {
            bindBank: true,
            hasBank: false,
            imgHost: imgHost,
            info: {
                card: '',
            },
        }
    },
    computed: {
        bankUrl() {
            if(this.info.bankCode){
                return `${bankHost}/${this.info.bankCode}.png`;
            }
            return '';
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            myBank().then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    this.info = res.data;
                }else if(res.code == 4){
                    this.bindBank = false;
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name);
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
        linkto(name) {
            this.$router.push({ name: name });
        },
        showHelp() {
            Message.alert('支付可用任何人银行卡，因只能绑定3张最早支付成功的银行卡，您可将不常用银行卡进行解绑。', '支付银行卡', {
                okLabel: '我知道了',
                className: 'bank-d',
                width: '400',
                maxWidth: '84%',
            }).then(() => { });
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.getData();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(Dialog);
</script>

<style scoped lang="less">
.box{
    border-top: 2px solid #f3f3f3;
    background: #fff;
    .txt{
        padding: 0 .15rem;
        line-height: .36rem;
        color: #000;
        font-size: .14rem;
        border-bottom: 1px solid #f3f3f3;
        img{
            width: .14rem;
            height: .14rem;
            vertical-align: top;
            margin-left: .1rem;
            margin-top: .11rem;
        }
    }
    .txt1{
        color: #9c9c9c;
        padding: .1rem .15rem;
    }
}
.bank-box{
    padding: .1rem .15rem;
    position: relative;
    &.item{
        border-bottom: 1px solid #f3f3f3;
        background: #fff;
    }
    img{
        width: .38rem;
        height: .38rem;
        margin-right: .15rem;
    }
    .name{
        font-size: .16rem;
        color: #000;
    }
    .num{
        font-size: .14rem;
        color: #555;
    }
    .arr-r{
        color: #ff7421;
    }
}
.no-data img{
    width: 2.3rem;
    height: 2rem;
}

</style>
<style>
.bank-d{
    border-radius: .05rem;
}
.bank-d .mu-dialog-title{
    text-align: center;
    font-size: .14rem;
    display: block;
    padding: .1rem 0;
    border-bottom: 1px solid #f3f3f3;
    line-height: 1.5;
}
.bank-d .mu-dialog-body{
    padding: .1rem .15rem;
    font-size: .13rem;
    color: #000;
    letter-spacing: .5px;
    text-align: justify;
}
</style>
