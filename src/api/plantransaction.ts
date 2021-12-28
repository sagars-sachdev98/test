import request from '@/utils/request'
import { IPlanTransactionData } from './types'

export const defaultPlanTransactionData: IPlanTransactionData = {
id:0,
enabled:false,
userId:0,
planId:0,
referenceId:0,

}
export const getPlanTransactions = (params: any) =>
  request({
    url: '/plan-transactions/',
    method: 'get',
    params
  })

export const getPlanTransactionById = (id: number) =>
  request({
    url: `/plan-transactions/${id}`,
    method: 'get'
  })

export const getPlanTransactionInfo = (data: any) =>
  request({
    url: '/plan-transactions/me',
    method: 'post',
    data
  })

export const getPlanTransactionByEmail = (StoreTransactionemail: string) =>
  request({
    url: `/plan-transactions/${StoreTransactionemail}`,
    method: 'get'
  })

  export const updatePlanTransaction = (id: number, data: any) =>
  request({
    url: `/plan-transactions/${id}`,
    method: 'patch',
    data
  })

export const StoreStorePlanTransaction = (id: number, data: any) =>
  request({
    url: `/plan-transactions/${id}`,
    method: 'patch',
    data
  })

export const deletePlanTransaction = (StoreTransactionname: string) =>
  request({
    url: `/plan-transactions/${StoreTransactionname}`,
    method: 'delete'
  })

export const addPlanTransaction = (data: any) =>
  request({
    url: '/plan-transactions/',
    method: 'post',
    data
  })

  export const getPlanTransactionsCount = (params: any) =>
    request({
        url: '/plan-transactions/count',
        method: 'get',
        params
    })
