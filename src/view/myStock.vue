<template>
    <div id="pageContainer" class="my-stock">
        <div class="header">
            <p class="title">我的库存</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol" ref="wrapper">
            <mu-load-more class="box flex1 fcol" :loading="loading" @load="load">
                <div class="list" v-if="hasmore != 0">
                    <div class="item" v-for="item in list" :key="item.id">
                        <div class="top flex fcen">
                            <div class="pic fshrink0">
                                <img v-if="item.coverImageUrl" :src="item.coverImageUrl" alt="商品">
                                <img v-else :src="imgHost + '/def_pro1.png'" alt="商品">
                            </div>
                            <div class="info flex1 fcol spb">
                                <p class="title bold">{{item.productName}}</p>
                                <div class="price-box">
                                    <p class="price">进货均价:￥{{item.avgOrderMoney}}</p>
                                    <p class="txt">(下阶订货价≥￥{{+item.avgOrderMoney + item.profitValue}}才供货)</p>
                                </div>
                            </div>
                        </div>
                        <div class="bot flex fcen spb">
                            <div class="left">
                                    <p class="txt">剩余库存x{{item.stockNum}}</p>
                                <p class="txt1">冻结库存x{{item.iceStock}}</p>
                                <!-- <router-link to="/" class="icon"><img src="../assets/img/icon_in.png" alt=""></router-link> -->
                            </div>
                            <mu-ripple class="right" @click="showDialog(item.id, item.profitValue)">
                                <a href="javascript:;" class="btn">设置利润</a>
                            </mu-ripple>
                        </div>
                    </div>
                </div>
                <div class="no-data flex1 fcol fcen spc" v-else>
                    <img :src="imgHost + '/error_zanwusj.png'" alt="暂无库存">
                    <p class="txt">暂无库存</p>
                </div>
                <div class="no-more" v-if="hasmore == 1">没有更多数据了</div>
            </mu-load-more>
            
            <div class="btn-wrapper flex">
                <mu-ripple class="btns flex1" @click="exchange">
                    <a href="javascript:;" class="btn flex fcen spc">
                        <img src="../assets/img/huanhuo.png" alt="换货区">
                        <p>换货区</p>
                    </a>
                </mu-ripple>
                <mu-ripple class="btns flex1" @click="linkto('orderArea')">
                    <a href="javascript:;" class="btn btn1">订货</a>
                </mu-ripple>
                <mu-ripple class="btns flex1" @click="linkto('offlineRetail')">
                    <a href="javascript:;" class="btn btn2">发货</a>
                </mu-ripple>
            </div>

            <mu-dialog title="设置利润" :open.sync="openDialog" width="400" max-width="84%" dialog-class="profit-d">
                <p class="txt">下阶订货价≥进货均价+利润金额，才会自动供货</p>
                <div class="box1 flex">
                    <p>原利润</p>
                    <p class="num">{{setValue}} 元</p>
                </div>
                <div class="box1">
                    <mu-text-field type="number" v-model="newProfit" prefix="新利润" suffix="元" class="inp" placeholder="设置新利润"></mu-text-field>
                </div>

                <mu-button slot="actions" flat color="#9c9c9c" @click="closeDialog">取消</mu-button>
                <mu-button slot="actions" flat color="#ff7421" @click="setProfit">确定</mu-button>
            </mu-dialog>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { LoadMore, Button, Snackbar, Icon, Dialog, TextField } from 'muse-ui';
import { myStock, setProfitValue } from '../api/user';
import { imgHost } from '../api/baseUrl';
export default {
    data() {
        return {
            list: [],
            loading: false,
            imgHost: imgHost,
            page: 1,
            pageSize: 10,
            hasmore: -1,
            openDialog: false,
            newProfit: '',
            setValue: 0,
        }
    },
    methods: {
        getData() {
            this.loading2 = Loading({ target: document.getElementById('pageContainer') });
            myStock({ pageNum: this.page, pageSize: this.pageSize }).then(res => {
                this.loading2.close();
                this.loading = false;
                if(res.code == 1){
                    if(this.page == 1){
                        this.list = [];
                    }
                    let r = res.data;
                    this.list = [...this.list, ...r.resultData];
                    if(r.total == 0){
                        this.hasmore = 0;
                    }else if(r.total <= this.page * this.pageSize){
                        this.hasmore = 1;
                    }else{
                        this.hasmore = 2;
                    }
                }else if(res.code == 4){
                    this.list = [];
                    this.hasmore = 0;
                }else if(res.code == 2){
                    this.hasmore = 1;
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
                this.loading2.close();
                this.loading = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        setProfit() {
            if(this.newProfit <= 0 || Number.isNaN(Number(this.newProfit))){
                Toast.error('请设置合理的新利润！');
                return;
            }
            let param = {
                id: this.setId,
                newProfitValue: this.newProfit,
            }
            setProfitValue(param).then(res => {
                this.openDialog = false;
                if(res.code == 1){
                    Toast.success('设置利润成功！');
                    this.$refs.wrapper.scrollTop = 0;
                    this.page = 1;
                    this.getData();
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.openDialog = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        load() {
            this.loading = true;
            this.page++;
            this.getData();
        },
        linkto(name) {
            this.$router.push({ name: name });
        },
        exchange() {
            alert('当前无换货活动，敬请期待');
        },
        closeDialog() {
            this.openDialog = false;
        },
        showDialog(id, num) {
            this.openDialog = true;
            this.setId = id;
            this.setValue = num ? num : 0;
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.getData();
    }
}
Vue.use(Loading);
Vue.use(Toast);
Vue.use(LoadMore);
Vue.use(TextField);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
Vue.use(Dialog);
</script>

<style scoped lang="less">
.box{
    padding-bottom: .5rem;
    border-top: 1px solid #f6f6f6;
    .list{
        .item{
            background: #fff;
            padding: .1rem 0;
            margin-bottom: .1rem;
            .top{
                padding: 0 .15rem .1rem;
                .pic{
                    width: 1.3rem;
                    height: 1.15rem;
                    overflow: hidden;
                    margin-right: .15rem;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .info{
                    max-width: 2rem;
                    height: 1.15rem;
                    .title{
                        font-size: .14rem;
                        color: #000;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        line-height: 1.5;
                        overflow: hidden;
                    }
                    .price-box{
                        .price{
                            color: #ff7421;
                            font-size: .14rem;
                        }
                        .txt{
                            font-size: .12rem;
                            color: #9c9c9c;
                        }
                    }
                }
            }
            .bot{
                padding: .1rem .15rem 0;
                border-top: 1px solid #f3f3f3;
                .left{
                    font-size: .12rem;
                    position: relative;
                    .txt{
                        color: #ff7421;
                    }
                    .txt1{
                        color: #9c9c9c;
                        margin-top: .05rem;
                    }
                    .icon{
                        position: absolute;
                        width: .14rem;
                        height: .14rem;
                        top: 50%;
                        right: -.2rem;
                        -webkit-transform: translate3d(0, -50%, 0);
                        transform: translate3d(0, -50%, 0);
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .right{
                    position: relative;
                    .btn{
                        display: block;
                        width: .9rem;
                        height: .4rem;
                        line-height: .4rem;
                        text-align: center;
                        color: #fff;
                        font-size: .14rem;
                        background: #ff7421;
                        border-radius: .05rem;
                    }
                }
            }
        }
    }
}
.btn-wrapper{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    .btns{
        position: relative;
        .btn{
            background: #fff;
            font-size: .14rem;
            color: #fff;
            line-height: .5rem;
            &.btn1{
                display: block;
                background: #ff7421;
                font-size: .16rem;
            }
            &.btn2{
                display: block;
                background: #ff4521;
                font-size: .16rem;
            }
            img{
                height: .27rem;
                margin-right: .1rem;
            }
            p{
                color: #9c9c9c;
            }
        }
    }
}
.profit-d{
    .txt{
        font-size: .12rem;
        color: #9c9c9c;
        padding: .05rem 0;
    }
    .box1{
        padding: .1rem 0;
        &:first-child{
            border-bottom: 1px solid #f3f3f3;
        }
        .num{
            padding-left: .15rem;
            color: #ff7421;
        }
        .inp{
            margin: 0;
            padding: 0;
            min-height: auto;
        }
    }
}
</style>
<style>
.profit-d .mu-dialog-body{
    padding-bottom: .15rem;
}
.profit-d .mu-text-field-input{
    color: #ff7421;
    padding-left: .1rem;
    font-size: .16rem;
}
.profit-d .mu-input-line{
    background-color: #f3f3f3;
}
</style>
