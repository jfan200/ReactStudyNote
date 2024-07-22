import {createContext, useContext} from "react";

// 1. createContext方法创建一个上下文对象
const MsgContext = createContext()

// 2. 在顶层组件 通过使用Provider组件提供数据


// 3. 在底层组件 通过使用useContext钩子函数使用数据

function A() {
    return (
        <div>
            <span>This Component A</span>
            <B/>
        </div>
    )
}

function B() {
    const msg = useContext(MsgContext)
    return (
        <div>
            <span>This Component B, {msg}</span>
        </div>
    )
}

function App() {
    const msg = 'this is app msg'
    return (
        <div>
            <MsgContext.Provider value={msg}>
                <span>this is App</span>
                <A/>
            </MsgContext.Provider>
        </div>
    )
}

export default App