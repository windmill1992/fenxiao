<template>
    <div id="pageContainer" class="update-bank">
        <div class="header">
            <p class="title">更换银行卡</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="warn">
                    <p class="txt flex fcen">*建议使用印有银联的借记卡</p>
                    <p class="txt flex fcen">*开户行省、市、支行无误以免提现失败</p>
                    <p class="txt flex fcen">*每日提交不超过5次</p>
                </div>
                <div class="bb10"></div>
                <div class="item">
                    <mu-text-field v-model="formdata.bankKind" placeholder="银行卡卡种" class="inp" full-width underline-color="blue" prefix="银行卡卡种" readonly></mu-text-field>
                </div>
                <div class="item">
                    <mu-text-field type="number" v-model="formdata.bankNo" placeholder="银行卡号" class="inp" full-width underline-color="blue" prefix="银行卡号"></mu-text-field>
                </div>
                <div class="item">
                    <select v-model="bank" placeholder="选择银行" class="sel inp" @change="selBank">
                        <option value="" disabled selected style="display: none;">选择银行</option>
                        <option :value="index" v-for="item,index in bankList" :key="'bank'+ item.id">{{item.bankName}}</option>
                    </select>
                </div>
                <div class="item flex fcen spb">
                    <select v-model="province" placeholder="开户省份" class="sel flex1" @change="selProvince">
                        <option value="" disabled selected style="display: none;">开户省份</option>
                        <option :value="index" v-for="item,index in provinceArr" :key="'prov'+ index" v-if="item != '其他'">{{item}}</option>
                    </select>
                    <select v-model="city" placeholder="开户城市" class="sel flex1" @change="selCity">
                        <option value="" disabled selected style="display: none;">开户城市</option>
                        <option :value="index" v-for="item,index in cityArr" :key="'city'+ index" v-if="item != '其他'">{{item}}</option>
                    </select>
                </div>
                <div class="item">
                    <select v-model="bankDeposit" placeholder="选择开户行" class="sel inp" @change="selDeposit">
                        <option value="" disabled selected style="display: none;">选择开户行</option>
                        <option :value="index" v-for="item,index in bankList2" :key="'dep'+ index">{{item.v}}</option>
                    </select>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="code" :placeholder="'发送到'+ mobile.substr(0,3) + '****'+ mobile.substr(7,11)" class="inp yzm" ref="yzm" max-length="6" full-width underline-color="blue" prefix="验证码"></mu-text-field>
                    <a href="javascript:;" class="code-a" v-if="loading" v-loading="loading" data-mu-loading-size="20"></a>
                    <a href="javascript:;" class="code-a" @click="getCode" v-else-if="!waiting">获取验证码</a>
                    <a href="javascript:;" class="code-a no" v-else>{{time}}s重新获取</a>
                </div>
            </div>
            <div class="btns-wrapper">
                <mu-button color="#ff7421" textColor="#fff" full-width class="btn" @click="save">
                    <span class="bold">提交</span>
                </mu-button>
            </div>
        </div>
        <mu-dialog title="验证码" width="360" :open.sync="openYzm" dialog-class="yzm-d">
            <div class="flex fcen spb">
                <img :src="yzmUrl" alt="验证码">
                <mu-text-field type="number" v-model="yzmCode" max-length="4" class="inp-yzm" underline-color="blue"></mu-text-field>
            </div>
            <mu-button slot="actions" flat color="#555" @click="closeDialog">取消</mu-button>
            <mu-button slot="actions" flat color="primary" @click="sureYzm">确定</mu-button>
        </mu-dialog>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { TextField, Snackbar, Icon, Button } from 'muse-ui';
import { $city } from '../assets/js/city2.min';
import { bankList, cityInfo, bankListInfo, updateBank, userInfo } from '../api/user';
import { getMobileCode } from '../api/login';
import { baseUrl } from '../api/baseUrl';
export default {
    data() {
        return {
            province: '',
            city: '',
            bank: '',
            provinceArr: [],
            cityArr: [],
            bankCode: '',
            bankDeposit: '',
            formdata: {},
            loading: false,
            bankList: [],
            bankList2: [],
            time: 60,
            waiting: false,
            code: '',
            openYzm: false,
            yzmUrl: '',
            yzmCode: '',
            mobile: '',
        }
    },
    methods: {
        getData() {
            this.loading2 = Loading({ target: document.getElementById('pageContainer') });
            userInfo().then(res => {
                this.loading2.close();
                if(res.code == 1){
                    this.mobile = res.data.mobileNum;
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
                this.loading2.close();
                Toast.error('获取手机号失败！');
                console.log(err);
            })
        },
        getBankList() {
            bankList().then(res => {
                if(res.code == 1){
                    this.bankList = res.data;
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
        getBankInfoList() {
            this.loading2 = Loading({ text: '正在查询开户行，请稍等...', target: document.getElementById('pageContainer') });
            cityInfo({ province: this.formdata.province, city: this.formdata.city }).then(res => {
                if(res.code == 1){
                    let r = res.data;
                    this.codeObj = {
                        bankProvinceCode: r.provinceCode,
                        bankCityCode: r.cityCode,
                    }
                    bankListInfo({ headBankCode: this.bankCode, bankProvince: r.provinceCode, bankCity: r.cityCode }).then(res2 => {
                        this.loading2.close();
                        if(res2.code == 1){
                            this.bankList2 = [];
                            let arr = [];
                            for (let v in res2.data){
                                arr.push({ k: v, v: res2.data[v]});
                            }
                            this.bankList2 = arr;
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
                        this.loading2.close();
                        Toast.error('查询省市编号失败！');
                        console.log(err);
                    })
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name);
                }else{
                    this.loading2.close();
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.loading2.close();
                Toast.error('查询省开户行失败！');
                console.log(err);
            })
        },
        selBank(e) {
            let index = $(e.target).find(':selected').index() - 1;
            this.province = '';
            this.formdata.province = '';
            this.city = '';
            this.cityArr = [];
            this.formdata.city = '';
            this.bankList2 = [];
            this.bankDeposit = '';
            this.formdata.bankName = this.bankList[index].bankName;
            this.bankCode = this.bankList[index].bankCode;
        },
        selProvince(e) {
            let index = $(e.target).find(':selected').index() - 1;
            console.log('pro---'+ index);
            this.formdata.province = $city[index].value;
            this.province = index;
            let arr = [];
            for (let v of $city[index].child) {
                arr.push(v.value);
            }
            this.cityArr = arr;
            this.city = '';
            this.bankList2 = [];
            this.bankDeposit = '';
        },
        selCity(e) {
            let index = $(e.target).find(':selected').index() - 1;
            console.log('city---'+ index);
            this.formdata.city = $city[this.province].child[index].value;
            this.city = index;
            this.getBankInfoList();
            this.bankDeposit = '';
        },
        getCode() {
            this.freshCode();
            this.openYzm = true;
        },
        save() {
            if((this.loading2 && this.loading2.instance != null) || this.loading3) return;
            if(!this.formdata.bankNo){
                Toast.error('请填写银行卡号！');
                return;
            }
            if(!this.formdata.bankName){
                Toast.error('请选择银行！');
                return;
            }
            if(!this.formdata.province || !this.formdata.city){
                Toast.error('请选择完整的开户省市！');
                return;
            }
            if(!this.bankDeposit){
                Toast.error('请选择开户行！');
                return;
            }
            if(!this.code || !Number.isInteger(Number(this.code))){
                Toast.error('手机验证码错误！');
                return;
            }
            this.loading2 = Loading({ text: '正在提交...', target: document.getElementById('pageContainer') });
            this.loading3 = true;
            let param = Object.assign({
                card: this.formdata.bankNo,
                bankName: this.formdata.bankName,
                accountProvince: this.formdata.province,
                accountCity: this.formdata.city,
                accountName: this.bankList2[this.bankDeposit].v,
                headBankCode: this.bankCode,
                bankCode: this.bankList2[this.bankDeposit].k,
                merAuthorizeNum: this.code,
                type: 'edit_bank',
            }, this.codeObj);
            updateBank(param).then(res => {
                this.loading2.close();
                if(res.code == 1){
                    Toast.success('提交成功，正在跳转...');
                    setTimeout(() => {
                        this.$router.replace('/myBank');
                    }, 1000);
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name);
                }else{
                    this.loading3 = false;
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.loading2.close();
                this.loading3 = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        countdown() {
            this.waiting = true;
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.time--;
                if(this.time == -1){
                    clearInterval(this.timer);
                    this.waiting = false;
                    this.time = 60;
                }
            }, 1000);
        },
        freshCode() {
            this.yzmUrl = `${baseUrl}/user/edit_bank/code?t=`+ Date.now();
        },
        closeDialog() {
            this.openYzm = false;
        },
        sureYzm() {
            if(!this.yzmCode || this.yzmCode.length != 4){
                Toast.error('验证码错误！');
                return;
            }
            this.closeDialog();
            getMobileCode({ mobile: this.mobile, code: this.yzmCode, type: 'edit_bank' }).then(res => {
                if(res.code == 1){
                    this.countdown();
                    Toast.success('手机验证码发送成功，请查收！');
                    $(this.$refs['yzm']).focus();
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
            })
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.formdata = {
            bankKind: '借记卡（建议银联卡）',
            bankNo: '',
            bankName: '',
            province: '',
            city: '',
            bankDeposit: '',
        };
        let arr = [];
        for (let v of $city) {
            arr.push(v.value);
        }
        this.provinceArr = arr;
        this.getData();
        this.getBankList();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
}
Vue.use(Loading);
Vue.use(Toast);
Vue.use(TextField);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(Button);
</script>

<style scoped lang="less">
.box{
    background: #fff;
    .item{
        height: .44rem;
        line-height: .44rem;
        position: relative;
        .inp{
            width: 100%;
            height: .44rem;
            margin: 0;
            padding: 0;
            color: #000;
            font-size: .14rem;
            min-height: auto;
        }
        .sel{
            height: .44rem;
            margin: 0;
            padding-left: .1rem;
            color: #000;
            font-size: .14rem;
            min-height: auto;
            border: none;
            outline: none;
            border-bottom: 1px solid #f3f3f3;
            background: transparent;
            &.flex1{
                width: 50%;
                white-space: nowrap;
            }
        }
        .code-a{
            position: absolute;
            right: .15rem;
            top: 0;
            min-width: .9rem;
            height: .43rem;
            line-height: .43rem;
            color: #fc4444;
            font-size: .14rem;
            padding-left: .15rem;
            border-left: 1px solid #f3f3f3;
            &.no{
                color: #9c9c9c;
            }
        }
    }
    .warn{
        color: #ff7421;
        font-size: .12rem;
        padding: .1rem .15rem;
        background: #feefbc;
        letter-spacing: 1px;
        .txt{
            line-height: 2;
        }
    }
}
.btns-wrapper{
    margin-top: .15rem;
    padding: 0 .15rem;
    .btn{
        height: .42rem;
        line-height: .42rem;
        font-size: .16rem;
        border-radius: .05rem;
        letter-spacing: 1px;
    }
}
</style>
<style>
.update-bank .mu-input-content{
    padding: 0 .15rem;
}
.update-bank .mu-input-content.mu-select{
    padding-right: 0;
}
.update-bank .mu-input-content .mu-text-field-input{
    padding: .05rem 0 .05rem .1rem;
    height: .44rem;
    text-align: right;
}
.update-bank .yzm .mu-input-content .mu-text-field-input{
    padding-right: 1.1rem;
}
.update-bank .mu-input-content .mu-input-prefix-text{
    color: #000;
    min-width: .6rem;
    letter-spacing: 1px;
}
.update-bank .mu-input-content .mu-input-line{
    background-color: #f3f3f3;
}
</style>
