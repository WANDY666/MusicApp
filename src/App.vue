<template>
  <router-view/>
  <play-controller></play-controller>
</template>


<script>
import playController from '@/components/playController.vue'
export default {
  components: {
    playController
  },
  mounted() {
    if (localStorage.getItem('userData')) {
      let userData = JSON.parse(localStorage.getItem('userData'));
      this.$store.commit('setUser', userData);
    }
  }
}
</script>

<style lang="less">
*{
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
