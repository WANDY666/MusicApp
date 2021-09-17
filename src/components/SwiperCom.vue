<template>
  <div class="swiper">
    <div ref="swiperSlide"
         class="swiper-slide">
      <img v-for="(item, index) in images"
           :key="index"
           :src="item.pic"
           alt="图片没了">
    </div>

    <ul class="circle-list">
      <li class="circle"
          @click="changeIndex(index)"
          :class="{ active:index === currentIndex }"
          v-for="(item, index) in indexs"
          :key="index"></li>
    </ul>
  </div>
</template>

<script>
import { getBanner } from '@/api/index'

export default {
  data () {
    return {
      images: [],
      indexs: [],
      intId: 0,
      lock: false,
      intervalTime: 3000,
      transitionType: 'all 1s ease-out',
      currentIndex: 0
    }
  },
  components: {
  },
  async mounted () {
    let res = await getBanner(1);
    console.log(res.data.banners);
    this.images = res.data.banners;
    this.indexs = this.images.map((ele, i) => i);
    this.images.push(this.images[0]);
    setInterval(this.changeToNext, this.intervalTime);
  },
  methods: {
    changeIndex (index) {
      this.currentIndex = index;
      this.$refs.swiperSlide.style.left = -7.1 * index + 'rem';
    },

    changeToNext () {
      let next = (this.currentIndex + 1);
      if (this.currentIndex === this.indexs.length - 1) {
        this.$refs.swiperSlide.style.left = -7.1 * next + 'rem';
        this.currentIndex = next % this.indexs.length;
        setTimeout(() => {
          this.$refs.swiperSlide.style.left = 0;
          this.$refs.swiperSlide.style.transition = 'none';
          this.$refs.currentIndex = 0;
        }, 1000);
      } else {
        this.$refs.swiperSlide.style.transition = this.transitionType;
        this.changeIndex(next % this.indexs.length);
      }
    },

    changeToLast () {
      let last = (this.currentIndex - 1 + this.indexs.length) % this.indexs.length;
      if (this.currentIndex === 0) {
        this.$refs.swiperSlide.style.transition = 'none';
        this.$refs.swiperSlide.style.left = -7.1 * this.indexs.length + 'rem';

        setTimeout(() => {
          this.$refs.swiperSlide.style.transition = this.transitionType;
          this.changeIndex(last);
        }, 0);
      } else {
        this.$refs.swiperSlide.style.transition = this.transitionType;
        this.changeIndex(last);
      }
    }
  }
}
</script>

<style lang="less" scoped>
.swiper {
  width: 7.1rem;
  height: 2.8rem;
  position: relative;
  border-radius: 0.1rem;
  margin: 0 0.2rem;
  overflow: hidden;
  z-index: 0;

  .swiper-slide {
    display: flex;
    width: 7.1rem;
    height: 2.8rem;
    position: relative;
    left: 0;
    transition: all 1s ease-out;
    img {
      width: 7.1rem;
    }
  }

  .circle-list {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    width: 4rem;
    margin: 0 auto;
    bottom: 0.1rem;
    left: 0;
    right: 0;
    justify-content: space-around;
    list-style-type: none;

    .circle {
      width: 0.12rem;
      height: 0.12rem;
      background-color: #ecf0f1;
      border-radius: 50%;
      cursor: pointer;

      &.active {
        background-color: #e74c3c;
      }
    }
  }
}
</style>