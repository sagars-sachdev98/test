import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const usersRouter: RouteConfig = {
  path: '/users',
  component: Layout,
  redirect: 'noredirect',
  name: 'userManagement.title',
  meta: {
    title: 'userManagement.title',
    icon: 'users-alt'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/users/list.vue'),
      name: 'userManagement.users.manage',
      meta: {
        title: 'userManagement.title',
        noCache: true,
        icon: 'users-alt'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/users/manage.vue'),
      name: 'userManagement.users.manage',
      props: {
        isEdit: true
      },
      meta: {
        title: 'userManagement.users.manage',
        noCache: true,
        activeMenu: '/users/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/users/manage.vue'),
      name: 'userManagement.users.manage',
      props: {
        isEdit: false
      },
      meta: {
        title: 'userManagement.users.manage',
        noCache: true,
        activeMenu: '/users/list',
        hidden: true
      }
    }
  ]
}

export default usersRouter
