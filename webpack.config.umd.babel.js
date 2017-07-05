const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        'react-image-lightbox': './src/index',
    },
    output: {
        path: path.join(__dirname, 'dist', 'umd'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'ReactImageLightboxRotate',
    },
    resolve: {
        extensions: ['.js']
    },
    devtool: 'source-map',
    plugins: [
        new webpack.EnvironmentPlugin([
            "NODE_ENV",
        ]),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: false,
            beautify: true,
            comments: true,
        }),
    ],
    externals: {
        react: 'react',
        'react-dom': 'react-dom',
        'react-modal': 'react-modal',
    },
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
                loaders: [
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
                include: path.join(__dirname, 'src')
            },
        ]
    }
};