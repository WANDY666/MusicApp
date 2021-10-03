import { createStore } from 'vuex'
import { getLyric, phoneLogin, getUserDetail } from '../api';

let defaultMusic = {
  "name": "STAY",
  "id": 1859245776,
  "ar": [
    {
      "id": 32795025,
      "name": "The Kid LAROI",
      "tns": [],
      "alias": []
    },
    {
      "id": 35531,
      "name": "Justin Bieber",
      "tns": [],
      "alias": []
    }
  ],
  "al": {
    "id": 130016223,
    "name": "STAY",
    "picUrl": "http://p3.music.126.net/e5cvcdgeosDKTDrkTfZXnQ==/109951166155165682.jpg",
    "tns": [],
    "pic_str": "109951166155165682",
    "pic": 109951166155165680
  },
};

export default createStore({
  state: {
    playMode: 'ListCycle',
    playlist: [defaultMusic],
    playCurrentIndex: 0,
    lyric: '',
    intId: 0,
    currentTime: 0,
    user: {
      isLogin: false,
      account: {},
      detail: {}
    },
    play: {},
    pause: {},
    toast: {},
    showPlayList: false
  },
  getters: {
    currentMusic: function (state){
      console.log("getcurrentMusic");
      return state.playlist[state.playCurrentIndex];
    },

    lyrics: function (state) {
      let arr = state.lyric.split(/\n/g).map((item) => {
        let min = parseInt(item.slice(1, 3));
        let sec = parseInt(item.slice(4, 6));
        let mill = parseInt(item.slice(7, 9));
        let lyric = item.slice(item.indexOf(']') + 1);
        return {
          min, sec, mill, lyric,
          content: item,
          time: (mill + sec * 1000 + min * 60 * 1000)
        };
      });
      arr = arr.filter((e) => (e.lyric != ''));
      arr.forEach((item, i, arr) => {
        if (i === 0) {
          item.pre = 0;
        } else {
          item.pre = arr[i - 1].time;
        }

        if (i === arr.length - 1) {
          item.next = item.time + 10000;
        } else {
          item.next = arr[i + 1].time;
        }
      });
      console.log(arr);
      return arr;
    }
  },
  mutations: {
    setPlaylist: function (state, value) {
      state.playlist = value;
    },
    setToast(state, value) {
      state.toast = value;
    },
    setShowPlayList(state, value) {
      state.showPlayList = value;
    },
    setPlayFunc(state, func) {
      state.play = func;
    },
    setPlayIndex(state, value) {
      state.playCurrentIndex = value;
    },
    setPauseFunc(state, func) {
      state.pause = func;
    },
    setLyric(state, value) {
      state.lyric = value;
    },
    setCurrentTime(state, value) {
      state.currentTime = value;
    },
    setIntId(state, value) {
      state.intId = value;
    },
    pushMusic(state, value) {
      state.playlist.push(value);
    },
    setUser(state, value) {
      state.user = value;
    },
    setPlayMode(state, value) {
      state.playMode = value;
    },
    deleteListMusic(state, index) {
      state.playlist.splice(index, 1);
    }
  },
  actions: {
    showToast({state}, options) {
      state.toast.showToast(options);
    },

    async reqLyric(content, options) {
      let result = await getLyric(options.id);
      console.log(result);
      if (result.data.nolyric) {
        content.commit('setLyric', '[00:00.000]暂无歌词');
      } else {
        content.commit('setLyric', result.data.lrc.lyric);
      }
    },

    async deleteMusic(content, options) {
      if (content.state.playlist.length === 1) {
        console.log('finish');
        return;
      }
      
      
      if (options.index === content.state.playCurrentIndex) {
        content.state.pause();
        content.commit('deleteListMusic', options.index);
        content.dispatch('changeMusic', {
          playlist: content.state.playlist,
          playIndex: (content.state.playCurrentIndex) % content.state.playlist.length
        });
      } else {
        if (options.index < content.state.playCurrentIndex) {
          content.commit('setPlayIndex', content.state.playCurrentIndex - 1);
        }
        content.commit('deleteListMusic', options.index);
      }
    },

    async changeMusic(content, options) {
      content.state.pause();
      content.commit('setPlaylist', options.playlist);
      content.commit('setPlayIndex', options.playIndex);
      await content.dispatch('reqLyric', {
        id: options.playlist[options.playIndex].id
      });
      content.state.play();
    },

    async login(content, payload) {
      let result = await phoneLogin(payload.phone, payload.password);
      if (result.data.code === 200) {
        content.state.user.isLogin = true;
        content.state.user.account = result.data.account;

        let userDetail = await getUserDetail(result.data.account.id);
        content.state.user.userDetail = userDetail.data;

        localStorage.userData = JSON.stringify(content.state.user);
        console.log(userDetail);
        content.commit('setUser', content.state.user);
      }
      console.log(result);
      return result;
    }
  },
  modules: {
  }
})
