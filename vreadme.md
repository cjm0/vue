
<script type="text/javascript">

一：webpack 使用教程
    1.初始化 
        npm set init-author-name 'chenjianmin'
        npm set init-author-email '129300400@qq.com'
        npm init


    2.下载的包 
        webpack 
        webpack-cli
        webpack-merge
        webpack-dev-server 

        vue-template-compiler
        vue-loader
        autoprefixer
        vue-style-loader
        css-loader 
        url-loader // file-loader的一个再封装
        file-loader

        postcss-import
        postcss-loader
        postcss-url

        pug 
        pug-plain-loader
        less 
        less-loader 

        vue 
        vue-router
        axios 
        
        clean-webpack-plugin
        html-webpack-plugin
        mini-css-extract-plugin // css提取
        
        babel-core 
        babel-loader 
        babel-polyfill ?
        babel-plugin-transform-runtime
        babel-preset-stage-2
        babel-preset-env
        
        babel-eslint
        eslint
        eslint-plugin-vue
        eslint-loader
        eslint-friendly-formatter
        eslint-config-standard
        eslint-plugin-standard 
        eslint-plugin-promise 
        eslint-plugin-import
        eslint-plugin-node

        mini-css-extract-plugin // 提取css
        optimize-css-assets-webpack-plugin // 压缩提取css
        new webpack.NoEmitOnErrorsPlugin(), // webpack编译出错跳过报错阶段，在编译结束后报错
        friendly-errors-webpack-plugin
        new FriendlyErrorsPlugin({ // webapck启动时在终端显示信息
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${config.dev.host}:${config.dev.port}`],
            }
        })


        babel-register  nodejs支持es6
        cross-env // 解决环境设置差异的包

        yarn init
        yarn add 
        yarn remove 
        yarn upgrade 
        yarn 

        下载包
            yarn add axios fastclick vue vue-router -S
            yarn add eslint@4.x babel-eslint@8 @babel/core @babel/preset-env autoprefixer eslint-plugin-vue babel-loader clean-webpack-plugin css-loader cssnano eslint-config-standard eslint-friendly-formatter eslint-loader -D
            yarn add eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard file-loader friendly-errors-webpack-plugin postcss-import postcss-loader postcss-url copy-webpack-plugin style-loader -D
            yarn add happypack html-webpack-plugin less less-loader mini-css-extract-plugin optimize-css-assets-webpack-plugin pug pug-plain-loader url-loader vue-loader vue-style-loader vue-template-compiler webpack webpack-cli webpack-dev-server webpack-merge -D

        

    4.npm scripts 启动命令
        "start": "webpack --config config/webpack.dll.js",
        "dev": "webpack-dev-server --progress --config config/webpack.dev.js",
        "build": "webpack --progress --config config/webpack.prod.js"



    5.npm命令
        https://segmentfault.com/p/1210000009653830/read

        跳过提问阶段
        npm init -y 
        
        设置默认
        npm set init-author-name 'Your name'
        npm set init-author-email 'Your email'
        npm set init-author-url 'http://yourdomain.com'
        npm set init-license 'MIT'

        查看模块信息
        npm info underscore
        npm info underscore description
        
        搜索npm仓库
        npm search vue
        
        列出当前项目安装的所有模块，以及它们依赖的模块
        npm list
        npm list -g 
        npm list webpack

        npm install 会先检查，node_modules 目录之中是否已经存在指定模块。如果存在，即使远程仓库已经有了一个新版本，也不再重新安装了，可以使用 -f 或 --force 参数 强制重新安装包
        npm i vue 
        npm i vue -f
        
        安装不同版本
        npm i sax@latest
        npm i sax@0.1.1
        npm i sax@">=0.1.0 <0.2.0"

        先运行 npm run build-js ，然后再运行 npm run build-css ，两个命令中间用 && 连接。如果希望两个命令同时平行执行，它们中间可以用 & 连接
        npm run build-js && npm run build-css






二：插件安装
    1..babelc文件
        编译转译es6语法

        babel-preset-env
        https://www.zcfy.cc/article/babel-preset-env-a-preset-that-configures-babel-for-you
        https://zhuanlan.zhihu.com/p/29506685
        https://github.com/babel/babel-preset-env

        /*
            "modules": false,
            禁止将ES6模块语法转换为另一种模块类型

            "useBuiltIns": "entry",
            很多人习惯于在 vendor 中一次性引入 babel-polyfill，在过去这将导致整个 babel-polyfill 包被打包到 vendor 中，在方便开发的同时失去了灵活性，而现在你可以将 useBuiltIns 设置为 entry，Babel 会自动进行优化

            > 1%  last 2 versions  not ie <= 8
            支持市场份额超过1%的 最近两个版本的 大于IE8的浏览器

            "stage-2" 0 1 2 3  
            使用这个转码规则 0包含后面的0、1、2、3， 2包含2、3

            transform-vue-jsx 
            支持jsx语法

            transform-runtime
            https://segmentfault.com/a/1190000009065987

            useBuiltIns 和 transform-runtime
            babel-preset-env@1.x 没法很好地消除未使用的polyfill（就是说有未使用的代码被引入进来了）。如果希望避免这一点，那么就会禁用useBuiltIns: true，而用更好的 transform-runtime 代替。
        */
        {
          "presets": [
            ["env", {
              "modules": false,
              "useBuiltIns": "entry",
              "targets": {
                "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
              }
            }],
            "stage-2"
          ],
          "plugins": ["transform-vue-jsx", "transform-runtime"],
        }


        browserslist 解释
            https://github.com/browserslist/browserslist

        输出支持的浏览器
            npx browserslist


        browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
        browsers: ['> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead'] // default

        Chrome for Android: 69
        Firefox for Android: 62
        And_qq: 1.2
        UC for Android: 11.8
        Android: 67, 4.4.3-4.4.4
        Baidu: 7.12
        Chrome: 70, 69, 68, 67, 63, 49
        Edge: 17, 16
        Firefox: 62, 61, 60
        IE: 11
        IE Mobile: 11
        iOS: 12, 11.3-11.4, 11.0-11.2
        Opera Mini: all
        Opera Mobile: 46
        Opera: 56, 55
        Safari: 12, 11.1
        Samsung: 7.2, 6.2, 4




    2..editorconfig文件
        不同的编辑器和IDE之间定义和维护一致的代码风格

        https://blog.csdn.net/qq_20282263/article/details/79186640
        https://blog.csdn.net/cengjingcanghai123/article/details/43953307



    3..gitignore文件
        https://www.cnblogs.com/kevingrace/p/5690241.html

        以斜杠“/”开头表示目录；
        以星号“*”通配多个字符；
        以问号“?”通配单个字符
        以方括号“[]”包含单个字符的匹配列表；
        以叹号“!”表示不忽略(跟踪)匹配到的文件或目录；

        /mtk/               过滤整个文件夹
        *.zip                过滤所有.zip文件
        /mtk/do.c         过滤某个具体文件

        Git会将满足这类规则的文件添加到版本管理中
        !*.zip
        !/mtk/one.textTransform = 'capitalize'



    4..eslintignore文件
        同gitignore文件



    5.eslintre.js文件
        eslint规则文件
        https://www.cnblogs.com/ye-hcj/p/7069505.html
        https://eslint.org/docs/user-guide/configuring
        https://blog.csdn.net/weixin_41559723/article/details/79129612



    6.mode 
        common
        //parent chunk中解决了的chunk会被删除
        optimization.removeAvailableModules:true
        //删除空的chunks
        optimization.removeEmptyChunks:true
        //合并重复的chunk
        optimization.mergeDuplicateChunks:true

        --mode development 开发环境
            使用 eval 构建 module, 提升增量构建速度
            不需要定义 new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }) 默认 development
            默认开启 NamedModulesPlugin -> optimization.namedModules 使用模块热替换(HMR)时会显示模块的相对路径

            //调试
            devtool:eval
            //缓存模块, 避免在未更改时重建它们。
            cache:true
            //缓存已解决的依赖项, 避免重新解析它们。
            module.unsafeCache:true
            //在 bundle 中引入「所包含模块信息」的相关注释
            output.pathinfo:true
            //在可能的情况下确定每个模块的导出,被用于其他优化或代码生成。
            optimization.providedExports:true
            //找到chunk中共享的模块,取出来生成单独的chunk
            optimization.splitChunks:true
            //为 webpack 运行时代码创建单独的chunk
            optimization.runtimeChunk:true
            //编译错误时不写入到输出
            optimization.noEmitOnErrors:true
            //给模块有意义的名称代替ids
            optimization.namedModules:true
            //给模chunk有意义的名称代替ids
            optimization.namedChunks:true

        --mode production 生产环境
            提供 uglifyjs-webpack-plugin 代码压缩
            不需要定义 new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }) 默认 production
            默认开启 NoEmitOnErrorsPlugin -> optimization.noEmitOnErrors, 编译出错时跳过输出，以确保输出资源不包含错误
            默认开启 ModuleConcatenationPlugin -> optimization.concatenateModules, webpack3 添加的作用域提升(Scope Hoisting)
            //性能相关配置
            performance:{hints:"error"....}
            //某些chunk的子chunk已一种方式被确定和标记,这些子chunks在加载更大的块时不必加载
            optimization.flagIncludedChunks:true
            //给经常使用的ids更短的值
            optimization.occurrenceOrder:true
            //确定每个模块下被使用的导出
            optimization.usedExports:true
            //识别package.json or rules sideEffects 标志
            optimization.sideEffects:true
            //尝试查找模块图中可以安全连接到单个模块中的段。- -
            optimization.concatenateModules:true
            //使用uglify-js压缩代码
            optimization.minimize:true



    7.配置
        optimization: { // 提取公共部分
            splitChunks: {
                chunks: 'all'
            },
            runtimeChunk: {
                name: 'manifest'
            }
        }

        webpack默认会按以下规则进行拆分提取：
            新模块多处引用或者是来自node_modules的包
            新模块的大小（压缩前）超过30KB
            并发请求数低于或等于5
            初始页面加载的并发请求数低于或等于3
            





三：webpack优化 
    配置文件 loader加载器加 include: resolve('src')

    js 加 cacheDirectory: true && HappyPack
    const HappyPack = require('happypack')
    const os = require('os')
    const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
    babel-loader 开启 cacheDirectory: true 

    cache-loader 一般不用，除非针对开销特别大的loader单独使用

    css 用contenthash

    browserslist 配置
        https://github.com/browserslist/browserslist







四：babel
    babel http://www.ruanyifeng.com/blog/2016/01/babel.html
    stage http://www.cnblogs.com/chris-oil/p/5717544.html

    ES2015转码规则
        npm install babel-preset-es2015 -S

    react转码规则
        npm install babel-preset-react -S

    # ES7不同阶段语法提案的转码规则（共有4个阶段），选装一个
        npm install babel-preset-stage-0 -S
        npm install babel-preset-stage-1 -S
        npm install babel-preset-stage-2 -S
        npm install babel-preset-stage-3 -S
        然后，将这些规则加入.babelrc。

        {
            "presets": [
                "es2015",
                "react",
                "stage-2"  stage-0 包含1 2 3
            ],
            "plugins": ["transform-runtime"]
        }

    Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，
    比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，
    以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
    如果想让这个方法运行，必须使用babel-polyfill，为当前环境提供一个垫片。
    npm install babel-polyfill -S
    然后，在脚本头部，加入如下一行代码。
    import 'babel-polyfill';
    // 或者
    require('babel-polyfill');


    与 babel-polyfill 一样，babel-runtime 的作用也是模拟 ES2015 环境。
    只不过，babel-polyfill 是针对全局环境的，
    babel-runtime 更像是分散的 polyfill 模块，我们可以在自己的模块里单独引入，
    比如 require(‘babel-runtime/core-js/promise’) ，它们不会在全局环境添加未实现的方法，
    只是，这样手动引用每个 polyfill 会非常低效。我们借助 Runtime transform 插件来自动化处理这一切。

    至于要用 babel-polyfill 还是 babel-runtime，则需要根据具体需求。
    举个例子，如果一个库里引用了 babel-polyfill，别人的库也引用了 babel-polyfill，
    我们很可能会跑两个 babel-polyfill 实例，这里，使用 babel-runtime 会更合适。


    babel-loader
    test: /\.js/,
    loader: 'babel?presets[]=es2015,presets[]=react,plugins[]=transform-runtime'

    babel-register
    require('babel-register')({presets: ['es2015', 'react']})
    require('./app')
    这样我们在 app 文件中就可以使用 es2015 与 jsx 语法了

    es6 -> 2015
    es7 -> 2016
    es8 -> 2017
    es9 -> 2018 

    stage0 stage1 stage2 stage3 stage4 







五：babel7 升级
    webpack 4.x | babel-loader 8.x | babel 7.x
        cnpm i babel-loader @babel/core @babel/preset-env -D

    webpack 4.x | babel-loader 7.x | babel 6.x
        cnpm i babel-loader@7 babel-core babel-preset-env -D

    https://segmentfault.com/a/1190000015247255
    {
      "presets": [
        ["@babel/preset-env", {
          "modules": false,
          "targets": {
            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
          },
          "useBuiltIns": "usage"
        }]
      ],
      "plugins": ["transform-vue-jsx"]
    }

    {
      "presets": [
        ["@babel/preset-env", {
          "modules": false,
          "targets": {
            "browsers": ["chrome 65"]
          }
        }]
      ],
      "plugins": ["transform-vue-jsx", ["@babel/plugin-transform-runtime", {
          "useBuiltIns": true
          // "polyfill": false
        }]
      ]
    }
        




</script>
