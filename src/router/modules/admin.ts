import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const adminRouter: RouteConfig = {
  path: '/admins',
  component: Layout,
  redirect: 'noredirect',
  name: 'Admin Management',
  meta: {
    roles: ['superadmin'],
    title: 'adminManagement.title',
    icon: 'user'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/admin/list.vue'),
      name: 'Admins',
      meta: {
        title: 'adminManagement.admins.title',
        noCache: true,
        icon: 'peoples'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/admin/manage.vue'),
      name: 'Edit Admin',
      props: {
        isEdit: true
      },
      meta: {
        title: 'adminManagement.admins.manage',
        noCache: true,
        activeMenu: '/admin/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/admin/manage.vue'),
      name: 'Add Admin',
      props: {
        isEdit: false
      },
      meta: {
        title: 'adminManagement.admins.manage',
        noCache: true,
        activeMenu: '/admin/list',
        hidden: true
      }
    },
    {
      path: '/admin-roles/list',
      component: () => import(/* webpackChunkName: "admins-roles" */ '@/views/admin/admin-roles/list.vue'),
      name: 'Roles',
      meta: {
        title: 'adminManagement.roles.title',
        noCache: true,
        icon: 'skill'
      }
    },
    {
      path: '/admin-roles/add',
      component: () => import(/* webpackChunkName: "admins-roles" */ '@/views/admin/admin-roles/manage.vue'),
      name: 'Add Role',
      props: {
        isEdit: false
      },
      meta: {
        title: 'adminManagement.roles.manage',
        noCache: true,
        hidden: true
      }
    },
    {
      path: '/admin-roles/edit/:id(\\d+)',
      component: () => import(/* webpackChunkName: "admins-roles" */ '@/views/admin/admin-roles/manage.vue'),
      name: 'Edit Role',
      props: {
        isEdit: true
      },
      meta: {
        title: 'adminManagement.roles.manage',
        noCache: true,
        hidden: true
      }
    }
  ]
}

export default adminRouter
