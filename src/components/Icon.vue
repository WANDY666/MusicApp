<template>
<svg class="icon" aria-hidden="true" :color="color" :font-size="fontSize">
  <use :xlink:href="getIcon"></use>
</svg>
</template>

<script>
  export default {
    computed: {
      getIcon() {
        return '#' + this.iconName
      }
    },
    props: {
      iconName: {
        type: String,
        required: true
      },
      fontSize: {
        type: String
      },
      color: {
        type: String
      }
    }
  }
</script>

<style lang="less">
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>