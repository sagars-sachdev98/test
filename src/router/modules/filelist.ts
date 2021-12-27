import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const fileListRouter: RouteConfig = {
  path: '/fileslist',
  component: Layout,
  redirect: 'noredirect',
  name: 'File Management',
  meta: {
    roles: ['superadmin','admin','view-only'],

    title: 'fileManagement.title',
    icon: 'clipboard-alt'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/fileslist/list.vue'),
      name: 'files',
      meta: {
        title: 'fileManagement.title',
        noCache: true,
        icon: 'clipboard-alt'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/fileslist/manage.vue'),
      name: 'Edit File',
      props: {
        isEdit: true
      },
      meta: {
        title: 'fileManagement.file.manage',
        noCache: true,
        activeMenu: '/fileslist/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/fileslist/manage.vue'),
      name: 'Add file',
      props: {
        isEdit: false
      },
      meta: {
        title: 'fileManagement.file.manage',
        noCache: true,
        activeMenu: '/fileslist/list',
        hidden: true
      }
    }
  ]
}

export default fileListRouter
