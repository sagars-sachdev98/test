import request from '@/utils/request'
import { ICareerData } from './types'

export const defaultCareerData: ICareerData = {
  id:0,
  postTitle:'',
  location:'',


  
}
export const getCareer = (params: any) =>
  request({
    url: '/career',
    method: 'get',
    params
  })

export const getCareerById = (id: number) =>
  request({
    url: `/career/${id}`,
    method: 'get'
  })

export const getCareerInfo = (data: any) =>
  request({
    url: '/career/me',
    method: 'post',
    data
  })

export const getCareerByEmail = (Careeremail: string) =>
  request({
    url: `/career/${Careeremail}`,
    method: 'get'
  })

export const updateCareer = (id: number, data: any) =>
  request({
    url: `/career/${id}`,
    method: 'patch',
    data
  })

export const deleteCareer = (Careername: string) =>
  request({
    url: `/career/${Careername}`,
    method: 'delete'
  })

export const addCareer = (data: any) =>
  request({
    url: '/career/',
    method: 'post',
    data
  })

  export const getCareersCount = (params: any) =>
    request({
        url: '/career/count',
        method: 'get',
        params
    })
