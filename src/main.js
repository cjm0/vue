import Vue from 'vue'
import axios from 'axios'
import App from './App.vue'
import router from './router'

import './assets/common.js'
import components from './components'


// 移动端修复点击延迟
import FastClick from 'fastclick' 
if ('addEventListener' in document) {
    document.addEventListener('load', function() {
        FastClick.attach(document.body);
    }, false);
}



// 全局引入组件
Object.keys(components).forEach(key => Vue.component(key, components[key]))




// 定义全局公用ajax
Object.defineProperty(Vue.prototype, 'axios', {value: axios})
axios.defaults.withCredentials = true // 是否携带cookie信息

axios.interceptors.request.use(res => { // 添加请求拦截器
    return res;
}, err => {
    return Promise.reject(err);
})
axios.interceptors.response.use(res => { // 添加响应拦截器 
    return res.data
}, err => {
    Promise.reject(err)
})
axios.defaults.transformRequest = [function (data) { // 用于请求之前对请求数据进行操作
    var ret = []
    for (var it in data) {
        ret.push(encodeURIComponent(it) + '=' + encodeURIComponent(data[it]))
    }
    return ret.join('&')
}]




// 路由跳转前拦截
router.beforeEach((to, from, next) => {
    next()
    window.scrollTo(0, 0)
})


// 兼容ie支持promise
// window.Promise = Promise

// 关闭提示
Vue.config.productionTip = false

// new 创建对象实例后需要赋值给变量
const vue = new Vue({ 
    el: '#app',
    router,
    render: h => h(App) // App 组件并不是根组件
})
Vue.use({
    vue
})
