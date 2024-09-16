import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// 获取 root DOM 元素并确保其不为 null
const rootElement = document.getElementById('root');

const root = createRoot(rootElement);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);