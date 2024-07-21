import {useRef, useState} from 'react'

// 项目根组件
const count = 100
function getName() {
    return 'Jinhua'
}

const articaleType = 0 // [0, 1, 2]

function getArticaleTemplate() {
    if (articaleType === 0) {
        return <div>无图文章</div>
    } else if (articaleType === 1) {
        return <div>单图模式</div>
    } else if (articaleType === 2) {
        return <div>三图模式</div>
    }
}

const list = [
    {id: 1001, name: 'Vue'},
    {id: 1002, name: 'React'},
    {id: 1003, name: 'Angluar'}
]

const isLogin = true

const onClickHandler = (name, e) => {
    console.log('按钮被点击', name, e)
}

function Button() {
    return <button onClick={(e) => onClickHandler(getName(), e)}>Click Me</button>
}

function AppA({ onGetName }) {
    const [name, setName] = useState()
    return (
        <div>
            <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder='Set your message here:'
            />
            <button onClick={() => onGetName(name)}>Send</button>
        </div>
    )}

function AppB(props) {
    return (
        <div>
            <span>{props.name}</span>
        </div>
    )
}

function App() {
    const [name, setName] = useState('')

    const getNameFromA = (name) => {
        console.log(name)
        setName(name)
    }
    const showNameInB = (name) => {

    }

    return (
        <div className="App">
            <AppA onGetName={getNameFromA}></AppA>

            <AppB name={name}></AppB>

            <div id={'username'}/>
            <State/>

            {/* 引号负责传递字符串*/}
            {'This is string'}

            {/* 识别 js 变量*/}
            {count}

            {getName()}

            {new Date().getDate()}

            {/* 渲染列表 */}
            <List/>

            {getArticaleTemplate()}
            <Button/>
            <Button/>
            <NameButton/>
            <StateButton/>
        </div>
    );
}

function State() {
    return (
        <div>
            {/* 逻辑与 &&*/}
            <div id={'isLogin'}>{isLogin && <span>Hello {getName()}</span>}</div>

            {/*三元运算*/}
            <div>{isLogin ? <span>Hello {getName()}</span> : <span>loading ...</span>}</div>
        </div>
    )
}

function List() {
    return (
        <div>
            <ul>
                {list.map(item => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    )

}

function IncrementButton() {
    // 添加状态变量
    const [button_count, setCount] = useState(0)

    // 点击事件
    const incrementHandler = () => {
        setCount(button_count + 1)
    }
    return (
        <div>
            <button onClick={incrementHandler}>{button_count} </button>
        </div>
    )
}

function NameButton() {
    // 添加状态变量
    const [form, setForm] = useState({name: 'Rapheal'})

    // 点击事件
    const changeForm = () => {
        setForm({...form, name: 'Jinhua'})
    }
    return (
        <div>
            <button onClick={changeForm}>{form.name} </button>
        </div>
    )
}


function StateButton() {
    // 添加状态变量
    const [form, setForm] = useState({state: false})

    // 点击事件
    const changeForm = () => {
        setForm({...form, state: true})
    }
    return (
        <div>
            <span>Status:</span>
            <button onClick={changeForm}>{form.state ? <span>Hello Jinhua</span> : <span>Please Login</span>} </button>
        </div>
    )
}

export default App;
