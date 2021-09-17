<template>
  <div class="musicList">
    <!-- <div class="music-list-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>

    <div class="mlist">
      <div class="swiper-container" id="musicSwiper">
        <div class="swiper-wrapper">
          <router-link :to="{path:'/listview', query:{id:item.id}}" class="swiper-slide" v-for="(item, index) in musicList" :key="index">
            <img :src="item.picUrl" alt="item.name">
            <div class="name">{{item.name}}</div>
            <div class="count">
              <icon iconName="icon-play"></icon>
              {{playCount(item.playCount)}}
            </div>
          </router-link>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
import { getMusicList } from '@/api/index.js'

export default {
  components: { Icon },
  data() {
    return {
      musicList: [],
      swiperOption: {
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 10,
        observer: true
      }
    }
  },

  async mounted() {
    let result = await getMusicList();
    this.musicList = result.data.result;
    console.log(result);
  },

  methods: {
    playCount(num) {
      let res = num;
      if (num >= 100000000) {
        res = num / 100000000;
        res = res.toFixed(2) + '亿';
      } else if (num >= 10000) {
        res = num / 10000;
        res = res.toFixed(2) + '万'
      }
      return res;
    }
  }
}
</script> -->

<style lang="less" scoped>
.musicList {
  width: 7.5rem;
  padding: 0 0.2rem;

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
      border-radius: 0.1rem ;
      font-size: 0.24rem;
      height: 0.5rem;
      width: 1.2rem;
      text-align: center;
      line-height: 0.5rem;
    }
  }

  .mlist {
    .swiper-container {
      position: relative;
      width: 100%;
      height: 3rem;
      z-index: 0;
      .swiper-slide {
        display: flex;
        flex-direction: column;
        position: relative;
        left: 0;

        img {
          width: 100%;
          height: auto;
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
          background-color: rgba(255,255,255,0.2);

          icon {
            fill: red;
          }
        }
      }
    }
  }
}
</style> -->
