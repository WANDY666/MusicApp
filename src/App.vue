<template>
  <div class="app">
    <router-view />
    <play-controller ref="playController"></play-controller>
  </div>
</template>


<script>
import PlayController from '@/components/PlayController.vue'
export default {
  components: {
    PlayController
  },
  mounted () {
    if (localStorage.getItem('userData')) {
      let userData = JSON.parse(localStorage.getItem('userData'));
      this.$store.commit('setUser', userData);
    }
  },
  methods: {
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

.app {
  width: 100vw;
  height: 100vh;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
