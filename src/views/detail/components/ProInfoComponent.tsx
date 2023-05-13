import React, { FC } from 'react';
import { Tag } from 'antd-mobile'
import './ProInfo.scss';
interface IProInfoCompomnentProps {
    originprice: number
    sales: number
    brand: string
    category: string
    proname: string
};

const ProInfoCompomnent: FC<IProInfoCompomnentProps> = ({ originprice, sales, brand, category, proname }) => {
    return (
        <div className="proInfo">
            <div className="priceBox">
                <span>￥{originprice}</span>
                <span>销量：{sales}</span>
            </div>
            <div className="proName">
                <Tag color='danger'>{brand}</Tag>
                <Tag color='primary'>{category}</Tag>
                <span>{proname}</span>
            </div>
        </div>
    )
};

export default ProInfoCompomnent;