<template>
    <div id="pageContainer" class="notice">
        <div class="header">
            <p class="title">通知中心</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol" ref="wrapper">
            <div class="box flex1 fcol">
                <mu-ripple class="item flex spb" @click="toMsgList(1)">
                    <div class="con flex fcen">
                        <div class="icon fshrink0">
                            <img src="../assets/img/gonggao.png" alt="重要公告">
                        </div>
                        <div class="info flex1">
                            <div class="title">重要公告</div>
                            <div class="txt" v-if="list1.title">{{list1.title}}</div>
                            <div class="txt" v-else>暂无重要公告</div>
                        </div>
                    </div>
                    <div class="time" v-if="list1.updateTime">{{list1.updateTime}}</div>
                </mu-ripple>
                <mu-ripple class="item flex spb" @click="toMsgList(2)">
                    <div class="con flex fcen">
                        <div class="icon fshrink0">
                            <img src="../assets/img/activity.png" alt="活动公告">
                        </div>
                        <div class="info flex1">
                            <div class="title">活动公告</div>
                            <div class="txt" v-if="list2.title">{{list2.title}}</div>
                            <div class="txt" v-else>暂无活动公告</div>
                        </div>
                    </div>
                    <div class="time" v-if="list2.updateTime">{{list2.updateTime}}</div>
                </mu-ripple>
                <mu-ripple class="item flex spb" @click="toMsgList(3)">
                    <div class="con flex fcen">
                        <div class="icon fshrink0">
                            <img :src="imgHost +'/update.png'" alt="版本更新">
                        </div>
                        <div class="info flex1">
                            <div class="title">版本更新</div>
                            <div class="txt" v-if="list3.title">{{list3.title}}</div>
                            <div class="txt" v-else>暂无版本更新</div>
                        </div>
                    </div>
                    <div class="time" v-if="list3.updateTime">{{list3.updateTime}}</div>
                </mu-ripple>
                <mu-ripple class="item flex spb" @click="toMsgList(4)">
                    <div class="con flex fcen">
                        <div class="icon fshrink0">
                            <img :src="imgHost +'/xitong.png'" alt="系统通知">
                        </div>
                        <div class="info flex1">
                            <div class="title">系统通知</div>
                            <div class="txt" v-if="list4.title">{{list4.title}}</div>
                            <div class="txt" v-else>暂无系统通知</div>
                        </div>
                    </div>
                    <div class="time" v-if="list4.updateTime">{{list4.updateTime}}</div>
                </mu-ripple>
                <mu-ripple class="item flex spb" @click="toMsgList(4)">
                    <div class="con flex fcen">
                        <div class="icon fshrink0">
                            <img :src="imgHost +'/jilu.png'" alt="操作记录">
                        </div>
                        <div class="info flex1">
                            <div class="title">操作记录</div>
                            <div class="txt" v-if="list5.title">{{list5.title}}</div>
                            <div class="txt" v-else>暂无操作记录</div>
                        </div>
                    </div>
                    <div class="time" v-if="list5.updateTime">{{list5.updateTime}}</div>
                </mu-ripple>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { Snackbar, Button, Icon } from 'muse-ui';
import { newMsg } from '../api/message';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            list1: {},
            list2: {},
            list3: {},
            list4: {},
            list5: {},
            loading: '',
            imgHost: imgHost,
        }
    },
    methods: {
        getData(t) {
            newMsg({ type: t }).then(res => {
                if(this.loading && this.loading.instance != null && this.loading.instance._data.show){
                    this.loading.close();
                }
                if(res.code == 1){
                    this['list' + t] = {};
                    this['list' + t] = Object.assign({}, res.data);
                }else if(res.code == 0){
                    this.$router.push('/login?from=notify');
                }else if(res.code == 4){
                    this['list' + t] = {};
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                if(this.loading && this.loading.instance != null && this.loading.instance._data.show){
                    this.loading.close();
                }
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        toMsgList(t) {
            this.$router.push('/notice?type='+ t);
        }
    },
    mounted() {
        this.loading = Loading({ target: document.getElementById('pageContainer') });
        this.getData(1);
        this.getData(2);
        this.getData(3);
        this.getData(4);
        this.getData(5);
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Icon);
</script>

<style scoped lang="less">
.box{
    border-top: 1px solid #f3f3f3;
    background: #fff;
    .item{
        padding: .1rem .15rem;
        border-top: 1px solid #f3f3f3;
        position: relative;
        .time{
            color: #c9c9c9;
            font-size: .12rem;
        }
        .con{
            .icon{
                width: .35rem;
                height: .35rem;
                overflow: hidden;
                margin-right: .1rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .title{
                font-size: .16rem;
                color: #000;
            }
            .txt{
                font-size: .14rem;
                color: #9c9c9c;
            }
        }
    }
}
.no-data{
    img{
        width: 1.96rem;
        height: 1.25rem;
    }
    .txt{
        font-size: .16rem;
        color: #9c9c9c;
        margin-top: .2rem;
    }
}
</style>
