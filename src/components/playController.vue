<template>
  <div class="playController">
    <div class="left" @click="showMusic=!showMusic">
      <img :src="playlist[playCurrentIndex].al.picUrl" :alt="playlist">
      <div class="content">
        <div class="title">{{playlist[playCurrentIndex].name}}</div>
        <div class="tips">横滑可以切换上下首哦</div>
      </div>
    </div>
    <div class="right">
      <icon v-if="paused" @click="play()" iconName="icon-play"></icon>
      <icon v-else @click="play()" iconName="icon-zanting1"></icon>
      <icon iconName="icon-gedan"></icon>
    </div>
    <play-music @play='play()' :paused="paused" @back='showMusic=!showMusic' v-show="showMusic" :music='playlist[playCurrentIndex]'></play-music>
    <audio ref='audio' :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"></audio>
  </div>
</template>

<script>

import {mapState, mapMutations} from 'vuex';
import Icon from './Icon.vue'
import PlayMusic from './PlayMusic.vue'
export default {
  data() {
    return {
      paused: true,
      showMusic: false,
    }
  },
  components: {
    Icon,
    PlayMusic
  },
  mounted() {
    console.log(this.$refs.audio);
    this.$store.dispatch('reqLyric', {id:this.playlist[this.playCurrentIndex].id});
  },
  updated() {
  },
  watch: {
  },
  computed: {
    ...mapState(['playlist', 'playCurrentIndex'])
  },
  methods: {
    play() {
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

    updateTime() {
      let id = setInterval(() => 
        this.$store.commit('setCurrentTime', this.$refs.audio.currentTime)
      , 500); 
      this.$store.commit('setIntId', id);
    }
  },
  watch: {
     playCurrentIndex(newIndex, oldIndex) {
       console.log('NICE');
       this.paused = true;
     }
  }
}
</script>

<style lang="less">
.playController {
  width: 7.5rem;
  height: 1.2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  background-color: white;
  .left {
    display: flex;
    align-items: center;
    padding: 0 0.1rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.4rem;
    }

    .content {
      padding: 0 0.2rem;
      .title {
        font-size: 0.25rem;
        font-weight: 600;
      }
      .tips {
        font-size: 0.2rem;
        color: #999;
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