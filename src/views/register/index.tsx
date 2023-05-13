import React, { FC } from 'react';
import { NavBar } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';  // 子路由的路由出口

interface IRegisterProps {

}


const Register: FC<IRegisterProps> = () => {

    const navigate = useNavigate();

    return (
        <>
            <header>
                <NavBar
                    style={{
                        '--height': '0.44rem',
                        '--border-bottom': '1px #eee solid',
                        color: 'red'
                    }}
                    onBack={() => navigate(-1)}
                >
                    注册
                </NavBar>
            </header>
            <div className='content'>
                {/* 当step1 step2 stpe3满足某种路由规则会被 outlet吃下去 */}
                <Outlet />
            </div>
        </>
    )
}

export default Register;