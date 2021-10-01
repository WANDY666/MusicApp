<template>
  <div class="playlist">
    <div class="playlist-top">
      <div class="left"
           @click="playAll(list.tracks)">
        <icon iconName="icon-bofang"></icon>
        <div class="text">
          <div class="title">
            播放全部
          </div>
          <div class="num">
            （共{{list.trackCount}}首）
          </div>
        </div>
      </div>

      <button class="right">
        + 收藏（{{playCount(list.subscribedCount)}}）
      </button>
    </div>

    <div class="list">
      <div class="playItem"
           v-for="(item, index) in list.tracks"
           :key="index">
        <div class="left"
             @click="changeMusic(list.tracks, index)">
          <div class="index">
            {{index + 1}}
          </div>
          <div class="content">
            <div class="title">{{item.name}}</div>
            <div class="author">
              {{getArtists(item.ar, item.al.name)}}
            </div>
          </div>
        </div>
        <div class="right">
          <icon iconName='icon-bofang'></icon>
          <icon iconName='icon-liebiao1'></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'
import { mapMutations } from 'vuex'

export default {
  props: {
    list: Object
  },
  components: {
    Icon
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
    ...mapMutations(
      ['setPlayIndex', 'setPlaylist']
    ),
    changeMusic (tracks, index) {
      this.$store.dispatch('changeMusic', {
        playlist: JSON.parse(JSON.stringify(tracks)),
        playIndex: index
      });
    },
    playAll (tracks) {
      this.changeMusic(tracks, 0)
    },
    getArtists (artists, album) {
      let names = artists.map((item) => item.name).join(', ');
      if (album && album.name) {
        names += ' - ' + album.name
      }
      return names;
    }
  }
}
</script>

<style lang="less" scoped>
.playlist {
  width: 100%;
  padding: 0 0.4rem;
  margin-top: 0.2rem;
  background-color: white;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  overflow: hidden;

  .playlist-top {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
      .title {
        font-size: 0.34rem;
        font-weight: 900;
      }

      .num {
        font-size: 0.24rem;
        color: #ccc;
      }
      .text {
        display: flex;
        align-items: center;
        margin-left: 0.2rem;
      }
    }
    .right {
      font-size: 0.24rem;
      color: #fff;
      background-color: orangered;
      line-height: 0.6rem;
      padding: 0.1rem;
      border-radius: 0.4rem;
      border: none;
    }
  }
  .list {
    .playItem {
      display: flex;
      justify-content: space-between;
      height: 1.2rem;
      .left {
        display: flex;
        align-items: center;
        color: #666;
        .index {
          width: 0.3rem;
          font-size: 0.3rem;
        }
        .content {
          margin-left: 0.4rem;
          width: 5rem;
          .title {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: black;
            font-size: 0.3rem;
            font-weight: 600;
            margin-bottom: 0.1rem;
          }

          .author {
            font-size: 0.24rem;
            height: 0.5rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }

      .right {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 0.2rem;
          width: 0.4rem;
          height: 0.4rem;
        }
      }
    }
  }
}
</style>