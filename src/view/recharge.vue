<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">充值</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="top" :style="'background-image: url(' + imgHost + '/rec_bg.png)'">
                <p class="txt">请通过网银汇款至以下账号，然后回填充值信息即可</p>
                <p class="txt">为了快速充值，请在转账附言填写充值账号</p>
                <div class="info flex fcen">
                    <p class="txt">您的账号</p>
                    <p class="txt1 flex1">{{account}}</p>
                    <a href="javascript:;" class="copy" @click="copyAccount">复制账号</a>
                </div>
            </div>
            <div class="con fcol" :style="'background-image: url(' + imgHost + '/box_bg.png)'">
                <div class="item flex1 flex fcen">开户名：{{uName}}</div>
                <div class="item flex1 flex fcen">开户行：{{uBankName}}</div>
                <div class="item flex1 flex fcen">卡号：{{uBankNo}} <a href="javascript:;" class="copy" @click="copyBankNo">复制卡号</a></div>
            </div>
            <div class="btns">
                <mu-button color="#ff7421" textColor="#fff" full-width class="btn bold" @click="showDialog">我已充值，开始订货</mu-button>
            </div>
            <div class="other">
                <p>客服电话：0571-88581506</p>
                <p>在班时间：9:00-18:00</p>
            </div>
        </div>
        <mu-dialog :open.sync="show" dialog-class="rec-d" width="400" max-width="80%">
            <p class="title">请回填充值的信息</p>
            <div class="box">
                <div class="item">
                    <mu-text-field type="text" v-model="uname" placeholder="" max-length="15" class="inp" full-width underline-color="blue" prefix="开户名:"></mu-text-field>
                </div>
                <div class="item flex fcen" v-if="bankList.length > 0">
                    <p>开户行:</p>
                    <select v-model="bank" class="sel inp" @change="selBank">
                        <option value="-1" disabled>请选择</option>
                        <option :value="index" v-for="item,index in bankList" :key="'bn'+ item.id">{{item.bankName}}</option>
                    </select>
                </div>
                <div class="item" v-else>
                    <mu-text-field type="text" v-model="bankName" placeholder="" max-length="20" class="inp" full-width underline-color="blue" prefix="开户行:"></mu-text-field>
                </div>
                <div class="item">
                    <mu-text-field type="number" v-model="bankNo" placeholder="" max-length="20" class="inp" full-width underline-color="blue" prefix="卡号:"></mu-text-field>
                </div>
                <div class="item">
                    <mu-text-field type="number" v-model="money" placeholder="" max-length="10" class="inp" full-width underline-color="blue" prefix="充值金额:"></mu-text-field>
                </div>
            </div>
            <div class="btn-box">
                <mu-button color="#ff7421" textColor="#fff" full-width class="btn bold" @click="submit">确认提交</mu-button>
            </div>
            <div class="other">
                <p>客服电话：0571-88581506</p>
                <p>在班时间：9:00-18:00</p>
            </div>
        </mu-dialog>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import Message from 'muse-ui-message';
import { TextField, Button, Snackbar, Icon, Dialog } from 'muse-ui';
import { imgHost } from '../api/baseUrl';
import { userInfo, userRechargeInfo, cashApply, bankList } from '../api/user';
import VueClipboard from 'vue-clipboard2';
export default {
    data() {
        return {
            imgHost: imgHost,
            account: '',
            show: false,
            uname: '',
            bankName: '',
            bankNo: '',
            money: '',
            bankList: [],
            bank: '',
            uBankNo: '6222222222222222',
            uBankName: '招商银行杭州钱塘支行',
            uName: '张三',
        }
    },
    methods: {
        getRecInfo() {
            userRechargeInfo().then(res => {
                if(res.code == 1) {
                    let r = res.data;
                    this.uname = r.realName;
                    this.bankName = r.bankName;
                    this.bankNo = r.card;
                    if(r.state == 101){
                        Message.confirm('您有一笔充值申请没有完成，请联系客服尽快充值', '提示', {
                            cancelLabel: '再等等',
                            okLabel: '联系客服',
                        }).then(({ result }) => {
                            if(result){
                                this.$router.push('/rechargeDetail/'+ r.payNum);
                            }else{
                                this.$router.replace('/');
                            }
                        })
                    }
                    if(r.userName){
                        this.account = r.userName;
                    }else{
                        this.getUserInfo();
                    }
                }else if(res.code == 4){
                    this.getUserInfo();
                }else if(res.code == 0){
                    this.$router.push('/login');
                }else{
                    this.getUserInfo();
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.getUserInfo();
                Toast.error('未知异常！');
                console.log(err);
            });
        },
        getUserInfo() {
            userInfo().then(res => {
                if(res.code == 1){
                    this.account = res.data.userName;
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                Toast.error('未知异常！');
                console.log(err);
            });
        },
        getBanks() {
            bankList().then(res => {
                if(res.code == 1){
                    this.bankList = res.data;
                    for (let i=0; i<res.data.length; i++){
                        if(res.data[i].bankName == this.bankName){
                            this.bank = i;
                            break;
                        }
                    }
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                Toast.error('获取银行列表失败！');
                console.log(err);
            })
        },
        selBank(e) {
            let i = $(e.target).find(':selected').index() - 1;
            this.bankName = this.bankList[i].bankName;
        },
        submit() {
            if(this.loading2) return;
            if(!this.uname || !this.bankName || !this.bankNo || !this.money){
                Toast.error('请填写完整的充值信息！');
                return;
            }
            if(this.money < 0.01 || Number.isNaN(Number(this.money))){
                Toast.error('请输入有效充值金额！');
                return;
            }
            this.loading = Loading({ text: '正在提交...', target: document.getElementById('pageContainer') });
            this.loading2 = true;
            cashApply({ type: 100, applyMoney: this.money, card: this.bankNo, bankName: this.bankName, realName: this.uname }).then(res => {
                this.loading.close();
                if(res.code == 1){
                    Toast.success('提交成功！');
                    setTimeout(() => {
                        this.$router.push('/rechargeDetail/'+ res.data);
                    }, 1000);
                }else{
                    this.loading2 = false;
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.loading.close();
                this.loading2 = false;
                Toast.error('未知异常！');
                console.log(err);
            });
        },
        showDialog() {
            this.show = true;
            this.getBanks();
        },
        copyAccount() {
            this.$copyText(this.account).then(e => {
                Toast.success('账号复制成功！');
            }, err => {
                Toast.error('账号复制失败！');
                console.log(err);
            })
        },
        copyBankNo() {
            this.$copyText(this.userBankNo).then(e => {
                Toast.success('卡号复制成功！');
            }, err => {
                Toast.error('卡号复制失败！');
                console.log(err);
            })
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.getRecInfo();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Message);
Vue.use(TextField);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(Dialog);
Vue.use(VueClipboard);
</script>

<style scoped lang="less">
.top{
    height: 1.04rem;
    margin-top: 2px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    color: #fff;
    padding: .08rem .15rem;
    .txt{
        font-size: .14rem;
    }
    .txt1{
        margin: 0 .2rem 0 .1rem;
        height: .25rem;
        line-height: .25rem;
        background: #fff;
        padding: 0 .1rem;
        border-radius: .05rem;
        color: #000;
        font-size: .14rem;
    }
    .info{
        margin-top: .15rem;
    }
    .copy{
        font-size: .12rem;
        color: #fff;
    }
}
.con{
    margin: .1rem .05rem;
    height: 1.5rem;
    padding: .08rem .1rem .12rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    .item{
        border-bottom: 1px solid #f3f3f3;
        font-size: .14rem;
        color: #000;
        padding: 0 .15rem;
        position: relative;
        &:last-child{
            border-bottom: 0;
        }
        .copy{
            font-size: .12rem;
            color: #979797;
            position: absolute;
            right: .2rem;
            top: 50%;
            -webkit-transform: translate3d(0, -50%, 0);
            transform: translate3d(0, -50%, 0);
        }
    }
}
.btns{
    margin-top: .15rem;
    padding: 0 .15rem;
    .btn{
        position: relative;
        height: .42rem;
        font-size: .16rem;
        letter-spacing: 1px;
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
.rec-d{
    .title{
        font-size: .16rem;
        color: #000;
        text-align: center;
        padding: .1rem 0;
        margin: 0 .15rem;
        border-bottom: 1px solid #f3f3f3;
    }
    .item{
        height: .42rem;
        line-height: .42rem;
        padding: 0 .15rem;
        position: relative;
        font-size: .14rem;
        color: #000;
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
        .sel{
            padding-left: .75rem;
            padding-right: .1rem;
            border: 0;
            background: transparent;
            outline: none;
            border-bottom: 1px solid #f3f3f3;
            max-height: 3rem;
        }
    }
    .btn-box{
        margin-top: .15rem;
        padding: 0 .15rem;
        .btn{
            height: .35rem;
            font-size: .14rem;
            letter-spacing: 1px;
        }
    }
}
</style>
<style>
.rec-d .mu-dialog-body{
    padding: .1rem 0;
    border-radius: .05rem;
}
.rec-d .mu-input-content{
    padding: 0 .15rem;
}
.rec-d .mu-text-field-input{
    padding: .05rem 0;
    height: .32rem;
    line-height: .32rem;
}
.rec-d .mu-input-prefix-text{
    color: #000;
    min-width: .65rem;
}
.rec-d .mu-input-line{
    background-color: #f3f3f3;
}
</style>
