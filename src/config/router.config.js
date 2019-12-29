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
        // meta: { title: '深泉书院' },
        meta: { title: '教育项目' },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/sqsy/Projects',
            name: 'SearchProjects',
            component: () => import('../views/list/search/Projects'),
            meta: { title: '精神分析治疗咨询师培养项目', isList: true }
          },
          {
            path: '/sqsy/2',
            name: '2',
            component: () => import('../views/list/search/Projects'),
            meta: { title: '英国精神分析学会系统培训项目', isList: true },
            children: [
              {
                path: '/sqsy/21',
                name: '21',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'KP中英克莱因学派培训项目', isList: true }
              },
              {
                path: '/sqsy/22',
                name: '22',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'BP中英比昂培训项目', isList: true }
              },
              {
                path: '/sqsy/23',
                name: '23',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'WP中英温尼科特培训项目', isList: true }
              },
              {
                path: '/sqsy/24',
                name: '24',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'CD中英儿童青少年发展与养育项目', isList: true }
              },
            ]
          },
          {
            path: '/sqsy/3',
            name: '3',
            component: () => import('../views/list/search/Projects'),
            meta: { title: '依恋理论研究与应用项目', isList: true },
            children: [
              {
                path: '/sqsy/31',
                name: '31',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'AAI', isList: true }
              },
              {
                path: '/sqsy/32',
                name: '32',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'CPG', isList: true }
              },
              {
                path: '/sqsy/33',
                name: '33',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'NDP神奇戏剧治疗师', isList: true }
              },
            ]
          }
        ]
      },
      // 咨询师
      {
        path: '/sqzx',
        name: 'sqzx',
        component: PageView,
        redirect: '/sqzx/CardList',
        // meta: { title: '深泉咨询' },
        meta: { title: '智库/观点' },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/sqzx/CardList',
            name: 'SearchCardList',
            component: () => import('../views/list/CardList'),
            meta: { title: '深泉智库', isList: true }
          },
          {
            path: '/sqzx/CardList',
            name: 'SearchCardList',
            component: () => import('../views/list/CardList'),
            meta: { title: '观点与研究', isList: true }
          },
          {
            path: '/sqzx/CardList',
            name: 'SearchCardList',
            component: () => import('../views/list/CardList'),
            meta: { title: '最新事件', isList: true }
          }
        ]
      },
      // IANCHINA
      {
        name: 'iachina',
        path: 'https://www.baidu.com/',
        meta: { title: 'IANCHINA', target: '_blank' },
        children: [
          {
            path: 'https://www.baidu.com/',
            name: 'SearchArticles',
            // component: () => import('../views/list/search/Article'),
            meta: { title: '依恋的历史', isList: true }
          },
          {
            path: 'https://www.baidu.com/',
            name: 'SearchArticles',
            // component: () => import('../views/list/search/Article'),
            meta: { title: 'IAN与IAN国际', isList: true }
          },
          {
            path: 'https://www.baidu.com/',
            name: 'SearchArticles',
            // component: () => import('../views/list/search/Article'),
            meta: { title: '关于IAN CHINA', isList: true }
          },
          {
            path: 'https://www.baidu.com/',
            name: 'SearchArticles',
            // component: () => import('../views/list/search/Article'),
            meta: { title: '最新活动与新闻', isList: true }
          }
        ]
      },

      // 文章
      {
        path: '/sqdz',
        name: 'sqdz',
        component: PageView,
        redirect: '/sqdz/article',
        // meta: { title: '深泉大众' },
        meta: { title: '公众服务' },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/sqdz/article',
            name: 'SearchArticles',
            component: () => import('../views/list/search/Article'),
            meta: { title: '心理咨询服务', isList: true },
            children: [
              {
                path: '/sqdz/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '心理文章', isList: true }
              },
              {
                path: '/sqdz/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '咨询指南', isList: true }
              },
              {
                path: '/sqdz/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '咨询师列表', isList: true }
              },
              {
                path: '/sqdz/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '低价咨询', isList: true }
              },
            ]
          },
          {
            path: '/sqdz/article',
            name: 'SearchArticles',
            component: () => import('../views/list/search/Article'),
            meta: { title: '组织机构服务', isList: true },
            children: [
              {
                path: '/sqdz/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '项目展示', isList: true }
              },
              {
                path: '/sqdz/article',
                name: 'SearchArticles',
                component: () => import('../views/list/search/Article'),
                meta: { title: '服务定制流程', isList: true }
              },
            ]
          },
          {
            path: '/sqdz/article',
            name: 'SearchArticles',
            component: () => import('../views/list/search/Article'),
            meta: { title: '专家限时免费服务', isList: true }
          }
        ]
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
        meta: { title: '关于深泉' },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/gywm/aboutMe',
            name: 'AboutMe',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '深泉溯源', isList: true }
          },
          {
            path: '/gywm/aboutMe',
            name: 'AboutMe',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '深泉发展', isList: true }
          },
          {
            path: '/gywm/aboutMe',
            name: 'AboutMe',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '大事记', isList: true }
          },
          {
            path: '/gywm/aboutMe',
            name: 'AboutMe',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '关联组织与伙伴', isList: true }
          }
        ]
      },
      // 会员专区
      {
        path: '/hyzq',
        name: 'hyzq',
        component: PageView,
        redirect: '/hyzq/aboutMe',
        meta: { title: '会员专区' },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/gywm/aboutMe',
            name: 'AboutMe',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '独家文献', isList: true }
          },
          {
            path: '/gywm/aboutMe',
            name: 'AboutMe',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '音频与视频', isList: true }
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
