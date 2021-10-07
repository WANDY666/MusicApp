<template>
  <div class="artists">
    <div class="music-list-top">
      <div class="title">热门歌手</div>
      <router-link class="more"
                   :to="{path:'/artSquare'}">查看更多</router-link>
    </div>

    <div class="wrapper">
      <div ref='mlist'
           class="mlist">
        <router-link :to="{path:'/artPaper', query:{id:item.id}}"
                     class="swiper-slide"
                     v-for="(item, index) in artists"
                     :key="index">
          <img :src="item.picUrl"
               alt="item.name">
          <div class="name">{{item.name}}</div>
          <div class="count">
            {{playCount(item.musicSize) + '首'}}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { getTopArtists } from '@/api/index.js'

export default {
  data () {
    return {
      artists: [],
      touchLock: false,
      startX: 0,
      currentIndex: 0,
      distanceX: 0,
      pageNum: 0
    }
  },

  async mounted () {
    let result = await getTopArtists();
    console.log('Very good');
    console.log(result);
    this.artists = result.data.artists;
  },

  methods: {
    showToast () {
      this.$store.dispatch('showToast', {
        type: 'error',
        note: '功能暂未开发'
      })
    },
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
  }
}
</script>

<style lang="less" scoped>
.artists {
  width: 7.5rem;
  padding: 0 0.15rem;
  color: white;

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
      color: white;
      width: 1.2rem;
      text-align: center;
      line-height: 0.5rem;
    }
  }
  .wrapper {
    width: 7.2rem;

    .mlist {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      position: relative;
      left: 0;
      width: 100%;
      height: 3rem;
      z-index: 0;
      .swiper-slide {
        display: flex;
        position: relative;
        flex-direction: column;
        width: 2.2rem;
        height: auto;
        padding: 0 0 0.2rem 0;

        img {
          width: 2.2rem;
          height: 2.2rem;
          object-fit: cover;
          border-radius: 0.1rem;
        }

        .name {
          width: 100%;
          height: 0.6;
          font-size: 0.24rem;
          line-height: 0.4rem;
          font-weight: 900;
          text-align: center;
          color: white;
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
</style>
