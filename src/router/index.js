import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/pxx/error',
            name: 'error',
            component: resolve => require(['../components/error/index.vue'], resolve),
            meta: {
                title: '拼夕夕二手车行-错误页面'
            }
        },
        {
            path: '/pxx/signin',
            name: 'signin',
            component: resolve => require(['@/components/public/signin/index.vue'], resolve),
            meta: {
                title: '拼夕夕二手车行-用户登录'
            }
        },
        {
            path: '/pxx/reg',
            name: 'reg',
            component: resolve => require(['@/components/public/register/index.vue'], resolve),
            meta: {
                title: '拼夕夕二手车行-用户注册'
            }
        },
        {
            path: '/pxx/app',
            name: 'app',
            component: resolve => require(['@/components/app'], resolve),
            children: [{
                    path: '/pxx/app/index',
                    name: 'index',
                    component: resolve => require(['@/components/app/main/index.vue'], resolve),
                    meta: {
                        title: '拼夕夕二手车行'
                    }
                },
                {
                    path: '/pxx/app/personal',
                    name: 'personal',
                    component: resolve => require(['@/components/app/personal/index.vue'], resolve),
                    meta: {
                        title: '拼夕夕二手车行-个人主页'
                    },
                    children: [{
                            path: '/pxx/app/personal/persondata/basic',
                            name: 'persondata',
                            component: resolve => require(['@/components/app/personal/persondata/basic/index.vue'], resolve),
                            meta: {
                                title: '拼夕夕二手车行-个人资料'
                            },
                        },
                        {
                            path: '/pxx/app/personal/order/myorder',
                            name: 'order',
                            component: resolve => require(['@/components/app/personal/personorder/myorder/index.vue'], resolve),
                            meta: {
                                title: '拼夕夕二手车行-个人订单'
                            },
                        },
                        {
                            path: '/pxx/app/personal/mycar',
                            name: 'mycar',
                            component: resolve => require(['@/components/app/personal/personcar'], resolve),
                            meta: {
                                title: '拼夕夕二手车行-我的车辆'
                            },
                            children: [{
                                path: '/pxx/app/personal/mycar/mycars',
                                name: 'mycars',
                                component: resolve => require(['@/components/app/personal/personcar/mycar/index.vue'], resolve),
                            }]
                        },
                        {
                            path: '/pxx/app/personal/orderback',
                            name: 'orderback',
                            component: resolve => require(['@/components/app/personal/personorder/myorder/orderback.vue'], resolve),
                        },
                        {
                            path: '/pxx/app/personal/setup/changepwd',
                            name: 'setup',
                            component: resolve => require(['@/components/app/personal/basicsetup/changepassword/index.vue'], resolve),
                            meta: {
                                title: '拼夕夕二手车行-基本设置'
                            },
                        },
                        {
                            path: '/pxx/app/personal',
                            redirect: '/pxx/app/personal/persondata/basic'
                        },
                    ]
                },
                {
                    path: '/pxx/app/sell',
                    name: 'sell',
                    component: resolve => require(['@/components/app/sell/index.vue'], resolve),
                    meta: {
                        title: '拼夕夕二手车行-用户卖车'
                    }
                },
                {
                    path: '/pxx/app/buy',
                    name: 'buy',
                    component: resolve => require(['@/components/app/buy/index.vue'], resolve),
                    meta: {
                        title: '拼夕夕二手车行-用户买车'
                    }
                }, ,
                {
                    path: '/pxx/app/carinfo/:carId',
                    name: 'carinfo',
                    component: resolve => require(['@/components/app/buy/carInfo.vue'], resolve),
                    meta: {
                        title: '拼夕夕二手车行-汽车详情'
                    }
                },
                {
                    path: '/pxx/app/orderinfo/:orderId',
                    name: 'orderinfo',
                    component: resolve => require(['@/components/app/main/orderInfo.vue'], resolve),
                    meta: {
                        title: '拼夕夕二手车行-订单详情'
                    }
                },
                {
                    path: '/pxx/app',
                    redirect: '/pxx/app/index'
                }
            ]
        },
        {
            path: '/',
            redirect: '/pxx/app'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    },
    history: true
})

export default router;