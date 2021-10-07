<template>
  <div class="search">
    <div class="SearchTop">
      <div class="SearchTopNav">
        <div class="back"
             @click="$router.back()">
          <icon iconName='icon-fanhuizuojiantou'></icon>
        </div>
        <div class="right">
          <input type="text"
                 v-model="searchKey"
                 :placeholder="placeholder"
                 @keydown.enter="saveKeyword()">
        </div>
      </div>

      <div class="occupy">
      </div>

      <div class="history">
        <div class="historyLeft">
          历史
        </div>
        <div class="historyRight">
          <div @click='historySearch(item)'
               class="keyword"
               v-for="(item, index) in keywordList"
               :key="index">{{item}}</div>
        </div>
      </div>
    </div>

    <!-- <div class="search-music-top">
      <div class="left">
        <icon iconName="icon-bofang"></icon>
        <div class="text">
          <div class="title">
            播放全部
          </div>
        </div>
      </div>

      <button class="right">
        <icon iconName='icon-xuanze-duoxuan-tianchong'></icon>
      </button>
    </div> -->

    <header v-show="showTopList"
            class="topList">
      <main @click="topSearch($event)">
        <div :index='index'
             class="top"
             v-for="(top, index) in topList"
             :key="index">
          <div :index='index'
               class="index">
            {{index +  1}}
          </div>
          <div :index='index'
               class="searchWord">
            {{top.searchWord}}
          </div>
          <img :index='index'
               v-if='top.iconUrl !== ""'
               :src="top.iconUrl"
               alt="">
        </div>
      </main>
    </header>

    <div v-show="!showTopList"
         class="list">
      <div class="playItem"
           v-for="(item, index) in songs"
           :key="index">
        <div class="left"
             @click="addMusic(item, index)">
          <div class="index">
            {{index + 1}}
          </div>
          <div class="content">
            <div class="title">{{item.name}}</div>
            <div class="author">
              <!-- <span class="tag">
                {{list.tags[0]}}
              </span> -->
              {{getArtists(item.artists, item.album)}}
            </div>
          </div>
        </div>
        <div class="right">
          <icon iconName='icon-bofang'></icon>
          <icon iconName='icon-liebiao1'></icon>
        </div>
      </div>
    </div>

    <div class="next"
         @click="showMoreRes()">
      <div v-show="lastSearch !== ''"
           class="more">
        点击获得更多
      </div>
    </div>
  </div>
</template>

<script>
import { searchMusic, getSearchHot } from '@/api/index.js';
import Icon from '@/components/Icon.vue';
import { mapMutations } from 'vuex';

export default {
  data () {
    return {
      songs: [],
      placeholder: 'wandy',
      keywordList: [],
      searchKey: '',
      lastSearch: '',
      showTopList: true,
      topList: [],
      offset: 0
    }
  },
  async created () {
    if (localStorage.getItem('keywordList')) {
      console.log(localStorage.getItem('keywordList'));
      this.keywordList = JSON.parse(localStorage.getItem('keywordList'));
    }

    let result = await getSearchHot();
    console.log(result);
    this.topList = result.data.data;
  },
  components: {
    Icon
  },
  methods: {
    topSearch (event) {
      let target = event.target;
      let index = target.getAttribute('index');
      console.log(index);
      if (index) {
        index = parseInt(index);
        console.log([event.target], index);
        this.searchKey = this.topList[index].searchWord;
        this.saveKeyword();
      }
    },
    async showMoreRes () {
      let result = await searchMusic(this.lastSearch, ++this.offset);
      this.songs = this.songs.concat(result.data.result.songs);
    },
    async saveKeyword () {
      if (this.searchKey) {
        this.showTopList = false;
        console.log(this.searchKey);
        let index = this.keywordList.indexOf(this.searchKey);
        if (index !== -1) {
          this.keywordList.splice(index, 1);
        }
        this.keywordList.unshift(this.searchKey);
        if (this.keywordList.length > 10) {
          this.keywordList.pop();
        }
        console.log(this.keywordList);

        let result = await searchMusic(this.searchKey);
        this.lastSearch = this.searchKey;
        this.searchKey = '';
        this.offset = 0;
        console.log(result);
        this.setSearchSongs(result.data.result.songs);
      }
    },

    async historySearch (keyword) {
      this.searchKey = keyword;
      this.saveKeyword();
    },

    setSearchSongs (list) {
      this.songs = list;
      console.log(this.songs)
    },

    ...mapMutations(
      ['setPlayIndex', 'setPlaylist']
    ),

    addMusic (item) {
      console.log(item);
      item.al = item.album;
      item.al.picUrl = item.al.artist.img1v1Url;
      item.ar = item.artists;
      this.$store.commit('pushMusic', item);
      this.$store.dispatch('changeMusic', {
        playlist: this.$store.state.playlist,
        playIndex: this.$store.state.playlist.length - 1
      });
    },

    getArtists (artists, album) {
      let names = artists.map((item) => item.name).join(', ');
      if (album && album.name) {
        names += ' - ' + album.name
      }
      return names;
    }
  },
  beforeUnmount () {
    if (this.keywordList) {
      localStorage.setItem('keywordList', JSON.stringify(this.keywordList));
    }
  },
  computed: {

  }

}
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: calc(100vh - 1.2rem);
  padding: 0.2rem 0.4rem 0 0.4rem;
  // background-color: rgb(36, 36, 36);
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  overflow: auto;
  color: white;

  .topList {
    width: 6.8rem;
    background-color: rgb(88, 88, 88);
    border-radius: 0.2rem;
    margin: 0.2rem auto;
    padding: 0.5rem 0 0.4rem 0.3rem;
    main {
      font-size: 0.3rem;
      display: grid;
      grid-template-columns: repeat(2, 3.1rem);
      row-gap: 0.2rem;
      // align-items: center;
      // justify-items: center;
      .top {
        display: flex;
        align-items: center;
        margin-right: 0.2rem;
        .index {
          flex-shrink: 0;
          width: 0.4rem;
          margin-right: 0.2rem;
        }
        .searchWord {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin-right: 0.2rem;
        }

        img {
          height: 0.3rem;
        }
      }
    }
  }

  .SearchTop {
    width: 100%;
    padding: 0 0.4rem;

    .SearchTopNav {
      display: flex;
      width: 7.5rem;
      height: 1.2rem;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      padding: 0.2rem;
      background-color: rgb(88, 88, 88);

      .icon {
        width: 0.45rem;
        height: 0.45rem;
        fill: white;
      }

      .right {
        padding: 0 0 0 0.4rem;
        flex: 1;

        input {
          border: none;
          outline: none;
          font-size: 0.45rem;
          border-bottom: 1px solid rgb(66, 66, 66);
          width: 100%;
          color: white;
          background-color: transparent;
        }
      }
    }

    .occupy {
      height: 1.2rem;
    }

    .history {
      display: flex;
      font-size: 0.3rem;
      align-items: center;

      .historyLeft {
        width: 1.2rem;
        height: 0.8rem;
        font-weight: 900;
        line-height: 0.8rem;
      }

      .historyRight {
        color: #666;
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        .keyword {
          background-color: rgb(88, 88, 88);
          height: 0.6rem;
          color: white;
          padding: 0 0.2rem;
          border-radius: 0.4rem;
          line-height: 0.6rem;
          margin: 0.1rem 0.1rem;
        }
      }
    }
  }
  .search-music-top {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      .icon {
        width: 0.6rem;
        height: 0.6rem;
      }
      .title {
        font-size: 0.34rem;
        font-weight: 900;
      }

      .num {
        font-size: 0.24rem;
        color: #ccc;
      }
      .text {
        display: flex;
        align-items: center;
        margin-left: 0.2rem;
      }
    }

    .right {
      font-size: 0.24rem;
      margin: 0;
      padding: 0;
      border: none; //自定义边框
      outline: none; //消除默认点击蓝色边框效果
      background-color: transparent;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
        fill: black;
      }
    }
  }

  .list {
    background-color: rgb(88, 88, 88);
    border-radius: 0.2rem;
    margin-top: 0.4rem;
    padding: 0.2rem;
    .playItem {
      display: flex;
      justify-content: space-between;
      height: 1.2rem;
      .left {
        display: flex;
        align-items: center;
        color: rgb(148, 146, 146);
        .index {
          width: 0.3rem;
          font-size: 0.3rem;
        }
        .content {
          margin-left: 0.4rem;
          width: 4.2rem;
          .title {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: white;
            font-size: 0.3rem;
            font-weight: 600;
            margin-bottom: 0.1rem;
          }
          .author {
            font-size: 0.24rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 0.4rem;

            .tag {
              font-size: 0.05rem;
              color: red;
              border: 1px solid orangered;
              border-radius: 0.05rem;
              margin-right: 0.03rem;
            }
          }
        }
      }

      .right {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 0.2rem;
          width: 0.4rem;
          height: 0.4rem;
        }
      }
    }
  }

  .next {
    text-align: center;
    .more {
      font-size: 0.35rem;
      color: grey;
      width: 4rem;
      margin: 0.2rem auto;
      // border: 1px solid black;
      border-radius: 0.2rem;
    }
  }
}
</style>