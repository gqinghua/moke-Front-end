import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url:'/api-recipe/recipe/list',
        method:'post',
        params:params
    })
}
export function updateShowStatus(data) {
    return request({
        url:'/api-user/sys/sysUser/update/showStatus',
        method:'post',
        data:data
    })
}
export function updateFactoryStatus(data) {
    return request({
        url:'/api-user/sys/sysUser/update/factoryStatus',
        method:'post',
        data:data
    })
}
export function deleteRecipe(id) {
    return request({
        url:'/api-recipe/recipe/delect?id='+id,
        method:'get',
    })
}
export function getByRecipe(id) {
    return request({
        url:'/api-recipe/recipe/selectById?id='+id,
        method:'get',
    })
}
export function insertRecipe(data) {
    return request({
        url:'/api-recipe/recipe/insert',
        method:'post',
        data:data
    })
}
export function updateRecipe(id,data) {
    return request({
        url:'/api-recipe/recipe/update/'+id,
        method:'post',
        data:data
    })
}

export function getrecipecontentList(params) {
    return request({
        url:'/api-recipe/recipecontent/list',
        method:'post',
        params:params
    })
}
