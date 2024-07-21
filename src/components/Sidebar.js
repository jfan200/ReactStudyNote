import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ pages }) => {
    return (
        <div className="sidebar">
            <h2>Topics</h2>
            <ul>
                {pages.map((page, index) => (
                    <li key={index}>
                        <Link to={`/page/${index + 1}`}>{page.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
