import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const companyRouter: RouteConfig = {
  path: '/company',
  component: Layout,
  redirect: 'noredirect',
  name: 'company Management',
  meta: {
    roles: ['superadmin','admin'],
    title: 'companyManagement.title',
    icon: 'clipboard-alt'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/company/list.vue'),
      name: 'Company',
      meta: {
        title: 'companyManagement.title',
        noCache: true,
        icon: 'clipboard-alt',

      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/company/manage.vue'),
      name: 'Edit company',
      props: {
        isEdit: true
      },
      meta: {
        title: 'companyManagement.company.manage',
        noCache: true,
        activeMenu: '/company/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/company/manage.vue'),
      name: 'Add company',
      props: {
        isEdit: false
      },
      meta: {
        title: 'companyManagement.company.manage',
        noCache: true,
        activeMenu: '/company/list',
        icon: 'clipboard-alt',
        hidden:true
      }
    }
  ]
}

export default companyRouter
