<template>
  <div class="ListSquare">
    <img v-show="showLoading"
         class="loading"
         src="@/assets/image/loading.gif">
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
          @touchstart='touchstart'
          @touchmove='touchmove'
          @touchend='touchend'>
      <div ref="real"
           class="real">
        <section v-for="(taglist, index) in lists"
                 :key="taglist.id">
          <!-- <div class="space">占位</div> -->
          <article @scroll="scrollSection">
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
      </div>
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
      touchstartX: 0,
      touchstartY: 0,
      showLoading: false,

      lastLocation: 0,
      scrollId: 0,
      distanceX: 0,
      distanceY: 0,
      scrollSectionId: 0,
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
    async scrollSection (event) {
      if (this.scrollSectionId !== 0) {
        clearTimeout(this.scrollSectionId);
      }
      this.scrollSectionId = setTimeout(async () => {
        let target = event.target;
        let scrollHeight = target.scrollHeight;
        let scrollTop = target.scrollTop;
        let clientHeight = target.clientHeight;
        if (scrollHeight - 60 <= scrollTop + clientHeight) {
          this.showLoading = true;
          let listRes = await getTopPlaylist({
            limit: this.lists[this.currentIndex].limit,
            offset: this.lists[this.currentIndex].limit * this.lists[this.currentIndex].offset++,
            tag: this.lists[this.currentIndex].tag
          });
          this.showLoading = false;

          console.log(listRes.data.playlists);
          this.lists[this.currentIndex].playlists = this.lists[this.currentIndex].playlists.concat(listRes.data.playlists);
          setTimeout(() => {
            target.scrollTo({
              top: target.scrollTop + 100,
              behavior: 'smooth'
            });
          }, 0);

        }
        this.scrollSectionId = 0;
      }, 20);
    },
    touchstart (event) {
      console.log('touchstart');
      this.$refs.real.style.transition = 'none';
      this.touchstartX = event.targetTouches[0].pageX;
      this.touchstartY = event.targetTouches[0].pageY;
      this.lastLocation = parseFloat(getComputedStyle(this.$refs.real).getPropertyValue('left').match(/[+-]?[0-9]+/)[0]);
    },
    touchmove (event) {
      // console.log([this.$refs.real]);
      this.distanceX = event.targetTouches[0].pageX - this.touchstartX;
      this.distanceY = event.targetTouches[0].pageY - this.touchstartY;

      if (Math.abs(this.distanceY) * 2 < Math.abs(this.distanceX)) {
        this.$refs.real.style.left = (this.lastLocation + this.distanceX) + 'px';
      }
      // console.log(distanceX, this.lastLocation);
      // this.$refs.main.scrollLeft = this.$refs.main.scrollLeft + 
    },

    touchend () {
      if (Math.abs(this.distanceY) * 2 < Math.abs(this.distanceX)) {
        this.$refs.real.style.transition = 'left 0.3s ease-out'
        if (this.distanceX < 0) {
          this.switchTo(Math.min(this.currentIndex + 1, this.lists.length - 1));
        } else {
          this.switchTo(Math.max(0, this.currentIndex - 1));
        }
      } else {
        this.switchTo(this.currentIndex);
      }
    },
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
      // if (index === this.currentIndex) {
      //   return;
      // }
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

      // real switch
      this.$refs.real.style.left = `-${index * this.$refs.main.clientWidth}px`;
      console.log('switch ' + index);
    },
    switchTag (event) {
      if (event.target.tagName === 'SPAN') {
        let target = event.target;
        this.switchTo(parseInt(target.getAttribute('index')));
      }
    },
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

  .loading {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 20%;
    position: fixed;
    z-index: 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 2rem;
    height: 2rem;
    object-fit: cover;
  }
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
    position: fixed;
    top: 1.8rem;
    left: 0;
    overflow: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    -webkit-overflow-scrolling: auto;

    .real {
      display: flex;
      position: relative;
      section {
        position: relative;
        // left: 2rem;
        width: 7.5rem;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        .space {
          height: 1rem;
        }
        article {
          width: 7.1rem;
          height: calc(100vh - 3rem);
          display: grid;
          overflow-x: hidden;
          overflow-y: auto;
          grid-row-gap: 0.2rem;
          grid-template-columns: repeat(3, 1fr);
          &::-webkit-scrollbar {
            display: none;
          }
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
}
</style>