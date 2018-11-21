<template>
    <div id="pageContainer" class="detail">
         <div class="header">
            <p class="title">商品详情</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper fcol" v-if="!nodata">
            <div class="top">
                <div class="pic" :style="'background-image: url(' + (info.bFiles ? info.bFiles[0].middleUrl : imgHost +'/def_pro2.png') + ')'"></div>
                <div class="title">{{info.productName}}</div>
                <div class="price-box flex fcen">
                    <div class="tag">特惠价</div>
                    <div class="price"><span>￥</span>{{info.salesPrice}}</div>
                    <div class="ori-price">市场价: <span>￥{{info.originalPrice}}</span></div>
                </div>
                <div class="tags flex fcen">
                    <!-- <p class="tag">悠可舱</p> -->
                </div>
            </div>
            <div class="content" v-html="info.productContent"></div>
        </div>
        <div class="wrapper fcol" v-else>
            <div class="no-data flex1 fcol spc fcen">
                <img :src="imgHost + '/error_zanwusj.png'" alt="暂无数据">
                <p class="txt">未查询到商品信息！</p>
            </div>
        </div>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { Button, Snackbar, Icon } from 'muse-ui';
import { imgHost } from '../api/baseUrl';
import { prodDetail } from '../api/product';
export default {
    data() {
        return {
            imgHost: imgHost,
            info: {},
            nodata: false,
        }
    },
    methods: {
        getData() {
            this.loading = Loading({ target: document.getElementById('pageContainer') });
            prodDetail({ id: this.id }).then(res => {
                if(this.loading){
                    this.loading.close();
                }
                if(res.code == 1){
                    if(res.data != null){
                        this.info = res.data;
                        this.nodata = false;
                    }else{
                        this.nodata = true;
                        alert('商品不存在！');
                    }
                }else if(res.code == 0){
                    this.$router.push('/login?from='+ this.$route.name +'&params=id_'+ this.id);
                }else{
                    this.nodata = true;
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                this.nodata = true;
                Toast.error('未知异常！');
                console.log(err);
            })
        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
        this.id = this.$route.params.id;
        if(this.id){
            this.getData();
        }else{
            this.$router.replace('/');
        }
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Snackbar);
Vue.use(Icon);
</script>

<style scoped lang="less">
.top{
    background: #fff;
    .pic{
        padding-top: 60%;
        overflow: hidden;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
    .title{
        padding: .1rem .15rem;
        color: #000;
        font-size: .14rem;
    }
    .price-box{
        padding: 0 .15rem;
        .tag{
            display: inline-block;
            padding: 0 .1rem;
            line-height: .22rem;
            background: #ff7624;
            color: #fff;
            font-size: .12rem;
            border-radius: .05rem;
        }
        .price{
            color: #ff7624;
            font-size: .16rem;
            margin: 0 .1rem;
            span{
                font-size: .12rem;
            }
        }
        .ori-price{
            font-size: .12rem;
            color: #9c9c9c;
            span{
                color: #555;
                text-decoration: line-through;
            }
        }
    }
    .tags{
        padding: .1rem .15rem;
        margin-top: .1rem;
        border-top: 1px solid #f3f3f3;
        .tag{
            font-size: .12rem;
            color: #ff7624;
            border: 1px solid #ff7624;
            border-radius: .05rem;
            padding: 0 .05rem;
            line-height: .18rem;
        }
    }
}
.content{
    font-size: .14rem;
    color: #000;
    line-height: 1.5;
    padding: .15rem;
    background: #fff;
}
</style>
<style>
.detail .content img{
    width: 100%;
    max-width: 100%;
    margin: .1rem 0;
}
</style>
