import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'  // 提供数据api
import store from './store'  // 全局数据管理
import './main.scss';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* 给所有的组件提供配置好的store中的数据 模块 函数 */}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>

  </React.StrictMode>
);

