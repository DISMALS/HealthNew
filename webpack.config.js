const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
const uglifyJs = require('uglifyjs-webpack-plugin');

const extractCss = new ExtractTextWebpackPlugin('css/common.css?[contenthash:12]');
const extractScss = new ExtractTextWebpackPlugin('css/main.css?[contenthash:12]');


//判断是开发环境还是生产环境
let npmEvent = process.env.npm_lifecycle_event;
//config file
const devConfig = require('./webpack.dev.js');
const prodConfig = require('./webpack.prod.js');


let config = {
    entry:{
        vendor:path.join(__dirname,'./src/vendor.js'),
        index:path.join(__dirname,'./src/index.js')
    },
    output:{
        publicPath:(npmEvent == 'dev' ? 'http://localhost:9000/' : 'https://test.yunpractice.com/'),
        path:path.resolve(__dirname,'build'),
        filename:(npmEvent == 'dev' ? 'js/[name].js?[hash]' : 'js/[name].js?[chunkhash]'),
        chunkFilename:(npmEvent == 'dev' ? 'js/[name].js?[hash]' : 'js/[name].js?[chunkhash]'),
        libraryTarget:'umd',
        hashDigestLength:12
    },
    module:{
        rules:[
            { //编译解析js文件
                test:/\.js$/,
                exclude:path.join(__dirname,'./node_modules'),
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            presets:['env']
                        }
                    }
                ]
            },
            { //编译css文件
                test:/\.css$/,
                use:['css-hot-loader'].concat(extractCss.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                modules:false,
                                minimize:(npmEvent == 'dev' ? false : true)
                            }
                        },
                        'resolve-url-loader',
                        'postcss-loader'
                    ]
                }))
            },
            { //编译sass文件
                test:/\.scss$/,
                use:['css-hot-loader'].concat(extractScss.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                                minimize: (npmEvent == 'dev' ? false : true)
                            }
                        },
                        'resolve-url-loader',
                        'postcss-loader',
                        'sass-loader'
                    ]
                }))
            },
            { //编译图片
                test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: 'images/[name].[ext]?[hash:12]'
                    }
                }]
            },
            { //编译文件
                test: /\.(mp4|ogg|ico|eot|otf)/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash:12]',
                        outputPath: 'images/file/'
                    }
                }]
            },
            { //解析html文件以及中引用图片的路径
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        ignoreCustomFragments: [/\{\{.*?}}/],
                        attrs: ['img:src', 'link:href', 'script:src'],
                        minimize: (npmEvent == 'dev' ? false : true),
                        removeComments: (npmEvent == 'dev' ? false : true),
                        collapseWhitespace: (npmEvent == 'dev' ? false : true)
                    }
                }]
            },
            { //解析json文件
                test: /\.json$/,
                use: ['json-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            title: '全科Sass平台',
            filename: 'index.html?[hash:12]',
            template: './src/index_tpl.html',
            inject: 'body',
            // hash:true,
            // cache:false,
            minify: {
                removeAttributeQuotes: (npmEvent == 'dev' ? false : true),
                collapseWhitespace: (npmEvent == 'dev' ? false : true),
                removeComments: (npmEvent == 'dev' ? false : true),
                minifyCSS:true,
                minifyJS:true
            },
            chunks: ['vendor','index']
            // chunksSortMode:'manual'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: 5,
            chunks: ['vendor', 'index'] //, 'index'
        }),
        new webpack.BannerPlugin({
            banner: "author:wangyong, hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'moment':'../node_modules/moment/min/moment.min.js',
            '_':'../node_modules/underscore/underscore-min.js'
        }),
        extractCss,
        extractScss
    ],
    resolve:{
        extensions: ['.js', '.scss', '.html', '.css', '.json'],
        modules: ['node_modules', path.join(__dirname, './src')]
    }
};

if(npmEvent == 'dev'){
    config.plugins.push(new webpack.HotModuleReplacementPlugin(), new OpenBrowserWebpackPlugin({ url: 'http://localhost:9000/' }));
}else{
    let pluginArr = [
        new uglifyJs({
            parallel:true,
            uglifyOptions:{
                ie8:true,
                ecma: 8,
                output: {
                    comments: false,
                    beautify: false,
                    preserve_line:true
                },
                warnings: false
            }
        }),
        new webpack.HashedModuleIdsPlugin({
            hashDigestLength: 12
        })
    ];
    config.plugins = config.plugins.concat(pluginArr);
}

module.exports = Object.assign(config,(npmEvent == 'dev' ? devConfig : prodConfig));