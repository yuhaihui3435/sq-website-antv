// eslint-disable-next-line
import { BasicLayout, RouteView, PageView } from '@/layouts'
import i18n from '@/i18n'
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
        meta: { title: 'common.home', hiddenHeaderContent: true }
      },
      // 课程
      {
        path: '/jyxm',
        name: 'jyxm',
        component: PageView,
        redirect: '/jyxm/00',
        // meta: { title: '深泉书院' },
        meta: { title: '教育项目' },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/jyxm/00',
            name: 'jsfxzlzxspyxm',
            component: () => import('../views/list/search/Projects'),
            meta: { title: '精神分析治疗咨询师培养项目', isList: true }
          },
          {
            path: '/jyxm/01',
            name: 'ygjsfxxhxtpxxm',
            meta: { title: '英国精神分析学会系统培训项目', isList: true },
            children: [
              {
                path: '/jyxm/01/00',
                name: 'kpzyklyxppxxm',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'KP中英克莱因学派培训项目', isList: true }
              },
              {
                path: '/jyxm/01/01',
                name: 'bpzybapxxm',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'BP中英比昂培训项目', isList: true }
              },
              {
                path: '/jyxm/01/02',
                name: 'wpzywnktpxxm',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'WP中英温尼科特培训项目', isList: true }
              },
              {
                path: '/jyxm/01/03',
                name: 'cdzyetqsnfzypyxm',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'CD中英儿童青少年发展与养育项目', isList: true }
              },
            ]
          },
          {
            path: '/jyxm/02',
            name: 'ylllyjyyyxm',
            meta: { title: '依恋理论研究与应用项目', isList: true },
            children: [
              {
                path: '/jyxm/02/00',
                name: 'aai',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'AAI', isList: true }
              },
              {
                path: '/jyxm/02/01',
                name: 'cpg',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'CPG', isList: true }
              },
              {
                path: '/jyxm/02/02',
                name: 'ndpsqxjzls',
                component: () => import('../views/list/search/Projects'),
                meta: { title: 'NDP神奇戏剧治疗师', isList: true }
              },
            ]
          }
        ]
      },
      // 咨询师
      {
        path: '/zkgd',
        name: 'zkgd',
        component: PageView,
        redirect: '/zkgd/00',
        // meta: { title: '深泉咨询' },
        meta: { title: '智库/观点' },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/zkgd/00',
            name: 'sqzk',
            component: () => import('../views/list/CardList'),
            meta: { title: '深泉智库', isList: true }
          },
          {
            path: '/zkgd/01',
            name: 'gdyyj',
            component: () => import('../views/list/CardList'),
            meta: { title: '观点与研究', isList: true }
          },
          {
            path: '/zkgd/02',
            name: 'zxsj',
            component: () => import('../views/list/CardList'),
            meta: { title: '最新事件', isList: true }
          }
        ]
      },
      // IANCHINA
      {
        name: 'iachina',
        path: '/iachina',
        meta: { title: 'IANCHINA', target: '_blank' },
        children: [
          {
            path: '/iachina/00',
            name: 'ylls',
            // component: () => import('../views/list/search/Article'),
            meta: { title: '依恋的历史', isList: true }
          },
          {
            path: '/iachina/01',
            name: 'ianyiangj',
            // component: () => import('../views/list/search/Article'),
            meta: { title: 'IAN与IAN国际', isList: true }
          },
          {
            path: '/iachina/02',
            name: 'gyianchina',
            // component: () => import('../views/list/search/Article'),
            meta: { title: '关于IAN CHINA', isList: true }
          },
          {
            path: '/iachina/03',
            name: 'zxhdyxw',
            // component: () => import('../views/list/search/Article'),
            meta: { title: '最新活动与新闻', isList: true }
          }
        ]
      },

      // 文章
      {
        path: '/gzfw',
        name: 'gzfw',
        component: PageView,
        redirect: '/gzfw/00',
        // meta: { title: '深泉大众' },
        meta: { title: '公众服务' },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/gzfw/00',
            name: 'xlzxfw',
            meta: { title: '心理咨询服务', isList: true },
            children: [
              {
                path: '/gzfw/00/00',
                name: 'xlwz',
                component: () => import('../views/list/search/Article'),
                meta: { title: '心理文章', isList: true }
              },
              {
                path: '/gzfw/00/01',
                name: 'zxzn',
                component: () => import('../views/list/search/Article'),
                meta: { title: '咨询指南', isList: true }
              },
              {
                path: '/gzfw/00/02',
                name: 'zxslb',
                component: () => import('../views/list/search/Article'),
                meta: { title: '咨询师列表', isList: true }
              },
              {
                path: '/gzfw/00/03',
                name: 'djzx',
                component: () => import('../views/list/search/Article'),
                meta: { title: '低价咨询', isList: true }
              },
            ]
          },
          {
            path: '/gzfw/01',
            name: 'zzjgfw',
            meta: { title: '组织机构服务', isList: true },
            children: [
              {
                path: '/gzfw/01/00',
                name: 'xmzs',
                component: () => import('../views/list/search/Article'),
                meta: { title: '项目展示', isList: true }
              },
              {
                path: '/gzfw/01/01',
                name: 'fwdzlc',
                component: () => import('../views/list/search/Article'),
                meta: { title: '服务定制流程', isList: true }
              },
            ]
          },
          {
            path: '/gzfw/02',
            name: 'zjxsmffw',
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
        path: '/gysq',
        name: 'gysq',
        component: PageView,
        redirect: '/gysq/00',
        meta: { title: '关于深泉' },
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/gysq/00',
            name: 'sqsy',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '深泉溯源', isList: true }
          },
          {
            path: '/gysq/01',
            name: 'sqfz',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '深泉发展', isList: true }
          },
          {
            path: '/gysq/02',
            name: 'dsj',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '大事记', isList: true }
          },
          {
            path: '/gysq/03',
            name: 'glzzyhb',
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
        redirect: '/hyzq/00',
        meta: { title: '会员专区' ,permission:['user']},
        // hideChildrenInMenu: true,
        children: [
          {
            path: '/hyzq/00',
            name: 'djwx',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '独家文献', isList: true ,permission:['user']}
          },
          {
            path: '/hyzq/01',
            name: 'ypysp',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '音频与视频', isList: true ,permission:['user']}
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
