import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const recordsRouter: RouteConfig = {
  path: '/records',
  component: Layout,
  redirect: 'noredirect',
  name: 'Records Management',
  meta: {
    roles: ['superadmin','admin','view-only'],

    title: 'recordsManagement.title',
    icon: 'file-download'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/records/list.vue'),
      name: 'records',
      meta: {
        title: 'recordsManagement.title',
        noCache: true,
        icon: 'file-download'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/records/manage.vue'),
      name: 'Edit Record',
      props: {
        isEdit: true
      },
      meta: {
        title: 'recordsManagement.file.manage',
        noCache: true,
        activeMenu: '/records/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/records/manage.vue'),
      name: 'Add Record',
      props: {
        isEdit: false
      },
      meta: {
        title: 'recordsManagement.file.manage',
        noCache: true,
        activeMenu: '/records/list',
        hidden: true
      }
    }
  ]
}

export default recordsRouter
