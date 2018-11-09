<template>
    <div>
        <div class="splash" id="splash">
            <img :src="imgHost + '/banner/splash.jpg'" alt="">
            <a href="javascript:;" class="skip" @click="toIndex">跳过{{time}}s</a>
        </div>
    </div>
</template>

<script>
import { imgHost } from '../api/baseUrl';
export default {
    name: 'my-splash',
    data() {
        return {
            time: 3,
            imgHost: imgHost,
        }
    },
    methods: {
        countdown() {
            this.timer = setInterval(() => {
                this.time--;
                if(this.time <= 0){
                    $('#splash').fadeOut();
                }
            }, 1000);
        },
        toIndex() {
            clearInterval(this.timer);
            $('#splash').fadeOut();
        }
    },
    mounted() {
        this.countdown();
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
}
</script>

<style scoped lang="less">
.splash{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99999;
    opacity: 1;
    -webkit-transition: opacity .3s ease;
    transition: opacity .3s ease;
    img{
        width: 100%;
        height: 100%;
        vertical-align: top;
    }
    .skip{
        color: #fff;
        font-size: .12rem;
        padding: 0 .12rem;
        background: rgba(0, 0, 0, .5);
        border-radius: .2rem;
        height: .2rem;
        line-height: .2rem;
        position: absolute;
        top: .15rem;
        right: .15rem;
    }
}
</style>
