<template>
    <div id="pageContainer">
        <div class="header">
            <p class="title">经销商违规行为及处理规则</p>
            <a href="javascript:;" onclick="history.go(-1);" class="back"></a>
        </div>
        <div class="wrapper">
            <div class="box">
                <p class="tip">若经销商违反了《众康科诺经营规则》，《众康科诺经销商服务规范》及其众康科诺的相关规则，公告等，众康科诺有权依据本规则予以处理并追究相关经销商的违规责任。</p>
                <p class="title">一、违规处理流程</p>
                <p class="sub">1、  众康科诺在调查确定经销商的违规责任之后，将通过众康平台系统告知该经销商及相关服务人员违规的具体内容，并且</p>
                <p class="sub1">1.1 要求经销商于所服务的市场内自行调查并给出反馈；</p>
                <p class="sub1">1.2 提出改正措施、期限；</p>
                <p class="sub1">1.3 直接将处理决定告知经销商。</p>
                <p class="sub">2、  经销商或其服务人员未能及时调查给出反馈或者未能于众康科诺所指定的期限内采取适当而有效的措施，众康科诺可要求经销商及/或其服务人员承担违规责任。</p>
                <p class="sub">3、  经销商及其服务人员如果对违规责任的认定或处理措施有异议，应在收到通知后7天内通过众康平台系统，或者通过众康科诺提供的电话、邮箱、微信等提出申诉，并且进一步按照相关要求提出书面申诉，申诉应包括对违规事件的详细说明，提供相关的有效证据等。</p>
                <p class="sub">4、  自通知之日起至众康平台做出最终决定之前，众康科诺经销商的资格被暂时终止，此期间：</p>
                <p class="sub1">4.1 将暂时停止经销商在众康科诺的各项平台业务；</p>
                <p class="sub1">4.2 暂冻结账户，停发该经销商的各类市场补贴及奖励；</p>
                <p class="sub1">4.3 将暂时终止经销商的头衔资格与荣誉；</p>
                <p class="sub1">4.5 所产生的相关市场补贴,系统将不予发放。</p>
                <p class="sub">5、  众康科诺可维持、撤销或调整原有违规处理决定</p>
                <p class="sub1">5.1 如众康科诺最后决定终止该经销商的众康经销商资格，经销商资格终止生效日期以众康科诺第一次通知经销商的日期为准。经销商资格被终止后：</p>
                <p class="sub2">5.1.1 经销商将被永久终止众康科诺各项业务活动；</p>
                <p class="sub2">5.1.2 经销商的各类补贴及所有奖励将不予发放。</p>
                <p class="sub1">5.2 若众康科诺决定撤销对经销商的原有违规处理决定，众康科诺将恢复该经销商的资格及相关权益。众康科诺因处理经销商的违规行为（如：调查事件，进行相关的培训等）所发生的一切费用，需从众康科诺所保管的补贴中扣除；如尚有余额，再支付予经销商。</p>
                <p class="sub1">5.3 若众康科诺决定调整对经销商的原有违规处理措施，众康科诺将依据调整后的处理措施执行。</p>
                <p class="sub">6、  众康科诺对经销商违规行为的认定和违规处理会考虑多个因素（如违规情节，后果，态度、动机等）并具有最终决定权。众康科诺对任何违规行为不予追究，并不等于众康科诺自动对该经销商日后的违规行为或其他经销商的同样或类似违规行为亦不予追究。</p>
                <p class="sub">7、  对于违规经销商，众康科诺有权决定是否将违规行为以公告、通告、教育信、会议等方式，通过公司官方平台、内部刊物、电子邮件、会议等途径进行公布，公布的内容将包括但不限于违规经销商的姓名、编号、职级、所属市场、违规事实、处理结果等信息。</p>
                <p class="title">二、众康科诺对经销商违规的处理不免除经销商应尽的法律义务及应承担的法律责任。经销商应同时遵守国家法律法规的相关规定。</p>
                <p class="title">三、众康科诺会不时对本规则的内容进行调整，并会将调整后的内容予以公告。发生在公告之前的违规行为将按照公告之前的措施予以处理；发生在公告之后的违规行为将按照公告之后的措施予以处理。</p>
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
    .tip{
        padding: .15rem 0;
        border-bottom: 1px solid #f3f3f3;
    }
    .title{
        font-size: .14rem;
        margin-top: .15rem;
    }
    .sub{
        font-size: .14rem;
        margin-top: .1rem;
        padding-left: 2em;
    }
    .sub1{
        font-size: .14rem;
        margin-top: .1rem;
        padding-left: 4em;
    }
    .sub2{
        font-size: .14rem;
        margin-top: .1rem;
        padding-left: 6em;
    }
}
</style>
