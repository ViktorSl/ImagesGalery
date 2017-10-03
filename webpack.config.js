module.exports = {
  entry: ["babel-polyfill", "./app/assets/scripts/App.js"],
  output: {
    path: "./app/temp/scripts",
    filename: "App.js"
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        query: {
          presets: ['es2015', 'es2017', "stage-3"]
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}