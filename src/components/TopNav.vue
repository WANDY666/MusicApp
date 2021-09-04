<template>
  <div class="topNav">
    <div class="topLeft">
      <icon iconName="icon-liebiao1"></icon>
    </div>
    <div class="topCenter">
      <span class="navBtn">我的</span>
      <span class="navBtn">发现</span>
      <span class="navBtn">云村</span>
      <span class="navBtn">视频</span>
    </div>
    <div class="topRight">
      <icon iconName="icon-sousuo"></icon>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'

export default {
  components: {
    Icon
  }
}
</script>

<style lang="less" scoped>
.topNav {
  width: 7.5rem;
  height: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;
}

.topCenter {
  width: 4.5rem;
  display: flex;
  justify-content: space-around;
  font-size: 0.3rem;

  .active {
    font-weight: 900;
  }
}
</style>