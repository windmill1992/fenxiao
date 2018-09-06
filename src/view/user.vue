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
                    <img src="../assets/img/fxkh.png" v-else alt="头像">
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
                <mu-ripple class="item flex spb fcen">
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
                    <p>{{user.realName ? user.realName : '--'}}</p>
                </mu-ripple>
                <mu-ripple class="item flex spb fcen" @click="toUpdateMobile">
                    <p>手机号</p>
                    <div class="flex fcen">
                        <p>{{user.moileNum}}</p>
                        <div class="arrow-r"></div>
                    </div>
                </mu-ripple>
                <mu-ripple class="item flex spb fcen" @click="toAddrManage">
                    <p>收货地址管理</p>
                    <div class="flex fcen">
                        <div class="arrow-r"></div>
                    </div>
                </mu-ripple>
                <mu-ripple class="item flex spb fcen">
                    <p>我的上阶信息</p>
                    <div class="arrow-r" v-if="user.highUserInfo"></div>
                    <div v-else>--</div>
                </mu-ripple>
                <div class="info" v-if="user.highUserInfo">
                    <div class="sub-item">姓名:{{user.highUserInfo.realName}}</div>
                    <div class="sub-item">会员名:{{user.highUserInfo.userName}}</div>
                    <div class="sub-item">手机号:{{user.highUserInfo.mobileNum}}</div>
                    <div class="sub-item">地区:{{user.highUserInfo.province}} {{user.highUserInfo.city}}</div>
                </div>
            </div>
        </div>
        <mu-dialog title="微信号" width="360" :open.sync="openDialog" dialog-class="wx-d">
            <p class="title">微信号</p>
            <div class="">
                <mu-text-field type="text" v-model="wxId" max-length="20" class="inp-wx" underline-color="blue"></mu-text-field>
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
import { Helpers, Button, Icon, Snackbar, Dialog, TextField } from 'muse-ui';
import { userInfo } from '../api/user';
import { uploadImage } from '../api/image';
export default {
    data() {
        return {
            user: {},
            openDialog: false,
            wxId: '',
        }
    },
    methods: {
        getData() {
            this.loading = Loading();
            userInfo().then(res => {
                this.loading.close();
                if(res.code == 1){
                    this.user = res.data;
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器错误，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.loading.close();
                Toast.error('未知异常！');
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
            uploadImage(formData).then(res => {
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
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        closeDialog() {
            this,openDialog = false;
        },
        saveWxId() {

        },
        toUpdateMobile() {
            this.$router.push('/updateMobile');
        },
    },
    mounted() {
        this.getData();
    }
}
Vue.use(Helpers);
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
</style>
