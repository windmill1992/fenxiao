<template>
    <div id="pageContainer" class="offline-retail">
        <div class="header">
            <p class="title">线下零售</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol">
            <div class="link-box flex fcen">
                <router-link to="/shipOrders" class="link flex1">
                    <mu-ripple class="rip flex fcen spc">
                        <img src="../assets/img/fhdd.png" alt="发货订单">
                        <p class="txt">发货订单</p>
                    </mu-ripple>
                </router-link>
                <router-link to="/addrManage" class="link flex1">
                    <mu-ripple class="rip flex fcen spc">
                        <img src="../assets/img/address.png" alt="地址管理">
                        <p class="txt">地址管理</p>
                    </mu-ripple>
                </router-link>
            </div>
            <div class="list" v-if="list.length > 0">
                <div class="item flex fcen" v-for="item,index in list" :key="item.id">
                    <div class="pic fshrink0">
                        <img v-if="item.coverImageUrl" :src="item.coverImageUrl" alt="商品">
                        <img v-else :src="imgHost + '/def_pro1.png'" alt="商品">
                    </div>
                    <div class="info flex1">
                        <p class="title">{{item.productName}}</p>
                        <p class="limit"><!-- 限发3件/人/月 --> </p>
                        <p class="stock">可用库存x{{item.stockNum}}</p>
                        <div class="num-box flex fcen">
                            <mu-button fab small color="rgba(0,0,0,0)" class="op" @click="minusNum" :data-index="index"><mu-icon value="remove" color="#ccc"></mu-icon></mu-button>
                            <mu-text-field type="number" v-model="num[index]" @change="getNum(index)" class="inp" color="transparent" underline-color="blue"></mu-text-field>
                            <mu-button fab small class="op" @click="addNum" :data-index="index"><img src="../assets/img/add.png" alt="增加"></mu-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="no-data flex1 fcol fcen spc" v-else>
                <img :src="imgHost + '/error_zanwusj.png'" alt="暂无数据">
                <p class="txt">您还没有可发货的商品~</p>
                <router-link to="/orderArea" class="link-a">立即订货</router-link>
            </div>
            <mu-ripple class="btns" @click="submit" v-if="list.length > 0">
                <a href="javascript:;" class="btn bold">下一步</a>
            </mu-ripple>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { TextField, Button, Snackbar, Icon } from 'muse-ui';
import { imgHost } from '../api/baseUrl';
import { myStock } from '../api/user';
export default {
    data() {
        return {
            num: [],
            imgHost: imgHost,
            list: [],
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            myStock({ pageNum: 1, pageSize: 20 }).then(res => {
                this.loading.close();
                if(res.code == 1){
                    this.list = [...[], ...res.data.resultData];
                    for(let v of this.list){
                        this.num.push(0);
                    }
                }else if(res.code == 4){
                    this.list = [];
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
        minusNum(e) {
            let { index } = $(e.target).closest('.op')[0].dataset;
            if(this.num[index] <= 0) return;
            this.num[index]--;
            this.num = [...[], ...this.num];
        },
        addNum(e) {
            let { index } = $(e.target).closest('.op')[0].dataset;
            if(this.num[index] >= this.list[index].stockNum) return;
            this.num[index]++;
            this.num = [...[], ...this.num];
        },
        getNum(index) {
            if(!this.num[index] || !Number.isInteger(Number(this.num[index])) || this.num[index] < 0){
                this.num[index] = 0;
                
            }else if(this.num[index] >= this.list[index].stockNum){
                this.num[index] = this.list[index].stockNum;
            }
            this.num = [...[], ...this.num];
        },
        submit() {
            let idArr = [], numArr = [];
            for (let i=0; i<this.num.length; i++) {
                if(this.num[i] > 0) {
                    idArr.push(this.list[i].productId);
                    numArr.push(this.num[i]);
                }
            }
            if(idArr.length == 0){
                Toast.error('发货数量至少为1');
                return;
            }
            let obj = {
                ids: idArr,
                nums: numArr,
            }
            sessionStorage.setItem('sendObj', JSON.stringify(obj));
            this.$router.push('/orderSure2');
        },
    },
    mounted() {
        this.getData();
    }
}
Vue.use(TextField);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.wrapper{
    padding-bottom: .48rem;
    .link-box{
        margin: .15rem;
        background: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.20);
        border-radius: .05rem;
        height: .52rem;
        line-height: .52rem;
        .rip{
            position: relative;
        }
        .link{
            font-size: .16rem;
            color: #000;
            position: relative;
            &:last-child::before{
                content: '';
                display: inline-block;
                width: 1px;
                height: .31rem;
                position: absolute;
                left: 0;
                top: .1rem;
                background: #f3f3f3;
            }
            img{
                height: .19rem;
                margin-right: .1rem;
            }
        }
    }
    .item{
        padding: .1rem .15rem;
        margin-bottom: .1rem;
        background: #fff;
        .pic{
            width: .88rem;
            height: .76rem;
            overflow: hidden;
            margin-right: .15rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .info{
            position: relative;
            .title{
                font-size: .14rem;
                color: #000;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
                padding-right: .25rem;
            }
            .limit{
                font-size: .12rem;
                height: .2rem;
                color: #ff7421;
                margin-top: .12rem;
            }
            .stock{
                font-size: .12rem;
                color: #9c9c9c;
                margin-top: .05rem;
            }
            .num-box{
                position: absolute;
                bottom: 0;
                right: 0;
                .op{
                    width: .26rem;
                    height: .26rem;
                    position: relative;
                    &:first-child{
                        border: 1px solid #ccc;
                    }
                    img{
                        width: .3rem;
                        height: .3rem;
                        position: relative;
                    }
                }
                .inp{
                    width: .4rem;
                    height: .24rem;
                    margin: 0 .1rem;
                    padding: 0;
                    min-height: auto;
                    font-size: .12rem;
                }
            }
        }
    }
}
.btns{
    position: fixed;
    width: 100%;
    height: .48rem;
    left: 0;
    bottom: 0;
    .btn{
        display: block;
        height: .48rem;
        line-height: .48rem;
        text-align: center;
        color: #fff;
        font-size: .16rem;
        background: #ff7421;
        letter-spacing: 1px;
    }
}
.no-data .link-a{
    margin-top: .2rem;
    line-height: 2;
    padding: 0 .15rem;
    font-size: .12rem;
    color: #ff7421;
    border: 1px solid #ccc;
    border-radius: .03rem;
}
</style>
<style>
.offline-retail .mu-input-content .mu-text-field-input{
    padding: .05rem 0;
    height: .24rem;
    text-align: center;
}
.offline-retail .mu-input-content .mu-input-line{
    background-color: transparent;
}
</style>
