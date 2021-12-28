import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const careerRouter: RouteConfig = {
  path: '/career',
  component: Layout,
  redirect: 'noredirect',
  name: 'Career Management',
  meta: {
    title: 'careerManagement.title',
    icon: 'books'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/careermanagement/list.vue'),
      name: 'Careers',
      meta: {
        title: 'careerManagement.title',
        noCache: true,
        icon: 'books'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/careermanagement/manage.vue'),
      name: 'Edit Offer',
      props: {
        isEdit: true
      },
      meta: {
        title: 'careerManagement.career.manage',
        noCache: true,
        activeMenu: '/careermanamagement/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/careermanagement/manage.vue'),
      name: 'Add Career',
      props: {
        isEdit: false
      },
      meta: {
        title: 'careerManagement.career.manage',
        noCache: true,
        activeMenu: '/careermanagement/list',
        hidden: true
      }
    }
  ]
}

export default careerRouter
