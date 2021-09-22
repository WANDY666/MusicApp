<template>
  <div class="user">
    <nav>
      <icon @click="$router.back()"
            class="back"
            iconName="icon-fanhuizuojiantou"></icon>
      <icon class="option"
            iconName="icon-liebiao1"></icon>
    </nav>
    <div class="info">
      <img class="avatar"
           :src="user.userDetail.profile.avatarUrl"
           alt="">
      <div class="name">
        <span>
          {{user.userDetail.profile.nickname}}
        </span>
        <div class="level">
          lv.{{user.userDetail.level}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getLikelist } from '../api/index.js'
import Icon from '../components/Icon.vue'
export default {
  computed: {
    ...mapState(['user'])
  },

  async mounted () {
    let likelist = await getLikelist(this.user.account.id);
    console.log(likelist)
  },

  components: {
    Icon
  }
}
</script>

<style lang="less" scoped>
.user {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.685);
  display: flow-root;
  margin-top: 0;
  nav {
    display: flex;
    padding: 0.2rem 0.3rem;
    justify-content: space-between;
    .back {
      width: 0.6rem;
      height: 0.6rem;
      fill: white;
    }
    .option {
      width: 0.6rem;
      height: 0.6rem;
      fill: white;
    }
  }

  .info {
    margin-top: 0.2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    .avatar {
      margin-left: 0.3rem;
      margin-right: 0.3rem;
      height: 1.6rem;
      border-radius: 50%;
    }
    .name {
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      span {
        font-size: 0.5rem;
        color: white;
      }

      .level {
        border-radius: 0.2rem;
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.3rem;
        width: 0.9rem;
        text-align: center;
        background-color: gainsboro;
      }
    }
  }
}
</style>