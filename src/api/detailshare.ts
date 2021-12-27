import request from '@/utils/request'
import { IDetailShareData } from './types'

export const defaultDetailShareData: IDetailShareData = {
  id:0,
  enabled:false,
  fullName:	'',
  email:'',
  contactNumber:'',
  enquiredIds:'',
  occupation:'',
  address:'',
  amountToPay:'',
  
}
export const getDetailShare = (params: any) =>  
  request({
    url: '/detail-share',
    method: 'get',
    params
  })

export const getDetailShareById = (id: number) =>
  request({
    url: `/detail-share/${id}`,
    method: 'get'
  })

  

export const getDetailShareInfo = (data: any) =>
  request({
    url: '/detail-share/me',
    method: 'post',
    data
  })

export const getDetailShareByEmail = (DeatailShareemail: string) =>
  request({
    url: `/detail-share/${DeatailShareemail}`,
    method: 'get'
  })

export const DetailShareBlog = (id: number, data: any) =>
  request({
    url: `/detail-share/${id}`,
    method: 'patch',
    data
  })

  export const addDetailShare = (data: any) =>
  request({
    url: '/detail-share/',
    method: 'post',
    data
  })

export const deleteDetailShare = (DeatailSharename: string) =>
  request({
    url: `/detail-share/${DeatailSharename}`,
    method: 'delete'
  })

  export const updateDetailShare = (id: number, data: any) =>
  request({
    url: `/detail-share/${id}`,
    method: 'patch',
    data
  })

  export const getDetailShareCount = (params: any) =>
  request({
    url: '/detail-share/count',
    method: 'get',
    params
  })
