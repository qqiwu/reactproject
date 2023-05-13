import request from '../utils/request';

// 获取商品详情数据
export function getDetailData(proid: string) {
    return request.get('pro/detail/' + proid);
}

// 推荐商品接口
export function getDetailRecommendData() {
    return request.get('pro/recommendlist')
}