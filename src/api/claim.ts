import request from '@/utils/request'
import { IClaimData } from './types'

export const defaultClaimData: IClaimData = {

id:null,
enabled:true,
userId:null,
bankId:null,
amount:null,
status:0,


  
}
export const getClaim = (params: any) =>
  request({
    url: '/claims',
    method: 'get',
    params
  })

export const getClaimById = (id: number) =>
  request({
    url: `/claims/${id}`,
    method: 'get'
  })

export const getClaimInfo = (data: any) =>
  request({
    url: '/claims/me',
    method: 'post',
    data
  })

export const getClaimByEmail = (Claimemail: string) =>
  request({
    url: `/claims/${Claimemail}`,
    method: 'get'
  })

export const updateClaim = (data: any) =>
  request({
    url: `/claims/`,
    method: 'put',
    data
  })

export const deleteClaim = (Claimname: string) =>
  request({
    url: `/claims/${Claimname}`,
    method: 'delete'
  })

export const addClaim = (data: any) =>
  request({
    url: '/claims/',
    method: 'post',
    data
  })

  export const getClaimsCount = (params: any) =>
    request({
        url: '/claims/count',
        method: 'get',
        params
    })
