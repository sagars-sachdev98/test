import request from '@/utils/request'
import { ILocationData } from '../types'

export const defaultLocationData: ILocationData = {
  id: 0,
  enabled: true,
  contactNumber1: null,
  contactNumber2: null,
  address: null,
  spocName: null,
  spocEmail: null,
  spocContactNumber: null,
  coordinate: null,
  pincode: null,
  hotDesking: null,
  externalLink: null,
  siteId: null,
  site: {
    id: null
  },
  companyId: null,
  company: {
    id: null
  },
  businessId: null,
  business: {
    id: null
  },
  brandId: null,
  brand: {
    id: null
  },
  categoryId: null,
  category: {
    id: null
  },
  stateId: null,
  state: {
    id: null
  },
  countryId: null,
  country: {
    id: null
  },
  cityId: null,
  city: {
    id: null
  }
}
export const getLocations = (params: any) =>
  request({
    url: '/locations',
    method: 'get',
    params
  })

export const getLocationById = (id: number) =>
  request({
    url: `/locations/${id}`,
    method: 'get'
  })

export const updateLocation = (id: number, data: any) =>
  request({
    url: `/locations/${id}`,
    method: 'patch',
    data
  })

export const deleteLocation = (id: string) =>
  request({
    url: `/locations/${id}`,
    method: 'delete'
  })

export const createLocation = (data: any) =>
  request({
    url: '/locations/',
    method: 'post',
    data
  })

export const getFilters = (data: any) =>
  request({
    url: '/locations/fetch',
    method: 'post',
    data
  })
export const getLocationCount = (params: any) =>
  request({
    url: '/locations/count',
    method: 'get',
    params
  })
