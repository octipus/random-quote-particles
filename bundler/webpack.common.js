const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
    entry: path.resolve(__dirname, '../src/script.js'),
    output:
    {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    plugins:
    [
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, '../static') }
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true
        }),
        new WorkboxPlugin.GenerateSW({
           // these options encourage the ServiceWorkers to get in there fast
           // and not allow any straggling "old" SWs to hang around
           clientsClaim: true,
           skipWaiting: true,
         }),
         new WebpackPwaManifest({
          name: 'Random pArticles Generator',
          short_name: 'Particles',
          description: 'Random motivational quotes with particles background',
          background_color: '#202124',
          crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
          display: "fullscreen",
          icons: [
            {
              src: path.resolve('static/icons/maskable_icon_x512.png'),
              type: "image/png",
              sizes: "512x512",
              purpose: "maskable"
            },
            {
              src: path.resolve('static/icons/maskable_icon_x512.png'),
              type: "image/png",
              sizes: "512x512",
              purpose: "any"
            }
          ]
        }),
        new MiniCSSExtractPlugin()
    ],
    module:
    {
        rules:
        [
            // HTML
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },

            // CSS
            {
                test: /\.css$/,
                use:
                [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },

            // Images
            {
                test: /\.(jpg|png|gif|svg)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/images/'
                        }
                    }
                ]
            },

            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use:
                [
                    {
                        loader: 'file-loader',
                        options:
                        {
                            outputPath: 'assets/fonts/'
                        }
                    }
                ]
            }
        ]
    }
}
