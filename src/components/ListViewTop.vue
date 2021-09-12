<template>
  <div class="listViewTop">
    <img class="bg" :src="list.coverImgUrl" alt="">
    <div class="listViewTopNav">
      <div class="back" @click="$router.back()">
        <icon iconName='icon-fanhuizuojiantou'></icon>
        <div class="title">
          歌单
        </div>
      </div>
      <div class="right">
        <icon class="search" iconName='icon-sousuo'></icon>
        <icon iconName='icon-liebiao'></icon>
      </div>
    </div>
    <div class="content">
      <div class="content-left">
        <img :src="list.coverImgUrl" alt="">
        <div class="count">
          <icon iconName="icon-play"></icon>
          {{playCount(list.playCount)}}
        </div>
      </div>
      <div class="content-right">
        <h3>{{list.name}}</h3>
        <div class="author">
          <img :src="list.creator.avatarUrl" class="header">
          <span>{{ list.creator.nickname}}</span>
        </div>
        <div class="description">
          {{ list.description }}
        </div>
      </div>
    </div>

    <div class="iconList">
      <div class="iconItem">
        <icon iconName='icon-dilanxianxingiconyihuifu_huabanfuben'></icon>
        <span>{{ list.commentCount }}</span>
      </div>
      <div class="iconItem">
        <icon iconName='icon-fenxiang'></icon>
        <span> {{ list.shareCount }} </span>
      </div>
      <div class="iconItem">
        <icon iconName='icon-xiazai'></icon>
        <span>下载</span>
      </div>
      <div class="iconItem">
        <icon iconName='icon-xuanze-duoxuan-tianchong'></icon>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'

export default {
  props: {
    list: Object
  },
  components: {
    Icon
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
</script>

<style lang="less" scoped>
.listViewTop {
  width: 100%;
  padding: 0 0.4rem;
  height: 5.5rem;
  .bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    z-index: -1;
    filter: blur(40px);
  }
  .listViewTopNav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.2rem;
    font-size: 0.4rem;
    color: white;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      fill: white;
    }
    .title {
      margin-left: 0.4rem;
    }
  }

  .back, .right {
    display: flex;
    .search {
      margin-right: 0.4rem;
    }
  }

  .content {
    display: flex;
    justify-content: space-between;

    .content-left {
      position: relative;
      img {
        width: 2.7rem;
        height: 2.7rem;
        z-index: -1;
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
          text-decoration: bold;
          icon {
            fill: red;
          }
      }
    }

    .content-right {
      width: 3.5rem;
      h3 {
        color: white;
        font-size: 0.4rem;
      }
      .author {
        display: flex;
        align-items: center;
        margin: 0.2rem 0;
        img.header {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.3rem;
          margin-right: 0.2rem;
        }

        span {
          color: #ccc;
          font-size: 0.26rem;
        }
      }
      .description {
        font-size: 0.24rem;
        color: #aaa;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }

  .iconList {
    display: flex;
    justify-content: space-around;
    margin-top: 0.4rem;

    .iconItem {
      display: flex;
      flex-direction: column;
      align-items: center;

      .icon {
        width: 0.6rem;
        height: 0.6rem;
        fill: #ccc;
      }

      span {
        color: #ccc;
        font-size: 0.25rem;
        padding-top: 0.1rem;
      }
    }
  }
}
</style>
