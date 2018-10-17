<template>
    <div id="pageContainer" class="order-track">
        <div class="header">
            <p class="title">订单跟踪</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <div class="top">
                <p>运单号：<span class="bold">{{info.courierNum}}</span></p>
                <p>国内承运人：{{info.courierName}}快递</p>
                <!-- <p>国内承运人电话：</p> -->
                <mu-ripple class="btn-a" @click="showDialog" v-if="state == 1 || state == 2">我要催单</mu-ripple>
            </div>
            <div class="bb10"></div>
            <div class="stepper fcol" v-if="hasData != 0">
                <template v-for="item,index in list">
                    <div class="step bold" v-if="state == 3 && index == 0">
                        <div class="label flex">
                            <img class="icon" src="../assets/img/finish.png" alt="" />
                            <p class="con">{{item.AcceptStation}}</p>
                        </div>
                        <p class="time">{{item.AcceptTime}}</p>
                        <div class="line-box"><span class="line"></span></div>
                    </div>
                    <div class="step" v-else>
                        <div class="label flex">
                            <img class="icon" src="../assets/img/unfinish.png" alt="" />
                            <p class="con">{{item.AcceptStation}}</p>
                        </div>
                        <p class="time">{{item.AcceptTime}}</p>
                        <div class="line-box" v-if="index != list.length - 1"><span class="line"></span></div>
                    </div>
                </template>
            </div>
            <div class="no-data fcol fcen spc flex1" v-else>
                <img :src="imgHost + '/error_zanwusj.png'" alt="暂无数据">
                <p class="txt">暂无物流信息</p>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import Vue from 'vue';
import Loading from 'muse-ui-loading';
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import { Snackbar, Button, Icon, Dialog } from 'muse-ui';
import { trackInfo } from '../api/product';
import { shipInfo } from '../api/user';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            info: {},
            list: [],
            state: '',
            imgHost: imgHost,
            hasData: -1,
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            shipInfo({ shipmentId: this.id }).then(res => {
                if(res.code == 1){
                    this.info = res.data;
                    this.getTrack();
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
        getTrack() {
            trackInfo({ express: this.info.courierName, expressNo: this.info.courierNum }).then(res => {
                this.loading.close();
                if(res.code == 1){
                    let arr =[];
                    for (let i=res.data.Traces.length - 1; i>=0; i--){
                        arr.push(res.data.Traces[i]);
                    }
                    this.list = [...[], ...arr];
                    this.state = res.data.State;
                    this.hasData = 1;
                }else if(res.code == 4 || res.code == 2){
                    this.list = [];
                    this.hasData = 0;
                }else{
                    this.hasData = 0;
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.hasData = 0;
                this.loading.close();
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        showDialog() {
            Message.alert(`您的订单已交由${this.info.courierName}快递进行配送，运单号为${this.info.courierNum}`, '', {});
        },
    },
    mounted() {
        this.id = this.$route.params.id;
        if(this.id){
            this.getData();
        }else{
            alert('订单不存在！');
        }
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Message);
Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Icon);
Vue.use(Dialog);
</script>

<style scoped lang="less">
.top{
    border-top: 2px solid #f6f6f6;
    font-size: .14rem;
    color: #000;
    line-height: 2;
    position: relative;
    padding: .15rem;
    background: #fff;
    .btn-a{
        position: absolute;
        right: .15rem;
        top: .1rem;
        height: .28rem;
        line-height: .26rem;
        padding: 0 .1rem;
        border: 1px solid #999;
        border-radius: .28rem;
        overflow: hidden;
    }
}
.stepper{
    background: #fff;
    .step{
        position: relative;
        font-size: .16rem;
        color: #999;
        &.bold{
            color: #000;
        }
        .label{
            padding: .15rem;
        }
        img{
            width: .16rem;
            height: .16rem;
            margin: .04rem .1rem 0 0;
        }
        .time{
            font-size: .14rem;
            color: #666;
            padding: .05rem .15rem .1rem 0;
            margin-left: .4rem;
            border-bottom: 1px solid #f3f3f3;
        }
        .line-box{
            padding-top: .4rem;
            height: 115%;
            position: absolute;
            top: 0;
            left: .23rem;
            box-sizing: border-box;
            .line{
                display: block;
                width: 1px;
                height: 100%;
                background: #ccc;
            }
        }
    }
}
</style>