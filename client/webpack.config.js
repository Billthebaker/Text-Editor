const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    // Set the mode to development
    mode: 'development',

    // Specify the entry points for the app
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },

    // Specify the output directory and filename for the bundled files
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    // Set up the plugins for the app
    plugins: [
      // Generates HTML files for the app, injecting the corresponding JavaScript chunks
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),
      // Generates HTML files for the install page, injecting the corresponding JavaScript chunks
      new HtmlWebpackPlugin({
        template: './src/install.html',
        filename: 'install.html',
        chunks: ['install'],
      }),
      // Generates the Web App Manifest file, which provides metadata for the app and defines how the app should behave when installed as a PWA
      new WebpackPwaManifest({
        name: 'My Progressive Web App',
        short_name: 'MyPWA',
        description: 'This is my Progressive Web App!',
        background_color: '#ffffff',
        theme_color: '#2196f3',
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      // Injects a service worker script into the Webpack build
      new InjectManifest({
        swSrc: './src/js/sw.js',
        swDest: 'sw.js',
      }),
    ],

    // Set up the module rules for the app
    module: {
      rules: [
        // Transpile CSS files using css-loader and style-loader
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // Transpile JavaScript files using Babel
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
  };
};