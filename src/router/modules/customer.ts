import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const customerAccountRouter: RouteConfig = {
  path: '/customer',
  component: Layout,
  redirect: 'noredirect',
  name: 'Customer Management',
  meta: {
    // roles: ['superadmin', 'admin'],
    title: 'customerManagement.title',
    icon: 'user'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/customers/list.vue'),
      name: 'Customers',
      meta: {
        title: 'customerManagement.admins.title',
        noCache: true,
        icon: 'peoples'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/customers/manage.vue'),
      name: 'Edit Customer',
      props: {
        isEdit: true
      },
      meta: {
        title: 'customerManagement.admins.manage',
        noCache: true,
        activeMenu: '/customers/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/customers/manage.vue'),
      name: 'Add Customer',
      props: {
        isEdit: false
      },
      meta: {
        title: 'customerManagement.admins.manage',
        noCache: true,
        activeMenu: '/customers/list',
        hidden: true
      }
    }
  ]
}

export default customerAccountRouter
