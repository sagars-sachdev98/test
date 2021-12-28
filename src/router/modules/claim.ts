import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const claimRouter: RouteConfig = {
  path: '/claim',
  component: Layout,
  redirect: 'noredirect',
  name: 'Claim Management',
  meta: {
    title: 'claimManagement.title',
    icon: 'clipboard-alt'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/claim/list.vue'),
      name: 'Claims',
      meta: {
        title: 'claimManagement.title',
        noCache: true,
        icon: 'clipboard-alt'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/claim/manage.vue'),
      name: 'Edit Claims',
      props: {
        isEdit: true
      },
      meta: {
        title: 'claimManagement.claim.manage',
        noCache: true,
        activeMenu: '/claim/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/claim/manage.vue'),
      name: 'Add Claim',
      props: {
        isEdit: false
      },
      meta: {
        title: 'claimManagement.claim.manage',
        noCache: true,
        activeMenu: '/claim/list',
        hidden: true
      }
    }
  ]
}

export default claimRouter
