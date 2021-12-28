import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const GameTransactionRouter: RouteConfig = {
  path: '/gametransaction',
  component: Layout,
  redirect: 'noredirect',
  name: 'gametransaction Management',
  meta: {
    title: 'gametransactionManagement.title',
    icon: 'newspaper'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/gametransaction/list.vue'),
      name: 'gametransactions',
      meta: {
        title: 'gametransactionManagement.title',
        noCache: true,
        icon: 'newspaper'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/gametransaction/manage.vue'),
      name: 'Edit Update',
      props: {
        isEdit: true
      },
      meta: {
        title: 'gametransactionManagement.gametransaction.manage',
        noCache: true,
        activeMenu: '/gametransaction/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/gametransaction/manage.vue'),
      name: 'Add gametransaction',
      props: {
        isEdit: false
      },
      meta: {
        title: 'gametransactionManagement.gametransaction.manage',
        noCache: true,
        activeMenu: '/gametransaction/list',
        hidden: true
      }
    }
  ]
}

export default GameTransactionRouter
