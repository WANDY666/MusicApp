<template>
  <div class="playMusic">
    <div class="bg"
         :style="bg_style"></div>
    <div class="playTop">
      <div class="back"
           @click="$emit('back')">
        <icon iconName="icon-fanhuizuojiantou"></icon>
      </div>
      <div class="center">
        <div class="title">
          {{ music.name }}
        </div>
        <div class="author">
        </div>
      </div>
      <div class="share">
        <icon iconName="icon-fenxiang"></icon>
      </div>
    </div>
    <div @click="showLyric()"
         class="playContent"
         v-show="!isLyric">
      <img class="needle"
           :class="{ active:!paused }"
           src="@/assets/image/needle-ab.png">
      <img class="disc"
           src="@/assets/image/disc-plus.png"
           alt="">
      <img class="playImg"
           :src="music.al.picUrl">
    </div>

    <div @click="showLyric()"
         class="playLyric"
         v-show="isLyric"
         ref="playLyric">
      <p :class="{active: (currentTime * 1000 >= item.time && (currentTime * 1000 < item.next || i === lyrics.length - 1))}"
         v-for="(item, i) in lyrics"
         :key="i">
        {{ item.lyric }}
      </p>
    </div>
    <div class="lyric"></div>
    <div class="progress"></div>
    <div class="playFooter">
      <icon @click="changePlayMode('MusicCycle')"
            v-if="playMode === 'ListCycle'"
            iconName="icon-xunhuan"></icon>
      <icon @click="changePlayMode('ListCycle')"
            v-else-if="playMode === 'MusicCycle'"
            iconName="icon-danquxunhuan"></icon>
      <icon @click="lastMusic()"
            iconName="icon-shangyishoushangyige"></icon>
      <icon v-if="paused"
            @click="play()"
            iconName="icon-bofang1"></icon>
      <icon v-else
            @click="play()"
            iconName="icon-zanting1"></icon>
      <icon @click="nextMusic()"
            iconName="icon-xiayigexiayishou"></icon>
      <icon iconName="icon-bofangliebiaoguanli"></icon>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Icon from './Icon.vue'
export default {
  data () {
    return {
      isLyric: true,
      backgroundImage: 'none'
    }
  },

  computed: {
    ...mapGetters([
      'lyrics',
    ]),
    ...mapState(
      ['currentTime', 'playMode']
    ),
    bg_style () {
      if (this.music.al.picUrl) {
        return { backgroundImage: `url(${this.music.al.picUrl})` };
      } else {
        return {};
      }
    }
  },

  watch: {
    currentTime () {
      // console.log(this.currentTime);
      let active = document.querySelector('.playLyric .active');
      if (!active) {
        return;
      }

      if (active.offsetTop > 100) {
        this.$refs.playLyric.scrollTop = active.offsetTop - 100;
      }
    },
    music (newValue, oldValue) {
      console.log('Music')
      console.log(newValue)
    }
  },

  props: {
    music: Object,
    paused: Boolean
  },

  components: {
    Icon
  },
  methods: {
    play () {
      this.$emit('play');
    },
    changePlayMode (value) {
      this.$store.commit('setPlayMode', value);
    },
    nextMusic () {
      this.$store.dispatch('changeMusic', {
        playlist: this.$store.state.playlist,
        playIndex: (this.$store.state.playCurrentIndex + 1) % this.$store.state.playlist.length
      });
    },
    lastMusic () {
      this.$store.dispatch('changeMusic', {
        playlist: this.$store.state.playlist,
        playIndex: (this.$store.state.playCurrentIndex - 1 + this.$store.state.playlist.length) % this.$store.state.playlist.length
      });
    },
    showLyric () {
      this.isLyric = !this.isLyric;
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.playMusic {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  background-color: rgb(121, 121, 121);
  z-index: 5;

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-position: center;
    background-size: 100vw 100vh;
    filter: blur(50px);
  }

  .playTop {
    display: flex;
    width: 7.5rem;
    height: 1.2rem;
    position: absolute;
    align-items: center;
    justify-content: space-between;
    left: 0;
    top: 0;
    color: white;
    font-size: 0.3rem;

    .back,
    .share {
      padding: 0 0.4rem;
    }

    marquee {
      width: 5rem;
    }

    .icon {
      fill: white;
      width: 0.4rem;
      height: 0.4rem;
    }

    .title {
      width: 5rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
    }
  }

  .playContent {
    position: absolute;
    width: 7.5rem;
    height: 7.5rem;
    left: 0;
    top: 1.5rem;
    .needle {
      width: 2.3rem;
      height: auto;
      position: absolute;
      left: 3.5rem;
      transform-origin: 0.3rem 0.3rem;
      transform: rotate(-30deg);
      transition: all 1s;
      z-index: 10;
    }
    .needle.active {
      transform: rotate(7deg);
      transition: all 1s;
    }

    .disc {
      width: 5.5rem;
      height: 5.5rem;
      position: absolute;
      left: calc(50% - 2.75rem);
      top: 2.5rem;
    }
    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    .playImg {
      animation: rotation 20s linear infinite;
      width: 4rem;
      height: 4rem;
      border-radius: 4rem;
      position: absolute;
      left: calc(50% - 2rem);
      top: calc(2.5rem + 2.75rem - 2rem);
    }
  }

  .playLyric {
    position: absolute;
    width: 6rem;
    height: 8rem;
    left: 0.75rem;
    top: calc(50% - 4rem);
    text-align: center;
    z-index: 5;
    overflow: scroll;
    font-size: 0.3rem;
    &::-webkit-scrollbar {
      display: none;
    }

    p {
      padding: 0.1rem 0.2rem;
      color: rgb(190, 189, 189);
    }

    .active {
      color: white;
      text-shadow: 0px 0px 10px #000;
    }
  }

  .playFooter {
    width: 7.5rem;
    height: 1.5rem;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.4rem;

    .icon {
      fill: #fff;
      &:nth-of-type(3) {
        width: 0.8rem;
        height: 0.8rem;
      }
    }
  }
}
</style>