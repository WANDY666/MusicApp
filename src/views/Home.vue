<template>
  <div class="home">
    <top-nav style="margin-top: 10px"></top-nav>
    <div style="height: 16px"></div>
    <swiper-com></swiper-com>
    <icon-list></icon-list>
    <music-list></music-list>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/TopNav.vue'
import SwiperCom from '@/components/SwiperCom.vue'
import IconList from '@/components/IconList.vue'
import MusicList from '@/components/MusicList.vue'

export default {
  name: 'Home',
  data() {
    return {
      
    }
  },
  computed: {
  },
  components: {
    TopNav,
    SwiperCom,
    IconList,
    MusicList
  },
}
</script>

<style lang="less" scoped>
#d1 {
  width: 3.75rem;
  height: 3.75rem;
  background-color: skyblue;
}
</style>>
