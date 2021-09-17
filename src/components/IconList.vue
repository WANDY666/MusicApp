<template>
  <div class="iconList">
    <div class="iconItem">
      <icon class="icon" iconName="icon-fanjutuijian" color="red"></icon>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <icon iconName="icon-ku" color="yellow"></icon>
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <icon iconName="icon-gedan1" color="yellow"></icon>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <icon iconName="icon-paihangbang-"></icon>
      <span>排行榜</span>
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
.iconList {
  display: flex;
  justify-content: space-around;
  padding: 0.4rem;

  .iconItem {
    display: flex;
    flex-direction: column;
    width: 60px;
    gap: 5px;

    align-items: center;

    .icon {
      width: 0.8rem;
      height: 0.8rem;
      // background-color: orangered;
    }

    span {
      font-size: 0.26rem
    }
  }
}
</style>