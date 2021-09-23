<template>
  <div class="listView">
    <list-view-top :list='list'></list-view-top>
    <list-view-main :list='list'></list-view-main>
  </div>
</template>

<script>
import { getPlaylistDetail } from '@/api/index.js'
import ListViewMain from '@/components/ListViewMain.vue'
import ListViewTop from '@/components/ListViewTop.vue'

export default {
  data () {
    return {
      list: {
        creator: {}
      }
    }
  },
  async mounted () {
    // console.log(this.$route);
    let result = await getPlaylistDetail(this.$route.query.id);
    console.log(result);
    this.list = result.data.playlist;
  },
  components: {
    ListViewTop,
    ListViewMain
  }
}
</script>

<style lang="less" scoped>
</style>