const config = require('./base.conf.js') // 配置文件
const path = require('path') 
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const HappyPack = require('happypack') // 多进程 默认三个
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

// 处理路径
function resolve (dir) { 
    return path.join(__dirname, '..', dir)
}

// eslint检测
const createLintingRule = () => ({ 
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    exclude: /node_modules/,
    include: [resolve('src')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: true
    }
})

// 获取当前环境
const prod = process.env.NODE_ENV === 'production' 

module.exports = {
    context: path.resolve(__dirname, '../'), // 作用于entry 和 loader
    entry: {
        index: './src/main.js',
    },
    output: { 
        path: resolve(`${config.base.filePath}`), // 输出到static这个地址 只能是绝对路径
        filename: 'js/[name].js',
        chunkFilename: 'js/[name]_[chunkhash:6].js'
    },
    resolve: {
        extensions: ['.css', '.less', '.js', '.vue', '.json'], // 使用的扩展名
        alias: {
            // 'vue$': 'vue/dist/vue.esm.js', // 模块别名列表
            '@': resolve('src'),
        }
    },
    module: {
        // 忽略的文件中不应该含有 import, require, define 的调用，或任何其他导入机制，忽略部分插件可以提高构建性能
        noParse: /^(vue|vue-router|vuex|vuex-router-sync|axios)$/,
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: resolve('src')
            },
            {
                test: /\.pug$/,
                loader: 'pug-plain-loader',
                include: resolve('src')
            },
            {
                test: /\.css$/,
                oneOf: [
                    // 这里匹配 `<style module>`
                    {
                        resourceQuery: /module/,
                        use: [
                            {
                                // 只在生产环境下使用 CSS 提取，便于你在开发环境下进行热重载
                                loader: prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                                options: {
                                    publicPath: '../'
                                    /*
                                        复写css文件中资源路径
                                        因为css文件中的外链是相对与css的，
                                        我们抽离的css文件在可能会单独放在css文件夹内
                                        引用其他如img/a.png会寻址错误
                                        这种情况下所以单独需要配置../，复写其中资源的路径
                                    */
                                }, 
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                    modules: true, // 开启 css module
                                    localIdentName: 'v_[hash:6]' // 自定义生成的类名
                                }
                            },
                            'postcss-loader' // 自动加前缀以兼容其他浏览器
                        ]
                    },
                    // 这里匹配普通的 .css 文件 或 <style>
                    {
                        use: [
                            {
                                loader: prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                                options: {
                                    publicPath: '../'
                                }, 
                            },
                            'css-loader',
                            'postcss-loader',
                        ]
                    }
                ]
            },
            {
                test: /\.less$/,
                oneOf: [
                    // 这里匹配 `<style lang="less" module>`
                    {
                        resourceQuery: /module/,
                        use: [
                            {
                                loader: prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                                options: {
                                    publicPath: '../'
                                }, 
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 2,
                                    modules: true, // 开启 css module
                                    localIdentName: 'v_[hash:6]' // 自定义生成的类名
                                }
                            },
                            'postcss-loader',
                            'less-loader'
                        ]
                    },
                    // 这里匹配普通的 .less 文件 或 <style lang="less">
                    {
                        use: [
                            {
                                loader: prod ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                                options: {
                                    publicPath: '../'
                                }, 
                            },
                            'css-loader',
                            'postcss-loader',
                            'less-loader'
                        ]
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'HappyPack/loader?id=js',
                exclude: file => (
                    /node_modules/.test(file) && !/\.vue\.js/.test(file)
                )
            },
            // url-loader 包含 file-loader，先把小于 4kb 的文件转换成 base64，然后交传给 file-loader 去处理路径问题
            {
                test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'img/[name]_[hash:6].[ext]',
                    limit: 4096,
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'fonts/[name]_[hash:6].[ext]',
                    limit: 4096,
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'media/[name]_[hash:6].[ext]',
                    limit: 4096,
                }
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(), // vue-loader新用法
        new HappyPack({ // 提高js编译速度
            id: 'js',
            loaders: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        })
    ],
}


