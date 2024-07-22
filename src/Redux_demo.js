//1. 定义reducer函数
//作用： 根据不同的action对象，返回不同的新的state
//state： 数据最开始状态
//action： 对象 type 标记当前想要做什么样的修改
function reducer(state = {count: 0}, action) {
    switch (action.type){
        case 'INCREMENT':
            return {count: state.count++}
        case 'DECREMENT':
            return {count: state.count--}
    }
    return state
}

//2. 使用reducer函数生成store实例
const store = Redux.createStore(reducer)

//3. 通过store实例的subscribe订阅数据变化
store.subscribe(() => {
    console.log('state变化了')
})

//4. 通过store实例的dispatch函数提交action更改状态
const inBtn = document.getElementById('increment')
inBtn.addEventListener('click', () => {
    // 增加
    store.dispatch({
        type:'INCREMENT'
    })
})

const deBtn = document.getElementById('decrement')
deBtn.addEventListener('click', () => {
    // 减少
    store.dispatch({
        type:'DECREMENT'
    })
})

//5. 通过store实例的getState方法获取最新状态更新到视图中

