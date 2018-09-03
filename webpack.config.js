module.exports = {
  entry: './index.js',
  mode: 'production',
  output: {
    library: 'react-translations',
    libraryTarget: 'commonjs2',
    filename: 'built.js',
  },
  externals: {
    react: 'react',
    jed: 'jed',
    'prop-types': 'PropTypes',
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
