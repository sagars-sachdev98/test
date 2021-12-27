import request from '@/utils/request'
import { IUserData } from './types'

export const defaultUserData: IUserData = {
  id: 0,
  enabled: true,
  fullName: '',
  email: '',
  contactNumber: '',
  occupation:'',
  address:'',
}
export const getUsers = (params: any) =>
  request({
    url: '/agent',
    method: 'get',
    params
  })

export const getUserById = (id: number) =>
  request({
    url: `/agent/${id}`,
    method: 'get'
  })

export const getUserByEmail = (adminemail: string) =>
  request({
    url: `/agent/${adminemail}`,
    method: 'get'
  })

export const updateUser = (id: number, data: any) =>
  request({
    url: `/agent/${id}`,
    method: 'patch',
    data
  })

export const deleteUser = (adminname: string) =>
  request({
    url: `/agent/${adminname}`,
    method: 'delete'
  })

export const login = (data: any) =>
  request({
    url: '/agent/login',
    method: 'post',
    data
  })

export const logout = () =>
  request({
    url: '/agent/logout',
    method: 'post'
  })

export const register = (data: any) =>
  request({
    url: '/agent/add',
    method: 'post',
    data
  })

export const getCompany = (params: any) =>
  request({
    url: '/agent-roles',
    method: 'get',
    params
  })

  export const getUserCount = (params: any) =>
  request({
    url: '/agent/count',
    method: 'get',
    params
  })