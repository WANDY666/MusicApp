<template>
  <div>
    <div class="space">
    </div>
    <div class="playController">
      <div class="left"
           @click="showMusic=!showMusic">
        <img class="disc"
             src="@/assets/image/disc-plus.png">
        <img class="image"
             :src="currentMusic.al.picUrl">
        <div class="content">
          <div class="title">{{currentMusic.name}}</div>
          <div class="author">
            {{currentMusic.ar[0].name + ' - ' + currentMusic.al.name}}
          </div>
        </div>
      </div>
      <div class="right">
        <icon v-if="paused"
              @click="play()"
              iconName="icon-play"></icon>
        <icon v-else
              @click="play()"
              iconName="icon-zanting1"></icon>
        <icon @click="toShowPlayList()"
              iconName="icon-gedan"></icon>
      </div>
      <play-music @play='play()'
                  :paused="paused"
                  @back='showMusic=!showMusic'
                  v-show="showMusic"
                  :music='currentMusic'></play-music>
      <audio ref='audio'
             @error="audioError($event)"
             @ended="playNext()"
             :src="`https://music.163.com/song/media/outer/url?id=${currentMusic.id}.mp3`"></audio>
    </div>
    <play-list v-show="showPlayList"
               class="playList"></play-list>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import Icon from './Icon.vue'
import PlayMusic from './PlayMusic.vue'
import PlayList from './PlayList.vue'
export default {
  data () {
    return {
      paused: true,
      showMusic: false
    }
  },
  components: {
    Icon,
    PlayMusic,
    PlayList
  },
  mounted () {
    // console.log(this.$refs.audio);
    console.log("mounted");
    this.$store.commit('setPlayFunc', this.play.bind(this));
    this.$store.commit('setPauseFunc', this.pause.bind(this));
    this.$store.dispatch('reqLyric', { id: this.currentMusic.id });
  },
  updated () {
    // 测试audio元素会不会变->不会变
    // console.log('Current label is equal to ?');
    // console.log(this.$refs.audio === this.audio);
  },
  computed: {
    ...mapState(['playlist', 'playCurrentIndex', 'playMode', 'showPlayList']),
    ...mapGetters(['currentMusic'])
  },
  methods: {
    toShowPlayList () {
      this.$store.commit('setShowPlayList', !this.showPlayList);
    },
    audioError (event) {
      let audio = event.currentTarget;
      this.$store.dispatch('showToast', {
        type: 'error',
        note: '歌曲播放失败'
      });
      console.log(audio.error.code);
      setTimeout(
        this.playNext(), 1000
      );
    },
    pause () {
      if (!this.$refs.audio.paused) {
        this.$refs.audio.pause();
      }
    },
    play () {
      console.log(this.$refs.audio.currentTime);
      let audio = this.$refs.audio;
      console.log([this.$refs.audio.paused]);
      if (audio.paused) {
        audio.play();
        this.paused = false;
        this.updateTime();
      } else {
        audio.pause();
        this.paused = true;
        clearInterval(this.$store.state.intId);
      }
    },

    async playNext () {
      if (this.playMode === 'ListCycle') {
        await this.$store.dispatch('changeMusic', {
          playlist: this.playlist,
          playIndex: (this.playCurrentIndex + 1) % this.playlist.length
        });
      } else if (this.playMode === 'MusicCycle') {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
      }
    },

    updateTime () {
      let id = setInterval(() => {
        this.$store.commit('setCurrentTime', this.$refs.audio.currentTime)
        // console.log(this.$refs.audio.currentTime);
      }, 500);
      this.$store.commit('setIntId', id);
    }
  },
  watch: {
    // playCurrentIndex 由于 mapGetters 成为了本组件的计算变量
  }
}
</script>

<style lang="less">
.space {
  width: 7.5rem;
  height: 1.2rem;
}
.playController {
  color: white;
  width: 7.5rem;
  height: 1.2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  background-color: rgb(49, 49, 49);
  .left {
    display: flex;
    align-items: center;
    padding: 0 0.1rem;
    width: 6rem;
    .disc {
      width: 1rem;
      height: 1rem;
      position: absolute;
      left: 0;
    }

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .image {
      animation: rotation 20s linear infinite;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.4rem;
    }

    .content {
      padding: 0 0.2rem;

      .title {
        width: 4.5rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 0.3rem;
        font-weight: 600;
      }
      .author {
        font-size: 0.26rem;
        height: 0.5rem;
        line-height: 0.5rem;
        width: 4.5rem;

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
      &:nth-child(1) {
        width: 0.6rem;
        height: 0.6rem;
      }
      margin: 0 0.15rem;
    }
  }
}
</style>