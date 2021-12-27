import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

const blogRouter: RouteConfig = {
  path: '/blog',
  component: Layout,
  redirect: 'noredirect',
  name: 'blog Management',
  meta: {
    title: 'blogManagement.title',
    icon: 'blogger-alt'
  },
  children: [
    {
      path: 'list',
      component: () => import(/* webpackChunkName: "admins-list" */ '@/views/blog/list.vue'),
      name: 'blogs',
      meta: {
        title: 'blogManagement.title',
        noCache: true,
        icon: 'blogger-alt'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/blog/manage.vue'),
      name: 'Edit Offer',
      props: {
        isEdit: true
      },
      meta: {
        title: 'blogManagement.blog.manage',
        noCache: true,
        activeMenu: '/blog/list',
        hidden: true
      }
    },
    {
      path: 'add',
      component: () => import('@/views/blog/manage.vue'),
      name: 'Add blog',
      props: {
        isEdit: false
      },
      meta: {
        title: 'blogManagement.blog.manage',
        noCache: true,
        activeMenu: '/blog/list',
        hidden: true
      }
    }
  ]
}

export default blogRouter
