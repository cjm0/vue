
const os = require('os')
const getIp = () => { // 获取本地ip
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

module.exports = {
    base: {
        rootPath: '/',
        fileName: 'dist',
        filePath: 'dist/static',
    },
    dev: {
        useEslint: true,
        host: getIp(),
        port: 3006,
        proxy: {
            '/': {
                target: 'https://bm.jindanlicai.com/',
                changeOrigin: true, // 将主机头的源更改为目标URL
                cookieDomainRewrite: { // 重写set-cookie标头的域
                    "*": getIp()
                },
                bypass: function(req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    }
                }
            },
            '/v2': {
                //target: 'https://bm.jindanlicai.com/',
                target: 'http://xwm.jindanlicai.com:8436/',
                changeOrigin: true,
                cookieDomainRewrite: {
                    "*": getIp()
                }
            },
            '/wap': {
                //target: 'https://bm.jindanlicai.com/',
                target: 'http://xwm.jindanlicai.com:8436/',
                changeOrigin: true,
                cookieDomainRewrite: {
                    "*": getIp()
                }
            },
            '/xw': {
                //target: 'https://bm.jindanlicai.com/',
                target: 'http://xwm.jindanlicai.com:8436/',
                changeOrigin: true,
                cookieDomainRewrite: {
                    "*": getIp()
                }
            },
        }
    }
}
