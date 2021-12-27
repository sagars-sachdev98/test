import request from '@/utils/request'
import { IPermanentBlockData } from './types'

export const defaultPermanentBlockData: IPermanentBlockData = {
  id:0,
  ip:'',
  message:'',
}
export const getPermanentBlocks = (params: any) =>
  request({
    url: '/permanent-block',
    method: 'get',
    params
  })

export const getPermanentBlockById = (id: number) =>
  request({
    url: `/permanent-block/${id}`,
    method: 'get'
  })

export const getPermanentBlockInfo = (data: any) =>
  request({
    url: '/permanent-block/me',
    method: 'post',
    data
  })

export const getPermanentBlockByEmail = (PermanentBlockemail: string) =>
  request({
    url: `/permanent-block/${PermanentBlockemail}`,
    method: 'get'
  })

export const updatePermanentBlock = (id: number, data: any) =>
  request({
    url: `/permanent-block/${id}`,
    method: 'patch',
    data
  })

  export const addPermanentBlock = (data: any) =>
  request({
    url: '/permanent-block/',
    method: 'post',
    data
  })

export const deletePermanentBlock = (PermanentBlockname: string) =>
  request({
    url: `/permanent-block/${PermanentBlockname}`,
    method: 'delete'
  })

