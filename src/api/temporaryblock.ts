import request from '@/utils/request'
import { ITemporaryBlockData } from './types'

export const defaultTemporaryBlockData: ITemporaryBlockData = {
  id:0,
  ip:'',
  lastHitDateTime:'',
  isBlocked:false,
  count:0
}
export const getTemporaryBlocks = (params: any) =>
  request({
    url: '/temporary-block',
    method: 'get',
    params
  })

export const getTemporaryBlockById = (id: number) =>
  request({
    url: `/temporary-block/${id}`,
    method: 'get'
  })

export const getTemporaryBlockInfo = (data: any) =>
  request({
    url: '/temporary-block/me',
    method: 'post',
    data
  })

export const getTemporaryBlockByEmail = (TemporaryBlockemail: string) =>
  request({
    url: `/temporary-block/${TemporaryBlockemail}`,
    method: 'get'
  })

export const updateTemporaryBlock = (id: number, data: any) =>
  request({
    url: `/temporary-block/${id}`,
    method: 'patch',
    data
  })

  export const addTemporaryBlock = (data: any) =>
  request({
    url: '/temporary-block/',
    method: 'post',
    data
  })

export const deleteTemporaryBlock = (TemporaryBlockname: string) =>
  request({
    url: `/temporary-block/${TemporaryBlockname}`,
    method: 'delete'
  })

