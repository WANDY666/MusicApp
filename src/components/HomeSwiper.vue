<template>
  <div class="swiper">
    <div ref="swiperSlide"
         class="swiper-slide"
         @touchstart="touchstart"
         @touchmove="touchmove"
         @touchend="touchend">
      <img v-for="(item, index) in images"
           :key="index"
           :src="item.pic"
           alt="图片没了">
    </div>

    <ul class="circle-list">
      <li class="circle"
          @click="tapToSwitch(index)"
          :class="{ active:(index) === currentIndex }"
          v-for="(item, index) in indexs"
          :key="index"></li>
    </ul>
  </div>
</template>

<script>
import { getBanner } from '@/api/index'
import { remPx } from '@/../public/js/rem.js'

export default {
  data () {
    return {
      images: [],
      indexs: [],
      intervalId: 0,
      timeoutId: 0,
      swiperLock: false,
      intervalTime: 5000,
      transitionTime: 300,
      transitionType: 'all 0.3s ease-out',
      lastLocation: 0,

      touchLock: false,
      touchValid: true,
      startX: 0,
      distanceX: 0,
      currentIndex: 0
    }
  },
  components: {
  },

  async mounted () {
    // api获取轮播图图片
    let res = await getBanner(1);
    console.log('Banner')
    console.log(res.data.banners);
    this.images = res.data.banners;

    // 计算出索引，用于生成圆点（分页器）
    this.indexs = this.images.map((ele, i) => i);

    // 将第一张图片加入到最后（为了实现无缝轮播）
    this.images.push(this.images[0]);
    this.images.unshift(this.images[this.images.length - 2])

    this.startAutoplay();
  },

  methods: {
    changeIndex (index) {
      // 切换 currentIndex
      this.currentIndex = index;

      // 设置slide的左偏移量
      this.$refs.swiperSlide.style.left = -7.1 * (index + 1) + 'rem';
    },

    startAutoplay () {
      // 设置自动播放，方向为向右
      this.intervalId = setInterval(this.changeToNext, this.intervalTime);
    },

    stopAutoplay () {
      clearInterval(this.intervalId);

      // 由于当(this.currentIndex === this.indexs.length - 1)时会设置一个定时器。
      // 所以在手动切换时，也要把这个定时器关掉
      clearTimeout(this.timeoutId);
      this.$refs.swiperSlide.style.transition = this.transitionType;
    },

    tapToSwitch (index) {
      this.stopAutoplay();
      this.changeIndex(index);
      this.startAutoplay();
    },

    changeToNext () {
      // this.swiperLock为防止滑动点击过于频繁
      if (this.swiperLock) {
        return;
      }
      if (!this.$refs.swiperSlide) {
        // 此时由于跳转到其他路由,关闭自动播放
        clearInterval(this.intervalId);
        clearTimeout(this.timeoutId);
        console.log(this);
        return;
      }
      this.swiperLock = true;
      let next = (this.currentIndex + 1);

      if (this.currentIndex === this.indexs.length - 1) {
        // 自动播放，此时在原最后一张，要跳到加到最后的第一张（为了动画效果）
        this.$refs.swiperSlide.style.left = -7.1 * (next + 1) + 'rem';
        this.currentIndex = 0;

        // 在动画时间过后，瞬间跳转到第一张
        this.timeoutId = setTimeout(() => {
          this.$refs.swiperSlide.style.left = '-7.1rem';
          this.$refs.swiperSlide.style.transition = 'none';
        }, this.transitionTime);

      } else {
        // 正常切换到下一张
        this.$refs.swiperSlide.style.transition = this.transitionType;
        this.changeIndex(next % this.indexs.length);
      }

      setTimeout(() => {
        this.swiperLock = false;
      }, this.transitionTime)
    },

    changeToLast () {
      // this.swiperLock为防止滑动点击过于频繁
      if (this.swiperLock) {
        return;
      }
      this.swiperLock = true;

      let last = (this.currentIndex - 1 + this.indexs.length) % this.indexs.length;
      if (this.currentIndex === 0) {
        // 自动播放，此时在第一张，要跳到加到前面的最后一张（为了动画效果）
        this.$refs.swiperSlide.style.left = '0rem';
        this.currentIndex = this.indexs.length - 1;

        // 在动画时间过后，瞬间跳转到第一张
        this.timeoutId = setTimeout(() => {
          this.$refs.swiperSlide.style.left = -7.1 * (this.currentIndex + 1) + 'rem';
          this.$refs.swiperSlide.style.transition = 'none';
        }, this.transitionTime);
      } else {
        // 正常切换到上一张
        this.$refs.swiperSlide.style.transition = this.transitionType;
        this.changeIndex(last);
      }

      setTimeout(() => {
        this.swiperLock = false;
      }, this.transitionTime);
    },

    touchstart (event) {
      // 操作数超过1则取消或者swiper被锁，即自动播放正在换页，就令此次滑动无效
      if (event.targetTouches.length > 1 || this.swiperLock) {
        this.touchValid = false;
        return;
      } else {
        this.touchValid = true;
      }

      // 停止自动播放
      this.stopAutoplay();
      console.log('touch start');
      console.log(event.targetTouches[0]);

      // 记录现在slide的位置
      this.lastLocation = parseFloat(getComputedStyle(this.$refs.swiperSlide).getPropertyValue('left').match(/[+-]?[0-9]+/)[0]);
      // 设置transition，因为之前特殊情况下会设置为none
      this.$refs.swiperSlide.style.transition = 'left 0.1s';
      this.startX = event.targetTouches[0].pageX;
    },

    touchmove (event) {
      if (!this.touchValid) {
        return;
      }
      if (!this.touchLock) {
        // 加上节流锁
        this.touchLock = true;
        // console.log('touchmove');

        this.distanceX = event.targetTouches[0].pageX - this.startX;
        this.$refs.swiperSlide.style.left = (this.lastLocation + this.distanceX) / remPx + 'rem';
        setTimeout(() => {
          this.touchLock = false;
        }, 50);
      }
    },

    touchend () {
      if (!this.touchValid) {
        return;
      }
      if (this.distanceX > 0) {
        this.changeToLast();
      } else {
        this.changeToNext();
      }
      this.startAutoplay();
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
    left: -7.1rem;
    transition: all 0.3s ease-in;
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