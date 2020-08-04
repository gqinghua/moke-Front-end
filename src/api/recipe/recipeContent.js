import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url:'/api-recipe/recipecontent/list',
        method:'post',
        params:params
    })
}
export function deleteRecipecontent(id) {
    return request({
        url:'/api-recipe/recipecontent/delect?id='+id,
        method:'get',
    })
}
export function insertRecipecontent(data) {
    return request({
        url:'/api-recipe/recipecontent/insert',
        method:'post',
        data:data
    })
}
export function getByRecipecontent(id) {
    return request({
        url:'/api-recipe/recipecontent/selectById?id='+id,
        method:'get',
    })
}
export function updateRecipecontent(id,data) {
    return request({
        url:'/api-recipe/recipecontent/update/'+id,
        method:'post',
        data:data
    })
}
