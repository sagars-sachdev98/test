import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const detailShareRouter: RouteConfig = {
  path: '/detailshare',
  component: Layout,
  redirect: 'noredirect',
  name: 'detailShare Management',
  meta: {
    roles: ['superadmin','admin','view-only'],
    title: 'detailShareManagement.title',
    icon: 'align'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/detailShare/list.vue'),
      name: 'enquiries',
      meta: {
        title: 'detailShareManagement.title',
        noCache: true,
        icon: 'align'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/detailShare/manage.vue'),
      name: 'Edit Offer',
      props: {
        isEdit: true
      },
      meta: {
        title: 'detailShareManagement.detailShare.manage',
        noCache: true,
        activeMenu: '/detailShare/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/detailShare/manage.vue'),
      name: 'Add detailShare',
      props: {
        isEdit: false
      },
      meta: {
        title: 'detailShareManagement.detailShare.manage',
        noCache: true,
        activeMenu: '/detailShare/list',
        hidden: true
      }
    }
  ]
}

export default detailShareRouter
