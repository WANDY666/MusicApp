<template>
  <div class="ArtView"
       @scroll="scrollIt($event)"
       @touchstart="touchstart"
       @touchmove="touchmove"
       @touchend="touchend">
    <div class="background"></div>
    <art-view-top ref='artViewTop'
                  :artistId='$route.query.id'></art-view-top>
    <art-view-main :artistId='$route.query.id'></art-view-main>
  </div>
</template>

<script>
import ArtViewTop from '@/components/ArtViewTop.vue';
import ArtViewMain from '@/components/ArtViewMain.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    ArtViewTop,
    ArtViewMain
  },
  methods: {
    scrollIt (event) {
      this.$refs.artViewTop.scrollIt(event.currentTarget);
    },
    touchstart (event) {
      this.$refs.artViewTop.touchstart(event);
    },
    touchmove (event) {
      this.$refs.artViewTop.touchmove(event);
    },
    touchend (event) {
      this.$refs.artViewTop.touchend(event);
    },
  }
}
</script>

<style lang="less" scoped>
.ArtView {
  height: calc(100vh - 1.2rem);
  overflow: auto;
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
