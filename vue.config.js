module.exports = {
  publicPath: './',
  pages: {
    index: {
      entry: "src/main.js",
      title: "Imusic"
    }
  },

  devServer: {
    port: 8080, 
    hot: true,
    proxy: {
      '/api': {
        target: 'https://music.163.com',
        changeOrigin: true
        // pathRewrite: {"^/api" : ""},
        // logLevel: 'debug'
      },
      '/node': {
        target: 'http://1.117.234.25:3000',
        changeOrigin: true,
        pathRewrite: {
          "^/node": ''
        }
      } 
    }
  },
}