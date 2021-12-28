import request from '@/utils/request'
import { IPrizeData } from './types'

export const defaultPrizeData: IPrizeData = {

id: 0,
enabled: true,
title: '',
description: '',
perPersonAmount:null,
numberOfParticipants:null,
numberOfParticipantsLT:null,
numberOfParticipantsPaid:0,
totalAmountCollected:0,
dateTimeOfStart:'',
expiry:'',
prize:null,
secondPrize:null,
image: '',
participantId:0,
winnerId:null,
feature:true,
claimed:false,
  
}
export const getPrizes = (params: any) =>
  request({
    url: '/prizes',
    method: 'get',
    params
  })

export const getPrizeById = (id: number) =>
  request({
    url: `/prizes/${id}`,
    method: 'get'
  })

export const getPrizeInfo = (data: any) =>
  request({
    url: '/prizes/me',
    method: 'post',
    data
  })

export const getPrizeByEmail = (Prizeemail: string) =>
  request({
    url: `/prizes/${Prizeemail}`,
    method: 'get'
  })

export const updatePrize = (id: number, data: any) =>
  request({
    url: `/prizes/${id}`,
    method: 'put',
    data
  })

export const deletePrize = (Prizename: string) =>
  request({
    url: `/prizes/${Prizename}`,
    method: 'delete'
  })

export const addPrize = (data: any) =>
  request({
    url: '/prizes/',
    method: 'post',
    data
  })

  export const getPrizesCount = (params: any) =>
    request({
        url: '/prizes/count',
        method: 'get',
        params
    })
