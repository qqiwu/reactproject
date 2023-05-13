import request from '../utils/request'

// 加入购物车
export function addCart(params: { userid: string, proid: string, num: number }) {
    return request.post('/cart/add', params)
}

// 获取购物车列表数据
export function getCartListData(params: { userid: string }) {
    return request.post('/cart/list', params)
}

// 删除某个用户的购物车的所有数据
export function removeAllData(params: { userid: string }) {
    return request.post('/cart/removeall', params)
}

// 删除某个用户的一条购物车的数据
export function removeOneData(params: { cartid: string }) {
    return request.post('/cart/remove', params)
}

// 更新某个用户的一条购物车的数据的选中状态
export function selectOneData(params: { cartid: string, flag: boolean }) {
    return request.post('/cart/selectone', params)
}

// 更新某个用户的购物车的所有数据的选中状态
export function selectAllData(params: { userid: string, type: boolean }) {
    return request.post('/cart/selectall', params)
}

// 更新某个用户的购物车的某个产品的数量
export function updateOneDataNum(params: { cartid: string, num: number }) {
    return request.post('/cart/updatenum', params)
}

// 推荐商品接口
export function getCartRecommendData() {
    return request.get('/pro/recommendlist')
}