import request from "../utils/request";

interface IpageParams {
    limitNum?: number,
    count?: number
}


// 请求轮播图 
export function getBannerListData() {
    return request.get('/banner/list')
}

// 请求秒杀数据 
export function getSeckKillListData() {
    return request.get('/pro/seckilllist')
}

// 请求商品数据 

export function getProListData(params?: IpageParams) {
    return request.get('/pro/list', { params })
}