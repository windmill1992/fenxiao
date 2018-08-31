<template>
    <div id="pageContainer" class="detail">
         <div class="header">
            <p class="title">商品详情</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="top">
                <div class="pic">
                    <img src="../assets/img/bk.png" alt="商品">
                </div>
                <div class="title">巴拉巴拉卡卡卡饼干哈哈哈哈哈并敢不敢不敢不敢不敢不敢不敢不敢</div>
                <div class="price-box flex fcen">
                    <div class="tag">特惠价</div>
                    <div class="price"><span>￥</span>1380</div>
                    <div class="ori-price">市场价: <span>￥1580</span></div>
                </div>
                <div class="tags flex fcen">
                    <p class="tag">悠可舱</p>
                </div>
            </div>
            <div class="content"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: 0,
        }
    },
    methods: {

    },
    mounted() {
        this.id = this.$route.params.id;
        console.log(this.id);
        
    }
}
</script>

<style scoped lang="less">
.top{
    background: #fff;
    .pic{
        max-height: 3rem;
        overflow: hidden;
        img{
            width: 100%;
            height: auto;
            vertical-align: top;
        }
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
    *{
        img{
            width: 100%;
            max-width: 100%;
            margin: .1rem 0;
        }
    }
    img{
        width: 100%;
        max-width: 100%;
        margin: .1rem 0;
    }
}
</style>
