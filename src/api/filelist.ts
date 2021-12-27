import request from '@/utils/request'
import { IFileData } from './types'

export const defaultFileData: IFileData = {
  id: 0,
  enabled: true,
  symbol:'',
  year:'',
  fileURL:'',
}
export const getFile = (params: any) =>
  request({
    url: '/filelist',
    method: 'get',
    params
  })

export const getFileById = (id: number) =>
  request({
    url: `/filelist/${id}`,
    method: 'get'
  })

export const getFileInfo = (data: any) =>
  request({
    url: '/filelist/me',
    method: 'post',
    data
  })

export const getFileByEmail = (fileemail: string) =>
  request({
    url: `/filelist/${fileemail}`,
    method: 'get'
  })

export const updateFile = (id: number, data: any) =>
  request({
    url: `/filelist/${id}`,
    method: 'patch',
    data
  })

  export const addFile = (data: any) =>
  request({
    url: '/filelist/',
    method: 'post',
    data
  })

export const deleteFile = (filename: string) =>
  request({
    url: `/filelist/${filename}`,
    method: 'delete'
  })

  export const getFilesCount = (params: any) =>
  request({
    url: '/filelist/count',
    method: 'get',
    params
  })

