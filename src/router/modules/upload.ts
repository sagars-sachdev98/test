import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const uploadRouter: RouteConfig = {
  path: '/upload',
  component: Layout,
  redirect: 'noredirect',
  name: 'Upload Management',
  meta: {
    title: 'uploadManagement.title',
    icon: 'clipboard-alt'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/upload/list.vue'),
      name: 'Uploads',
      meta: {
        title: 'uploadManagement.title',
        noCache: true,
        icon: 'clipboard-alt'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/upload/manage.vue'),
      name: 'Edit Upload',
      props: {
        isEdit: true
      },
      meta: {
        title: 'uploadManagement.upload.manage',
        noCache: true,
        activeMenu: '/upload/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/upload/manage.vue'),
      name: 'Add Upload',
      props: {
        isEdit: false
      },
      meta: {
        title: 'uploadManagement.upload.manage',
        noCache: true,
        activeMenu: '/upload/list',
        hidden: true
      }
    }
  ]
}

export default uploadRouter
