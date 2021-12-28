import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const gameparticipantRouter: RouteConfig = {
  path: '/gameparticipant',
  component: Layout,
  redirect: 'noredirect',
  name: 'game participant Management',
  meta: {
    hidden:true,
    title: 'gameManagement.title',
    icon: 'trophy'
  },
  children: [
    {
      path: 'list/:id(\\d+)',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/gameparticipant/list.vue'),
      name: 'games',
      meta: {
        title: 'gameManagement.title',
        noCache: true,
        hidden:true,
        icon: 'trophy'
        
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/gameparticipant/manage.vue'),
      name: 'Edit Offer',
      props: {
        isEdit: true
      },
      meta: {
        title: 'gameManagement.game.manage',
        noCache: true,
        activeMenu: '/gameparticipant/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/gameparticipant/manage.vue'),
      name: 'Add game',
      props: {
        isEdit: false
      },
      meta: {
        title: 'gameManagement.game.manage',
        noCache: true,
        activeMenu: '/gameparticipant/list',
        
      }
    }
  ]
}

export default gameparticipantRouter
