import React, { FC, useState } from 'react';
import { Image, Toast } from 'antd-mobile'
import { SearchOutline } from 'antd-mobile-icons';

import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { inject, observer } from 'mobx-react'
import { AnyPtrRecord } from 'dns';

interface IHeaderComponentProps {

};

const HeaderComponent: FC<any> = (props) => {  // 原本里面有个花括号,给删掉了({ })
    const navigate = useNavigate()

    // 控制弹窗的显示与隐藏
    const [showToast, setShowToast] = useState(false);

    const handleLogout = () => {
        localStorage.clear(); // 清空 localStorage
        setShowToast(true); // 显示弹窗
        Toast.show({
            content: '退出成功',
            position: 'bottom',
            duration: 1500
        })
        setTimeout(() => {
            setShowToast(false); // 1.5秒后关闭弹窗
            window.location.reload(); // 刷新页面
        },);
    };

    const loginState = props.store.user.loginState


    console.log('是否登录', loginState)

    return (
        <header className="header">
            <ul>
                <li>长沙</li>
                <li>
                    <div className="searchBox">
                        <Image src='https://img0.baidu.com/it/u=531181309,2061525922&fm=253&fmt=auto&app=138&f=JPEG?w=625&h=500' />
                        <span className="divider ">|</span>
                        <SearchOutline fontSize={18} />
                        <span className="searchText">立柜式空调</span>
                    </div>
                </li>
                {/* <li onClick={() => navigate('/login')} >登录</li> */}
                {
                    loginState ?
                        <li onClick={handleLogout} >{props.store.user.username}</li>
                        :
                        <li onClick={() => navigate('/login')} >登录</li>
                }
            </ul>
        </header>
    )
};

// export default HeaderComponent;

export default inject('store')(observer(HeaderComponent));