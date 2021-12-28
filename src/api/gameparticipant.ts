import request from '@/utils/request'
import { IGameParticipantData } from './types'

export const defaultGameparticipantData: IGameParticipantData = {

  id:0,
  enabled:true,
  userId:0,
  inviteeId:0,
  gameId:0,
  status:0,
  
}
export const getGameParticipants = (params: any) =>
  request({
    url: '/participants',
    method: 'get',
    params
  })

export const getGameParticipantById = (id: number) =>
  request({
    url: `/participants/${id}`,
    method: 'get'
  })

export const getGameParticipantInfo = (data: any) =>
  request({
    url: '/participants/me',
    method: 'post',
    data
  })

export const getGameParticipantByEmail = (Gameemail: string) =>
  request({
    url: `/participants/${Gameemail}`,
    method: 'get'
  })

export const updateGameParticipant = (id: number, data: any) =>
  request({
    url: `/participants/${id}`,
    method: 'put',
    data
  })

export const deleteGameParticipant = (Gamename: string) =>
  request({
    url: `/participants/${Gamename}`,
    method: 'delete'
  })

export const addGameParticipant = (data: any) =>
  request({
    url: '/participants/',
    method: 'post',
    data
  })

  export const getGameParticipantsCount = (params: any) =>
    request({
        url: '/participants/count',
        method: 'get',
        params
    })
