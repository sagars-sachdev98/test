import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const prizeRouter: RouteConfig = {
  path: '/prize',
  component: Layout,
  redirect: 'noredirect',
  name: 'prize Management',
  meta: {
    title: 'prizeManagement.title',
    icon: 'trophy'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/prize/list.vue'),
      name: 'prizes',
      meta: {
        title: 'prizeManagement.title',
        noCache: true,
        icon: 'trophy'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/prize/manage.vue'),
      name: 'Edit Offer',
      props: {
        isEdit: true
      },
      meta: {
        title: 'prizeManagement.prize.manage',
        noCache: true,
        activeMenu: '/prize/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/prize/manage.vue'),
      name: 'Add prize',
      props: {
        isEdit: false
      },
      meta: {
        title: 'prizeManagement.prize.manage',
        noCache: true,
        activeMenu: '/prize/list',
        hidden: true
      }
    }
  ]
}

export default prizeRouter
