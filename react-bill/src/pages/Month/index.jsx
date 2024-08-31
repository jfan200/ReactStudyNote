import { NavBar, DatePicker } from 'antd-mobile'
import {useEffect, useMemo, useState} from "react"
import {useSelector} from "react-redux"
import classNames from 'classnames'
import dayjs from "dayjs"
import _ from 'lodash'
import './index.scss'
import DailyBill from "src/pages/Month/components/DailyBill";

const Month = () => {
    // 控制弹框的打开或者关闭
    const [visible, setVisible] = useState(false)

    // 按月做数据分组
    const billsList = useSelector((state) => state.bills.billsList)
    const monthBills = useMemo(() => {
        // return出去计算之后的值
        return _.groupBy(billsList, (item) => dayjs(item.date).format("YYYY-MM"))
    }, [billsList])
    const [currentMonthBills, setCurrentMonthBills] = useState([])

    // 根据获取到的时间作为key取当月的账单数组
    const [currentDate, setCurrentDate] = useState(() => dayjs(new Date()).format('YYYY-MM'))
    const onConfirm = (date) => {
        const formatedDate = dayjs(date).format('YYYY-MM')
        setCurrentDate(formatedDate)
        setCurrentMonthBills(monthBills[formatedDate]||[])
        setVisible(false)
    }

    // 计算统计获取当月 支出 / 收入 / 结余
    const monthStatus = useMemo(() => {
        // 支出 / 收入 / 结余
        const payments = currentMonthBills.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const incomes = currentMonthBills.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
            payments: payments,
            incomes: incomes,
            balance: incomes + payments
        }
    }, [currentMonthBills])

    // 初始化的时候把当月的统计数据显示出来
    useEffect(() => {
        setCurrentMonthBills(monthBills[dayjs(new Date()).format('YYYY-MM')]||[])
    }, [monthBills]);

    // 按日做数据分组
    const dailyBills = useMemo(() => {
        // return出去计算之后的值
        const dailyData = _.groupBy(currentMonthBills, (item) => dayjs(item.date).format("YYYY-MM-DD"))
        const keys = Object.keys(dailyData)
        return {
            dailyData,
            keys
        }
    }, [currentMonthBills])


    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setVisible(!visible)}>
                        <span className="text">
                          {dayjs(currentDate).format('YYYY年 | M')}月账单
                        </span>
                        {/*根据当前弹框打开的状态控制expand类名是否存在*/}
                        <span className={classNames('arrow', !visible && 'expand')}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{monthStatus.payments.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthStatus.incomes.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthStatus.balance.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={visible}
                        onClose={() => setVisible(false)}
                        max={new Date()}
                        onConfirm={date => onConfirm(date)}
                        confirmText='选择该日期'
                    />
                </div>
                {/*单日列表*/}
                {dailyBills.keys.map(key => (
                    <DailyBill key={key} date={key} billsList={dailyBills.dailyData[key]} />
                ))}
            </div>
        </div >
    )
}

export default Month