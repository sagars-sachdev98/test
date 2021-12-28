import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const bankRouter: RouteConfig = {
  path: '/bank',
  component: Layout,
  redirect: 'noredirect',
  name: 'Bank Management',
  meta: {
    title: 'bankManagement.title',
    icon: 'university'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/bank/list.vue'),
      name: 'Banks',
      meta: {
        title: 'bankManagement.title',
        noCache: true,
        icon: 'university'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/bank/manage.vue'),
      name: 'Edit Banks',
      props: {
        isEdit: true
      },
      meta: {
        title: 'bankManagement.bank.manage',
        noCache: true,
        activeMenu: '/bank/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/bank/manage.vue'),
      name: 'Add Bank',
      props: {
        isEdit: false
      },
      meta: {
        title: 'bankManagement.bank.manage',
        noCache: true,
        activeMenu: '/bank/list',
        hidden: true
      }
    }
  ]
}

export default bankRouter
