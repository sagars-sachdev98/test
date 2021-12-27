import request from '@/utils/request'
import { ICountryData } from '../types'

export const defaultCountryData: ICountryData = {
  id: 0,
  enabled: true,
  code: '',
  name: '',
  zipCodeMinLength: 0,
  zipCodeMaxLength: 0
}
export const getCountries = (params: any) =>
  request({
    url: '/countries',
    method: 'get',
    params
  })

export const getCountryById = (id: number) =>
  request({
    url: `/countries/${id}`,
    method: 'get'
  })

export const updateCountry = (id: number, data: any) =>
  request({
    url: `/countries/${id}`,
    method: 'patch',
    data
  })

export const deleteCountry = (id: string) =>
  request({
    url: `/countries/${id}`,
    method: 'delete'
  })

export const createCountry = (data: any) =>
  request({
    url: '/countries/',
    method: 'post',
    data
  })
