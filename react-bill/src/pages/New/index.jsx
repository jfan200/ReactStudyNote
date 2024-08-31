import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import {useRef, useState} from "react";
import './index.scss'
import {billListData} from "@/constants";
import Icon from '@/components'
import {addBillList} from "@/store/modules/billsStore";
import {useDispatch} from "react-redux";
import { Space, Toast } from 'antd-mobile'


const  New = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // 准备一个控制收入支出的状态
    const [billType, setBillType] = useState('pay');
    // 处理更改账单类型
    const onChangeBillType = (value) => {
        setBillType(value)
        setUseFor('other')
    }
    // 收集账单类型
    const [useFor, setUseFor] = useState('other');

    // 收集金额
    const [money, setMoney] = useState(null);
    // 当金额发生变化
    const moneyChange = (value) => {
        setMoney(value);
    }
    // datePicker的显示与否
    const [pickerVisible, setPickerVisible] = useState(false);
    // 选择的时间
    const [selectedDate, setSelectedDate] = useState(new Date());
    // 确认修改时间
    const onConfirm = (date) => {
        setSelectedDate(date)
        setPickerVisible(false)
    }
    // 添加账单
    const add_bill = () => {
        console.log(money)
        if (money === null || money === 0) {
            Toast.show({
                icon: 'fail',
                content: '输入有误',
            })
        } else {
            const new_bill = {
                type: billType,
                money: billType === 'income' ? +money : -money,
                date: selectedDate,
                useFor: useFor
            }
            if (billType === "income") {
                Toast.show({
                    icon: 'success',
                    content: '成功添加一笔收入',
                })
            } else {
                Toast.show({
                    icon: 'success',
                    content: '成功添加一笔支出',
                })
            }

            dispatch(addBillList(new_bill))
            navigate('/')
        }

    }

    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(billType === 'pay' ? 'selected' : '')}
                        onClick={() => onChangeBillType('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        className={classNames(billType === 'income' ? 'selected' : '')}
                        shape="rounded"
                        onClick={() => onChangeBillType('income')}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type={useFor} className="icon" />
                            <span className="text" onClick={() => setPickerVisible(true)}>{selectedDate.toDateString()}</span>
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                visible={pickerVisible}
                                max={new Date()}
                                onConfirm={date => onConfirm(date)}
                                onCancel={() => setPickerVisible(false)}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={money => moneyChange(money)}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[billType].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        <div
                                            className={classNames(
                                                'item',
                                                useFor === item.type ? 'selected' : ''
                                            )}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={add_bill}>
                    保 存
                </Button>
            </div>
        </div>
    )
}

export default New