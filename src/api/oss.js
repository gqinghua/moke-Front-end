import request from '@/utils/request'
export function policy() {
  return request({
    url:'/aliyun/oss/files-anon',
    method:'post',
  })
}
