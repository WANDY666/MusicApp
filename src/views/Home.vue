<template>
  <div class="home">
    <home-top-nav style="margin-top: 10px"></home-top-nav>
    <div style="height: 16px"></div>
    <home-swiper></home-swiper>
    <home-icon-list></home-icon-list>
    <home-music-list></home-music-list>
    <home-art-list></home-art-list>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeTopNav from '@/components/HomeTopNav.vue'
import HomeSwiper from '@/components/HomeSwiper.vue'
import HomeIconList from '@/components/HomeIconList'
import HomeMusicList from '@/components/HomeMusicList.vue'
import HomeArtList from '@/components/HomeArtList.vue'

export default {
  name: 'Home',
  data () {
    return {

    }
  },
  computed: {
  },
  components: {
    HomeTopNav,
    HomeSwiper,
    HomeIconList,
    HomeMusicList,
    HomeArtList
  },
}
</script>

<style lang="less" scoped>
#d1 {
  width: 3.75rem;
  height: 3.75rem;
  background-color: skyblue;
}

.home {
  width: 100vw;
  height: calc(100vh - 1.2rem);
  overflow: auto;
}
</style>>
