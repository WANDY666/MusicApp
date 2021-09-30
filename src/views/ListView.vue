<template>
  <div ref='listView'
       class="listView"
       @scroll="scroll">
    <div ref='main'>
      <list-view-top :list='list'></list-view-top>
      <list-view-main :list='list'></list-view-main>
      <div v-show="!hasLoaded"
           class="more"> 正在加载... </div>
    </div>
  </div>
</template>

<script>
import { getPlaylistDetail, getMusicDetail } from '@/api/index.js'
import ListViewMain from '@/components/ListViewMain.vue'
import ListViewTop from '@/components/ListViewTop.vue'

export default {
  data () {
    return {
      list: {
        creator: {},
        trackIds: []
      },
      singleLoadNum: 20,
      loadedCount: 0,
      loadMore: false,
      scrollLock: false
    }
  },
  async mounted () {
    let result = await getPlaylistDetail(this.$route.query.id);
    console.log(result);
    this.list = result.data.playlist;
    this.loadedCount = this.list.tracks.length;
  },
  components: {
    ListViewTop,
    ListViewMain
  },
  computed: {
    hasLoaded () {
      return this.loadedCount >= this.list.trackIds.length;
    }
  },
  methods: {
    async scroll () {
      if (this.hasLoaded) {
        return;
      }
      if (this.scrollLock) {
        return;
      }
      console.log('Scroll', [this.$refs.listView]);
      this.scrollLock = true;
      let scrollHeight = this.$refs.listView.scrollHeight;
      let scrollTop = this.$refs.listView.scrollTop;
      let clientHeight = this.$refs.listView.clientHeight;
      console.log(scrollHeight);
      console.log(scrollTop);
      console.log(clientHeight);
      if (scrollHeight - 30 <= scrollTop + clientHeight) {
        let ids = this.list.trackIds.slice(this.loadedCount, this.loadedCount + this.singleLoadNum).map(
          item => item.id
        ).join(',');
        let result = await getMusicDetail(ids);
        this.list.tracks = this.list.tracks.concat(result.data.songs);
        console.log(result);
      }
      setTimeout(
        () => {
          this.scrollLock = false;
        }, 50);

    },
  }
}
</script>

<style lang="less" scoped>
.listView {
  width: 100vw;
  height: calc(100vh - 1.2rem);
  overflow: auto;
}

.more {
  height: auto;
  font-size: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  margin-bottom: 0.2rem;
  color: grey;
}
</style>