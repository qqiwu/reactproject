// src/views/home/Index.tsx
import React, { FC, useState, useEffect, useRef } from 'react';
import { InfiniteScroll } from 'antd-mobile'; // 实现加载更多
import { UpOutline } from 'antd-mobile-icons'; // 返回顶部图标
import HeaderComponent from './components/HeaderComponent'
import BannerComponent from './components/BannerComponent'
import NavComponent from './components/NavComponent'
import SeckillComponent from './components/SeckillComponent'
import ProComponent from './components/ProComponent'
import { getBannerListData, getSeckKillListData, getProListData } from '../../api/home'
import nav_List from '../../utils/nav'
import './style.scss';
import { useNavigate, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react'

interface IHomeProps {

};

const Home: FC<any> = (props) => {
    console.log('props home', props)

    const loginState = props.store.user.loginState

    console.log('是否登录', loginState)

    //轮播图逻辑
    const [bannerList, setBannerList] = useState([])//轮播图数据 
    useEffect(() => {//轮播图请求方法 
        getBannerListData().then((res) => {
            console.log('轮播图数据', res)
            setBannerList(res.data.data)
        })
    }, [])
    //轮播图逻辑

    //  navBARlist列表数据
    const [navList] = useState(nav_List)// navBARlist列表数据 嗨购超市 嗨购服饰 
    //  navBARlist列表数据

    // 秒杀业务逻辑
    const [seckkillList, setSeckkillList] = useState([])

    useEffect(() => {
        getSeckKillListData().then((res) => {
            console.log('秒杀数据', res)
            setSeckkillList(res.data.data)
        })
    }, [])
    // 秒杀业务逻辑 

    //  商品业务逻辑
    // 产品列表
    interface IPro {
        banners: string[]
        brand: string
        category: string
        desc: string
        discount: number
        img1: string
        img2: string
        img3: string
        img4: string
        isrecommend: number
        issale: number
        isseckill: number
        originprice: number
        proid: string
        proname: string
        sales: number
        stock: number
    }
    const [proList, setProList] = useState<IPro[]>([])
    useEffect(() => {
        getProListData().then(res => setProList(res.data.data))
    }, [])
    // 加载更多
    const [hasMore, setHasMOre] = useState<boolean>(true)
    const [count, setCount] = useState<number>(2)
    const loadMore = async () => {
        const res = await getProListData({ count })
        if (res.data.data.length === 0) {
            setHasMOre(false)
        } else {
            setCount(count + 1)
            // 将数据进行拼接
            setProList([...proList, ...res.data.data])
        }
    }
    // 返回顶部
    const contentRef = useRef<any>()
    const [top, setTop] = useState<number>(0)
    const scroll = () => {
        // 实时打印滚动栏距离顶部的距离
        // console.log(contentRef.current.scrollTop)
        setTop(contentRef.current.scrollTop)
    }
    const backTop = () => {
        contentRef.current.scrollTop = 0
    }
    //  商品业务逻辑

    return (
        <>
            <HeaderComponent />
            <div className="content" ref={contentRef} onScroll={scroll}>
                {/* 轮播图  */}
                <BannerComponent list={bannerList}></BannerComponent>
                {/* 导航区域 */}
                <NavComponent list={navList}></NavComponent>
                {/* 秒杀区域  */}
                <SeckillComponent list={seckkillList}></SeckillComponent>
                {/* 产品区域 */}
                <ProComponent list={proList}></ProComponent>
                {/* 上拉加载组件 */}
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
                {/* 返回顶部 */}
                {top > 300 ? <div className="backTop" onClick={backTop}><UpOutline /></div> : null}
            </div>
        </>
    )
};

// export default Home;

export default inject('store')(observer(Home));
