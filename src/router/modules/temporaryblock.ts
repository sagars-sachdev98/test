import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const TemporaryBlockRouter: RouteConfig = {
  path: '/temporaryblock',
  component: Layout,
  redirect: 'noredirect',
  name: 'TemporaryBlock Management',
  meta: {
    // roles: ['superadmin', 'admin'],
    title: 'TemporaryBlockManagement.title',
    icon: 'eye-slash'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/temporaryblock/list.vue'),
      name: 'TemporaryBlocks',
      meta: {
        title: 'TemporaryBlockManagement.TemporaryBlock.title',
        noCache: true,
        icon: 'eye-slash'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/temporaryblock/manage.vue'),
      name: 'Edit TemporaryBlock',
      props: {
        isEdit: true
      },
      meta: {
        title: 'TemporaryBlockManagement.TemporaryBlock.manage',
        noCache: true,
        activeMenu: '/temporaryblock/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/temporaryblock/manage.vue'),
      name: 'Add TemporaryBlock',
      props: {
        isEdit: false
      },
      meta: {
        title: 'TemporaryBlockManagement.TemporaryBlock.manage',
        noCache: true,
        activeMenu: '/temporaryblock/list',
        hidden: true
      }
    }
  ]
}

export default TemporaryBlockRouter
