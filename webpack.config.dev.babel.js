const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: 'source-map',
    entry: {
        demo: path.resolve(__dirname + '/example/app.js'),
    },
    output: {
        path: path.resolve(__dirname + '/build'),
        filename: 'static/[name].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: './example/index.html'
        }),
        new webpack.EnvironmentPlugin([
            "NODE_ENV",
        ]),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer({browsers: ['IE >= 9', '> 1%']}),
                ]
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react',],
                },
            },
            {
                test: /\.scss$/,
                use: [
                    'isomorphic-style-loader?insertAt=top',
                    'css-loader?modules&-autoprefixer&importLoaders=1&localIdentName=[local]___[hash:base64:5]',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [autoprefixer('last 2 versions', 'ie 10')];
                            }
                        }
                    },
                    'sass-loader',
                ],
                include: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'example'),
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'css-loader',
                ],
                include: [
                    path.join(__dirname, 'src'),
                ]
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loaders: [
                    'file-loader?name=static/[name]-[hash:6].[ext]',
                ],
                include: [
                    path.join(__dirname, 'src'),
                    path.join(__dirname, 'example'),
                ],
            },
        ],
    },
    devServer: {
        contentBase: 'build',
        stats: {
            chunks: false,
            hash: false,
            version: false,
            assets: false,
            children: false,
        },
    },
};
