import request from '@/utils/request'
import { ILocationsPhotoData } from '../types'

export const defaultLocationsPhotoData: ILocationsPhotoData = {
  id: 0,
  enabled: true,
  image: null,
  locationId: null,
  location: {
    id: null
  },
  userId: null,
  user: {
    id: null
  },
  adminId: null,
  admin: {
    id: null
  }
}
export const getLocationsPhotos = (params: any) =>
  request({
    url: '/locations-photos',
    method: 'get',
    params
  })

export const getLocationsPhotoById = (id: number) =>
  request({
    url: `/locations-photos/${id}`,
    method: 'get'
  })

export const updateLocationsPhoto = (id: number, data: any) =>
  request({
    url: `/locations-photos/${id}`,
    method: 'patch',
    data
  })

export const deleteLocationsPhoto = (id: string) =>
  request({
    url: `/locations-photos/${id}`,
    method: 'delete'
  })

export const createLocationsPhoto = (data: any) =>
  request({
    url: '/locations-photos/',
    method: 'post',
    data
  })
