// 导入核心包
import React from 'react';
import ReactDOM from 'react-dom/client';

// 导入根组件
import App from './App';
import Context from './Context';
import Comments from './Comments';
import UseEffect1 from "./UseEffect1";
import UseEffect2 from "./UseEffect2";
import Hook from "./Hook";

// 把 APP.js 导入 root
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <Comments/>
  //</React.StrictMode>
);