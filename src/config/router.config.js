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
        component: () => import('@/views/Home'),
        meta: { title: '首页', hiddenHeaderContent: true }
      },
      // 课程
      {
        path: '/sqsy',
        name: 'sqsy',
        // component: () => import('@/views/dashboard/Workplace'),
        component: () => import('@/views/list/search/Projects'),
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
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        hidden: true,
        meta: { title: '个人页', icon: 'user', keepAlive: true },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center/Index'),
            meta: { title: '个人中心', keepAlive: true }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      },
      // list
      
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
