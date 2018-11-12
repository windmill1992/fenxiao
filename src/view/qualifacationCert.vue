<template>
    <div id="pageContainer" class="qualifacation-cert">
        <div class="header">
            <p class="title">资格认证</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="warn">
                    <p class="txt flex fcen">填实名认证,认证成功后无法修改;</p>
                    <p class="txt flex fcen">建议使用印有银联的借记卡,减少出款失败率;</p>
                    <p class="txt flex fcen">填写的银行卡信息与实名信息一致。</p>
                </div>
                <div class="bb10"></div>
                <div class="item">
                    <mu-text-field v-model="formdata.uname" placeholder="请输入姓名" class="inp" full-width underline-color="blue" prefix="姓名"></mu-text-field>
                </div>
                <div class="item">
                    <mu-text-field type="number" v-model="formdata.idcard" placeholder="请输入身份证号" class="inp" full-width underline-color="blue" prefix="身份证号"></mu-text-field>
                </div>
                <div class="item">
                    <mu-text-field type="number" v-model="formdata.mobile" placeholder="请输入手机号" class="inp" full-width underline-color="blue" prefix="手机号"></mu-text-field>
                </div>
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
                    <select v-model="area" placeholder="开户区" class="sel flex1" @change="selArea">
                        <option value="" disabled selected style="display: none;">开户区</option>
                        <option :value="index" v-for="item,index in areaArr" :key="'area'+ index" v-if="item != '其他'">{{item}}</option>
                    </select>
                </div>
                <div class="item flex">
                    <!-- <select v-model="bankDeposit" placeholder="选择开户行" class="sel inp" @change="selDeposit">
                        <option value="" disabled selected style="display: none;">选择开户行</option>
                        <option :value="index" v-for="item,index in bankList2" :key="'dep'+ index">{{item.v}}</option>
                    </select> -->
                    <a href="javascript:;" class="sel inp sel-a" @click="showSheet">{{formdata.bankDeposit ? formdata.bankDeposit : '选择开户行'}}</a>
                </div>
                <!-- <div class="item">
                    <mu-text-field v-model="formdata.detailAddr" placeholder="请输入详细地址" class="inp" full-width underline-color="blue" prefix="详细地址"></mu-text-field>
                </div> -->
            </div>
            <div class="btns-wrapper">
                <mu-button color="#ff7421" textColor="#fff" full-width class="btn" @click="save">
                    <span class="bold">下一步</span>
                </mu-button>
            </div>
        </div>
        <mu-bottom-sheet :open.sync="open" class="bot-s" :overlay="false">
            <div class="top flex fcen spb">
                <div class="search-box flex">
                    <img src="../assets/img/search.png" alt="" />
                    <input type="text" v-model="searchTxt" @input="search" class="inp" />
                </div>
                <a href="javascript:;" class="close" @click="open = false">取消</a>
            </div>
            <div class="list">
                <mu-ripple class="item" :class="{on: bankDeposit === index}" v-for="item,index in bankList2" :key="'dep'+ index"
                    v-if="item.v.includes(searchTxt)" @click="selDeposit(index)">{{item.v}}</mu-ripple>
            </div>
        </mu-bottom-sheet>
        <a href="javascript:;" class="overlay" v-show="open" @click="open = false"></a>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { TextField, Snackbar, Icon, Button, BottomSheet } from 'muse-ui';
import { $city } from '../assets/js/city2.min';
import { checkCard } from '../utils/card';
import { bankList, cityInfo, bankListInfo, qualifacationCert } from '../api/user';
import { baseUrl } from '../api/baseUrl';
export default {
    data() {
        return {
            protocol: true,
            province: '',
            city: '',
            area: '',
            bank: '',
            provinceArr: [],
            cityArr: [],
            areaArr: [],
            bankCode: '',
            bankDeposit: '',
            formdata: {},
            loading: false,
            bankList: [],
            bankList2: [],
            open: false,
            searchTxt: '',

        }
    },
    methods: {
        getBankList() {
            bankList().then(res => {
                if(res.code == 1){
                    this.bankList = res.data;
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
                Toast.error('获取银行列表失败！');
                console.log(err);
            })
        },
        getBankInfoList() {
            this.loading2 = Loading({ text: '正在查询开户行，请稍等...', target: document.getElementById('pageContainer') });
            cityInfo({ province: this.formdata.province, city: this.formdata.city, area: this.formdata.area }).then(res => {
                if(res.code == 1){
                    let r = res.data;
                    this.regionCode = {
                        bankProvinceCode: r.provinceCode,
                        bankCityCode: r.cityCode,
                        bankAreaCode: r.areaCode,
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
                    this.$router.push('/login');
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
            this.area = '';
            this.areaArr = [];
            this.formdata.area = '';
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
            this.areaArr = [];
            this.area = '';
            this.bankList2 = [];
            this.bankDeposit = '';
        },
        selCity(e) {
            let index = $(e.target).find(':selected').index() - 1;
            console.log('city---'+ index);
            this.formdata.city = $city[this.province].child[index].value;
            this.city = index;
            if($city[this.province].child[index].child){
                let arr = [];
                for (let v of $city[this.province].child[index].child) {
                    arr.push(v.value);
                }
                this.areaArr = arr;
                this.area = '';
            }else{
                this.areaArr = [];
                this.area = '';
            }
            this.bankDeposit = '';
        },
        selArea(e) {
            let index = $(e.target).find(':selected').index() - 1;
            console.log('area---'+ index);
            this.formdata.area = $city[this.province].child[this.city].child[index].value;
            this.area = index;
            this.bankDeposit = '';
            if(this.bankCode){
                this.getBankInfoList();
            }
        },
        selDeposit(e) {
            // let index = $(e.target).find(':selected').index() - 1;
            let index = e;
            this.bankDeposit = e;
            this.formdata.bankDeposit = this.bankList2[index].v;
            this.formdata.bankDepositCode = this.bankList2[index].k;
            this.open = false;
        },
        search() {
            // let arr = [];
            // for(let o of this.bankList2){
            //     if(o.v.includes(searchTxt)){
            //         arr.push(o);
            //     }
            // }
            // this.bankList2
        },
        save() {
            if(!this.formdata.uname){
                Toast.error('姓名不能为空！');
                return;
            }
            if(!this.formdata.idcard || !checkCard(this.formdata.idcard)){
                Toast.error('身份证号不正确！');
                return;
            }
            if(!this.formdata.mobile || !this.$util.telValidate(this.formdata.mobile)){
                Toast.error('手机号不正确！');
                return;
            }
            if(!this.formdata.bankKind){
                Toast.error('银行卡种不能为空！');
                return;
            }
            if(!this.formdata.bankNo){
                Toast.error('银行卡号不能为空！');
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
            if(!this.formdata.bankDeposit){
                Toast.error('请选择开户行！');
                return;
            }
            // if(!this.formdata.detailAddr){
            //     Toast.error('详细地址不能为空！');
            //     return;
            // }
            sessionStorage.saveObj = JSON.stringify(Object.assign({
                legalName: this.formdata.uname,
                legalIdCard: this.formdata.idcard,
                merLegalPhone: this.formdata.mobile,
                cardNo: this.formdata.bankNo,
                headBankCode: this.bankCode,
                bankProvince: this.formdata.province,
                bankCity: this.formdata.city,
                bankArea: this.formdata.area,
                // merAddress: this.formdata.detailAddr,
                accountName: this.formdata.bankDeposit,
                bankCode: this.formdata.bankDepositCode,
                bankName: this.formdata.bankName,
            }, this.regionCode));
            this.$router.push('/certification');
        },
        showSheet() {
            if(this.bankList2.length == 0) {
                Toast.error('该地区未查询到支行信息');
                return;
            }
            this.open = true;
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.formdata = {
            uname: '',
            mobile: '',
            idcard: '',
            bankKind: '借记卡（建议银联卡）',
            bankNo: '',
            bankName: '',
            province: '',
            city: '',
            area: '',
            bankDeposit: '',
            // detailAddr: '',
        };
        let arr = [];
        for (let v of $city) {
            arr.push(v.value);
        }
        this.provinceArr = arr;
        this.getBankList();
    }
}
Vue.use(Loading);
Vue.use(Toast);
Vue.use(TextField);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(Button);
Vue.use(BottomSheet);
</script>

<style scoped lang="less">
.wrapper{
    padding-bottom: .2rem;
}
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
                width: 33.33%;
                white-space: nowrap;
            }
        }
        .sel-a{
            padding-left: .14rem;
            padding-right: .15rem;
            position: relative;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &::after{
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border-right: .04rem solid transparent;
                border-left: .04rem solid transparent;
                border-top: .06rem solid #000;
                position: absolute;
                right: .1rem;
                top: 50%;
                margin-top: -2px;
            }
        }
        .code-a{
            position: absolute;
            right: .15rem;
            top: 0;
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
            &::before{
                content: '';
                display: inline-block;
                width: .07rem;
                height: .07rem;
                background: #ff7421;
                border-radius: 100%;
                margin-right: .05rem;
            }
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
.bot-s{
    width: 100%;
    padding: .12rem .12rem .24rem;
    height: calc(~"100%");
    -webkit-overflow-scrolling: touch;
    overflow: hidden;
    .top{
        .search-box{
            height: .4rem;
            border: 1px solid #c9c9c9;
            border-radius: .05rem;
            padding: .05rem;
            width: 100%;
            margin-right: .15rem;
            img{
                width: .22rem;
                height: .2rem;
                margin: .05rem 0;
            }
            .inp{
                border: none;
                outline: none;
                height: .2rem;
                line-height: .2rem;
                margin: .05rem 0;
                padding: 0 .1rem;
                font-size: .14rem;
                width: 100%;
            }
        }
        .close{
            white-space: nowrap;
            font-size: .14rem;
            color: #666;
        }
    }
    .list{
        margin-top: .1rem;
        max-height: calc(~"100% - .45rem");
        overflow-y: scroll;
    }
    .item{
        position: relative;
        padding: .05rem .1rem .05rem .15rem;
        line-height: .22rem;
        font-size: .14rem;
        color: #000;
        border-radius: .02rem;
        &.on{
            color: #fff;
            background: #51BD0B;
        }
    }
}
</style>
<style>
.qualifacation-cert .mu-input-content{
    padding: 0 .15rem;
}
.qualifacation-cert .mu-input-content.mu-select{
    padding-right: 0;
}
.qualifacation-cert .mu-input-content .mu-text-field-input{
    padding: .05rem 0 .05rem .1rem;
    height: .44rem;
    text-align: right;
}
.qualifacation-cert .yzm .mu-input-content .mu-text-field-input{
    padding-right: 1.1rem;
}
.qualifacation-cert .mu-input-content .mu-input-prefix-text{
    color: #000;
    min-width: .6rem;
    letter-spacing: 1px;
}
.qualifacation-cert .mu-input-content .mu-input-line{
    background-color: #f3f3f3;
}
.deposit{
    top: 0!important;
}
</style>
