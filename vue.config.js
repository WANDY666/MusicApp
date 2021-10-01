module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: "src/main.js",
      title: "Imusic"
    }
  },

  devServer: {
    hot: true,
    proxy: {
      '/api': {
        target: 'https://music.163.com',
        changeOrigin: true
        // pathRewrite: {"^/api" : ""},
        // logLevel: 'debug'
      }
    }
  },
}