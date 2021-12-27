import request from '@/utils/request'
import { ILocationsAmenityData } from '../types'

export const defaultLocationsAmenityData: ILocationsAmenityData = {
  id: 0,
  amenityIds: [],
  amenities: []

}
export const getLocationsAmenities = (params: any) =>
  request({
    url: '/locations/amenities',
    method: 'get',
    params
  })

export const getLocationsAmenityById = (id: number) =>
  request({
    url: `/locations-amenities/${id}`,
    method: 'get'
  })

export const updateLocationsAmenity = (id: number, data: any) =>
  request({
    url: `/locations-amenities/${id}`,
    method: 'patch',
    data
  })

export const deleteLocationsAmenity = (id: string) =>
  request({
    url: `/locations-amenities/${id}`,
    method: 'delete'
  })

export const createLocationsAmenity = (data: any) =>
  request({
    url: '/locations/addAmenity/',
    method: 'post',
    data
  })
