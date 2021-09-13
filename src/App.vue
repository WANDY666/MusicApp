<template>
  <router-view/>
  <play-controller></play-controller>
</template>


<script>
import playController from '@/components/playController.vue'
export default {
  components: {
    playController
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
