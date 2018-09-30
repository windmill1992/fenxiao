<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">邀请客户</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="bb10"></div>
            <mu-ripple class="item" @click="linkto('inviteDistribution')">
                <div class="link flex fcen spb">
                    <div class="left flex fcen">
                        <img src="../assets/img/shinvite.png" alt="邀请">
                        <p class="txt">邀请</p>
                    </div>
                    <div class="arrow-r"></div>
                </div>
            </mu-ripple>
            <div class="bb10"></div>
            <mu-ripple class="item" @click="linkto('checkPending')">
                <div class="link flex fcen spb">
                    <div class="left flex fcen">
                        <img src="../assets/img/dsh.png" alt="待审核">
                        <p class="txt">待审核 <span v-if="num > 0" class="badge">{{num}}</span></p>
                    </div>
                    <div class="arrow-r"></div>
                </div>
            </mu-ripple>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import { Button, Snackbar, Icon } from 'muse-ui';
import { auditUserNum } from '../api/user';
export default {
    data() {
        return {
            num: 0,
        }
    },
    methods: {
        getData() {
            auditUserNum().then(res => {
                if(res.code == 1){
                    this.num = res.data;
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
        linkto(name) {
            this.$router.push({ name: name });
        }
    },
    mounted() {
        this.getData();
    }
}
Vue.use(Toast);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.item{
    position: relative;
    padding: 0 .15rem;
    height: .55rem;
    background: #fff;
    .link{
        height: .55rem;
        .left{
            img{
                width: .35rem;
                height: .35rem;
                border-radius: 5px;
            }
            .txt{
                font-size: .16rem;
                color: #000;
                margin-left: .1rem;
                position: relative;
                .badge{
                    position: absolute;
                    top: -.1rem;
                    right: -.2rem;
                    width: .16rem;
                    height: .16rem;
                    background: #ff7421;
                    color: #fff;
                    font-size: .12rem;
                    text-align: center;
                    line-height: .16rem;
                    border-radius: 100%;
                }
            }
        }
    }
}
</style>
