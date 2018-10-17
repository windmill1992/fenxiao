<template>
    <div id="pageContainer" class="certification">
        <div class="header">
            <p class="title">实名认证</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <p class="tip bold">身份证上传</p>
            <div class="box">
                <p class="txt">请按照图文指示上传</p>
                <!-- <p class="txt1">注册人姓名:张三</p> -->

                <label for="zm" class="item zm" ref="zm" v-loading="loading_zm" :style="'background-image: url('+ imgHost +'/sfzzhengmian.png)'"></label>
                <input type="file" id="zm" class="file-input" @change="upload('zm')">
                <p class="txt2">点击上传身份证正面</p>

                <label for="fm" class="item fm" ref="fm" v-loading="loading_fm" :style="'background-image: url('+ imgHost +'/sfzbeimian.png)'"></label>
                <input type="file" id="fm" class="file-input" @change="upload('fm')">
                <p class="txt2">点击上传身份证反面</p>

                <label for="sc" class="item sc" ref="sc" v-loading="loading_sc" :style="'background-image: url('+ imgHost +'/shouchisfz.png)'"></label>
                <input type="file" id="sc" class="file-input" @change="upload('sc')">
                <p class="txt2">点击上传手持身份证正面</p>
            </div>
            
            <p class="tip bold">银行卡上传</p>
            <div class="box">
                <label for="bank" class="item bank" ref="bank" v-loading="loading_bank" :style="'background-image: url('+ imgHost +'/creditcard.png)'"></label>
                <input type="file" id="bank" class="file-input" @change="upload('bank')">
                <p class="txt2">点击上传银行卡正面</p>

                <label for="sc_bank" class="item bank" ref="sc_bank" v-loading="loading_sc_bank" :style="'background-image: url('+ imgHost +'/creditcard.png)'"></label>
                <input type="file" id="sc_bank" class="file-input" @change="upload('sc_bank')">
                <p class="txt2">点击上传手持银行卡</p>
            </div>
            <!-- <p class="tip bold">易宝验证码</p>
            <div class="item1 flex fcen spb">
                <mu-text-field type="number" v-model="code" placeholder="请输入验证码" class="inp yzm" max-length="6" full-width underline-color="blue" prefix="验证码"></mu-text-field>
                <a href="javascript:;" class="code-a" v-if="loading2" v-loading="loading2" data-mu-loading-size="20"></a>
                <a href="javascript:;" class="code-a" @click="getCode" v-else-if="!waiting">获取验证码</a>
                <a href="javascript:;" class="code-a no" v-else>{{time}}s重新获取</a>
            </div> -->
            <mu-ripple class="btns" @click="submit">
                <a href="javascript:;" class="btn bold">立即认证</a>
            </mu-ripple>
        </div>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { Icon, Snackbar, Button, TextField, Dialog } from 'muse-ui';
import { uploadImage } from '../api/image';
import { certification, resendYopCode, authorize } from '../api/user';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            loading_zm: false,
            loading_fm: false,
            loading_sc: false,
            loading_bank: false,
            loading_sc_bank: false,
            ids: {},
            urls: {},
            imgHost: imgHost,
            saveObj: {},
            loading2: false,
            loading3: false,
            code: '',
            waiting: false,
            time: 60,
            sending: false,
        }
    },
    methods: {
        upload(name) {
            let t = name == 'zm' ? 2 : (name == 'fm' ? 3 : (name == 'sc' ? 4 : (name == 'bank' ? 5 : 7)));
            let formData = new FormData();
            let file = $(`#${name}`)[0].files[0];

            formData.append('file', file, file.name);
            formData.append('type', t);
            this['loading_' + name] = true;
            uploadImage(formData).then(res => {
                this['loading_' + name] = false;
                if(res.code == 1){
                    this.ids[name] = res.data.imageId;
                    this.urls[name] = res.data.imageUrl;
                    Toast.success('上传成功！');
                    this.$refs[name].style.backgroundImage = 'url('+ res.data.imageUrl +')';
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器错误，上传失败！');
                    }
                }
            })
            .catch(err => {
                this['loading_' + name] = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        submit() {
            if(!this.ids.zm){
                Toast.error('请上传身份证正面！');
                return;
            }
            if(!this.ids.fm){
                Toast.error('请上传身份证反面！');
                return;
            }
            if(!this.ids.sc){
                Toast.error('请上传手持身份证正面！');
                return;
            }
            if(!this.ids.bank){
                Toast.error('请上传银行卡正面！');
                return;
            }
            if(!this.ids.sc_bank){
                Toast.error('请上传手持银行卡！');
                return;
            }
            this.loading2 = true;
            let param = Object.assign({
                idFaceId: this.ids.zm,
                idBackId: this.ids.fm,
                idHandId: this.ids.sc,
                bankFaceId: this.ids.bank,
                bankFaceHandId: this.ids.sc_bank,
                idFaceUrl: this.urls.zm,
                idBackUrl: this.urls.fm,
                idHandUrl: this.urls.sc,
                bankFaceUrl: this.urls.bank,
                bankFaceHandUrl: this.urls.sc_bank,
            }, this.saveObj);
            certification(param).then(res => {
                this.loading2 = false;
                if(res.code == 1){
                    Toast.success('提交成功！');
                    sessionStorage.removeItem('saveObj');
                    setTimeout(() => {
                        this.$router.replace('/certSuccess');
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
                this.loading2 = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        /* sendCode() {
            this.loading2 = true;
            resendYopCode({ mobile: this.saveObj.merLegalPhone }).then(res => {
                this.loading2 = false;
                if(res.code == 1){
                    Toast.info('易宝验证码已发送，请注意查收！');
                    this.countdown();
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.loading2 = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        submit() {
            if(this.loading && this.loading.instance != null || this.loading3) return;
            if(!/\d{6}/.test(this.code)) {
                Toast.error('验证码错误！');
                return;
            }
            this.loading = Loading({ text: '请稍等...', target: document.getElementById('pageContainer') });
            this.loading3 = true;
            authorize({ merAuthorizeNum: this.code, mobile: this.saveObj.merLegalPhone }).then(res => {
                this.loading.close();
                if(res.code == 1){
                    Toast.success('提交成功！');
                    sessionStorage.removeItem('saveObj');
                    setTimeout(() => {
                        this.$router.replace('/certSuccess');
                    }, 1000);
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
                this.loading.close();
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
        } */
    },
    mounted() {
        if(sessionStorage.saveObj){
            this.saveObj = JSON.parse(sessionStorage.saveObj);
        }else{
            this.$router.replace('/qualifacationCert');
        }
        // console.log(this.saveObj);
    }
}
Vue.use(Loading);
Vue.use(Toast);
Vue.use(TextField);
Vue.use(Dialog);
Vue.use(Icon);
Vue.use(Snackbar);
Vue.use(Button);
</script>

<style scoped lang="less">
.tip{
    line-height: .5rem;
    padding: 0 .15rem;
    color: #000;
    font-size: .16rem;
}
.box{
    background: #fff;
    padding: .1rem .15rem .15rem;
    .txt{
        color: #555;
        font-size: .14rem;
    }
    .txt1{
        color: #ff7421;
        font-size: .14rem;
        margin: .05rem 0;
    }
    .item{
        display: block;
        width: 100%;
        height: 1.95rem;
        border: 1px solid #979797;
        border-radius: .1rem;
        margin-top: .15rem;
        position: relative;
        &.sc{
            height: 2.8rem;
        }
        &.bank{
            height: 1.8rem;
        }
    }
    .file-input{
        display: none;
    }
    .txt2{
        font-size: .16rem;
        color: #ff7421;
        margin-top: .15rem;
        text-align: center;
    }
}
.item1{
    height: .44rem;
    line-height: .44rem;
    padding: 0 .15rem;
    position: relative;
    background: #fff;
    .inp{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: .44rem;
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
.btns{
    width: 100%;
    height: .48rem;
    position: relative;
    margin-top: .2rem;
    .btn{
        display: block;
        line-height: .48rem;
        text-align: center;
        color: #fff;
        font-size: .18rem;
        background: #ff7421;
        letter-spacing: 1px;
    }
}
</style>
<style>
.certification .item{
    background-size: 80% 90%;
    background-position: center;
    background-repeat: no-repeat;
}
.trade-p .mu-input{
    margin: 0;
    padding: 0;
    min-height: auto;
}
.trade-p .mu-input-help{
    display: block!important;
}
.certification .mu-input-content{
    padding: 0 .15rem;
}
.certification .mu-input-content.mu-select{
    padding-right: 0;
}
.certification .mu-input-content .mu-text-field-input{
    padding: .05rem 0 .05rem .1rem;
    height: .44rem;
    text-align: right;
}
.certification .yzm .mu-input-content .mu-text-field-input{
    padding-right: 1.1rem;
}
.certification .mu-input-content .mu-input-prefix-text{
    color: #000;
    min-width: .6rem;
    letter-spacing: 1px;
}
.certification .mu-input-content .mu-input-line{
    background-color: #f3f3f3;
    left: .15rem;
}
.certification .mu-input-content .mu-input-focus-line {
    left: .15rem;
}
</style>
