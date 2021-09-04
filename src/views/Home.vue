<template>
  <div class="home">
    <top-nav style="margin-top: 10px"></top-nav>
    <div style="height: 16px"></div>
    <swiper-com></swiper-com>
    <icon-list></icon-list>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/TopNav.vue'
import SwiperCom from '@/components/SwiperCom.vue'
import iconList from '@/components/IconList.vue'

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
    iconList
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
