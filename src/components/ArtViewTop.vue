<template>
  <div class="ArtViewTop">
    <div class="coverDiv">
      <img @load="imgLoaded($event)"
           class="cover"
           :src="artist.cover">
    </div>
    <nav>
      <div class="back"
           @click="$router.back()">
        <icon style="fill: white"
              iconName='icon-fanhuizuojiantou'></icon>
      </div>
      <div>
        <icon style="fill: white"
              iconName='icon-liebiao'></icon>
      </div>
    </nav>
    <main>
      <section class="card">
        <div class="avatar">
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
      user: {}
    }
  },

  methods: {
    imgLoaded (event) {
      let img = event.currentTarget.parentElement;
      img.style.zIndex = 'auto';
      console.log(img);
    },
    imgError () {
      console.log('Error');
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
  }
}
</script>

<style lang="less" scoped>
.ArtViewTop {
  nav {
    width: 100vw;
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 0.2rem 0 0.2rem;
    .icon {
      fill: white;
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
    }
  }

  main {
    .card {
      position: relative;

      top: -0.5rem;
      text-align: center;
      .avatar {
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