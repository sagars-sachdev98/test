import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const gameRouter: RouteConfig = {
  path: '/games',
  component: Layout,
  redirect: 'noredirect',
  name: 'Game Management',
  meta: {
    title: 'gamesManagement.title',
    icon: 'football'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/games/list.vue'),
      name: 'Games',
      meta: {
        title: 'gamesManagement.title',
        noCache: true,
        icon: 'football'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/games/manage.vue'),
      name: 'Edit Games',
      props: {
        isEdit: true
      },
      meta: {
        title: 'gamesManagement.games.manage',
        noCache: true,
        activeMenu: '/games/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/games/manage.vue'),
      name: 'Add Games',
      props: {
        isEdit: false
      },
      meta: {
        title: 'gamesManagement.games.manage',
        noCache: true,
        activeMenu: '/games/list',
        hidden: true
      }
    }
  ]
}

export default gameRouter
