import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const PermanentBlockRouter: RouteConfig = {
  path: '/permanentblock',
  component: Layout,
  redirect: 'noredirect',
  name: 'PermanentBlock Management',
  meta: {
    // roles: ['superadmin', 'admin'],
    title: 'PermanentBlockManagement.title',
    icon: 'ban'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/permanentblock/list.vue'),
      name: 'PermanentBlocks',
      meta: {
        title: 'PermanentBlockManagement.permanentblock.title',
        noCache: true,
        icon: 'ban'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/permanentblock/manage.vue'),
      name: 'Edit PermanentBlock',
      props: {
        isEdit: true
      },
      meta: {
        title: 'PermanentBlockManagement.PermanentBlock.manage',
        noCache: true,
        activeMenu: '/permanentblock/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/permanentblock/manage.vue'),
      name: 'Add PermanentBlock',
      props: {
        isEdit: false
      },
      meta: {
        title: 'PermanentBlockManagement.permanentblock.manage',
        noCache: true,
        activeMenu: '/permanentblock/list',
        hidden: true
      }
    }
  ]
}

export default PermanentBlockRouter
