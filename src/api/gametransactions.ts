import request from '@/utils/request'
import { IGameTransactionData } from './types'

export const defaultGameTransactionData: IGameTransactionData = {

id:0,
userId:0,
gameId:0,
prizeId:0,
status:'',


  
}
export const getGameTransaction = (params: any) =>
  request({
    url: '/game-transactions',
    method: 'get',
    params
  })

export const getGameTransactionById = (id: number) =>
  request({
    url: `/game-transactions/${id}`,
    method: 'get'
  })

export const getGameTransactionInfo = (data: any) =>
  request({
    url: '/game-transactions/me',
    method: 'post',
    data
  })

export const getGameTransactionByEmail = (gametranasactionemail: string) =>
  request({
    url: `/game-transactions/${gametranasactionemail}`,
    method: 'get'
  })

export const updategametranasaction = (id: number, data: any) =>
  request({
    url: `/game-tranasaction/${id}`,
    method: 'patch',
    data
  })

export const deleteGameTransaction = (gametranasactionname: string) =>
  request({
    url: `/game-tranasaction/${gametranasactionname}`,
    method: 'delete'
  })

export const addGameTransaction = (data: any) =>
  request({
    url: '/game-tranasaction/',
    method: 'post',
    data
  })

  export const getGameTransactionsCount = (params: any) =>
    request({
        url: '/game-tranasaction/count',
        method: 'get',
        params
    })
