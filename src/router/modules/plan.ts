import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const planRouter: RouteConfig = {
  path: '/plan',
  component: Layout,
  redirect: 'noredirect',
  name: 'plan Management',
  meta: {
    title: 'planManagement.title',
    icon: 'newspaper'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/plan/list.vue'),
      name: 'plans',
      meta: {
        title: 'planManagement.title',
        noCache: true,
        icon: 'newspaper'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/plan/manage.vue'),
      name: 'Edit Update',
      props: {
        isEdit: true
      },
      meta: {
        title: 'planManagement.plan.manage',
        noCache: true,
        activeMenu: '/plan/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/plan/manage.vue'),
      name: 'Add plan',
      props: {
        isEdit: false
      },
      meta: {
        title: 'planManagement.plan.manage',
        noCache: true,
        activeMenu: '/plan/list',
        hidden: true
      }
    }
  ]
}

export default planRouter
