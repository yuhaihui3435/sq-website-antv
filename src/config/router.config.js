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
            path: '/jyxm/01',
            name: 'ygjsfxxhxtpxxm',
            hidden:true,
            component: () => import('../views/articles/list/BigGraphic'),
            meta: { title: '英国精神分析学会系统培训项目', pageMode: true, cId: 19, keepAlive: false },
          },
          {
            path: '/jyxm/02',
            name: 'ylllyjyyyxm',
            hidden:true,
            component: () => import('../views/articles/list/BigGraphic'),
            meta: { title: '依恋理论研究与应用系列培训项目', pageMode: true, isList: true, keepAlive: false },
          },
          {
            path: '/jyxm/00',
            name: 'jsfxzlzxspyxm',
            component: () => import('../views/articles/list/Normal'),
            meta: { title: '精神分析治疗技术与临床督导项目（两年制）', isList: true, cId: 18, keepAlive: false }
          },
          {
            //定义虚拟的菜单，由于 二级菜单要求也要又页面渲染，再配置一个真实的菜单路由，通过vir_前缀分解，得到真是路由
            path: '/vir/jyxm/01',
            name: 'vir_ygjsfxxhxtpxxm',
            component: RouteView,
            meta: { title: '英国精神分析学会系统培训项目', pageMode: true, cId: 19, keepAlive: false },
            children: [
              {
                path: '/jyxm/01/00',
                name: 'kpzyklyxppxxm',
                component: () => import('../views/articles/list/Normal'),
                meta: { title: '中英克莱因学派培训项目(KP)', isList: true, cId: 24, keepAlive: false }
              },
              {
                path: '/jyxm/01/01',
                name: 'bpzybapxxm',
                component: () => import('../views/articles/list/Normal'),
                meta: { title: '中英比昂培训项目(BP)', isList: true, cId: 25, keepAlive: false }
              },
              {
                path: '/jyxm/01/02',
                name: 'wpzywnktpxxm',
                component: () => import('../views/articles/list/Normal'),
                meta: { title: '中英温尼科特培训项目(WP)', cId: 26, isList: true, keepAlive: false }
              },
              {
                path: '/jyxm/01/03',
                name: 'cdzyetqsnfzypyxm',
                component: () => import('../views/articles/list/Normal'),
                meta: { title: '中英儿童青少年发展与养育项目(CD)', cId: 27, isList: true, keepAlive: false }
              },
            ]
          },
          {
            path: '/vir/jyxm/02',
            name: 'vir_ylllyjyyyxm',
            component:RouteView,
            meta: { title: '依恋理论研究与应用系列培训项目', pageMode: true, isList: true, keepAlive: false },
            children: [
              {
                path: '/jyxm/02/00',
                name: 'aai',
                component: () => import('../views/articles/list/Normal'),
                meta: { title: '国际成人依恋访谈编码师认证项目(AAI)', isList: true, cId: 29, keepAlive: false }
              },
              {
                path: '/jyxm/02/01',
                name: 'cpg',
                component: () => import('../views/articles/list/Normal'),
                meta: { title: 'CONNECT研究与应用项目(支持父母与照顾者)', isList: true, cId: 30, keepAlive: false }
              },
              // {
              //   path: '/jyxm/02/02',
              //   name: 'ndpsqxjzls',
              //   component: () => import('../views/articles/list/Normal'),
              //   meta: { title: 'NDP神奇戏剧治疗师', isList: true, cId: 31, keepAlive: false }
              // },
            ]
          }
        ]
      },

      // 咨询师
      {
        path: '/zkgd',
        name: 'zkgd',
        component: PageView,
        meta: { title: '智库/观点' },
        children: [
          //预告与安排
          {
            path: '/ygyap',
            name: 'ygyap',
            hidden:true,
            component: () => import('../views/articles/list/Normal'),
            meta: { title: '预告与安排', cId: 73, keepAlive: false },
          },
          {
            path: '/zkgd/00',
            name: 'sqzk',
            hidden:true,
            meta: { title: '深泉智库', pageMode: true, isList: true, cId: 33, keepAlive: false },
            component: () => import('../views/articles/list/BigGraphic'),
          },
          {
            path: '/vir/zkgd/00',
            name: 'vir_sqzk',
            meta: { title: '深泉智库', pageMode: true, isList: true, cId: 33, keepAlive: false },
            component:RouteView,
            children: [
              {
                path: '/zkgd/00/01',
                name: 'zkzj',
                component: () => import('../views/articles/list/BigGraphic'),
                meta: { title: '智库专家', isList: true, cId: 69, keepAlive: false }
              },
            ]
          },
          {
            path: '/zkgd/01',
            name: 'gdyyj',
            hidden:true,
            meta: { title: '观点与研究', pageMode: true, isList: true, cId: 34, keepAlive: false },
            component: () => import('../views/articles/list/BigGraphic'),
          },
          {
            path: '/vir/zkgd/01',
            name: 'vir_gdyyj',
            meta: { title: '观点与研究', pageMode: true, isList: true, cId: 34, keepAlive: false },
            component: RouteView,
            children: [
              {
                path: '/zkgd/01/01',
                name: 'gdyyjgd',
                component: () => import('../views/articles/list/Graphic'),
                meta: { title: '观点', isList: true, cId: 70, keepAlive: false }
              },
              {
                path: '/zkgd/01/02',
                name: 'gdyyjyj',
                component: () => import('../views/articles/list/Graphic'),
                meta: { title: '研究', isList: true, cId: 71, keepAlive: false }
              },
            ]
          },
          {
            path: '/zkgd/02',
            name: 'zxsj',
            component: () => import('../views/articles/list/Graphic'),
            meta: { title: '最新事件', isList: true, cId: 35, keepAlive: false }
          }
        ]
      },
      // IANCHINA
      {
        name: 'iachina',
        path: '/iachina',
        component: PageView,
        meta: { title: 'IANCHINA', keepAlive: false },
        children: [
          {
            path: '/iachina/00',
            name: 'ylls',
            component: () => import('../views/articles/list/Normal'),
            meta: { title: '依恋的历史', isList: true, cId: 37, keepAlive: false }
          },
          {
            path: '/iachina/01',
            name: 'ianyiangj',
            component: () => import('../views/articles/list/Normal'),
            meta: { title: 'IAN与IAN国际', isList: true, cId: 38, keepAlive: false }
          },
          {
            path: '/iachina/02',
            name: 'gyianchina',
            component: () => import('../views/articles/list/Normal'),
            meta: { title: '关于IAN CHINA', isList: true, cId: 39, keepAlive: false }
          },
          {
            path: '/iachina/03',
            name: 'zxhdyxw',
            component: () => import('../views/articles/list/Graphic'),
            meta: { title: '最新活动与新闻', isList: true, cId: 41, keepAlive: false }
          }
        ]
      },

      // 文章
      {
        path: '/gzfw',
        name: 'gzfw',
        component: PageView,
        meta: { title: '公众服务' },
        children: [
          {
            path: '/gzfw/03',
            name: 'xlwz',
            component: () => import('../views/articles/list/Graphic'),
            meta: { title: '心理文章', cId: 60, isList: true, keepAlive: false }
          },
          {
            path: '/gzfw/00',
            name: 'xlzxfw',
            hidden:true,
            meta: { title: '心理咨询服务',pageMode: true,  cId: 59, isList: true, keepAlive: false },
            component: () => import('../views/articles/list/BigGraphic'),
          },
          {
            path: '/vir/gzfw/00',
            name: 'vir_xlzxfw',
            meta: { title: '心理咨询服务',pageMode: true,  cId: 59, isList: true, keepAlive: false },
            component:RouteView,
            children: [
              {
                path: '/gzfw/00/01',
                name: 'zxzn',
                component: () => import('../views/articles/list/Normal'),
                meta: { title: '咨询指南', cId: 61, isList: true, keepAlive: false }
              },
              {
                path: '/gzfw/00/02',
                name: 'zxslb',
                component: () => import('../views/articles/list/Normal'),
                meta: { title: '咨询师列表', cId: 62, isList: true, keepAlive: false }
              },
              {
                path: '/gzfw/00/03',
                name: 'djzx',
                component: () => import('../views/articles/list/Normal'),
                meta: { title: '低价咨询', cId: 63, isList: true, keepAlive: false }
              },
            ]
          },
          {
            path: '/gzfw/01',
            name: 'zzjgfw',
            hidden:true,
            meta: { title: '组织机构服务',pageMode: true, cId:64, isList: true, keepAlive: false },
            component: () => import('../views/articles/list/BigGraphic'),
          },
          {
            path: '/vir/gzfw/01',
            name: 'vir_zzjgfw',
            meta: { title: '组织机构服务',pageMode: true, cId:64, isList: true, keepAlive: false },
            component: RouteView,
            children: [
              {
                path: '/gzfw/01/00',
                name: 'xmzs',
                component: () => import('../views/articles/list/Graphic'),
                meta: { title: '项目展示', isList: true, cId: 65, keepAlive: false }
              },
              {
                path: '/gzfw/01/01',
                name: 'fwdzlc',
                component: () => import('../views/articles/list/Normal'),
                meta: { title: '服务定制流程', isList: true, cId: 66, keepAlive: false }
              },
            ]
          },
          {
            path: '/gzfw/02',
            name: 'zjxsmffw',
            component: () => import('../views/articles/list/Normal'),
            meta: { title: '专家限时免费服务', isList: true, cId: 67, keepAlive: false }
          }
        ]
      },
      {
        path: '/gysq',
        name: 'gysq',
        component: PageView,
        meta: { title: '关于深泉', keepAlive: false },
        children: [
          {
            path: '/gysq/00',
            name: 'sqsy',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '深泉溯源', isList: true, keepAlive: false }
          },
          {
            path: '/gysq/01',
            name: 'sqfz',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '深泉发展', isList: true, cId: 53, keepAlive: false }
          },
          {
            path: '/gysq/02',
            name: 'dsj',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '大事记', isList: true, cId: 54, keepAlive: false }
          },
          {
            path: '/gysq/03',
            name: 'glzzyhb',
            component: () => import('../views/account/center/AboutMe'),
            meta: { title: '关联组织与伙伴', isList: true, cId: 55, keepAlive: false }
          },
          {
            path: '/gysq/04',
            name: 'xw',
            component: () => import('../views/articles/list/Graphic'),
            meta: { title: '新闻', isList: true, cId: 72, keepAlive: false }
          }
        ]
      },
      // 会员专区
      {
        path: '/hyzq',
        name: 'hyzq',
        component: PageView,
        meta: { title: '会员专区', permission: ['user'], reqMember: true, keepAlive: false },
        children: [
          {
            path: '/hyzq/00',
            name: 'djwx',
            component: () => import('../views/articles/list/Graphic'),
            meta: { title: '独家文献', isList: true, permission: ['user'], cId: 57, reqMember: true, keepAlive: false }
          },
          {
            path: '/hyzq/01',
            name: 'ypysp',
            component: () => import('../views/articles/list/Graphic'),
            meta: { title: '音频与视频', isList: true, permission: ['user'], cId: 58, reqMember: true, keepAlive: false }
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
        meta: { title: '个人页', icon: 'user', keepAlive: false },
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
      {
        path: '/pv',
        name: 'pageViews',
        component: PageView,
        hidden: true,
        children: [{
          path: '/article/:id',
          name: 'ArticleDetail',
          component: () => import('@/views/articles/detail/ArticleDetail'),
          meta: { title: '文章详情', keepAlive: false, hiddenHeaderContent: true, keepAlive: false }
        },]
      },
      // 注册
      {
        path: '/regist',
        name: 'regist',
        hidden: true,
        component: () => import('@/views/account/settings/Regist'),
        meta: { title: '注册', hideHeader: true, keepAlive: false },
      },
      // 忘记密码
      {
        path: '/forgetPassword',
        name: 'forgetPassword',
        hidden: true,
        component: () => import('@/views/account/settings/ForgetPassword'),
        meta: { title: '忘记密码', hideHeader: true, keepAlive: false },
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
            meta: { title: '课程详情', keepAlive: false, pr: 'SearchProjects' }
          },
          {
            path: '/profile/doctor/:id',
            name: 'ProfileDoctor',
            component: () => import('@/views/profile/basic/DoctorDetail'),
            meta: { title: '咨询师详情', keepAlive: false, pr: 'SearchCardList' }
          },
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
  },

]
