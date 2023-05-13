import React, { FC, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // 获取路由参数
import { getDetailData, getDetailRecommendData } from '../../api/detail';
import { addCart } from '../../api/cart';
import { Divider, Toast } from 'antd-mobile';
import ProInfoComponent from './components/ProInfoComponent';
import ProComponent from '../home/components/ProComponent';
import HeaderComponent from './components/HeaderComponent';
import ActionBar from './components/action/index';
import BannerComponent from '../home/components/BannerComponent'
import { observer, inject } from 'mobx-react'


interface IDetailProps {

};

const Detail: FC<IDetailProps> = (props: any) => {
    console.log('props', props)

    // 获取路由参数
    const { proid } = useParams()
    console.log(proid)

    const [obj, setObj] = useState({
        banners: [],
        proname: '',
        originprice: 0,
        discount: 0,
        brand: '',
        category: '',
        sales: 0,
        issale: 1
    })

    useEffect(() => {
        getDetailData(proid!).then(res => {
            console.log(res.data.data)
            console.log(res.data.data.img3)
            setObj({
                banners: res.data.data.banners[0].split(','),
                proname: res.data.data.proname,
                originprice: res.data.data.originprice,
                discount: res.data.data.discount,
                brand: res.data.data.brand,
                category: res.data.data.category,
                sales: res.data.data.sales,
                issale: res.data.data.issale
            })
        })
    }, [proid])

    // 轮播图逻辑
    const [bannerList, setBannerList] = useState([])

    // 遍历 res 对象中的属性，将以 "img" 开头的属性值存入数组
    // for (const key in res) {
    //     if (key.startsWith("img")) {
    //         imageUrls.push(res[key]);
    //     }
    // }
    useEffect(() => {
        getDetailData(proid!).then(res => {
            var data = res.data.data
            console.log('data', data)
            const tempImageUrls: string[] = []; // 创建一个临时数组
            for (const key in data) {
                if (key.startsWith("img")) {
                    tempImageUrls.push(data[key]);
                }
            }
            setBannerList(tempImageUrls as never[]); // 使用类型断言来匹配参数类型
        });
    }, [proid]);




    // 轮播图逻辑

    // 商品推荐逻辑
    const [proList, setProlist] = useState([])

    useEffect(() => {
        getDetailRecommendData().then((res) => {
            console.log('推荐商品数据', res)
            setProlist(res.data.data)
        })
    }, [])
    // 商品推荐逻辑

    // 加入购物车逻辑
    const navigate = useNavigate()
    const addCartData = () => {
        const loginState = props.store.user.loginState
        const userid = props.store.user.userid
        if (loginState) {
            addCart({
                proid: proid!,
                userid, num: 1
            }).then(res => {
                if (res) {
                    Toast.show({
                        content: "加入购物车成功"
                    })
                } else {
                    Toast.show({
                        content: "请先登录"
                    })
                }
            })
        } else {
            navigate('/login')
        }
    }
    // 加入购物车逻辑

    return (
        <>
            {/* 顶部显示组件 */}
            <HeaderComponent></HeaderComponent>
            <div className="content">
                {/* 轮播图逻辑 */}
                <BannerComponent list={bannerList}></BannerComponent>
                {/* 商品的详情数据 */}
                <ProInfoComponent
                    originprice={obj.originprice}
                    sales={obj.sales}
                    brand={obj.brand}
                    category={obj.category}
                    proname={obj.proname}
                />
                {/* 猜你喜欢 */}
                <Divider
                    style={{
                        color: '#1677ff',
                        borderColor: '#1677ff',
                        borderStyle: 'dashed',
                    }}
                >
                    猜你喜欢
                </Divider>
                {/* 推荐商品数据 */}
                <ProComponent list={proList}></ProComponent>
                {/* 底部选项 */}
                <ActionBar
                    // CartText="加入购物车1"
                    // BuyText="立即购买1"
                    onCartClick={addCartData}
                    onShopClick={() => navigate('/cart')}
                />
            </div>
        </>
    )
};

// export default Detail;

export default inject('store')(observer(Detail));