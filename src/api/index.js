import axios from 'axios';

let corsUrl = 'http://localhost:8080/api';
let baseUrl = 'http://localhost:8080/node'
//获取轮播图的api,  type
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

export function searchMusic(keyword, offset) {
  if (offset === undefined) {
    return axios.get(`${baseUrl}/search?keywords=${keyword}`);
  } else {
    return axios.get(`${baseUrl}/search?keywords=${keyword}&offset=${offset}`);
  }
}

export function phoneLogin(phone, password) {
  return axios.get(`${baseUrl}/login/cellphone?phone=${phone}&password=${password}`);
}

export function getUserDetail(userId) {
  return axios.get(`${baseUrl}/user/detail?uid=${userId}`);
}

export function getLikelist(userId) {
  return axios.get(`${baseUrl}/likelist?uid=${userId}`)
}

export function getMusicDetail(musicIds) {
  return axios.get(`${baseUrl}/song/detail?ids=${musicIds}`)
}

export function getArtistDetail(artistId) {
  return axios.get(`${corsUrl}/artist/head/info/get?id=${artistId}`)
}

export function getTopArtists() {
  return axios.get(`${baseUrl}/top/artists?limit=6`)
}

export function getArtistSongTop(artistId) {
  return axios.get(`${corsUrl}/artist/top/song?id=${artistId}`);
}

export function getPlaylistHot() {
  return axios.get(`${baseUrl}/playlist/hot`);
}

export function getTopPlaylist({tag, offset, limit}) {
  return axios.get(`${baseUrl}/top/playlist?limit=${limit}&offset=${offset}&cat=${tag}`)
}

export function getArtistList({ area, limit, offset}) {
  return axios.get(`${baseUrl}/artist/list?limit=${limit}&offset=${offset}&area=${area}`)
}

export function getSearchHot() {
  return axios.get(`${baseUrl}/search/hot/detail`)
}
