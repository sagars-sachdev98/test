import request from '@/utils/request'
import { IVolunteerData } from '../types'

export const defaultVolunteerData: IVolunteerData = {
  id: 0,
  enabled: true,
  fullName: '',
  email: null,
  contactNumber: null,
  locationId: null,
  location: {
    id: null
  }

}
export const getVolunteers = (params: any) =>
  request({
    url: '/volunteers',
    method: 'get',
    params
  })

export const getVolunteerById = (id: number) =>
  request({
    url: `/volunteers/${id}`,
    method: 'get'
  })

export const updateVolunteer = (id: number, data: any) =>
  request({
    url: `/volunteers/${id}`,
    method: 'patch',
    data
  })

export const deleteVolunteer = (id: string) =>
  request({
    url: `/volunteers/${id}`,
    method: 'delete'
  })

export const createVolunteer = (data: any) =>
  request({
    url: '/volunteers/',
    method: 'post',
    data
  })
