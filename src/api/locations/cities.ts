import request from '@/utils/request'
import { ICityData } from '../types'

export const defaultCityData: ICityData = {
  id: 0,
  enabled: true,
  stateId: undefined,
  countryId: undefined,
  name: '',
  country: {
    id: undefined
  },
  state: {
    id: undefined
  }

}
export const getCities = (params: any) =>
  request({
    url: '/cities',
    method: 'get',
    params
  })

export const getCityById = (id: number) =>
  request({
    url: `/cities/${id}`,
    method: 'get'
  })

export const updateCity = (id: number, data: any) =>
  request({
    url: `/cities/${id}`,
    method: 'patch',
    data
  })

export const deleteCity = (id: string) =>
  request({
    url: `/cities/${id}`,
    method: 'delete'
  })

export const createCity = (data: any) =>
  request({
    url: '/cities/',
    method: 'post',
    data
  })
