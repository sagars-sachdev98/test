import request from '@/utils/request'
import { IBlogData } from './types'

export const defaultBlogData: IBlogData = {
  id:0,
  title:'',
  content:'',
  blogWriter:'',
  enabled:true,
  featured:true,
}
export const getBlogs = (params: any) =>
  request({
    url: '/blogs',
    method: 'get',
    params
  })

export const getBlogById = (id: number) =>
  request({
    url: `/blogs/${id}`,
    method: 'get'
  })

export const getBlogInfo = (data: any) =>
  request({
    url: '/blogs/me',
    method: 'post',
    data
  })

export const getBlogByEmail = (Blogemail: string) =>
  request({
    url: `/blogs/${Blogemail}`,
    method: 'get'
  })

export const updateBlog = (id: number, data: any) =>
  request({
    url: `/blogs/${id}`,
    method: 'patch',
    data
  })

  export const addBlog = (data: any) =>
  request({
    url: '/blogs/',
    method: 'post',
    data
  })

export const deleteBlog = (Blogname: string) =>
  request({
    url: `/blogs/${Blogname}`,
    method: 'delete'
  })

