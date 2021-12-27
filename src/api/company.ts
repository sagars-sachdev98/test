import request from '@/utils/request'
import { ICompanyData } from './types'

export const defaultCompanyData: ICompanyData = {
  id: 0,
  enabled: true,
  symbol:'',
  year:'',
  fileURL:'',
  type:'',
  shareValue:0,
  companyName:'',
}
export const getCompanies = (params: any) =>
  request({
    url: '/Companies',
    method: 'get',
    params
  })

export const getCompanyById = (id: number) =>
  request({
    url: `/companies/${id}`,
    method: 'get'
  })

export const getCompanyInfo = (data: any) =>
  request({
    url: '/companies/me',
    method: 'post',
    data
  })

export const getCompanyByEmail = (fileemail: string) =>
  request({
    url: `/companies/${fileemail}`,
    method: 'get'
  })

export const updateCompany = (id: number, data: any) =>
  request({
    url: `/companies/${id}`,
    method: 'patch',
    data
  })

  export const addCompany = (data: any) =>
  request({
    url: '/Companies/',
    method: 'post',
    data
  })

export const deleteFile = (filename: string) =>
  request({
    url: `/Companies/${filename}`,
    method: 'delete'
  })
  export const getCompaniesCount = (params: any) =>
  request({
    url: '/Companies/count',
    method: 'get',
    params
  })
