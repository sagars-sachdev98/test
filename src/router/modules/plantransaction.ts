import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const plantransactionRouter: RouteConfig = {
  path: '/plantransaction',
  component: Layout,
  redirect: 'noredirect',
  name: 'plantransaction Management',
  meta: {
    hidden:true,
    title: 'plantransactionManagement.title',
    icon: 'newspaper'
  },
  children: [
    {
      path: 'list/:id(\\d+)',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/plantransaction/list.vue'),
      name: 'plantransactions',
      meta: {
        hidden:true,
        title: 'plantransactionManagement.title',
        noCache: true,
        icon: 'newspaper'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/plantransaction/manage.vue'),
      name: 'Edit Update',
      props: {
        isEdit: true
      },
      meta: {
        title: 'plantransactionManagement.plantransaction.manage',
        noCache: true,
        activeMenu: '/plantransaction/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/plantransaction/manage.vue'),
      name: 'Add plantransaction',
      props: {
        isEdit: false
      },
      meta: {
        title: 'plantransactionManagement.plantransaction.manage',
        noCache: true,
        activeMenu: '/plantransaction/list',
        hidden: true
      }
    }
  ]
}

export default plantransactionRouter
