<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">个人资料</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="avatar-box flex fcen spb">
                <p>头像</p>
                <label class="avatar flex fcen" for="avatar">
                    <img :src="user.coverImageUrl" v-if="user.coverImageUrl" alt="头像">
                    <img :src="imgHost +'/def_tx.png'" v-else alt="头像">
                    <div class="arrow-r"></div>
                    <input type="file" id="avatar" class="file-input" @change="uploadAvatar">
                </label>
            </div>
            <div class="bb10"></div>
            <div class="box">
                <mu-ripple class="item flex spb fcen">
                    <p>会员名</p>
                    <p>{{user.userName}}</p>
                </mu-ripple>
                <mu-ripple class="item flex spb fcen" @click="openDialog = true">
                    <p>微信号</p>
                    <div class="flex fcen">
                        <p>{{user.weChatCode}}</p>
                        <div class="arrow-r"></div>
                    </div>
                </mu-ripple>
            </div>
            <div class="bb10"></div>
            <div class="box">
                <mu-ripple class="item flex spb fcen">
                    <p>姓名</p>
                    <p>{{user.realName ? user.realName : ''}}</p>
                </mu-ripple>
                <mu-ripple class="item flex spb fcen" @click="toUpdateMobile">
                    <p>手机号</p>
                    <div class="flex fcen">
                        <p>{{user.mobileNum}}</p>
                        <div class="arrow-r"></div>
                    </div>
                </mu-ripple>
                <mu-ripple class="item flex spb fcen" @click="toAddrManage">
                    <p>收货地址管理</p>
                    <div class="flex fcen">
                        <p style="color: #ff7421;">{{hasAddr ? '' : '未设置'}}</p>
                        <div class="arrow-r"></div>
                    </div>
                </mu-ripple>
                <mu-ripple class="item flex spb fcen" @click="showHigh">
                    <p>我的上阶信息</p>
                    <div class="arrow-r" v-if="user.highUserInfo"></div>
                    <div v-else></div>
                </mu-ripple>
                <div class="info" v-if="user.highUserInfo" id="info">
                    <div class="sub-item">姓名: {{user.highUserInfo.realName}}</div>
                    <div class="sub-item">会员名: {{user.highUserInfo.userName}}</div>
                    <div class="sub-item" v-if="user.highUserInfo.weChatCode">微信号: {{user.highUserInfo.weChatCode}}</div>
                    <div class="sub-item">手机号: {{user.highUserInfo.mobileNum}}</div>
                    <div class="sub-item">地区: {{user.highUserInfo.province}} {{user.highUserInfo.city}}</div>
                </div>
            </div>
        </div>
        <mu-dialog title="" width="360" :open.sync="openDialog" dialog-class="wx-d">
            <a href="javascript:;" class="close" @click="closeDialog"><img src="../assets/img/close.png" alt="关闭" /></a>
            <div class="con">
                <p class="title">设置微信号</p>
                <p class="txt">该微信号为分销客户之间看到的联系方式</p>
                <div class="">
                    <mu-text-field type="text" v-model="wxId" max-length="20" placeholder="请输入新的微信号" class="inp-wx" underline-color="blue"></mu-text-field>
                </div>
                <p class="txt2">微信号必须为6~20位字符，可由字母、数字、"_"、和"-"组成。</p>
            </div>
            <mu-button slot="actions" flat color="#555" @click="closeDialog">取消</mu-button>
            <mu-button slot="actions" flat color="primary" @click="saveWxId">确定</mu-button>
        </mu-dialog>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { Button, Icon, Snackbar, Dialog, TextField } from 'muse-ui';
import { userInfo, selDefAddress, setWxcode } from '../api/user';
import { uploadImage } from '../api/image';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            user: {},
            openDialog: false,
            wxId: '',
            down: false,
            hasAddr: false,
            imgHost: imgHost,
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            userInfo().then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    this.user = res.data;
                    this.getAddrInfo();
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name);
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
                setTimeout(() => {
                    $('#info').slideUp(0);
                }, 0);
            })
            .catch(err => {
                this.loading.close();
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        getAddrInfo() {
            selDefAddress().then(res => {
                if(res.code == 1){
                    this.hasAddr = true;
                }else if(res.code == 2 || res.code == 4){
                    this.hasAddr = false;
                }
            })
            .catch(err => {
                console.log(err);
            })
        },
        toAddrManage() {
            this.$router.push('/addrManage');
        },
        uploadAvatar() {
            let formData = new FormData();
            let file = $('#avatar')[0].files[0];

            formData.append('file', file, file.name);
            formData.append('type', 1);
            this.loading = Loading({ text: '正在上传头像...', target: document.getElementById('pageContainer') });
            uploadImage(formData).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    Toast.success('上传头像成功！');
                    this.user.coverImageUrl = res.data.imageUrl;
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name);
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器错误，上传失败！');
                    }
                }
            })
            .catch(err => {
                this.loading.close();
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        closeDialog() {
            this.openDialog = false;
        },
        saveWxId() {
            let reg = /^[a-zA-Z0-9]{1}[-_a-zA-Z0-9]{5,19}$/;
            if(!reg.test(this.wxId)){
                Toast.error('请输入正确的微信号');
                return;
            }
            this.openDialog = false;
            setWxcode({ wechatCode: this.wxId }).then(res => {
                if(res.code == 1){
                    Toast.success('设置成功！');
                    this.getData();
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
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        toUpdateMobile() {
            this.$router.push('/updateMobile');
        },
        showHigh() {
            if(this.down){
                $('#info').slideUp();
            }else{
                $('#info').slideDown();
            }
            this.down = !this.down;
        },
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.getData();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Snackbar);
Vue.use(Dialog);
Vue.use(TextField);
</script>

<style scoped lang="less">
.avatar-box{
    background: #fff;
    padding: 0 .15rem;
    height: .53rem;
    border-top: 2px solid #f3f3f3;
    color: #000;
    font-size: .14rem;
    position: relative;
    .avatar{
        img{
            width: .33rem;
            height: .33rem;
            border-radius: 100%;
            margin-right: .1rem;
        }
        .arrow-r{
            width: .07rem;
            height: .16rem;
            margin-left: .1rem;
        }
        .file-input{
            display: none;
        }
    }
}
.box{
    background: #fff;
    font-size: .14rem;
    color: #000;
    .item{
        height: .41rem;
        padding: 0 .15rem;
        border-top: 1px solid #f3f3f3;
        position: relative;
        div{
            line-height: 1;
            .arrow-r{
                width: .07rem;
                height: .16rem;
                margin-left: .1rem;
            }
        }
    }
    .info{
        background: #fff;
        overflow: hidden;
        .sub-item{
            padding: 0 .15rem;
            height: .31rem;
            line-height: .3rem;
            border-top: 1px solid #f3f3f3;
            font-size: .12rem;
            color: #9c9c9c;
        }
    }
}
.wx-d {
    border-radius: .05rem;
    .title{
        font-size: .14rem;
        color: #000;
        text-align: center;
        padding: .1rem 0;
        border-bottom: 1px solid #f3f3f3;
    }
    .txt{
        font-size: .14rem;
        color: #666;
        padding: .1rem .15rem 5px;
    }
    .inp-wx{
        padding: 0 .15rem;
        width: 100%;
        margin-bottom: 5px;
        min-height: auto;
    }
    .txt2{
        font-size: .12rem;
        color: #9c9c9c;
        padding: 0 .15rem .15rem;
        border-bottom: 1px solid #f3f3f3;
    }
    .close{
        position: absolute;
        width: .4rem;
        height: .4rem;
        right: 0;
        top: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.04);
        img{
            width: .14rem;
            height: .14rem;
            margin: .13rem;
        }
    }
}
</style>
<style>
.wx-d{
    max-width: 80%;
}
.wx-d .mu-dialog-body{
    padding: 0;
    position: relative;
}
.wx-d .mu-text-field-input{
    font-size: .13rem;
}
</style>
