import React, { FC, useEffect } from 'react';//FC FunctionComponent 
import './App.scss';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import Cart from './views/cart/Index'
import Home from './views/home/Index'
import Kind from './views/kind/Index'
import User from './views/user/Index'
import Detail from './views/detail/index'
import Footer from './components/Footer';
import Login from './views/Login/index';
import Register from './views/register/index';
import Step1 from './views/register/components/Step1'
import Step2 from './views/register/components/Step2'
import Step3 from './views/register/components/Step3'
import Step4 from './views/register/components/Step4'
import { inject, observer } from 'mobx-react';

const App: FC = (props: any) => {
  console.log("props", props)
  const { pathname } = useLocation() // pathname当前的url 比如/home 负责react路由V6版本负责路由信息的 
  const navigate = useNavigate() // 路由跳转的方法  navigate 返回的路由跳转的对象  Router.push()

  // useEffect(() => {
  //   // 获取当前的地址栏的地址
  //   console.log(pathname)
  //   pathname === '/' && navigate('/home', { replace: true })
  // }, [])

  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace={true} />} />
        <Route path="/home" element={<><Home /><Footer /></>} />
        <Route path="/kind" element={<><Kind /><Footer /></>} />
        {/* <Route path="/cart" element={<><Cart /><Footer /></>} /> */}

        <Route path="/cart" element={
          // 类似于导航守卫
          props.store.user.loginState ? <><Cart /><Footer /></> : <Navigate to='/login' replace={true} />
        } />

        <Route path="/user" element={<><User /><Footer /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:proid" element={<Detail />} />
        <Route path="/register" element={<Register />}>
          <Route index element={<Navigate to="/register/step1" replace={true} />} />
          <Route path='/register/step1' element={<Step1 />} />
          <Route path='/register/step2' element={<Step2 />} />
          <Route path='/register/step3' element={<Step3 />} />
          <Route path='/register/step4' element={<Step4 />} />
        </Route>
      </Routes>

      <div className='landscape-tip'>
        请将屏幕竖向浏览
      </div>

    </div>
  )
}

// export default App;
export default inject('store')(observer(App))