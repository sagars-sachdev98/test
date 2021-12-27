import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const enquiryRouter: RouteConfig = {
  path: '/enquiry',
  component: Layout,
  redirect: 'noredirect',
  name: 'enquiry Management',
  meta: {
    roles: ['superadmin','admin','view-only'],
    title: 'enquiryManagement.title',
    icon: 'search'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/enquiry/list.vue'),
      name: 'enquiries',
      meta: {
        title: 'enquiryManagement.title',
        noCache: true,
        icon: 'search'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/enquiry/manage.vue'),
      name: 'Edit Offer',
      props: {
        isEdit: true
      },
      meta: {
        title: 'enquiryManagement.enquiry.manage',
        noCache: true,
        activeMenu: '/enquiry/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/enquiry/manage.vue'),
      name: 'Add enquiry',
      props: {
        isEdit: false
      },
      meta: {
        title: 'enquiryManagement.enquiry.manage',
        noCache: true,
        activeMenu: '/enquiry/list',
        hidden: true
      }
    }
  ]
}

export default enquiryRouter
