<template>
  <div ref="toast"
       class="Toast">
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
  data () {
    return {
      type: 'error',
      note: '歌曲播放',
      id: 0,
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

  methods: {
    showToast (options) {
      // clearTimeout(this.id);
      if (this.id === 0) {
        this.$parent.showToast = true;
        this.type = options.type;
        this.note = options.note;
        this.$refs.toast.style.transition = 'all 1s ease-out';
        this.$refs.toast.style.filter = 'opacity(1)';
        console.log('start');
        this.id = setTimeout(() => {
          this.$refs.toast.style.transition = 'all 1s ease-in';
          this.$refs.toast.style.filter = 'opacity(0)';
          this.id = setTimeout(() => {
            this.$parent.showToast = false;
            this.id = 0;
          }, 1000);
        }, 1000);
      }
    }
  },

  components: {
    Icon
  },

  created () {
    console.log(this.type);
  },
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
  filter: opacity(0);

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