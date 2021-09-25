<template>
  <div class="login">
    <div class="back"
         @click="$router.back()">
      <icon class=".icon"
            iconName='icon-fanhuizuojiantou'></icon>
      <div class="note">出于安全考虑，不提供登录服务</div>
    </div>

    <img class="logo"
         src="@/assets/image/logo.png"
         alt="">
    <div class="login-contain">
      <div class="form-group">
        <div class="form-item">
          <label for="username">
            <img src="@/assets/image/user.png">
          </label>
          <input id="username"
                 type="text"
                 placeholder="请输入账号"
                 v-model="phone">
        </div>
        <div class="form-item">
          <label for="password">
            <img src="@/assets/image/password.png"
                 alt="">
          </label>
          <input id="password"
                 type="password"
                 placeholder="请输入密码"
                 v-model="password">
        </div>
      </div>
      <div class="button-group">
        <button class="login-btn"
                id="doLogin"
                @click="login">登录</button>
      </div>

      <div class="order-login">
        <p class="order-login-line">其他登录方式</p>
        <div class="order-login-box">
          <div>
            <a href="#">
              <img src="@/assets/image/wechat-login.png"
                   alt=""
                   style="width: 45px;height: 45px;">
              <p>微信登录</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  data () {
    return {
      phone: '',
      password: ''
    }
  },
  components: {
    Icon
  },
  methods: {
    async login () {
      let result = await this.$store.dispatch('login', {
        phone: this.phone,
        password: this.password
      });
      if (result.data.code === 200) {
        this.$router.push('User');
      }
      this.phone = '';
      this.password = '';
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-color: #dc2c1f;
  position: relative;
  z-index: 100;

  .back {
    position: absolute;
    width: 7rem;
    left: 0.3rem;
    top: 0.3rem;
    display: flex;
    align-items: center;

    .icon {
      width: 0.5rem;
      height: 0.5rem;
      fill: white;
    }

    .note {
      color: white;
      font-size: 0.4rem;
      margin-left: 0.3rem;
    }
  }

  .logo {
    width: 25%;
    position: absolute;
    left: 50%;
    top: 18%;
    transform: translate(-50%, 0);
  }

  a,
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: black;
  }
  .login-contain {
    width: 85%;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, 0);

    .form-group {
      padding: 5%;
      .form-item {
        margin-top: 5%;
        padding: 0 10px;
        border-radius: 20px;
        background-color: #f8655a;
        input {
          outline: none;
          border: 0;
          background-color: transparent;
          &::-webkit-input-placeholder {
            color: white;
          }
          color: white;
          height: 40px;
          font-size: 18px;
          width: 55%;
          margin-left: 12%;
        }

        img {
          width: 25px;
          position: absolute;
          margin-top: 5px;
        }

        button {
          outline: none;
          background: transparent;
          border: 1px #00cc99 dashed;
          color: #ffffff;
          height: 30px;
          border-radius: 5px;
          float: right;
          padding: 1%;
        }
      }
    }
  }

  .button-group {
    padding: 5%;
    button {
      outline: none;
      border: 0;
      width: 90%;
      height: 35px;
      margin-top: 4%;
      border-radius: 20px;
      margin-left: 4%;
      color: #ffffff;
      font-size: 18px;
    }
    .login-btn {
      background-color: #ffffff;
      color: #f8655a;
    }
  }

  .order-login {
    padding: 5%;
    .order-login-line {
      display: block;
      position: relative;
      text-align: center;
      font-size: 14px;
      color: #ffffff;

      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        background: #ffffff;
        width: 20%;
        height: 1px;
      }

      &::before {
        left: 10%;
      }

      &::after {
        right: 10%;
      }
    }

    .order-login-box {
      display: flex;
      width: 100%;
      justify-content: center;
      margin-top: 20px;

      div {
        flex: 1;
        text-align: center;

        p {
          text-align: center;
          font-size: 14px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>