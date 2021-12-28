import request from '@/utils/request'
import { ICategoryData } from '../types'

export const fileTransferHeaders = {}

export const defaultCategoryData: ICategoryData = {
  id: 0,
  enabled: true,
  name: '',
  clickCount: 0,
  image: '',
  redirection: '',
  priority: 1,
  createdBy: 1,
  mallIds: 0
}
export const getCategories = (params: any) =>
  request({
    url: '/categories',
    method: 'get',
    params
  })

export const getCategoryById = (id: number) =>
  request({
    url: `/categories/${id}`,
    method: 'get'
  })

export const updateCategory = (id: number, data: any) =>
  request({
    url: `/categories/${id}`,
    method: 'patch',
    data
  })

export const deleteCategory = (id: string) =>
  request({
    url: `/categories/${id}`,
    method: 'delete'
  })

export const createCategory = (data: any) =>
  request({
    url: '/categories/',
    method: 'post',
    data
  })
