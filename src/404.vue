<template>
    <div id="pageContainer">
        <div class="errorMain">
            <div class="error-pic">
                <img :src="imgHost + '/404.png'"/>
            </div>
            <p>啊哦~一不小心闯进了未知领域，请点击下面的按钮返回首页</p>
            <div class="btn">
                <router-link to="/" class="link">返回首页</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { imgHost } from './api/baseUrl';
export default {
  data() {
    return {
      imgHost: imgHost,
    }
  }
}
</script>

<style scoped>
.errorMain {
  width: 60%;
  margin: 10% auto;
  text-align: center;
  max-width: 700px;
}
.errorMain .error-pic img {
  width: 100%;
}
.errorMain p {
  color: #666;
  margin-top: 40px;
  margin-bottom: 40px;
}
.errorMain .btn {
  width: 100px;
  margin: 20px auto;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  text-align: center;
  background: #ff6811;
  border-radius: 3px;
}
.errorMain .btn .link {
  color: #fff;
}
@media only screen and (min-width: 320px) and (max-width: 640px) {
  .errorMain {
    width: 80%;
  }
}
</style>
