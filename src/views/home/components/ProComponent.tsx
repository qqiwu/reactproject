import React, { FC } from 'react';
import { Image, Ellipsis } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import './Pro.scss';

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
interface IProComponentProps {
    list: IPro[]
};

const ProComponent: FC<IProComponentProps> = ({ list }) => {
    const navigate = useNavigate()
    const toDetail = (proid: string) => {
        navigate('/detail/' + proid)
    }

    return (
        <div className="proList">
            <ul className="left">
                {
                    list && list.map((item, index) => {
                        if (index % 2 === 0) {
                            return (
                                <li key={item.proid} onClick={() => toDetail(item.proid)}>
                                    <div className="itemImage">
                                        <Image src={item.img1} />
                                    </div>
                                    <div className="itemInfo">
                                        <div className="itemTitle">
                                            <Ellipsis direction='end' rows={2} content={item.proname} />
                                        </div>
                                        <div className="itemPrice">￥{item.originprice / 1}</div>
                                    </div>
                                </li>
                            )
                        } else {
                            return null
                        }

                    })
                }

            </ul>
            <ul className="right">
                {
                    list && list.map((item, index) => {
                        if (index % 2 === 1) {
                            return (
                                <li key={item.proid} onClick={() => toDetail(item.proid)}>
                                    <div className="itemImage">
                                        <Image src={item.img1} />
                                    </div>
                                    <div className="itemInfo">
                                        <div className="itemTitle ">
                                            <Ellipsis direction='end' rows={2} content={item.proname} />
                                        </div>
                                        <div className="itemPrice">￥{item.originprice / 1}</div>
                                    </div>
                                </li>
                            )
                        } else {
                            return null
                        }

                    })
                }
            </ul>
        </div>
    )
};

export default ProComponent;