import request from '@/utils/request'
import { IStateData } from '../types'

export const defaultStateData: IStateData = {
  id: 0,
  enabled: true,
  countryId: undefined,
  name: '',
  country: {
    id: undefined
  }
}
export const getStates = (params: any) =>
  request({
    url: '/states',
    method: 'get',
    params
  })

export const getStateById = (id: number) =>
  request({
    url: `/states/${id}`,
    method: 'get'
  })

export const updateState = (id: number, data: any) =>
  request({
    url: `/states/${id}`,
    method: 'patch',
    data
  })

export const deleteState = (id: string) =>
  request({
    url: `/states/${id}`,
    method: 'delete'
  })

export const createState = (data: any) =>
  request({
    url: '/states/',
    method: 'post',
    data
  })
