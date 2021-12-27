import request from '@/utils/request'
import { IFileData } from './types'

export const defaultFileData: IFileData = {
  id: 0,
  enabled: true,
  symbol:'',
  year:'',
  fileURL:'',
}
export const getFiles = (params: any) =>
  request({
    url: '/files',
    method: 'get',
    params
  })

export const getFileById = (id: number) =>
  request({
    url: `/files/${id}`,
    method: 'get'
  })

export const getFileInfo = (data: any) =>
  request({
    url: '/files/me',
    method: 'post',
    data
  })

export const getFileByEmail = (fileemail: string) =>
  request({
    url: `/files/${fileemail}`,
    method: 'get'
  })

export const updateFile = (id: number, data: any) =>
  request({
    url: `/files/${id}`,
    method: 'patch',
    data
  })

  export const addFile = (data: any) =>
  request({
    url: '/files/',
    method: 'post',
    data
  })

export const deleteFile = (filename: string) =>
  request({
    url: `/files/${filename}`,
    method: 'delete'
  })

  export const getFilesCount = (params: any) =>
  request({
    url: '/files/count',
    method: 'get',
    params
  })

