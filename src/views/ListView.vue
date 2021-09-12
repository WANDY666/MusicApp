<template>
  <div class="listView">
    <list-view-top :list='list'></list-view-top>
    <play-list :list='list'></play-list>
  </div>
</template>

<script>
import { getPlaylistDetail } from '@/api/index.js'
import PlayList from '@/components/PlayList.vue'
import ListViewTop from '@/components/ListViewTop.vue'

export default {
  data() {
    return {
      list: {
        creator: {}
      }
    }
  },
  async mounted() {
    // console.log(this.$route);
    let result = await getPlaylistDetail(this.$route.query.id);
    console.log(result);
    this.list = result.data.playlist;
  },
  components: {
    ListViewTop,
    PlayList
  }
}
</script>