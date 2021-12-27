import request from '@/utils/request'
import { IUsersData } from '../types'

export const defaultUsersData: IUsersData = {
  id: 0,
  enabled: false,
  fullName: '',
  contactNumber: '',
  email: '',
  isMonthlyNewsletter: '',
  isProfileUpdate: '',
  usersRoleId: 1,
  group: '',
  pushId: '',
  device: '',
  deviceId: '',
  platform: '',
  OSVersion: '',
  uuid: '',
  model: '',
  manufacturer: '',
  appVersion: '',
  createdBy: 0,
  createdTimestamp: '',
  updatedBy: 0,
  updatedTimestamp: '',
  pushUpdatedTimestamp: ''
}
export const getUsers = (params: any) =>
  request({
    url: '/Users',
    method: 'get',
    params
  })

export const getUsersById = (id: number) =>
  request({
    url: `/Users/${id}`,
    method: 'get'
  })

export const updateUsers = (id: number, data: any) =>
  request({
    url: `/Users/${id}`,
    method: 'patch',
    data
  })

export const deleteUsers = (id: string) =>
  request({
    url: `/Users/${id}`,
    method: 'delete'
  })

export const createUsers = (data: any) =>
  request({
    url: '/Users/',
    method: 'post',
    data
  })
export const getUsersCount = (params: any) =>
  request({
    url: '/Users/count',
    method: 'get',
    params
  })
