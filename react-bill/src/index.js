import React from 'react';
import ReactDOM from 'react-dom/client';
import router from './router';
import store from './store';
import {RouterProvider} from "react-router-dom";

// 导入定制主题文件
import './theme.css'
import './index.css'
import {Provider} from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
    </Provider>
)
