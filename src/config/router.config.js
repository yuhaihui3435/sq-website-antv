// eslint-disable-next-line
import { BasicLayout, RouteView, PageView } from '@/layouts'
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/index',
    meta: { title: '首页' },
    children: [
      // 首页
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/Home'),
        meta: { title: '首页', hiddenHeaderContent: true }
      },
      // 课程
      {
        path: '/sqsy',
        name: 'sqsy',
        component: PageView,
        redirect: '/sqsy/Projects',
        meta: { title: '深泉书院' },
        hideChildrenInMenu: true,
        children: [
          {
            path: '/sqsy/Projects',
            name: 'SearchProjects',
            component: () => import('../views/list/search/Projects'),
            meta: { title: '深泉书院', isList: true }
          }
        ]
      },
      // 咨询师
      {
        path: '/sqzx',
        name: 'sqzx',
        component: PageView,
        redirect: '/sqzx/CardList',
        meta: { title: '深泉咨询' },
        hideChildrenInMenu: true,
        children: [
          {
            path: '/sqzx/CardList',
            name: 'SearchCardList',
            component: () => import('../views/list/CardList'),
            meta: { title: '深泉咨询', isList: true }
          }
        ]
      },

      // 文章
      {
        path: '/sqdz',
        name: 'sqdz',
        component: PageView,
        redirect: '/sqdz/article',
        meta: { title: '深泉大众' },
        hideChildrenInMenu: true,
        children: [
          {
            path: '/sqdz/article',
            name: 'SearchArticles',
            component: () => import('../views/list/search/Article'),
            meta: { title: '深泉大众', isList: true }
          }
        ]
      },
      // IANCHINA
      {
        name: 'iachina',
        path: 'https://www.baidu.com/',
        meta: { title: 'IANCHINA', target: '_blank' }
      },

      // 关于我们
      // {
      //   path: '/aboutMe',
      //   name: 'aboutMe',
      //   component: () => import('../views/account/center/AboutMe'),
      //   meta: { title: '关于我们' }
      // },
      {
        path: '/gywm',
        name: 'gywm',
        component: PageView,
        redirect: '/gywm/aboutMe',
        meta: { title: '关于我们' },
        hideChildrenInMenu: true,
        children: [
          {
            path: '/gywm/aboutMe',
            name: 'AboutMe',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '关于我们', isList: true }
          }
        ]
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
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('@/views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, keepAlive: true }
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import('@/views/account/settings/Security'),
                meta: { title: '安全设置', hidden: true, keepAlive: true }
              }
            ]
          }
        ]
      },
      // 注册
      {
        path: '/regist',
        name: 'regist',
        hidden: true,
        component: () => import('@/views/account/settings/Regist'),
        meta: { title: '注册', hideHeader: true },
        hideChildrenInMenu: true
      },
      // 忘记密码
      {
        path: '/forgetPassword',
        name: 'forgetPassword',
        hidden: true,
        component: () => import('@/views/account/settings/ForgetPassword'),
        meta: { title: '忘记密码', hideHeader: true },
        hideChildrenInMenu: true
      },
      // 详细页面
      {
        path: '/profile',
        name: 'profile',
        component: RouteView,
        redirect: '/profile/lesson',
        hidden: true,
        meta: { title: '详情', icon: 'profile' },
        children: [
          {
            path: '/profile/lesson/:id',
            name: 'ProfileLesson',
            component: () => import('@/views/profile/basic/Index'),
            meta: { title: '课程详情', keepAlive: true, pr: 'SearchProjects' }
          },
          {
            path: '/profile/doctor/:id',
            name: 'ProfileDoctor',
            component: () => import('@/views/profile/basic/DoctorDetail'),
            meta: { title: '咨询师详情', keepAlive: true, pr: 'SearchCardList' }
          },
          {
            path: '/profile/artice/:id',
            name: 'ProfileArtice',
            component: () => import('@/views/profile/basic/ArticeDetail'),
            meta: { title: '文章详情', keepAlive: true, pr: 'SearchArticles' }
          }
        ]
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
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
