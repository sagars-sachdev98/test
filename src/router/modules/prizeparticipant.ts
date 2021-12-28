import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const prizeparticipantRouter: RouteConfig = {
  path: '/prizeparticipant',
  component: Layout,
  redirect: 'noredirect',
  name: 'prize participant Management',
  meta: {
    title: 'prizeManagement.title',
    icon: 'trophy',
    hidden:true
  },
  children: [
    {
      path: 'list/:id(\\d+)',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/prizeparticipant/list.vue'),
      name: 'prizes',
      meta: {
        title: 'prizeManagement.title',
        noCache: true,
        hidden:true,
        icon: 'trophy'
        
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/prizeparticipant/manage.vue'),
      name: 'Edit Offer',
      props: {
        isEdit: true
      },
      meta: {
        title: 'prizeManagement.prize.manage',
        noCache: true,
        activeMenu: '/prizeparticipant/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/prizeparticipant/manage.vue'),
      name: 'Add prize',
      props: {
        isEdit: false
      },
      meta: {
        hidden:true,
        title: 'prizeManagement.prize.manage',
        noCache: true,
        activeMenu: '/prizeparticipant/list',
        
      }
    }
  ]
}

export default prizeparticipantRouter
