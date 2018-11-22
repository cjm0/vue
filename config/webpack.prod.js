process.env.NODE_ENV = 'production' // 设置当前环境为生产环境 放在最上面
const config = require('./base.conf.js') // 配置文件
const baseWebpackConfig = require('./webpack.base.js')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    mode: 'production', // 启用生产模式配置
    output: {
        publicPath: './static/', // 资源引用路径前后都有斜杠
    },
    stats: {
        // 未定义选项时，stats 选项的备用值(fallback value)（优先级高于 webpack 本地默认值）
        all: undefined,
        modules: false, // 添加构建模块信息
        children: false, // 添加 children 信息
        colors: true, // `webpack --colors` 等同于
    },
    plugins: [
        new CleanWebpackPlugin(
            ['dist/*.html', 'dist/static/js', 'dist/static/css', 'dist/static/img', 'dist/static/fonts', 'dist/static/media'], // 删除匹配的文件
            {
                root: path.resolve(__dirname, '../'), // 重置到根路经
                exclude: ['vendor.dll.js', 'vendor.manifest.json'], // 这几个文件不删除
                verbose: false, // 开启在控制台输出信息
                dry: false, // 启用删除文件
            }
        ),
        new CopyWebpackPlugin( // 这部分不会被 webpack loader 处理
            [ 
                { 
                    from: path.resolve(__dirname, '../src/public/'),
                    to: 'public/',
                },
            ], 
            {
                ignore: ['.DS_Store'],
                copyUnmodified: true, 
                // debug: "debug" // 是否打印复制的详细信息
            }
        ),
        new webpack.DllReferencePlugin({
            manifest: require(`../${config.base.filePath}/js/vendor.manifest.json`),
            context: path.join(__dirname, '..'), // 和dllplugin里面的context一致
        }),
        new MiniCssExtractPlugin({ // 提取css
            filename: 'css/[name]_[contenthash:6].css'
        }),
        new OptimizeCss({ // 压缩提取的css
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true,
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html', // 相对于static的路径
            template: path.resolve(__dirname, '../src/assets/template.html'),
            hash: true, 
            minify: {
                removeAttributeQuotes: true, // 清除属性引号
                collapseWhitespace: true, // 清除多余空格
                minifyJS: true, // 压缩javascript
            },
            vendorJsName: 'vendor.dll.js?' + new Date() * 1, // 给模板引用
            chunksSortMode: "dependency",
        })
    ],
    performance: {
        hints: "warning" // 打包资源超过 250kb 出提示
    }
})
