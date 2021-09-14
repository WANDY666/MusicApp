<template>
  <div class="search">
    <searchTop @setSearchSongs='setSearchSongs'></searchTop>

    <div class="search-music-top">
      <div class="left">
        <icon iconName="icon-bofang"></icon>
        <div class="text">
          <div class="title">
            播放全部
          </div>
        </div>
      </div>

      <button class="right">
        <icon iconName='icon-xuanze-duoxuan-tianchong'></icon>
      </button>
    </div>

    <div class="list">
      <div class="playItem" v-for="(item, index) in songs" :key="index">
        <div class="left" @click="addMusic(item, index)">
          <div class="index">
            {{index + 1}}
          </div>
          <div class="content">
            <div class="title">{{item.name}}</div>
            <div class="author">
              <!-- <span class="tag">
                {{list.tags[0]}}
              </span> -->
              {{getArtists(item.artists, item.album)}}
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
import SearchTop from '@/components/SearchTop.vue';
import Icon from '@/components/Icon.vue';
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      songs: []
    }
  },
  components: {
    SearchTop,
    Icon
  },
  methods: {
    setSearchSongs(list) {
      this.songs = list;

      console.log(this.songs)
    },

    ...mapMutations(
      ['setPlayIndex', 'setPlaylist']
    ),

    addMusic(item, index) {
      console.log(item);
      item.al = item.album;
      item.al.picUrl = item.al.artist.img1v1Url;
      item.ar = item.artists;
      this.$store.commit('pushMusic', item);
      this.$store.dispatch('changeMusic', {
        playlist: this.$store.state.playlist,
        playIndex: this.$store.state.playlist.length - 1
      });
    },

    getArtists(artists, album) {
      let names = artists.map((item) => item.name).join(', ');
      if (album && album.name) {
        names += ' - ' + album.name
      }
      return names;
    }
  },
  computed: {

  }
  
}
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  padding: 0 0.4rem;
  margin-top: 0.2rem;
  background-color: white;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  .search-music-top {
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
      margin: 0;
      padding: 0;
      border: none;  //自定义边框
      outline: none;    //消除默认点击蓝色边框效果
      background-color: transparent;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
        fill: black;
      }
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
            color: black;
            font-size: 0.3rem;
            font-weight: 600;
            margin-bottom: 0.1rem;
          }
          .author {
            font-size: 0.24rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 0.4rem;

            .tag {
              font-size: 0.05rem;
              color: red;
              border: 1px solid orangered;
              border-radius: 0.05rem;
              margin-right: 0.03rem;
            }
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