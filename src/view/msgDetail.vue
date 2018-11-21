<template>
    <div id="pageContainer" class="msg-detail">
        <div class="header">
            <p class="title">消息详情</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <div class="box flex1">
                <div class="title bold">{{info.title}}</div>
                <div class="time">{{info.updateTime | fmt}}</div>
                <div class="content" v-html="info.content"></div>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Loading from 'muse-ui-loading';
import Toast from 'muse-ui-toast';
import { Button, Snackbar, Icon } from 'muse-ui';
import { msgDetail } from '../api/message';
import { util } from '../utils/base';
export default {
    data() {
        return {
            info: {},
            title: '消息详情',
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            msgDetail({ id: this.id }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    this.info = res.data;
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name + '&params=id_' + this.id);
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
    filters: {
        fmt(t) {
            return util.formatTime(t);
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.id = this.$route.params.id;
        if(this.id){
            this.getData();
        }else{
            this.$router.replace('/notice');
        }
    }
}
Vue.use(Loading);
Vue.use(Toast);
Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Icon);
</script>

<style scoped lang="less">
.box{
    border-top: 2px solid #f6f6f6;
    background: #fff;
    padding: 0 .15rem;
    .title{
        font-size: .2rem;
        line-height: 1.5;
        margin-top: .1rem;
    }
    .time{
        font-size: .14rem;
        color: #9c9c9c;
        margin-top: .1rem;
    }
    .content{
        margin-top: .15rem;
        line-height: 1.5;
        font-size: .14rem;
        img{
            max-width: 100%;
            width: 100%;
        }
    }
}
</style>
