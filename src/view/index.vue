<template>
    <div id="pageContainer">
        <div class="header index flex spb fcen">
            <mu-ripple class="set" @click="linkto('setting')">
                <img src="../assets/img/icon_set.png" alt="设置">
            </mu-ripple>
            <p class="txt">经销中心</p>
            <mu-ripple class="set" @click="linkto('notify')">
                <img src="../assets/img/icon_chat.png" alt="消息">
            </mu-ripple>
        </div>

        <mu-load-more class="box" :refreshing="refreshing" @refresh="refresh">
            <mu-ripple class="user-wrapper flex fcen spb" @click="linkto('user')">
                <div class="user-info flex1">
                    <p class="nick bold">{{info.userName}}</p>
                    <p class="link">查看 · 编辑个人资料</p>
                    <div class="level flex fcen" v-if="info.level == 0">
                        <img src="../assets/img/vip0.png" alt="会员">
                        <p>会员</p>
                    </div>
                    <div class="level flex fcen" v-else-if="info.level == 1">
                        <img src="../assets/img/vip1.png" alt="初级经销商">
                        <p>初级经销商</p>
                    </div>
                    <div class="level flex fcen" v-else-if="info.level == 2">
                        <img src="../assets/img/vip2.png" alt="中级经销商">
                        <p>中级经销商</p>
                    </div>
                    <div class="level flex fcen" v-else-if="info.level == 3">
                        <img src="../assets/img/vip3.png" alt="高级经销商">
                        <p>高级经销商</p>
                    </div>
                    <div class="level flex fcen" v-else-if="info.level == 4">
                        <img src="../assets/img/vip4.png" alt="项目合伙人">
                        <p>项目合伙人</p>
                    </div>
                </div>
                <p class="avatar fshrink0">
                    <img :src="info.coverImageUrl" v-if="info.coverImageUrl" alt="头像">
                    <img :src="imgHost + '/def_tx.png'" v-else alt="头像">
                </p>
            </mu-ripple>
            <!-- <div class="rank-wrapper">
                <mu-ripple class="rank-link" @click="linkto('')"><span class="link">排行榜</span></mu-ripple>
            </div> -->
            <div class="banner-wrapper">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <img :src="imgHost + '/banner/banner1.jpg'" alt="">
                        </div>
                        <div class="swiper-slide">
                            <img :src="imgHost + '/banner/banner2.jpg'" alt="">
                        </div>
                        <div class="swiper-slide">
                            <img :src="imgHost + '/banner/banner3.jpg'" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="menu-wrapper flex">
                <mu-ripple class="menu-item fcol spb fcen" @click="linkto('firstPoint')">
                    <p class="num">{{info.firstIntegral ? info.firstIntegral : 0 | numFmt}}</p>
                    <p class="txt">一阶积分</p>
                </mu-ripple>
                <mu-ripple class="menu-item fcol spb fcen" @click="linkto('secondPoint')">
                    <p class="num">{{info.secondIntegral ? info.secondIntegral : 0 | numFmt}}</p>
                    <p class="txt">二阶积分</p>
                </mu-ripple>
                <mu-ripple class="menu-item fcol spb fcen" @click="linkto('ownPoint')">
                    <p class="num">{{info.integralSelf ? info.integralSelf : 0 | numFmt}}</p>
                    <p class="txt">自有积分</p>
                </mu-ripple>
                <mu-ripple class="menu-item fcol spb fcen" @click="linkto('teamSales')">
                    <p class="num">{{info.teamSale ? info.teamSale : 0 | numFmt}}</p>
                    <p class="txt">团队销售额</p>
                </mu-ripple>
                <mu-ripple class="menu-item2 fcol spb fcen" @click="linkto('report')">
                    <p class="icon"><img src="../assets/img/icon_more.png" alt="更多"></p>
                    <p class="txt">更多</p>
                </mu-ripple>
            </div>
            <div class="bb10"></div>
            <div class="con-wrapper">
                <div class="head flex fcen">
                    <div class="line cff7421"></div>
                    <div class="title bold">结算中心</div>
                    <div class="txt">余额 ￥{{info.balance}}</div>
                </div>
                <div class="list flex">
                    <mu-ripple class="item" color="#ff7421" @click="linkto('tradeRecord')">
                        <img src="../assets/img/dxrwjs.png" alt="订单明细">
                        <p class="txt">订单明细</p>
                    </mu-ripple>
                    <mu-ripple class="item" color="#ff7421" @click="linkto('myAllowance', 1)">
                        <img src="../assets/img/dxrw.png" alt="团队奖励">
                        <p class="txt">我的补贴</p>
                    </mu-ripple>
                    <mu-ripple class="item" color="#ff7421" @click="linkto('wallet')">
                        <img src="../assets/img/wallet.png" alt="钱包管理">
                        <p class="txt">钱包管理</p>
                    </mu-ripple>
                </div>
            </div>
            <div class="bb10"></div>
            <div class="con-wrapper">
                <div class="head flex fcen">
                    <div class="line cff4521"></div>
                    <div class="title bold">订货管理</div>
                    <div class="txt">我的库存 {{info.stockNum ? info.stockNum : 0}}</div>
                </div>
                <div class="list flex">
                    <mu-ripple class="item" color="#ff4521" @click="order">
                        <img src="../assets/img/dh.png" alt="订货">
                        <p class="txt">订货</p>
                    </mu-ripple>
                    <mu-ripple class="item" color="#ff4521" @click="linkto('myOrders')">
                        <img src="../assets/img/wddh.png" alt="我的订货">
                        <p class="txt">我的订货</p>
                    </mu-ripple>
                    <mu-ripple class="item" color="#ff4521" @click="linkto('myStock')">
                        <img src="../assets/img/wdkc.png" alt="我的库存">
                        <p class="txt">我的库存</p>
                    </mu-ripple>
                </div>
            </div>
            <div class="bb10"></div>
            <div class="con-wrapper">
                <div class="head flex fcen">
                    <div class="line c80a9f0"></div>
                    <div class="title bold">分销管理</div>
                </div>
                <div class="list flex">
                    <mu-ripple class="item" color="#80a9f0" @click="invite">
                        <img src="../assets/img/invite.png" alt="邀请客户">
                        <p class="txt">邀请客户</p>
                        <span v-if="auditNum > 0" class="badge">{{auditNum}}</span>
                    </mu-ripple>
                    <mu-ripple class="item" color="#80a9f0" @click="linkto('orders')">
                        <img src="../assets/img/fxdd.png" alt="分销订单">
                        <p class="txt">分销订单</p>
                    </mu-ripple>
                    <mu-ripple class="item" color="#80a9f0" @click="linkto('customers')">
                        <img src="../assets/img/fxkh.png" alt="分销客户">
                        <p class="txt">分销客户</p>
                    </mu-ripple>
                </div>
            </div>
            <div class="bb10"></div>
            <div class="con-wrapper">
                <div class="head flex fcen">
                    <div class="line c67c9ba"></div>
                    <div class="title bold">发货管理</div>
                </div>
                <div class="list flex">
                    <mu-ripple class="item" color="#67c9ba" @click="linkto('offlineRetail')">
                        <img src="../assets/img/xxls.png" alt="线下零售">
                        <p class="txt">线下零售</p>
                    </mu-ripple>
                    <!-- <mu-ripple class="item" color="#67c9ba" @click="linkto('')">
                        <img src="../assets/img/scls.png" alt="云商城零售">
                        <p class="txt">云商城零售</p>
                    </mu-ripple>
                    <mu-ripple class="item" color="#67c9ba" @click="linkto('exchangeZone')">
                        <img src="../assets/img/huanfahq.png" alt="换发货区">
                        <p class="txt">换发货区</p>
                    </mu-ripple> -->
                </div>
            </div>
        </mu-load-more>
    </div>
</template>

<script>
import 'muse-ui-toast/dist/muse-ui-toast.all.css';
import 'muse-ui-loading/dist/muse-ui-loading.css';
import 'swiper/dist/css/swiper.min.css';
import Vue from 'vue';
import Toast from 'muse-ui-toast';
import Loading from 'muse-ui-loading';
import { Snackbar, Button, Icon, LoadMore } from 'muse-ui';
import { integral, auditUserNum } from '../api/user';
import { imgHost } from '../api/baseUrl';
import Swiper from 'swiper';
export default {
    data() {
        return {
            info: {},
            imgHost: imgHost,
            auditNum: 0,
            refreshing: false,
        }     
    },
    methods: {
        getData() {
            let loading = Loading({ target: document.getElementById('pageContainer') });
            integral().then(res => {
                if(loading){
                    loading.close();
                }
                this.refreshing = false;
                if(res.code == 1){
                    this.info = res.data;
                    this.getAuditNum();
                }else if(res.code == 0){
                    this.$router.push('/login');
                }else{
                    if(res.msg){
                        Toast.error(res.msg);
                    }else{
                        Toast.error('服务器开了小差，请稍后再试！');
                    }
                }
            })
            .catch(err => {
                loading.close();
                this.refreshing = false;
                Toast.error('未知异常！');
                console.log(err);
            })
        },
        getAuditNum() {
            auditUserNum().then(res => {
                if(res.code == 1){
                    this.auditNum = res.data;
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
        linkto(name, f) {
            if(f == 1){
                if(this.info.level >= 4){
                    this.$router.push({ name: name });
                }else{
                    Toast.error('特约用户才能查看哦~');
                }
            }else{
                if(name == 'setting' || name == 'user'){
                    this.$router.push({ name: name });
                }else{
                    if(this.info.highLevelId || this.info.highLevelId == 0){
                        if(!name){
                            alert('暂未开放！');
                            return;
                        }
                        this.$router.push({ name: name });
                    }else{
                        alert('您还未成为经销商，请联系客服！');
                    }
                }
            }
        },
        invite() {
            if(this.info.powerState == 103){
                this.$router.push('/invite');
            }else if(this.info.powerState == 102){
                alert('资格认证审核中，请耐心等待。');
            }else{
                this.$router.push('/qualifacationCert');
            }
        },
        order() {
            if(this.info.highLevelId || this.info.highLevelId == 0){
                if(this.info.auditState == '102'){
                    this.$router.push({ name: 'orderArea' });
                }else{
                    alert('您还未成为经销商，请联系您的上阶。');
                }
            }else{
                alert('您还未成为经销商，请联系客服！');
            }
        },
        refresh() {
            this.refreshing = true;
            window.location.reload();
        },
    },
    filters: {
        numFmt(n) {
            if(!n) return 0;
            n = n.toString();
            if(n.length > 6) return parseInt(n / 10000) + 'w';
            return n;
        },
    },
    mounted() {
        this.getData();
        // alert(navigator.userAgent);
        let swiper = new Swiper('.swiper-container', {
            autoplay: true,
            loop: true,
        })
    }
}
Vue.use(Toast);
Vue.use(Loading);
Vue.use(LoadMore);
Vue.use(Snackbar);
Vue.use(Button);
Vue.use(Icon);
</script>

<style scoped lang="less">
.header{
    padding: 0 .15rem;
    .set{
        position: relative;
        width: .24rem;
        height: .24rem;
        padding: .02rem;
        border-radius: 100%;
        cursor: pointer;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            vertical-align: top;
        }
    }
    .txt{
        font-size: .2rem;
        color: #000;
        font-family: 'PingFangSC-Medium';
    }
}
.user-wrapper{
    position: relative;
    padding: .05rem .15rem;
    padding-top: .5rem;
    .user-info{
        overflow: hidden;
        .nick{
            font-size: .2rem;
            color: #000;
            display: -webkit-box;
            /*! autoprefixer: off */
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            /*! autoprefixer: on */
            white-space: nowrap;
        }
        .link{
            font-size: .14rem;
            color: #555;
            margin-top: .06rem;
        }
        .level{
            margin-top: .05rem;
            img{
                height: .24rem;
            }
            p{
                font-size: .12rem;
                color: #ff7421;
                margin-left: .05rem;
            }
        }
    }
    .avatar{
        width: .7rem;
        height: .7rem;
        padding: .005rem;
        border-radius: 100%;
        overflow: hidden;
        box-shadow: 0 0 .1rem rgba(243, 228, 145, 0.2);
        img{
            width: 100%;
            height: 100%;
            border-radius: inherit;
        }
    }
}
.rank-wrapper{
    padding: .05rem .15rem;
    .rank-link{
        position: relative;
        width: .63rem;
        height: .26rem;
        line-height: .24rem;
        text-align: center;
        font-size: .16rem;
        border: 1px solid #ff7421;
        border-radius: .05rem;
        .link{
            color: #ff7421;
        }
    }
}
.banner-wrapper{
    width: 100%;
    padding: 0 .12rem;
    margin-top: .1rem;
    .swiper-container{
        border-radius: .05rem;
        overflow: hidden;
    }
    img{
        width: 100%;
        vertical-align: top;
    }
}
.menu-wrapper{
    height: .75rem;
    .menu-item{
        width: 27.8%;
        padding: .13rem 0;
        text-align: center;
        position: relative;
        .num{
            font-family: 'PingFangSC-Semibold';
            font-weight: 600;
            font-size: .2rem;
            color: #000;
            line-height: 1;
        }
        .txt{
            font-size: .13rem;
            color: #555;
        }
    }
    .menu-item2{
        width: 16.6%;
        padding: .13rem 0;
        position: relative;
        &::before{
            content: '';
            display: block;
            width: 1px;
            height: .5rem;
            background: #f3f3f3;
            position: absolute;
            top: .1rem;
            left: 0;
        }
        .icon{
            width: .2rem;
            height: .2rem;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
.con-wrapper{
    overflow: hidden;
    .head{
        padding: .1rem .15rem;
        .line{
            width: 4px;
            height: .23rem;
            border-radius: 4px;
            &.cff7421{
                background: #ff7421;
            }
            &.cff4521{
                background: #ff4521;
            }
            &.c80a9f0{
                background: #80a9f0;
            }
            &.c67c9ba{
                background: #67c9ba;
            }
        }
        .title{
            font-size: .16rem;
            color: #000;
            margin-left: .12rem;
        }
        .txt{
            font-size: .14rem;
            color: #9c9c9c;
            margin-left: .12rem;
        }
    }
    .list{
        .item{
            padding: .1rem 0;
            width: 33.33%;
            text-align: center;
            position: relative;
            img{
                height: .26rem;
                width: auto;
            }
            .txt{
                color: #000;
                font-size: .13rem;
            }
            .badge{
                position: absolute;
                top: 0;
                right: .25rem;
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
</style>
