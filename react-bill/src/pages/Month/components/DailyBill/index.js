import classNames from 'classnames'
import './index.scss'
import dayjs from "dayjs";
import {useMemo, useState} from "react";
import {billTypeToName} from "@/constants";
import Icon from "@/components";

const DailyBill = ({date, billsList}) => {
  // 计算统计获取当日 支出 / 收入 / 结余
  const dailyStatus = useMemo(() => {
    // 支出 / 收入 / 结余
    const payments = billsList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const incomes = billsList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
    return {
      payments: payments,
      incomes: incomes,
      balance: incomes + payments
    }
  }, [billsList])

  const [visible, setVisible] = useState(false)


  return (
      <div className={classNames('dailyBill')}>
        <div className="header">
          <div className="dateIcon">
            <span className="date">{dayjs(date).format('YYYY年M月D日')}</span>
            <span className={classNames('arrow', !visible && 'expand')} onClick={() => setVisible(!visible)}></span>
          </div>
          <div className="oneLineOverview">
            <div className="pay">
              <span className="type">支出</span>
              <span className="money">{dailyStatus.payments.toFixed(2)}</span>
            </div>
            <div className="income">
              <span className="type">收入</span>
              <span className="money">{dailyStatus.incomes.toFixed(2)}</span>
            </div>
            <div className="balance">
              <span className="money">{dailyStatus.balance.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>

          {/*单日详细列表展示*/}
          {/*style={{display: visible ? 'block': 'none'}}*/}
          <div className='billList' style={visible ? { display: 'block' } : { display: 'none' }}>
            {billsList.map(item => {
              return (
                  <div className='bill' key={item.id}>
                    {/*图标*/}
                    <Icon type={item.useFor}/>
                    <div className='detail'>
                      <span className="type">{billTypeToName[item.useFor]}</span>
                    </div>
                    <div className={classNames('money', item.type)}>
                      <span className="money">{item.money.toFixed(2)}</span>
                    </div>
                  </div>
              )
            })}
          </div>
        </div>
      </div>
  )
}
export default DailyBill