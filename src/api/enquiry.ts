import request from '@/utils/request'
import { IEnquiryData } from './types'

export const defaultEnquiryData: IEnquiryData = {
  id:0,
  state:'',
  name:'',
  ip:'',
  contactNumber:'',
  status:'',
}
export const getEnquiries = (params: any) =>  
  request({
    url: '/search',
    method: 'get',
    params
  })

export const getEnquiryById = (id: number) =>
  request({
    url: `/search/${id}`,
    method: 'get'
  })

  

export const getEnquiryInfo = (data: any) =>
  request({
    url: '/search/me',
    method: 'post',
    data
  })

export const getEnquiryByEmail = (Enquiryemail: string) =>
  request({
    url: `/search/${Enquiryemail}`,
    method: 'get'
  })

export const EnquiryBlog = (id: number, data: any) =>
  request({
    url: `/search/${id}`,
    method: 'patch',
    data
  })

  export const addEnquiry = (data: any) =>
  request({
    url: '/search/',
    method: 'post',
    data
  })

export const deleteEnquiry = (Enquiryname: string) =>
  request({
    url: `/search/${Enquiryname}`,
    method: 'delete'
  })

  export const updateEnquiry = (id: number, data: any) =>
  request({
    url: `/search/${id}`,
    method: 'patch',
    data
  })

  export const getEnquiryCount = (params: any) =>
  request({
    url: '/search/count',
    method: 'get',
    params
  })
