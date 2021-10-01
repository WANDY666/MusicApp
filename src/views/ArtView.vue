<template>
  <div class="ArtView">
    <div class="background"></div>
    <div class="ArtView">
      <art-view-top :artistId='$route.query.id'></art-view-top>
    </div>
  </div>
</template>

<script>
import ArtViewTop from '@/components/ArtViewTop.vue';

export default {
  data () {
    return {
    }
  },
  components: {
    ArtViewTop
  },
}
</script>

<style lang="less" scoped>
.ArtView {
  .background {
    position: fixed;
    top: 0;
    z-index: -1;
    background-color: rgb(26, 26, 26);
    height: calc(100vh - 1.2rem);
    width: 100%;
  }
}
</style>
