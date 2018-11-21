<template>
    <div id="pageContainer" class="trade-psw-manage">
        <div class="header">
            <p class="title">交易密码管理</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <mu-ripple class="item flex fcen spb" @click="addTradePsw" v-if="state.transactState == 0">
                <p class="label">新增交易密码</p>
                <p class="arr-r gray"></p>
            </mu-ripple>
            <template v-else-if="state.transactState == 1">
                <mu-ripple class="item flex fcen spb" @click="updateTradePsw">
                    <p class="label">修改交易密码</p>
                    <p class="arr-r gray"></p>
                </mu-ripple>
                <mu-ripple class="item flex fcen spb" @click="forgetTradePsw">
                    <p class="label">忘记交易密码</p>
                    <p class="arr-r gray"></p>
                </mu-ripple>
            </template>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { Button, Snackbar, Icon } from 'muse-ui';
import { userState } from '../api/user';
export default {
    data() {
        return {
            state: {},
        }
    },
    methods: {
        getUserState() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            userState().then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    this.state = res.data;
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
        addTradePsw() {
            this.$router.push('/setTradePsw');
        },
        updateTradePsw() {
            this.$router.push('/updateTradePsw');
        },
        forgetTradePsw() {
            this.$router.push('/forgetTradePsw');
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.getUserState();
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.wrapper{
    border-top: 1px solid #f3f3f3;
}
.item{
    position: relative;
    background: #fff;
    line-height: .42rem;
    font-size: .16rem;
    color: #000;
    padding: 0 .15rem;
    border-top: 1px solid #f3f3f3;
}
</style>
