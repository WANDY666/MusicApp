# musicapp

## Description

仿网易云音乐 webapp，vue 练习项目。

## Technology stack

vue3 + vue-cli4 + vue-router +vuex

## Existing problems（Todos）

- 很多按钮需要赋予动态，处于未开发状态
- 搜索出的歌曲点击后，虽然能播放，但是专辑和封面未获取到
- 点击歌单中的某一首歌会将所有歌曲放入播放列表，但是由于歌单中的歌曲不会一次全都加载出来，这时如果点击，则只会放入已加载歌曲
- 加一个歌曲播放条方便调控
- 点击播放列表时不能第一眼找到正在播放的歌曲
- ...

## Project setup

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
