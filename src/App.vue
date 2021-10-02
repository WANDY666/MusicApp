<template>
  <div class="app">
    <router-view />
    <play-controller ref="playController"></play-controller>
    <toast type='error'
           note='歌曲播放失败'></toast>
  </div>
</template>

<script>
import PlayController from '@/components/PlayController.vue'
import Toast from '@/components/Toast.vue'

export default {
  components: {
    PlayController,
    Toast
  },
  beforeMount () {
    if (localStorage.getItem('playlist')) {
      this.keywordList = JSON.parse(localStorage.getItem('playlist'));
    }
  },
  mounted () {
    if (localStorage.getItem('userData')) {
      let userData = JSON.parse(localStorage.getItem('userData'));
      this.$store.commit('setUser', userData);
    }
  },
  methods: {
  },
  beforeUnmount () {
    localStorage.setItem('keywordList', JSON.stringify(this.$store.state.playlist));
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Microsoft YaHei';
}

a {
  color: black;
  text-decoration: none;
}
</style>
