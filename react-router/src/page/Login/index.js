import {Link, useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>登录页面</h1>
            {/*声明式写法*/}
            <Link to='/article'>跳转到文章页</Link>
            {/*命令式写法*/}
            <button onClick={() => navigate('/article')}>跳转文章页</button>
            <button onClick={() => navigate('/article?id=1001&name=jinhua')}>SearchParams传参</button>
            <button onClick={() => navigate('/article/1001/jinhua')}>Params传参</button>
        </div>
    )
}

export default Login