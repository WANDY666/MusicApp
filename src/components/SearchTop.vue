<template>
  <div class="SearchTop">
    <div class="SearchTopNav">
      <div class="back" @click="$router.back()">
        <icon iconName='icon-fanhuizuojiantou'></icon>
      </div>
      <div class="right">
        <input type="text" v-model="searchKey" :placeholder="placeholder" @keydown.enter="saveKeyword()">
      </div>
    </div>

    <div class="occupy">
    </div>

    <div class="history">
      <div class="historyLeft">
        历史
      </div>
      <div class="historyRight">
        <div @click='historySearch(item)' class="keyword" v-for="(item, index) in keywordList" :key="index">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
import { searchMusic } from '@/api/index.js';

export default {
  emits: ['setSearchSongs'],
  data() {
    return {
      placeholder: 'wandy',
      keywordList: [],
      searchKey: ''
    }
  },
  beforeMount() {
    if (localStorage.getItem('keywordList')) {
      this.keywordList = JSON.parse(localStorage.getItem('keywordList'));
    }
  },
  methods: {
    async saveKeyword() {
      if (this.searchKey) {
        console.log(this.searchKey);
        this.keywordList.unshift(this.searchKey);
        if (this.keywordList.length > 10) {
          this.keywordList.pop();
        }
        console.log(this.keywordList);
        localStorage.setItem('keywordList', JSON.stringify(this.keywordList));
        let result = await searchMusic(this.searchKey);
        console.log(result);
        this.$emit('setSearchSongs', result.data.result.songs);
        this.searchKey = '';
      }
    },

    async historySearch(keyword) {
      this.searchKey = keyword;
      this.saveKeyword();
    }
  },
  props: {
  },
  components: {
    Icon
  }
}
</script>

<style lang="less" scoped>
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
    background-color: white;

    .icon {
      width: 0.45rem;
      height: 0.45rem;
      fill: #444;
    }

    .right {
      padding: 0 0 0 0.4rem;
      flex: 1;

      input {
        border: none;
        outline: none;
        font-size: 0.45rem;
        border-bottom: 1px solid #666;
        width: 100%;
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
        background-color: #eee;
        height: 0.6rem;
        padding: 0 0.2rem;
        border-radius: 0.4rem;
        line-height: 0.6rem;
        margin: 0.1rem 0.1rem;
      }
    }
  }
}
</style>
