<template>
  <div class="playList"
       @click.self="leavePlayList">
    <main>
      <header>
        <div class="left">当前播放
          <span style="fontSize:0.3rem">({{playlist.length}})</span>
        </div>
        <div></div>
        <icon @click="changePlayMode('MusicCycle')"
              v-if="playMode === 'ListCycle'"
              iconName="icon-xunhuan"></icon>
        <icon @click.stop="changePlayMode('ListCycle')"
              v-else-if="playMode === 'MusicCycle'"
              iconName="icon-danquxunhuan"></icon>
      </header>
      <div class="list">
        <section v-for="(item, index) in playlist"
                 :key="item.id">
          <div class="name"
               @click="changeMusic(index)">
            {{item.name}} <span> {{' - ' + getArtists(item.ar, item.al.name)}}</span>
          </div>
          <div class="delete"
               @click="deleteMusic(index)">×</div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Icon from '@/components/Icon.vue'
export default {
  computed: {
    ...mapState(['playlist', 'playMode', 'showPlayList']),
  },

  components: {
    Icon
  },

  methods: {
    changePlayMode (value) {
      this.$store.commit('setPlayMode', value);
    },

    changeMusic (index) {
      this.$store.dispatch('changeMusic', {
        playlist: this.playlist,
        playIndex: index
      });
    },

    getArtists (artists, album) {
      let names = artists.map((item) => item.name).join(', ');
      if (album && album.name) {
        names += ' - ' + album.name
      }
      return names;
    },
    leavePlayList () {
      this.$store.commit('setShowPlayList', !this.showPlayList);
    },
    deleteMusic (index) {
      this.$store.dispatch('deleteMusic', { index });
    }
  }
}
</script>

<style lang="less" scoped>
.playList {
  width: 100vw;
  height: 100vh;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);

  main {
    width: 90%;
    height: 60%;
    background-color: white;
    position: absolute;
    bottom: 0.5rem;
    left: 5%;
    z-index: 100;
    border-radius: 0.5rem;
    header {
      width: 100%;
      height: 1.2rem;
      font-size: 0.35rem;
      top: 0;
      display: flex;
      position: absolute;
      margin: 0 0 0.3rem 0;
      font-weight: 900;
      justify-content: space-between;
      align-items: center;
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      padding-bottom: 0.2rem;
      .icon {
        fill: black;
        width: 0.5rem;
        height: 0.5rem;
        stroke-width: 0.2rem;
      }
    }
    .list {
      margin-top: 1rem;
      height: calc(60vh - 1rem);
      overflow: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      section {
        display: flex;
        height: 0.8rem;
        padding: 0.1rem 0.4rem;
        justify-content: space-between;
        align-items: center;
        margin: 0.05rem 0;
        .name {
          width: 80%;
          font-size: 0.3rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          span {
            font-size: 0.16rem;
            color: grey;
          }
        }

        .delete {
          font-size: 0.5rem;
          font-weight: 100;
          color: grey;
        }
      }
    }
  }
}
</style>