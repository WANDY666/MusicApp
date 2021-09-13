import axios from 'axios';

let baseUrl = 'http://localhost:3000';
//获取轮播图的api, type
// type:资源类型,对应以下类型,默认为 0 即PC
// 0: pc
// 1: android
// 2: iphone
// 3: ipad

export function getBanner(type) {
  return axios.get(`${baseUrl}/banner?type=` + type.toString());
}

// 获取推荐歌单，默认10个

export function getMusicList(limit = 10) {
  return axios.get(`${baseUrl}/personalized?limit=${limit}`)
}

export function getPlaylistDetail(id) {
  return axios.get(`${baseUrl}/playlist/detail?id=${id}`)
}

export function getLyric(id) {
  return axios.get(`${baseUrl}/lyric?id=${id}`)
}