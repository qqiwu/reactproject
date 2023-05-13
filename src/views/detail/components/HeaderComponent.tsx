import React, { FC } from 'react';
import { LeftOutline, MoreOutline } from 'antd-mobile-icons'
import './Header.scss';

import { useNavigate } from 'react-router-dom';

interface HeaderComponentProps {

}

const HeaderComponent: FC<HeaderComponentProps> = () => {
    const navigate = useNavigate(); // 得到一个跳转路由的方法
    return (
        <div className='myHeader'>
            <header className="header2" v-show="scrollTop > 300">
                <ul>
                    <li className="left" onClick={() => navigate(-1)} >
                        <LeftOutline />
                    </li>
                    <li className="middle">
                        <span>详情</span>
                        <span>推荐</span>
                    </li>
                    <li className="right">
                        <MoreOutline />
                    </li>
                </ul>
            </header>
        </div>
    )
}

export default HeaderComponent;