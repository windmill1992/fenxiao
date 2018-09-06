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
                <p class="txt1">注册人姓名:张三</p>

                <label for="zm" class="item zm" ref="zm" v-loading="loading_zm"></label>
                <input type="file" id="zm" class="file-input" @change="upload('zm')">
                <p class="txt2">点击上传身份证正面</p>

                <label for="fm" class="item fm" ref="fm" v-loading="loading_fm"></label>
                <input type="file" id="fm" class="file-input" @change="upload('fm')">
                <p class="txt2">点击上传身份证反面</p>

                <label for="sc" class="item sc" ref="sc" v-loading="loading_sc"></label>
                <input type="file" id="sc" class="file-input" @change="upload('sc')">
                <p class="txt2">点击上传手持身份证正面</p>
            </div>
            
            <p class="tip bold">银行卡上传</p>
            <div class="box">
                <label for="bank" class="item bank" ref="bank" v-loading="loading_bank"></label>
                <input type="file" id="bank" class="file-input" @change="upload('bank')">
                <p class="txt2">点击上传银行卡正面</p>
            </div>

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
import { Helpers, Icon, Snackbar, Button } from 'muse-ui';
import { uploadImage } from '../api/image';
import { realCert } from '../api/user';
export default {
    data() {
        return {
            loading_zm: false,
            loading_fm: false,
            loading_sc: false,
            loading_bank: false,
            ids: {},
        }
    },
    methods: {
        upload(name) {
            let t = name == 'zm' ? 2 : (name == 'fm' ? 3 : (name == 'sc' ? 4 : 5));
            let formData = new FormData();
            let file = $(`#${name}`)[0].files[0];

            formData.append('file', file, file.name);
            formData.append('type', t);
            this['loading_' + name] = true;
            uploadImage(formData).then(res => {
                this['loading_' + name] = false;
                console.log(res);
                if(res.code == 1){
                    this.ids[name] = res.data.imageId;
                    Toast.error('上传成功！');
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
            this.loading = Loading();
            let param = {
                idFaceId: this.ids.zm,
                idBackId: this.ids.fm,
                idHand: this.ids.sc,
                bankFaceId: this.ids.bank,
            }
            realCert(param).then(res => {
                this.loading.close();
                if(res.code == 1){
                    Toast.success('提交成功！');
                    setTimeout(() => {
                        this.$router.push('/');
                    }, 1500);
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name);
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器错误，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                Toast.error('未知异常！');
                console.log(err);
            })
        }
    }
}
Vue.use(Helpers);
Vue.use(Loading);
Vue.use(Toast);
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
.btns{
    width: 100%;
    height: .48rem;
    position: relative;
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
.certification .zm{
    background-image: url(../assets/img/sfzzhengmian.png);
}
.certification .fm{
    background-image: url(../assets/img/sfzbeimian.png);
}
.certification .sc{
    background-image: url(../assets/img/shouchisfz.png);
}
.certification .bank{
    background-image: url(../assets/img/creditcard.png);
}
</style>
