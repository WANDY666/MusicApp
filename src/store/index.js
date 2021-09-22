import { createStore } from 'vuex'
import { getLyric, phoneLogin, getUserDetail } from '../api';

export default createStore({
  state: {
    "playMode": 'ListCycle',
    playlist: [{
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
    }],
    playCurrentIndex: 0,
    lyric: '',
    intId: 0,
    currentTime: 0,
    user: {
      isLogin: false,
      account: {},
      detail: {}
    },
    play: {}
  },
  getters: {
    currentMusic: function (state){
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
    setPlayFunc(state, func) {
      state.play = func;
    },
    setPlayIndex(state, value) {
      state.playCurrentIndex = value;
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
    }
  },
  actions: {
    async reqLyric(content, options) {
      let result = await getLyric(options.id);
      content.commit('setLyric', result.data.lrc.lyric);
      console.log(result);
    },

    async changeMusic(content, options) {
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
