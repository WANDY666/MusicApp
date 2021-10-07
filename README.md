# musicapp

### Description

仿网易云音乐 webapp，vue 练习项目，未使用 UI 组件，轮播图、滑动页面等均为 js、css 手写。

### Technology stack

vue3 + vue-cli4 + vue-router +vuex

### Show（Chrome iPhone 6/7/8)

<img src="https://s3.bmp.ovh/imgs/2021/10/4922131753897c21.gif" alt='错误' width='300' />

<img src="https://s3.bmp.ovh/imgs/2021/10/e9f22ec9572ee1c9.gif" alt='错误' width='300' />

<img src="https://s3.bmp.ovh/imgs/2021/10/d4e6f330b71a6916.gif" alt='错误' width='300' />

<img src="https://s3.bmp.ovh/imgs/2021/10/5258e2718d5ea040.gif" alt='错误' width='300' />

<img src="https://s3.bmp.ovh/imgs/2021/10/193d7695bd14cd16.gif" alt='错误' width='300' />

<img src="https://s3.bmp.ovh/imgs/2021/10/64d6f183f29ee2d4.gif" alt='错误' width='300' />

<img src="https://s3.bmp.ovh/imgs/2021/10/2eb9e6a31735ac79.gif" alt='错误' width='300' />

### Existing problems（Todos）

- 很多按钮需要赋予动态，处于未开发状态
- 搜索出的歌曲点击后，虽然能播放，但是专辑和封面未获取到
- 点击歌单中的某一首歌会将所有歌曲放入播放列表，但是由于歌单中的歌曲不会一次全都加载出来，这时如果点击，则只会放入已加载歌曲
- 加一个歌曲播放条方便调控
- 点击播放列表时不能第一眼找到正在播放的歌曲
- ...

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Thanks

后端采用[网易云音乐 NodeJS 版](https://neteasecloudmusicapi.vercel.app/#/), 非常感谢。

### Note

- 实现为 WebApp，如在电脑端打开，需要在 DevTools 中调整为手机模式。需要在本地启动[网易云音乐 NodeJS 版](https://neteasecloudmusicapi.vercel.app/#/)才可正常运行。
