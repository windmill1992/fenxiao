<template>
    <div id="pageContainer" class="address">
        <div class="header">
            <p class="title">{{title}}</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <div class="item flex fcen spb">
                    <mu-text-field v-model="formdata.uname" placeholder="联系人" class="inp" full-width underline-color="blue" prefix="联系人"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field type="number" v-model="formdata.mobile" placeholder="手机号" class="inp" full-width underline-color="blue" prefix="手机号"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <mu-text-field v-model="formdata.postcode" placeholder="选填" class="inp" full-width underline-color="blue" prefix="邮编"></mu-text-field>
                </div>
                <div class="item flex fcen spb">
                    <select v-model="province" placeholder="选择省" class="sel flex1" @change="selProvince">
                        <option value="" disabled selected style="display: none;">选择省</option>
                        <option :value="index" v-for="item,index in provinceArr" :key="'prov'+ index" v-if="item != '其他'">{{item}}</option>
                    </select>
                    <select v-model="city" placeholder="选择市" class="sel flex1" @change="selCity">
                        <option value="" disabled selected style="display: none;">选择市</option>
                        <option :value="index" v-for="item,index in cityArr" :key="'city'+ index" v-if="item != '其他'">{{item}}</option>
                    </select>
                    <select v-model="area" placeholder="选择区" class="sel flex1" @change="selArea">
                        <option value="" disabled selected style="display: none;">选择区</option>
                        <option :value="index" v-for="item,index in areaArr" :key="'area'+ index" v-if="item != '其他'">{{item}}</option>
                    </select>
                </div>
                <div class="item item3 flex fcen spb">
                    <mu-text-field v-model="formdata.detailAddr" placeholder="例如街道名称,门牌号码,楼层和房间号等信息" class="inp2" full-width underline-color="blue" multi-line :rows="3" :rows-max="3"></mu-text-field>
                </div>
            </div>
            <div class="def flex fcen spb">
                <p>设为默认</p>
                <mu-switch v-model="formdata.isDefault" class="switch"></mu-switch>
            </div>

            <mu-ripple class="btns" @click="save">
                <a href="javascript:;" class="btn bold">保存</a>
            </mu-ripple>
        </div>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import Vue from 'vue';
import { TextField, Switch, Snackbar, Button, Icon } from 'muse-ui';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { $city } from '../assets/js/city2.min';
import { setTitle } from '../utils/setTitle';
import { saveAddress, updateAddress, addressInfo } from '../api/user';
export default {
    data() {
        return {
            title: '',
            province: '',
            city: '',
            area: '',
            provinceArr: [],
            cityArr: [],
            areaArr: [],
            formdata: {},
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            addressInfo({ id: this.id }).then(res => {
                this.loading.close();
                if(res.code == 1){
                    let r = res.data;
                    this.formdata = {
                        uname: r.realName,
                        mobile: r.mobileNum,
                        province: r.province,
                        city: r.city,
                        area: r.area,
                        detailAddr: r.detailAddress,
                        postcode: r.zipCode,
                        isDefault: r.isSelected == 1,
                    }
                    for (let i=0; i<this.provinceArr.length; i++){
                        if(this.provinceArr[i].includes(r.province)){
                            this.province = i;
                            this.selProvince(i);
                            break;
                        }
                    }
                    for (let i=0; i<this.cityArr.length; i++){
                        if(this.cityArr[i].includes(r.city)){
                            this.city = i;
                            this.selCity(i);
                            break;
                        }
                    }
                    for (let i=0; i<this.areaArr.length; i++){
                        if(this.areaArr[i].includes(r.area)){
                            this.area = i;
                            break;
                        }
                    }
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
        selProvince(e) {
            let index = 0;
            if(typeof e == 'string' || typeof e == 'number'){
                index = e;
            }else{
                index = $(e.target).find(':selected').index() - 1;
            }
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
        },
        selCity(e) {
            let index = 0;
            if(typeof e == 'string' || typeof e == 'number'){
                index = e;
            }else{
                index = $(e.target).find(':selected').index() - 1;
            }
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
        },
        selArea(e) {
            let index = 0;
            if(typeof e == 'string' || typeof e == 'number'){
                index = e;
            }else{
                index = $(e.target).find(':selected').index() - 1;
            }
            console.log('area---'+ index);
            this.formdata.area = $city[this.province].child[this.city].child[index].value;
            this.area = index;
        },
        save() {
            if(!this.formdata.uname){
                Toast.error('联系人不能为空！');
                return;
            }
            if(!this.formdata.mobile || !this.$util.telValidate(this.formdata.mobile)){
                Toast.error('手机号不正确！');
                return;
            }
            if(!this.formdata.province || !this.formdata.city || (this.areaArr.length > 0 && !this.formdata.area)){
                Toast.error('请选择完整的省市区！');
                return;
            }
            if(!this.formdata.detailAddr){
                Toast.error('详细地址不能为空！');
                return;
            }
            let param = {
                realName: this.formdata.uname,
                mobileNum: this.formdata.mobile,
                province: this.formdata.province,
                city: this.formdata.city,
                area: this.formdata.area,
                detailAddress: this.formdata.detailAddr,
                zipCode: this.formdata.postcode,
                isSelected: this.formdata.isDefault ? 1 : 0,
            }
            let urls = '';
            if(this.id){
                urls = updateAddress;
                param.id = this.id;
            }else{
                urls = saveAddress;
            }
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            urls(param).then(res => {
                this.loading.close();
                if(res.code == 1){
                    Toast.success('保存成功！');
                    setTimeout(() => {
                        window.history.go(-1);
                    }, 1000);
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
        }
    },
    mounted() {
        let id = this.$route.query.id;
        if(id){
            this.id = id;
            this.title = '编辑收货地址';
        }else{
            this.title = '新增收货地址';
        }
        setTitle(this.title);
        this.isWx = this.$util.isWx();
        
        this.formdata = {
            uname: '',
            mobile: '',
            province: '',
            city: '',
            area: '',
            detailAddr: '',
            postcode: '',
            isDefault: false,
        };
        let arr = [];
        for (let v of $city) {
            arr.push(v.value);
        }
        this.provinceArr = arr;
        if(id){
            this.getData();
        }
    },
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(TextField);
Vue.use(Switch);
Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Icon);
</script>

<style scoped lang="less">
.box{
    background: #fff;
    border-top: 2px solid #f3f3f3;
    .item{
        height: .42rem;
        line-height: .42rem;
        position: relative;
        .inp{
            width: 100%;
            height: .42rem;
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
        &.item3{
            padding: 0;
            height: auto;
            .inp2{
                margin: 0;
                padding: 0;
                color: #000;
                font-size: .14rem;
            }
        }
    }
}
.def{
    margin-top: .1rem;
    padding: 0 .15rem;
    height: .42rem;
    background: #fff;
}
.btns{
    margin: .2rem .15rem;
    height: .44rem;
    line-height: .44rem;
    overflow: hidden;
    position: relative;
    .btn{
        display: block;
        color: #fff;
        background: #ff7421;
        font-size: .16rem;
        text-align: center;
        letter-spacing: 1px;
        border-radius: .05rem;
    }
}
</style>
<style>
.address .mu-input-content{
    padding: 0 .15rem;
}
.address .mu-input-content .mu-text-field-input{
    padding: .05rem 0;
    height: .42rem;
    text-align: right;
}
.address .mu-input-content .mu-input-prefix-text{
    color: #000;
}
.address .mu-input-content .mu-input-line{
    background-color: #f3f3f3;
}
.address .mu-select{
    padding-left: .15rem;
}
.address .mu-input-content .mu-text-field-textarea{
    text-align: left;
}
</style>
