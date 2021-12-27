import request from '@/utils/request'
import { ILoginData } from './types'

export const defaultLoginLogData: ILoginData = {
  id:0,
  ip:'',
  username:'',
  location:'',
  enabled:true,
}
export const getLoginLogs = (params: any) =>
  request({
    url: '/login-logs',
    method: 'get',
    params
  })

export const getLoginLogById = (id: number) =>
  request({
    url: `/login-logs/${id}`,
    method: 'get'
  })

export const getLoginLogInfo = (data: any) =>
  request({
    url: '/login-logs/me',
    method: 'post',
    data
  })

export const getLoginLogByEmail = (LoginLogemail: string) =>
  request({
    url: `/login-logs/${LoginLogemail}`,
    method: 'get'
  })

export const updateLoginLog = (id: number, data: any) =>
  request({
    url: `/login-logs/${id}`,
    method: 'patch',
    data
  })

  export const addLoginLog = (data:any) =>
  request({
    url: '/login-logs/',
    method: 'post',
    data
  })

export const deleteLoginLog = (LoginLogname: string) =>
  request({
    url: `/login-logs/${LoginLogname}`,
    method: 'delete'
  })

