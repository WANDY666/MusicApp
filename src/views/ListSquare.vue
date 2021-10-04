<template>
  <div class="ListSquare">
    <header>
      <div class="back"
           @click="$router.back()">
        <icon iconName='icon-fanhuizuojiantou'></icon>
        <div class="title">
          歌单广场
        </div>
      </div>
    </header>
    <nav ref='nav'
         @click="switchTag($event)">
      <span :index='index'
            :class="{ active : index === currentIndex}"
            v-for="(item, index) in hotPlaylistTags"
            :key="item.id">
        {{item.name}}
      </span>
    </nav>

    <main ref='main'
          @touchend='touchend'>
      <section v-for="(taglist, index) in lists"
               :key="taglist.id">
        <!-- <div class="space">占位</div> -->
        <article>
          <router-link :to="{path:'/listview', query:{id:list.id}}"
                       class="card"
                       v-for="(list, index) in taglist.playlists"
                       :key="list.id">
            <img :src="list.coverImgUrl"
                 alt="list.name">
            <div class="name">{{list.name}}</div>
            <div class="count">
              <icon iconName="icon-play"></icon>
              {{playCount(list.playCount)}}
            </div>
          </router-link>
        </article>
      </section>
    </main>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
import { getPlaylistHot, getTopPlaylist } from '@/api/index.js';

export default {
  components: { Icon },
  data () {
    return {
      hotPlaylistTags: [],
      currentIndex: 0,
      lists: []
    }
  },
  async created () {
    let res = await getPlaylistHot();
    console.log(res);
    this.hotPlaylistTags = res.data.tags.filter((tag) => {
      return tag.name.length < 4;
    });
    this.hotPlaylistTags.forEach(async (ele, index) => {
      this.lists[index] = {
        offset: 0,
        limit: 12,
        tag: ele.name,
      };
      let listRes = await getTopPlaylist({
        limit: this.lists[index].limit,
        offset: this.lists[index].offset++,
        tag: this.lists[index].tag
      });
      // console.log(listRes);
      this.lists[index].playlists = listRes.data.playlists;
    });
  },
  methods: {
    playCount (num) {
      let res = num;
      if (num >= 100000000) {
        res = num / 100000000;
        res = res.toFixed(2) + '亿';
      } else if (num >= 10000) {
        res = num / 10000;
        res = res.toFixed(2) + '万'
      }
      return res;
    },
    switchTo (index) {
      //nav switch
      let nav = this.$refs.nav;
      let clientWidth = nav.clientWidth;
      let scrollLeft = nav.scrollLeft;

      this.currentIndex = index;
      let offsetLeft = nav.children[index].offsetLeft;

      console.log(clientWidth, scrollLeft, offsetLeft);
      // target.parentElement.scrollLeft = offsetLeft - 151;

      nav.scrollTo({
        left: offsetLeft - 151,
        behavior: 'smooth'
      });

      // section switch

    },
    switchTag (event) {
      if (event.target.tagName === 'SPAN') {
        let target = event.target;
        switchTo(parseInt(target.getAttribute('index')));
      }
    },
    touchend () {
      let clientWidth = this.$refs.main.clientWidth;
      console.log([this.$refs.main]);
    }
  }
  // offsetHeight: 20
  // offsetLeft: 85
  // offsetParent: body
  // offsetTop: 46
  // offsetWidth: 30

  // offsetHeight: 20
  // offsetLeft: 15
  // offsetParent: body
  // offsetTop: 46
  // offsetWidth: 30
}
</script>

<style lang="less" scoped>
.ListSquare {
  width: 100vw;
  height: calc(100vh - 1.2rem);
  background-color: rgb(58, 58, 58);
  header {
    padding-top: 0.2rem;
    .back {
      color: white;
      display: flex;
      align-items: center;
      .icon {
        margin: 0 0.2rem 0 0.2rem;
        fill: white;
      }
      .title {
        font-size: 0.4rem;
      }
    }
  }

  nav {
    height: 0.8rem;
    width: 90vw;
    padding: 0.2rem 0.3rem;
    overflow: scroll;
    transition: all 1s;
    &::-webkit-scrollbar {
      display: none;
    }

    display: flex;
    color: rgb(156, 156, 156);
    gap: 0.4rem;
    span {
      font-size: 0.3rem;
      white-space: nowrap;
      padding-left: 0.2rem;
      padding-right: 0.2rem;

      &.active {
        color: white;
        font-weight: 600;
        border-bottom: 0.1rem solid red;
        border-bottom-left-radius: 10%;
        border-bottom-right-radius: 10%;
      }
    }
  }

  main {
    width: 100vw;
    height: calc(100vh - 3rem);
    display: flex;
    position: fixed;
    top: 1.8rem;
    left: 0;
    overflow-x: scroll;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    section {
      width: 7.5rem;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      .space {
        height: 1rem;
      }
      article {
        width: 7.1rem;
        display: grid;
        grid-row-gap: 0.2rem;
        grid-template-columns: repeat(3, 1fr);

        .card {
          display: flex;
          position: relative;
          flex-direction: column;
          width: 2.2rem;
          height: auto;
          margin: 0 0.2rem 0 0;

          img {
            width: 2.2rem;
            height: 2.2rem;
            border-radius: 0.2rem;
          }

          .name {
            width: 100%;
            height: 0.6;
            font-size: 0.24rem;
            line-height: 0.4rem;
            color: white;

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }

          .count {
            color: #ccc;
            position: absolute;
            right: 0.1rem;
            top: 0.1rem;
            font-size: 0.24rem;
            display: flex;
            align-items: center;
            border-radius: 0.1rem;
            background-color: rgba(27, 27, 27, 0.2);

            icon {
              fill: red;
            }
          }
        }
      }
    }
  }
}
</style>