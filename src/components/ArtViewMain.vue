<template>
  <div class="ArtViewMain">
    <div class="ArtViewMain-top">
      <div class="left"
           @click="playAll(list)">
        <icon iconName="icon-bofang"></icon>
        <div class="text">
          <div class="title">
            播放热门50首
          </div>
        </div>
      </div>

      <button class="right">
        + 收藏
      </button>
    </div>

    <div class="list">
      <div class="playItem"
           v-for="(item, index) in list"
           :key="index">
        <div class="left"
             @click="changeMusic(list, index)">
          <div class="index">
            {{index + 1}}
          </div>
          <div class="content">
            <div class="title">{{item.name}}</div>
            <div class="author"
                 :class="{vip: item.copyright === 1}">
              {{getArtists(item.ar, item.al)}}
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
import { getArtistSongTop } from '@/api/index.js'

export default {
  props: {
    artistId: String
  },
  data () {
    return {
      list: []
    }
  },
  components: {
    Icon
  },
  async beforeMount () {
    let result = await getArtistSongTop(this.artistId);
    console.log(result);
    this.list = result.data.songs;
  },
  methods: {
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
.ArtViewMain {
  width: 100%;
  padding: 0 0.4rem;
  margin-top: 0.2rem;
  background-color: rgb(56, 56, 56);
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  overflow: hidden;

  .ArtViewMain-top {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      color: white;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
        fill: white;
      }
      .title {
        font-size: 0.34rem;
        font-weight: 600;
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
    color: white;
    .playItem {
      display: flex;
      justify-content: space-between;
      height: 1.2rem;
      .left {
        display: flex;
        align-items: center;
        color: rgb(143, 143, 143);
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
            color: white;
            font-size: 0.3rem;
            font-weight: 500;
            padding-bottom: 0.1rem;
          }

          // .vip::before {
          //   content: 'VIP';
          //   border: 2px solid red;

          //   border-radius: 20%;
          //   font-weight: 600;
          //   font-size: 0.2rem;
          //   color: red;
          //   margin-right: 0.1rem;
          // }

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