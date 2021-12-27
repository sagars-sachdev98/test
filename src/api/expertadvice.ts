import request from '@/utils/request'
import { IExpertAdviceData } from './types'

export const defaultExpertAdviceData: IExpertAdviceData = {
  id: 0,
  enabled:false,
  fullName:'',
  email:'',
  contactNumber:'',
  occupation:'',
  address:'',
}
export const getExpertAdvices = (params: any) =>
  request({
    url: '/expert-advice',
    method: 'get',
    params
  })

export const getExpertAdviceById = (id: number) =>
  request({
    url: `/expert-advice/${id}`,
    method: 'get'
  })

export const getExpertAdviceInfo = (data: any) =>
  request({
    url: '/expert-advice/me',
    method: 'post',
    data
  })

export const getExpertAdviceByEmail = (ExpertAdviceemail: string) =>
  request({
    url: `/expert-advice/${ExpertAdviceemail}`,
    method: 'get'
  })

export const updateExpertAdvice = (id: number, data: any) =>
  request({
    url: `/expert-advice/${id}`,
    method: 'patch',
    data
  })

  export const addExpertAdvice = (data: any) =>
  request({
    url: '/expert-advice/',
    method: 'post',
    data
  })

export const deleteExpertAdvice = (ExpertAdvicename: string) =>
  request({
    url: `/expert-advice/${ExpertAdvicename}`,
    method: 'delete'
  })

  export const getExpertAdvicesCount = (params: any) =>
  request({
    url: '/expert-advice/count',
    method: 'get',
    params
  })

