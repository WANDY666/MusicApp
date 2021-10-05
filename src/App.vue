<template>
  <div class="app">
    <router-view />
    <play-controller ref="playController"></play-controller>
    <toast v-show='showToast'
           ref="toast"></toast>
    <div class="bgColor"></div>
  </div>
</template>

<script>
import PlayController from '@/components/PlayController.vue'
import Toast from '@/components/Toast.vue'
import { mapState } from 'vuex';

export default {
  components: {
    PlayController,
    Toast
  },
  beforeMount () {
    if (localStorage.getItem('playlist')) {
      this.keywordList = JSON.parse(localStorage.getItem('playlist'));
    }
  },
  computed: {
    ...mapState(['toastOptions']),
  },
  data () {
    return {
      showToast: false
    }
  },
  mounted () {
    console.log('App mounted');
    this.$store.commit('setToast', this.$refs.toast);
    if (localStorage.getItem('userData')) {
      let userData = JSON.parse(localStorage.getItem('userData'));
      this.$store.commit('setUser', userData);
    }
  },
  methods: {
  },
  beforeUnmount () {
    localStorage.setItem('keywordList', JSON.stringify(this.$store.state.playlist));
  }
}
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.bgColor {
  position: fixed;
  top: 0;
  height: 0;
  width: 100vw;
  height: 100vh;
  z-index: -100;
  background-color: rgb(66, 66, 66);
}

a {
  color: black;
  text-decoration: none;
}
</style>
