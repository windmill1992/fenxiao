<template>
    <div id="pageContainer">
        <div class="wrapper fcol">
            <div class="box flex1 fcol fcen spc">
                <div class="code-box">
                    <div class="user flex fcen">
                        <div class="avatar fshrink0">
                            <img v-if="user.coverImageUrl" :src="user.coverImageUrl" ref="avatar" alt="">
                            <img v-else :src="imgHost + '/def_tx.png'" ref="avatar" alt="">
                        </div>
                        <div class="info flex1">
                            <p class="nick">{{user.userName}}</p>
                            <p class="mobile">{{user.mobileNum}}</p>
                        </div>
                    </div>
                    <a><img class="qr" :src="qrurl" ref="qr" /></a>
                    <p class="txt">保存二维码或让朋友扫一扫二维码，邀请TA成为经销商</p>
                </div>
                <a href="javascript:;" class="back-a" onclick="history.go(-1)"></a>
            </div>
            <!-- <mu-button class="btn" color="#ff4521" textColor="#fff" @click="save">保存图片</mu-button> -->
        </div>
        <canvas id="cv" class="cv1" width="630" height="824"></canvas>
        <!-- <canvas id="cv" class="cv1" width="315" height="412"></canvas> -->
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import QRCode from 'qrcode';
import { imgHost } from '../api/baseUrl';
import { myCode, userInfo } from '../api/user';
import { Button, Snackbar, Icon } from 'muse-ui';
export default {
    data() {
        return {
            inviteCode: '',
            qrurl: '',
            user: {},
            imgHost: imgHost,
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            userInfo().then(res => {
                if(res.code == 1){
                    this.user = res.data;
                    this.user.mobileNum = res.data.mobileNum.substr(0, 3) + ' **** ' + res.data.mobileNum.substr(7, 4);
                    this.getCode();
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name);
                }else{
                    this.loading.close();
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
        getCode() {
            myCode({ url: location.href }).then(res => {
                this.loading.close();
                if(res.code == 1){
                    this.inviteCode = res.data.code;
                    this.inviter = res.data.userName;
                    this.qrcode();
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
        qrcode() {
            let link = location.protocol + '//' + location.host + '/shareReg?invitationCode='+ this.inviteCode;
            QRCode.toDataURL(link)
            .then(url => {
                this.qrurl = url;
            })
            .catch(err => {
                console.error(err)
            })
        },
        save() {
            let u = this.user;
            const $avatar = this.$refs.avatar;
            const $qr = this.$refs.qr;
            const $cv = document.getElementById('cv');
            const ctx = $cv.getContext('2d');
            let w = $cv.width;
            let h = $cv.height;
            let r = 2;
            $avatar.setAttribute("crossOrigin",'*');

            ctx.beginPath();
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, w, h);

            ctx.save();
            ctx.beginPath();
            ctx.arc(50 * r, 40 * r, 20 * r, 0, 2 * Math.PI);
            ctx.clip();
            ctx.drawImage($avatar, 30 * r, 20 * r, 40 * r, 40 * r);
            ctx.closePath();
            ctx.restore();

            ctx.beginPath();
            ctx.font = 16 * r +'px PingFang-Regular';
            ctx.fillStyle = '#000000';
            ctx.textBaseline = 'top';
            ctx.fillText(u.userName, 80 * r, 20 * r);
            ctx.closePath();

            ctx.beginPath();
            ctx.font = 14 * r +'px PingFang-Regular';
            ctx.fillStyle = '#9c9c9c';
            ctx.textBaseline = 'top';
            ctx.fillText(u.mobileNum, 80 * r, 40 * r);
            ctx.drawImage($qr, 10 * r, 60 * r, 295 * r, 295 * r);
            ctx.closePath();

            ctx.beginPath();
            ctx.font = 14 * r +'px PingFang-Regular';
            ctx.fillStyle = '#9c9c9c';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'left';
            this.breakword('保存二维码或让朋友扫一扫二维码，邀请TA成为经销商', 30 * r, 350 * r, ctx, r);
            ctx.closePath();

            this.saveUrl = $cv.toDataURL('image/png');
            this.savePic();
        },
        savePic() {
            let type = 'png';
            let _fixType = function(type) {
                type = type.toLowerCase().replace(/jpg/i, 'jpeg');
                let r = type.match(/png|jpeg|bmp|gif/)[0];
                return 'image/' + r;
            }; 
            
            let imgData = this.saveUrl.replace(_fixType(type),'image/octet-stream');
            let saveFile = function(data, filename){
                let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                save_link.href = data;
                save_link.download = filename;
            
                let event = document.createEvent('MouseEvents');
                event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                save_link.dispatchEvent(event);
            };
            
            let filename = 'inviteQRCode.' + type;
            saveFile(imgData, filename);
        },
        breakword(str, initX, initHeight, ctx, r) {
            let lineWidth = 0;
            let canvasWidth = 255 * r;//计算canvas的宽度
            let lastSubStrIndex= 0; //每次开始截取的字符串的索引
            let temp = '',arr = [], sw = 0, count = 0, raw = 0;
            for(let i=0;i<str.length;i++){ 
                sw = ctx.measureText(str[i]).width;
                lineWidth += sw; 
                if(i < str.length - 1){
                    if(str[i] == '/'){
                        if(temp == ''){
                            temp = '1';
                            count++;
                            if(raw == 0){
                                arr.push({x:(initX+lineWidth+(count-1)*sw+sw*5),y:initHeight});
                            }else{
                                arr.push({x:(initX+lineWidth+(count-1)*sw),y:initHeight});
                            }
                            str = str.replace(str[i],'  ');
                            i++;
                        }else{
                            str = str.replace(str[i],'  ');
                            i++;
                            temp = '';
                        }
                    }else{
                        if(temp != ''){
                            str = str.replace(str[i],'  ');
                            i++;
                        }
                    }
                    if(lineWidth > canvasWidth ){ 
                        count = 3;
                        raw++;
                        if(raw == 1){
                            ctx.fillText(str.substring(lastSubStrIndex,i),initX + sw*2 - 15 * r,initHeight);//绘制截取部分
                        }else{
                            ctx.fillText(str.substring(lastSubStrIndex,i),initX,initHeight);
                        }
                        initHeight += 25 * r; //25为字体的高度
                        lineWidth = 0;
                        lastSubStrIndex = i;
                    }
                }
                if(i==str.length-1){//绘制剩余部分
                    ctx.fillText(str.substring(lastSubStrIndex,i+1),initX,initHeight);
                }
            }
            return [initHeight,arr];
        }
    },
    mounted() {
        this.getData();
    }
}
Vue.use(QRCode);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.wrapper{
    padding-top: 0;
}
.box{
    background: rgba(0, 0, 0, .6);
    .code-box{
        width: 400;
        max-width: 84%;
        background: #fff;
        padding: .2rem .15rem;
        box-shadow: 0 0 .16rem rgba(0, 0, 0, .1);
        .user{
            padding: 0 .15rem;
        }
        .avatar{
            width: .4rem;
            height: .4rem;
            border-radius: 100%;
            margin-right: .1rem;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                border-radius: inherit;
            }
        }
        .info{
            overflow: hidden;
        }
        .nick{
            font-size: .16rem;
            color: #000;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }
        .mobile{
            color: #9c9c9c;
            font-size: .14rem;
        }
        .qr{
            width: 100%;
            height: 100%;
            vertical-align: top;
            margin: 0;
        }
        .txt{
            font-size: .14rem;
            color: #9c9c9c;
            padding: 0 .15rem;
        }
    }
    .back-a{
        position: absolute;
        top: .2rem;
        left: .15rem;
        width: .15rem;
        height: .15rem;
        border-left: 2px solid #fff;
        border-bottom: 2px solid #fff;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }
}
.btn{
    height: .44rem;
    font-size: .16rem;
    letter-spacing: 1px;
}
.cv1{
    position: fixed;
    top: -9999px;
    left: 0;
    width: 315px;
    height: 412px;
    z-index: -9999;
}
</style>
