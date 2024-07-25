import {Outlet, useNavigate} from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>我是Layout路由页面</h1>
            <div>
                <button onClick={() => navigate('/')}>面板</button>
                <button onClick={() => navigate('/about')}>关于</button>
                <button onClick={() => navigate('/article')}>文档</button>
            </div>
            {/*二级路由出口*/}
            <Outlet/>
        </div>
    )
}

export default Layout