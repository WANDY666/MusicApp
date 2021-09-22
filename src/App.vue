<template>
  <div>
    <router-view />
    <play-controller ref="playController"></play-controller>
  </div>
</template>


<script>
import playController from '@/components/playController.vue'
export default {
  components: {
    playController
  },
  mounted () {
    if (localStorage.getItem('userData')) {
      let userData = JSON.parse(localStorage.getItem('userData'));
      this.$store.commit('setUser', userData);
    }
  },
  methods: {
    play() {
      
    }
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
