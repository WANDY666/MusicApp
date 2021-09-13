<template>
  <div class="playMusic">
    <div class="bg" :style="{backgroundImage: `url(${music.al.picUrl})`}"></div>
    <div class="playTop">
      <div class="back" @click="$emit('back')">
        <icon iconName="icon-fanhuizuojiantou"></icon>
      </div>
      <div class="center">
        <div class="title">
          <!-- <marquee behavior="scroll" direction="left">{{ music.al.name }}</marquee> -->
          {{ music.al.name }}
        </div>
        <div class="author">
        </div>
      </div>
      <div class="share">
        <icon iconName="icon-fenxiang"></icon>
      </div>
    </div>
    <div class="playContent" v-show="!isLyric">
      <img class="needle" :class="{ active:!paused }" src="@/assets/image/needle-ab.png">
      <img class="disc" src="@/assets/image/disc-plus.png" alt="">
      <img class="playImg" :src="music.al.picUrl">
    </div>

    <div class="playLyric" v-show="isLyric" ref="playLyric">
      <p :class="{active: (currentTime * 1000 >= item.time && currentTime * 1000 < item.next)}" v-for="(item, i) in lyrics" :key="i">
        {{ item.lyric }}
      </p>
    </div>
    <div class="lyric"></div>
    <div class="progress"></div>
    <div class="playFooter">
        <icon iconName="icon-xunhuan"></icon>
        <icon @click="lastMusic()" iconName="icon-shangyishoushangyige"></icon>
        <icon v-if="paused" @click="play()" iconName="icon-bofang1"></icon>
        <icon v-else @click="play()" iconName="icon-zanting1"></icon>
        <icon @click="nextMusic()" iconName="icon-xiayigexiayishou"></icon>
        <icon iconName="icon-bofangliebiaoguanli"></icon>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Icon from './Icon.vue'
export default {
  data() {
    return {
      isLyric: true,
    }
  },
  computed: {
    ...mapGetters([
      'lyrics',
    ]),
    ...mapState(
      ['currentTime']
    )
  },
  watch: {
    currentTime() {
      console.log([this.$refs.playLyric]);
      let active = document.querySelector('.playLyric .active');
      if (!active) {
        return;
      }
      if (active.offsetTop > 100) {
        this.$refs.playLyric.scrollTop = active.offsetTop - 100;
      }

      console.log([active]);
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
    play() {
      this.$emit('play');
    },
    nextMusic() {
      this.$store.dispatch('changeMusic', {
        playlist: this.$store.state.playlist,
        playIndex: (this.$store.state.playCurrentIndex + 1) % this.$store.state.playlist.length
      });
    },
    lastMusic() {
      this.$store.dispatch('changeMusic', {
        playlist: this.$store.state.playlist,
        playIndex: (this.$store.state.playCurrentIndex - 1 + this.$store.state.playlist.length) % this.$store.state.playlist.length
      });
    }
  },
  mounted() {

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

    .back, .share{
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

    .playImg {
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
    width: 7.5rem;
    height: 8rem;
    left: 0;
    top: calc(50% - 4rem);
    z-index: 5;
    overflow: scroll;
    text-align: center;
    font-size: 0.3rem;

    p {
      padding: 0.1rem 0.2rem;
    }

    .active {
      color: red;
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