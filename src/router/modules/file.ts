import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const fileRouter: RouteConfig = {
  path: '/files',
  component: Layout,
  redirect: 'noredirect',
  name: 'File Management',
  meta: {
    roles: ['superadmin','admin','view-only'],

    title: 'fileManagement.title',
    icon: 'file-upload'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/files/list.vue'),
      name: 'files',
      meta: {
        title: 'fileManagement.title',
        noCache: true,
        icon: 'file-upload'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/files/manage.vue'),
      name: 'Edit File',
      props: {
        isEdit: true
      },
      meta: {
        title: 'fileManagement.file.manage',
        noCache: true,
        activeMenu: '/files/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/files/manage.vue'),
      name: 'Add file',
      props: {
        isEdit: false
      },
      meta: {
        title: 'fileManagement.file.manage',
        noCache: true,
        activeMenu: '/files/list',
        hidden: true
      }
    }
  ]
}

export default fileRouter
