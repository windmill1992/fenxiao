<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">免责声明</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <p class="title">用户须慎重考虑并同意以下声明：</p>
                <p class="txt">一、本人自愿使用众康科诺云商城（以下简称“网站”）并全面理解及同意遵守网站所制订的规程、规则、规定。</p>
                <p class="txt">二、本人承诺已年满十八周岁，同时保证向网站提交的个人信息和资料均真实有效，如有隐瞒、谎报等情况，所产生的一切责任由本人承担。</p>
                <p class="txt">三、本人完全了解自身的健康状况，并承诺在使用网站中的产品或与产品配套的技术服务（包括但不限于变啦健康减脂技术、糖吧强效抗糖化技术，以下简称“技术服务”）前已做相关的身体检查，保证身体无任何不适宜使用网站产品或技术服务的症状。如有故意隐瞒、谎报体检结果，导致出现产品或技术服务不适应症状的，一切人身安全风险由本人自行承担。</p>
                <p class="txt">四、本人承诺在使用产品或技术服务时严格按照产品或技术服务的使用规定，按时监测相关身体指标，如发生任何身体不适的情况，立即停止使用产品或技术服务，如因本人原因不当使用产品或技术服务而导致的风险由本人自行承担，网站不承担任何责任。</p>
                <p class="txt">五、本人充分理解：产品或技术服务方案需视个人身体情况而定，网站不推荐任何产品或技术服务方案，对于经销商根据客户个人身体状况及体质信息所制定的方案，由经销商对该方案负责，网站不承担由此所产生的任何责任，亦不保证达到预期效果。</p>
                <p class="txt">六、本人承诺如将网站产品或与技术服务推荐给第三人，应严格遵照网站相关规定（包括但不限于《众康科诺平台规则》、《经销商服务规范》、《众康科诺云商城服务协议》、《经销商违规行为及处理规则》等）及与产品配套的技术服务（包括但不限于变啦健康减脂技术、糖吧强效抗糖化技术）的专业性要求，因违反规定或专业性要求而产生的任何责任均由本人承担，网站不承担任何责任。</p>
                <p class="txt">七、本人已认真阅读并全面理解以上内容，对上述所有内容予以确认并愿意承担相应的法律责任。</p>
                <p class="txt">八、本免责声明以及其更新权和解释权均属网站所有。</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    mounted() {
        this.isWx = this.$util.isWx();
    }
}
</script>

<style scoped lang="less">
.wrapper{
    background: #fff;
}
.box{
    border-top: 1px solid #f3f3f3;
    padding: 0 .15rem;
    color: #111;
    line-height: 1.5;
    padding-bottom: .2rem;
    .title{
        font-size: .16rem;
        padding: .15rem 0 .05rem;
        &::before{
            content: "";
            display: inline-block;
            width: .09rem;
            height: .09rem;
            background-color: #ff7421;
            border-radius: 50%;
            position: relative;
            top: -.01rem;
            margin-right: .07rem;
        }
    }
    .txt{
        padding-left: .16rem;
        color: #838383;
        font-size: .14rem;
        margin-top: .05rem;
    }
}
</style>
