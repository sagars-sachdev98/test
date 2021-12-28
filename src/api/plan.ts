import request from '@/utils/request'
import { IPlanData } from './types'

export const defaultPlanData: IPlanData = {
  id: 0,
  enabled:true,	
  planName:'',
  coins:null,
  prize:null,
  planExpiry:null,
  noOfUsersPurchased: 0,
}
export const getPlans = (params: any) =>
  request({
    url: '/plans',
    method: 'get',
    params
  })

export const getPlanById = (id: number) =>
  request({
    url: `/plans/${id}`,
    method: 'get'
  })

export const getPlanInfo = (data: any) =>
  request({
    url: '/plans/me',
    method: 'post',
    data
  })

export const getPlanByEmail = (StorePlanemail: string) =>
  request({
    url: `/plans/${StorePlanemail}`,
    method: 'get'
  })

  export const updatePlan = (id: number, data: any) =>
  request({
    url: `/plans/${id}`,
    method: 'patch',
    data
  })

export const StoreStorePlan = (id: number, data: any) =>
  request({
    url: `/plans/${id}`,
    method: 'patch',
    data
  })

export const deletePlan = (StorePlanname: string) =>
  request({
    url: `/plans/${StorePlanname}`,
    method: 'delete'
  })

export const addPlan = (data: any) =>
  request({
    url: '/plans/',
    method: 'post',
    data
  })

  export const getPlansCount = (params: any) =>
    request({
        url: '/plans/count',
        method: 'get',
        params
    })
