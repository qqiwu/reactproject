import React, { FC } from "react";
import { NavLink } from 'react-router-dom' //对标 vue router-link
interface FooterInterface {

}
const Footer: FC<FooterInterface> = () => {
    return (
        <footer className='footer'>
            <ul>
                <NavLink to="/home" style={({ isActive }) =>
                    isActive ? { color: '#f66 ' } : undefined
                }>
                    <span className="iconfont icon-shouye"></span>
                    <p>首页</p>
                </NavLink>
                <NavLink to="/kind" style={({ isActive }) =>
                    isActive ? { color: '#f66 ' } : undefined
                }>
                    <span className="iconfont icon-fenlei"></span>
                    <p>分类</p>
                </NavLink>
                <NavLink to="/cart" style={({ isActive }) =>
                    isActive ? { color: '#f66 ' } : undefined
                }>
                    <span className="iconfont icon-gouwuche"></span>
                    <p>购物车</p>
                </NavLink>
                <NavLink to="/user" style={({ isActive }) =>
                    isActive ? { color: '#f66 ' } : undefined
                }>
                    <span className="iconfont icon-shouye1"></span>
                    <p>我的</p>
                </NavLink>
            </ul>
        </footer>
    )

}

export default Footer