module.exports = {
  entry: './index.js',
  output: {
    library: 'react-translations',
    libraryTarget: 'commonjs2',
    filename: 'built.js',
  },
  externals: {
    react: 'react',
    jed: 'jed',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
    ],
  },
}
