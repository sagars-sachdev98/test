import request from '@/utils/request'
import { IShareData } from './types'

export const defaultShareData: IShareData = {
  id: 0,
  enabled: true,
  year:	' ',
  fileId:	0,
  investorFirstName:	' ',
  investorMiddleName:	' ',
  investorLastName:	' ',
  fatherHusbandFirstName:	' ',
  fatherHusbandMiddleName:	' ',
  fatherHusbandLastName:	' ',
  address:	' ',
  city:	' ',
  pincode:	' ',
  folioNumber:	'',
  clientAccountNumber:	'',
  numberOfShares:	0,
  nominalValueOfShares:	0,
  actualDateOfTransferToIEPF:	' ',

}
export const getShares = (params: any) =>
  request({
    url: '/shares',
    method: 'get',
    params
  })

export const getShareById = (id: 0,) =>
  request({
    url: `/shares/${id}`,
    method: 'get'
  })


  export const getSearchById = (search: any) =>
  request({
    url: `/search/global/${search}`,
    method: 'get'
  })

export const getShareInfo = (data: any) =>
  request({
    url: '/shares/me',
    method: 'post',
    data
  })

export const getShareByEmail = (shareemail: string) =>
  request({
    url: `/shares/${shareemail}`,
    method: 'get'
  })

export const updateShare = (id: number, data: any) =>
  request({
    url: `/shares/${id}`,
    method: 'patch',
    data
  })

  export const addShare = (data: any) =>
  request({
    url: '/shares/',
    method: 'post',
    data
  })

export const deleteShare = (sharename: string) =>
  request({
    url: `/shares/${sharename}`,
    method: 'delete'
  })

  export const getSharesCount = (params: any) =>
  request({
    url: '/shares/count',
    method: 'get',
    params
  })

