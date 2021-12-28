import request from '@/utils/request'
import { IBankData } from './types'

export const defaultBankData: IBankData = {

id:null,
userId:null,
bankAccountNumber:'',
ifscCode:null,
bankName:null,
branchName:null,
bankCustomerName:null,
createdTimestamp:null,
createdBy:null,



  
}
export const getBank = (params: any) =>
  request({
    url: '/banks',
    method: 'get',
    params
  })

export const getBankById = (id: number) =>
  request({
    url: `/banks/${id}`,
    method: 'get'
  })

export const getBankInfo = (data: any) =>
  request({
    url: '/banks/me',
    method: 'post',
    data
  })

export const getBankByEmail = (Bankemail: string) =>
  request({
    url: `/banks/${Bankemail}`,
    method: 'get'
  })

export const updateBank = (id: number, data: any) =>
  request({
    url: `/banks/${id}`,
    method: 'patch',
    data
  })

export const deleteBank = (Bankname: string) =>
  request({
    url: `/banks/${Bankname}`,
    method: 'delete'
  })

export const addBank = (data: any) =>
  request({
    url: '/banks/',
    method: 'post',
    data
  })

  export const getBanksCount = (params: any) =>
    request({
        url: '/banks/count',
        method: 'get',
        params
    })
