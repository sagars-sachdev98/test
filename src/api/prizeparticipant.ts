import request from '@/utils/request'
import { IPrizeParticipantData } from './types'

export const defaultPrizeparticipantData: IPrizeParticipantData = {

  id:0,
  enabled:true,
  userId:0,
  prizeId:0,
  scratched:false,
  
}
export const getPrizeParticipants = (params: any) =>
  request({
    url: '/prize-participants',
    method: 'get',
    params
  })

export const getPrizeParticipantById = (id: number) =>
  request({
    url: `/prize-participants/${id}`,
    method: 'get'
  })

export const getPrizeParticipantInfo = (data: any) =>
  request({
    url: '/prize-participants/me',
    method: 'post',
    data
  })

export const getPrizeParticipantByEmail = (Prizeemail: string) =>
  request({
    url: `/prize-participants/${Prizeemail}`,
    method: 'get'
  })

export const updatePrizeParticipant = (id: number, data: any) =>
  request({
    url: `/prize-participants/${id}`,
    method: 'put',
    data
  })

export const deletePrizeParticipant = (Prizename: string) =>
  request({
    url: `/prize-participants/${Prizename}`,
    method: 'delete'
  })

export const addPrizeParticipant = (data: any) =>
  request({
    url: '/prize-participants/',
    method: 'post',
    data
  })

  export const getPrizeParticipantsCount = (params: any) =>
    request({
        url: '/prize-participants/count',
        method: 'get',
        params
    })
