// 导入核心包
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Pagination from './components/Pagination';
import Comments from './Comments';
import Context from './Context';
import Hook from './Hook';
import UseEffect1 from './UseEffect1';
import UseEffect2 from './UseEffect2';
import './App.css';

const pages = [
    { title: 'Comments', component: Comments },
    { title: 'Context', component: Context },
    { title: 'Hook', component: Hook },
    { title: 'UseEffect1', component: UseEffect1 },
    { title: 'UseEffect2', component: UseEffect2 },
    // Add more pages as needed
];


const App = () => {
    return (
        <Router>
            <div className="app">
                <Sidebar pages={pages} />
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Navigate to="/page/1" />} />
                        {pages.map((page, index) => (
                            <Route key={index} path={`/page/${index + 1}`} element={<page.component />} />
                        ))}
                    </Routes>
                    <Pagination totalPages={pages.length} />
                </div>
            </div>
        </Router>
    );
};

export default App;