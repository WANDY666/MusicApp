<template>
  <div class="Toast">
    <icon :iconName='types[type].iconName'
          :style="types[type].styleObject"></icon>
    <div class="note">
      {{note}}
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'

export default {
  props: {
    type: String,
    note: String
  },

  data () {
    return {
      types: {
        'success': {
          styleObject: {
            fill: 'green'
          },
          iconName: 'icon-chenggong'
        },
        'error': {
          styleObject: {
            fill: 'red'
          },
          iconName: 'icon-error'
        }
      }
    }
  },

  components: {
    Icon
  }
}
</script>

<style lang="less" scoped>
.Toast {
  position: fixed;
  left: 50%;
  top: 40%;

  transform: translate(-50%, -50%);

  width: 50vw;
  height: 15vh;

  // border: 2px solid greenyellow;
  border-radius: 0.3rem;

  background-color: rgb(240, 240, 240);
  filter: opacity(1);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .icon {
    width: 0.8rem;
    height: 0.8rem;
  }

  .note {
    color: rgb(66, 66, 66);
    font-size: 0.4rem;
  }
}
</style>