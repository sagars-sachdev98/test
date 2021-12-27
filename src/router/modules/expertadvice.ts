import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const expertadviceRouter: RouteConfig = {
  path: '/expertadvices',
  component: Layout,
  redirect: 'noredirect',
  name: 'expertadvice Management',
  meta: {
    roles: ['superadmin','admin','view-only'],

    title: 'expertadviceManagement.title',
    icon: 'lightbulb-alt'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/expertadvice/list.vue'),
      name: 'expertadvices',
      meta: {
        title: 'expertadviceManagement.title',
        noCache: true,
        icon: 'lightbulb-alt'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/expertadvice/manage.vue'),
      name: 'Edit expertadvice',
      props: {
        isEdit: true
      },
      meta: {
        title: 'expertadviceManagement.expertadvice.manage',
        noCache: true,
        activeMenu: '/expertadvices/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/expertadvice/manage.vue'),
      name: 'Add expertadvice',
      props: {
        isEdit: false
      },
      meta: {
        title: 'expertadviceManagement.expertadvice.manage',
        noCache: true,
        activeMenu: '/expertadvices/list',
        hidden: true
      }
    }
  ]
}

export default expertadviceRouter
