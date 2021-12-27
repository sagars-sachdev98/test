import request from '@/utils/request'

export const toggleEnable = (url: string, data: any) =>
  request({
    url: url,
    method: 'patch',
    data
  })

export const uploadFile = (data: any, onUploadProgressCallBack: any) =>
  request({
    url: '/companies/upload',
    method: 'post',
    data,
    onUploadProgress: onUploadProgressCallBack
  })

  export const uploadShares = (data: any, onUploadProgressCallBack: any) =>
  request({
    url: '/files/upload',
    method: 'post',
    data,
    onUploadProgress: onUploadProgressCallBack
  })


export const getAppVersions = () =>
  request({
    url: '/common/app_version',
    method: 'get'
  })
