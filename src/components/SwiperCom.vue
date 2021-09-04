<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in images" :key="index">
        <img :src="item.pic" alt="图片没了">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    
    <!-- 如果需要导航按钮 -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
    
    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
  </div>
</template>

<script>
import Swiper from 'swiper';   
import 'swiper/css/swiper.css'
import axios from 'axios'
import{ getBanner } from '@/api/index'

export default {
  data() {
    return {
      images: [
        { pic: require('../assets/image/swiper1.jpg') },
        { pic: require('../assets/image/swiper2.jpg') },
        { pic: require('../assets/image/swiper3.jpg') },
      ]
    }
  },
  components: {
    Swiper,
  },
  async mounted() {
    var mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal', // 垂直切换选项
      loop: true, // 循环模式选项
      
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
      
      // 如果需要前进后退按钮
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
      
      // 如果需要滚动条
      // scrollbar: {
      //   el: '.swiper-scrollbar',
      // },
    });

    let res = await getBanner(1);
    console.log(res.data.banners);
    this.images = res.data.banners;
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  width: 7.1rem;
  height: 2.8rem;
  border-radius: 0.1rem;
}

.swiper-slide img{
  width: 100%;
}

.swiper-pagination-bullet-active {
  background-color: red;
}
</style>