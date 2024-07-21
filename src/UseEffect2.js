import {useEffect, useState} from "react";

function Son() {
    //1. 渲染时开始一个定时器
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('定时器启动中')
        }, 1000)

        return () => {
            // 清除副作用（组件卸载时）
            clearInterval(timer)
        }
    }, [])
    return <div>This is Son</div>
}

function APP() {
    // 通过条件渲染模拟组件卸载
    const [show, setShow] = useState(true)
    return (
        <div>
            <span>UseEffect2 Demo</span>
            {show && <Son/>}
            <button onClick={() => setShow(false)}>卸载Son组件</button>
        </div>
    )
}

export default APP