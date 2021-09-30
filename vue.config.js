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
      'api/': {
        target: 'https://music.163.com/api',
        changeOrigin: true,
        rewrite: path=> path.replace(/^\/api/, '')
      }
    }
  },
}