import {useState, useRef, useEffect, createContext, useContext} from 'react'
import avatar from './images/bozai.png'
import classnames from "classnames"
import {v4 as uuidv4} from 'uuid'
import dayjs from 'dayjs'
import _ from 'lodash'
import './App.css'
import axios from "axios";


/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 当前登录用户信息
const user = {
    // 用户id
    uid: '30009257',
    // 用户头像
    avatar,
    // 用户昵称
    uname: 'Jinhua',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
    { type: 'hot', text: '最热' },
    { type: 'time', text: '最新' },
]

function useGetCommentList() {
    const [commentList, setCommentList] = useState([])

    useEffect(() => {
        //请求数据
        async function getList() {
            const res = await axios.get('http://localhost:3004/list')
            setCommentList(res.data)
        }
        getList()
    }, [])

    return [commentList, setCommentList]
}

// 封装 Item 组件
function Item( {item, onDel} ) {

    return (
        <div className="reply-item">
            {/* 头像 */}
            <div className="root-reply-avatar">
                <div className="bili-avatar">
                    <img className="bili-avatar-img" src={item.user.avatar} alt=""/>
                </div>
            </div>

            <div className="content-wrap">
                {/* 用户名 */}
                <div className="user-info">
                    <div className="user-name">{item.user.uname}</div>
                </div>
                {/* 评论内容 */}
                <div className="root-reply">
                    <span className="reply-content">{item.content}</span>
                    <div className="reply-info">
                        {/* 评论时间 */}
                        <span className="reply-time">{item.ctime}</span>
                        {/* 评论数量 */}
                        <span className="reply-time">点赞数:{item.like}</span>
                        {/* 评论删除按钮*/}
                        {/* 条件：user.id === item.user.id*/}
                        {user.uid === item.user.uid &&
                            <span className="delete-btn" onClick={() => onDel(item.rpid)}>删除</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const App = () => {
    const [viewType, setViewType] = useState('hot')
    const [commentList, setCommentList] = useGetCommentList()
    const [newComment, setNewComment] = useState('')
    const inputRef = useRef(null)

    const viewTypeHandler = (newViewType) => {
        setViewType(newViewType)
        switch (newViewType) {
            case 'hot':
                setCommentList(_.orderBy(commentList, 'like', 'desc'))
                break
            case 'time':
                setCommentList(_.orderBy(commentList, 'ctime', 'desc'))
                break
        }
    }
    const addHandler = () => {
        setCommentList([
            ...commentList, {
                // 评论id
                rpid: uuidv4(),
                // 用户信息
                user,
                // 评论内容
                content: newComment,
                // 评论时间 MM-DD hh:mm
                ctime: dayjs(new Date()).format("MM-DD hh:mm"),
                like: 0,
            }
        ])
        setNewComment('')
        inputRef.current.focus()
    }
    const deleteHandler = (id) => {
        setCommentList(commentList.filter(item => item.rpid !== id))
    }

    return (
        <div className="app">
            {/* 导航 Tab */}
            <div className="reply-navigation">
                <ul className="nav-bar">
                    <li className="nav-title">
                        <span className="nav-title-text">评论</span>
                        {/* 评论数量 */}
                        <span className="total-reply">{10}</span>
                    </li>
                    <li className="nav-sort">
                        {/* 高亮类名： active */}
                        {tabs.map(item =>
                            <span
                                key={item.type}
                                className={classnames('nav-item', {active : item.type === viewType})}
                                onClick={() => viewTypeHandler(item.type)}>
                                {item.text}
                            </span>
                            // <span
                            //     key={item.type}
                            //     className={item.type === viewType ? 'nav-item active' : 'nav-item'}
                            //     onClick={() => viewTypeHandler(item.type)}>
                            //     {item.text}
                            // </span>
                        )}
                    </li>
                </ul>
            </div>

            <div className="reply-wrap">
                {/* 发表评论 */}
                <div className="box-normal">
                    {/* 当前用户头像 */}
                    <div className="reply-box-avatar">
                        <div className="bili-avatar">
                            <img className="bili-avatar-img" src={avatar} alt="用户头像" />
                        </div>
                    </div>
                    <div className="reply-box-wrap">
                        {/* 评论框 */}
                        <textarea
                            className='reply-box-textarea'
                            placeholder='发一条友善的评论'
                            onChange={(e) => setNewComment(e.target.value)}
                            value={newComment}
                            ref={inputRef}
                        />
                        {/* 发布按钮 */}
                        <div className="reply-box-send" onClick={addHandler}>
                            <span className="send-text">发布</span>
                        </div>
                    </div>
                </div>

                {/* 评论列表 */}
                <div className="reply-list">
                    {/* 评论项 */}
                    {commentList.map(item => (<Item key={item.rpid} item={item} onDel={deleteHandler}></Item>))}
                </div>
            </div>
        </div>
    )
}

export default App