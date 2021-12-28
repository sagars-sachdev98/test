import request from '@/utils/request'
import { IGameData } from './types'

export const defaultGameData: IGameData = {
  id:0,
  enabled:true,
  userId:null,
  winnerId:0,
  prizeAmount:0,
  numberOfParticipants:0,
  noOfParticipantsPaid:0,
  totalAmountCollected:0,
  gameCode:'',
  claimed:false,
  status:null,
  perPersonAmount:0,
  winnerCount:null,
  // winner_1:null,
  // winner_2:null,
  // winner_3:null,
  // winner_1_id:null,
  // winner_2_id:null,
  // winner_3_id:null,
  isRealMoney:true,
 
}

export const getGame = (params: any) =>
  request({
    url: '/games',
    method: 'get',
    params
  })

export const getGameById = (id: number) =>
  request({
    url: `/games/${id}`,
    method: 'get'
  })

export const getGameInfo = (data: any) =>
  request({
    url: '/games/me',
    method: 'post',
    data
  })

export const getGameByEmail = (gamesemail: string) =>
  request({
    url: `/games/${gamesemail}`,
    method: 'get'
  })

export const updateGame = (id: number, data: any) =>
  request({
    url: `/games/${id}`,
    method: 'patch',
    data
  })

export const deleteGame = (gamesname: string) =>
  request({
    url: `/games/${gamesname}`,
    method: 'delete'
  })

export const addGame = (data: any) =>
  request({
    url: '/games/',
    method: 'post',
    data
  })

  export const getGameCount = (params: any) =>
    request({
        url: '/games/count',
        method: 'post',
        params
    })
