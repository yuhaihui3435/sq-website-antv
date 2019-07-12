// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/',
    meta: { title: '首页' },
    children: [
      // 首页
      {
        path: '/',
        name: 'index',
        component: () => import('@/views/dashboard/Workplace'),
        meta: { title: '首页' }
      },
      // 课程
      {
        path: '/sqsy',
        name: 'sqsy',
        component: () => import('@/views/dashboard/Workplace'),
        meta: { title: '深泉书院' }
      },
      //  医生
      {
        path: '/sqzx',
        name: 'sqzx',
        component: () => import('@/views/list/CardList'),
        meta: { title: '深泉咨询' }
      },

      // 文章
      {
        path: '/sqdz',
        name: 'sqdz',
        component: () => import('@/views/profile/advanced/Advanced'),
        meta: { title: '深泉大众' }
      },

      // IANCHINA
      {
        name: 'iachina',
        path: 'https://www.baidu.com/',
        meta: { title: 'IANCHINA', target: '_blank' }
      },

      // 关于我们
      {
        path: '/aboutMe',
        name: 'aboutMe',
        component: () => import('@/views/account/center/Index'),
        meta: { title: '关于我们' }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
