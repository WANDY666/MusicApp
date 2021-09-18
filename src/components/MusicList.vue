<template>
  <div class="musicList">
    <div class="music-list-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>

    <div class="wrapper"
         @touchstart="touchstart"
         @touchmove="touchmove"
         @touchend="touchend">
      <div ref='mlist'
           class="mlist">
        <router-link :to="{path:'/listview', query:{id:item.id}}"
                     class="swiper-slide"
                     v-for="(item, index) in musicList"
                     :key="index">
          <img :src="item.picUrl"
               alt="item.name">
          <div class="name">{{item.name}}</div>
          <div class="count">
            <icon iconName="icon-play"></icon>
            {{playCount(item.playCount)}}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
import { getMusicList } from '@/api/index.js'

export default {
  components: { Icon },
  data () {
    return {
      musicList: [],
      touchLock: false,
      startX: 0,
      currentIndex: 0,
      distanceX: 0,
      pageNum: 0
    }
  },

  async mounted () {
    let result = await getMusicList();
    this.musicList = result.data.result;
    console.log(result);
    this.pageNum = Math.ceil(this.musicList.length / 3);
  },

  methods: {
    playCount (num) {
      let res = num;
      if (num >= 100000000) {
        res = num / 100000000;
        res = res.toFixed(2) + '亿';
      } else if (num >= 10000) {
        res = num / 10000;
        res = res.toFixed(2) + '万'
      }
      return res;
    },

    touchstart (event) {
      // 操作数超过1则取消或者swiper被锁，即自动播放正在换页，就令此次滑动无效
      if (event.targetTouches.length > 1) {
        this.touchValid = false;
        return;
      } else {
        this.touchValid = true;
      }

      console.log('touch start');
      console.log(event.targetTouches[0]);

      // 记录现在slide的位置
      this.lastLocation = parseFloat(getComputedStyle(this.$refs.mlist).getPropertyValue('left').match(/[+-]?[0-9]+/)[0]);
      console.log(this.lastLocation);
      // 设置transition，因为之前特殊情况下会设置为none
      this.startX = event.targetTouches[0].pageX;
    },

    touchmove (event) {
      if (!this.touchValid) {
        return;
      }
      if (!this.touchLock) {
        // 加上节流锁
        this.touchLock = true;
        console.log('touchmove');

        this.distanceX = event.targetTouches[0].pageX - this.startX;
        this.$refs.mlist.style.left = (this.lastLocation + this.distanceX) / 50 + 'rem';
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
    },

    changeToLast () {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
      console.log('last');
      this.$refs.mlist.style.left = -7.2 * this.currentIndex + 'rem';
      console.log(-7.2 * this.currentIndex + 'rem')
    },

    changeToNext () {
      console.log('next');
      if (this.currentIndex < this.pageNum - 1) {
        this.currentIndex++;
      }
      this.$refs.mlist.style.left = -7.2 * this.currentIndex + 'rem';
      console.log(this.currentIndex)
    }
  }
}
</script> -->

<style lang="less" scoped>
.musicList {
  width: 7.5rem;
  padding: 0 0.15rem;

  .music-list-top {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }

    .more {
      border: 1px solid #ccc;
      border-radius: 0.1rem;
      font-size: 0.24rem;
      height: 0.5rem;
      width: 1.2rem;
      text-align: center;
      line-height: 0.5rem;
    }
  }
  .wrapper {
    overflow: hidden;
    width: 7.2rem;
    .mlist {
      position: relative;
      left: 0;
      display: flex;
      width: 100%;
      height: 3rem;
      z-index: 0;
      transition: left 0.1s;
      .swiper-slide {
        display: flex;
        position: relative;
        flex-direction: column;
        width: 2.2rem;
        height: auto;
        margin: 0 0.2rem 0 0;

        img {
          width: 2.2rem;
          height: 2.2rem;
          border-radius: 0.1rem;
        }

        .name {
          width: 100%;
          height: 0.6;
          font-size: 0.24rem;
          line-height: 0.4rem;
        }

        .count {
          color: #ccc;
          position: absolute;
          right: 0.1rem;
          top: 0.1rem;
          font-size: 0.24rem;
          display: flex;
          align-items: center;
          border-radius: 0.1rem;
          background-color: rgba(255, 255, 255, 0.2);

          icon {
            fill: red;
          }
        }
      }
    }
  }
}
</style> -->
