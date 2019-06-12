import Vue from 'vue'
import App from './App'
import Antd from 'ant-design-vue'
import ElementUI from 'element-ui'
import BootstrapVue from 'bootstrap-vue'

import 'ant-design-vue/dist/antd.css'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
// 引入bootstrapvue
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// 阿里图标库
import '../static/css/icon.css'
// 引入flex
import 'lib-flexible'
// 引入mint-ui
import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker);
import animate from 'animate.css'


Vue.use(Antd) // antUI
Vue.use(ElementUI) // elementUI
Vue.use(BootstrapVue) //bootstrapvue

new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})

// 遍历router.js然后每个文件对应title
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.matched.length === 0) {
        // 跳转路由错误时经此跳转
        next('/pxx/error');
    } 
    next()
})
