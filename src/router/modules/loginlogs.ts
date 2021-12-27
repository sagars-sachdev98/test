import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const LoginLogAccountRouter: RouteConfig = {
  path: '/loginlog',
  component: Layout,
  redirect: 'noredirect',
  name: 'loginlog Management',
  meta: {
    // roles: ['superadmin', 'admin'],
    title: 'loginlogManagement.title',
    icon: 'clock-ten'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/loginlogs/list.vue'),
      name: 'loginlogs',
      meta: {
        title: 'loginlogManagement.login.title',
        noCache: true,
        icon: 'clock-ten'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/loginlogs/manage.vue'),
      name: 'Edit loginlog',
      props: {
        isEdit: true
      },
      meta: {
        title: 'loginlogManagement.login.manage',
        noCache: true,
        activeMenu: '/loginlogs/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/loginlogs/manage.vue'),
      name: 'Add loginlog',
      props: {
        isEdit: false
      },
      meta: {
        title: 'loginlogManagement.login.manage',
        noCache: true,
        activeMenu: '/loginlogs/list',
        hidden: true
      }
    }
  ]
}

export default LoginLogAccountRouter
