<template>
  <div ref='root'
       class="ArtViewTop">
    <div class="coverDiv">
      <img ref='cover'
           @load="imgLoaded($event)"
           class="cover"
           :src="artist.cover">
    </div>
    <nav ref='nav'>
      <div class="back"
           @click="$router.back()">
        <icon style="fill: white"
              iconName='icon-fanhuizuojiantou'></icon>
        <span v-show="passTop">{{artist.name}}</span>
      </div>
      <div>
        <icon style="fill: white"
              @click="showToast"
              iconName='icon-liebiao'></icon>
      </div>
    </nav>
    <main>
      <section class="card">
        <div ref='avatar'
             class="avatar">
          <img @load="imgLoaded($event)"
               @error="imgError()"
               class="avatarImg"
               :src="user.avatarUrl">
          <!-- :src="user.avatarUrl"> -->
        </div>

        <div class="infocard">
          <div class="name">
            {{artist.name}}
          </div>
          <div class="info">
            <div class="album">
              <span class="number">{{artist.albumSize}}</span>专辑
            </div>
            <div class="vertical">
              |
            </div>
            <div class="music">
              <span class="number">{{artist.musicSize}}</span>歌曲
            </div>
            <div class="vertical">
              |
            </div>
            <div class="mv">
              <span class="number">{{artist.mvSize}}</span> MV
            </div>
          </div>
          <div class="description">
            {{user.description}}
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { getArtistDetail } from '@/api/index.js'
import Icon from '@/components/Icon.vue'


export default {
  props: {
    artistId: String
  },
  components: {
    Icon
  },
  data () {
    return {
      artist: {},
      user: {},
      scrollLock: false,
      scrollTop: 0,
      passTop: false,
      coverHeight: 267,
      touchLock: false,
      maxHeight: 500,
      last: 0
    }
  },

  methods: {
    showToast () {
      this.$store.dispatch('showToast', {
        type: 'error',
        note: '功能暂未开发'
      })
    },
    imgLoaded (event) {
      let img = event.currentTarget.parentElement;
      img.style.zIndex = 'auto';
      console.log(img);
    },
    imgError () {
      console.log('Error');
    },
    touchstart (event) {
      this.$refs.cover.style.transition = 'none';
    },
    touchmove (event) {
      let scroller = event.currentTarget;
      // if (this.touchLock) {
      //   return;
      // }
      // this.touchLock = true;
      // setTimeout(() => {
      //   this.touchLock = false;
      // }, 16);
      if (scroller.scrollTop === 0) {
        if (this.last === 0) {
          this.last = event.targetTouches[0].pageY;
          return;
        } else {
          this.$refs.cover.style.height = Math.min(this.maxHeight, this.coverHeight + event.targetTouches[0].pageY - this.last) + 'px';
          // console.log([this.$refs.cover]);
          // console.log(this.coverHeight + event.targetTouches[0].pageY - this.last);
        }
      } else {
        this.last = 0;
      }
    },
    touchend () {
      this.$refs.cover.style.transition = 'all 0.5s ease-in-out';
      this.$refs.cover.style.height = this.coverHeight + 'px';
      this.last = 0;
    },
    scrollIt (scroller) {
      if (this.scrollLock) {
        return;
      } else {
        this.scrollLock = true;
        setTimeout(() => {
          this.scrollLock = false
        }, 20);
      }
      this.scrollTop = scroller.scrollTop;
      let height = this.$refs.cover.clientHeight - 40;
      let opacity = 1 - this.scrollTop / height;
      this.$refs.cover.style.filter = `opacity(${opacity})`;
      this.$refs.avatar.style.filter = `opacity(${opacity})`;

      // height = this.$refs.root.clientHeight;
      opacity = this.scrollTop / height;
      this.$refs.nav.style.backgroundColor = `rgba(56, 56, 56, ${opacity})`;
      if (opacity >= 1) {
        this.passTop = true;
      } else {
        this.passTop = false;
      }
      // console.log(this.scrollTop, height);
    }
  },

  async beforeMount () {
    console.log(this.artistId);
    let result = await getArtistDetail(this.artistId);
    this.artist = result.data.data.artist;
    if (result.data.data.user) {
      this.user = result.data.data.user;
    } else {
      this.user = result.data.data.identify;
      this.user.description = this.user.imageDesc;
      this.user.avatarUrl = this.artist.cover;
    }
    console.log(result);
  },

}
</script>

<style lang="less" scoped>
.ArtViewTop {
  nav {
    width: 100vw;
    position: fixed;
    z-index: 2;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem 0 0.2rem;
    background-color: rgba(56, 56, 56, 0);
    height: 1rem;
    .icon {
      fill: white;
    }

    span {
      color: white;
      margin-left: 0.2rem;
      font-size: 0.4rem;
      line-height: 0.3rem;
    }
  }
  .coverDiv {
    z-index: -2;
    position: relative;

    .cover {
      width: 100vw;
      height: 40vh;
      object-fit: cover;
      border-bottom-left-radius: 50vw 5vw;
      border-bottom-right-radius: 50vw 5vw;
      filter: opacity(1);
      transition: all 0.1s ease-in-out;
    }
  }

  main {
    .card {
      position: relative;

      top: -0.5rem;
      text-align: center;
      .avatar {
        filter: opacity(1);
        position: absolute;
        top: 0;
        left: 50%;
        width: 1.5rem;
        height: 1.5rem;
        transform: translate(-50%, -50%);
        z-index: -2;

        .avatarImg {
          width: 1.5rem;
          height: 1.5rem;
          object-fit: cover;
          border-radius: 0.75rem;
          border: 2px solid white;
        }
      }
      .infocard {
        width: 7rem;
        height: 3rem;
        background-color: rgba(60, 60, 60, 0.8);
        margin: auto;
        border-radius: 0.4rem;

        .name {
          padding-top: 0.8rem;
          font-size: 0.5rems;
          color: white;
        }

        .info {
          width: 5rem;
          margin: 0.2rem auto 0.2rem auto;
          display: flex;
          color: grey;
          align-items: center;
          justify-content: space-between;
          font-size: 0.3rem;
          .number {
            color: white;
            &::after {
              content: ' ';
            }
          }
          .vertical {
            line-height: 0.25rem;
            font-size: 0.25rem;
            color: rgb(97, 97, 97);
          }
        }

        .description {
          color: grey;
          font-size: 0.3rem;
        }
      }
    }
  }
}
</style>