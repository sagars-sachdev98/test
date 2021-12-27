import request from '@/utils/request'
import { INotificationsData } from '../types'

export const defaultNotificationsData: INotificationsData = {
  id: 0,
  enabled: true,
  title: '',
  message: '',
  image: null,
  link: null,
  page: null,
  params: 'NA',
  sendToAll: true,
}
export const getNotifications = (params: any) =>
  request({
    url: '/notifications',
    method: 'get',
    params
  })

export const getNotificationsById = (id: number) =>
  request({
    url: `/notifications/${id}`,
    method: 'get'
  })

export const updateNotifications = (id: number, data: any) =>
  request({
    url: `/notifications/${id}`,
    method: 'patch',
    data
  })

export const deleteNotifications = (id: string) =>
  request({
    url: `/notifications/${id}`,
    method: 'delete'
  })

export const createNotifications = (data: any) =>
  request({
    url: '/notifications/',
    method: 'post',
    data
  })

export const getFilters = (data: any) =>
  request({
    url: '/notifications/fetch',
    method: 'post',
    data
  })
