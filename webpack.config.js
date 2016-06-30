module.exports = {
  entry: "./app/App.js",
  output: {
    filename: "public/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        eclude: /(node_modules|brower_components)/,
        loader: 'babel',
        query:{
          presets:['react', 'es2015']
        }
      }
    ]
  }
}  
