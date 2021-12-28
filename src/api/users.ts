import request from '@/utils/request'
import { IUserData } from './types'

export const defaultUserData: IUserData = {
  id: 0,
  enabled: true,
  fullName: '',
  email: '',
  contactNumber: '',
  password: '',
  realMoney:0,
  fakeMoney:0,
  numberOfGamesWon:0,
  numberOfPrizesWon:0,
  device: '',
  OSVersion: '',
  appVersion: '',
  createdBy: 0,
  // createdTimestamp: '',
  deviceId: '',
  manufacturer: '',
  model: '',
  platform: '',
  pushId: '',
  // pushUpdatedTimestamp: '',
  // updatedBy: 0,
  // updatedTimestamp: '',
  uuid: '',
}
export const getUsers = (params: any) =>
  request({
    url: '/users',
    method: 'get',
    params
  })
  export const getUsersCount = (params: any) =>
  request({
    url: '/users/count',
    method: 'get',
    params
  })

export const getUserById = (id: number) =>
  request({
    url: `/users/${id}`,
    method: 'get'
  })

export const getUserByEmail = (adminemail: string) =>
  request({
    url: `/users/${adminemail}`,
    method: 'get'
  })

export const updateUser = (id: number, data: any) =>
  request({
    url: `/users/${id}`,
    method: 'patch',
    data
  })

export const deleteUser = (adminname: string) =>
  request({
    url: `/users/${adminname}`,
    method: 'delete'
  })

export const login = (data: any) =>
  request({
    url: '/users/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/users/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/users/add',
    method: 'post',
    data
  })

export const getCompany = (params: any) =>
  request({
    url: '/users-roles',
    method: 'get',
    params
  })
