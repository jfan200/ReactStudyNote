import classNames from 'classnames'
import Count from '../Count'
import './index.scss'
import {useDispatch, useSelector} from "react-redux";
import {addCart, clearCart, decrementCount, incrementCount} from "../../store/modules/takeaway";
import {useState} from "react";

const Cart = () => {
  const {cartList} = useSelector(state => state.foods)
  const dispatch = useDispatch()

  const start = 20
  const deliveryFee = 5

  // 计算总价和总数量
  const totalPrice = cartList.reduce((a, c) => a+c.price*c.count, 0)
  const count = cartList.reduce((a, c) => a+c.count, 0)

  // 控制购物车打开关闭的状态
  const [visible, setVisible] = useState(false)

  const onShow = () => {
      if (cartList.length > 0) {
          setVisible(true)
      }
  }
  const onHide = () => {
    setVisible(false)
  }

  return (
    <div className="cartContainer">
      {/* 遮罩层 添加visible类名可以显示出来 */}
        <div onClick={onHide} className={classNames('cartOverlay', visible && count>0 && 'visible')}/>
        <div className="cart">
        {/* fill 添加fill类名可以切换购物车状态*/}
        {/* 购物车数量 */}
        <div onClick={onShow} className={classNames('icon', visible && 'fill')}>
          {count > 0 && <div className="cartCornerMark">{count}</div>}
        </div>
        {/* 购物车价格 */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
              {totalPrice}
            </span>
          </div>
          <span className="text">预估另需配送费 ¥{deliveryFee}</span>
        </div>
        {/* 结算 or 起送 */}
        {totalPrice > start ? (
          <div className="goToPreview">去结算</div>
        ) : (
          <div className="minFee">¥{start}起送</div>
        )}
      </div>
      {/* 添加visible类名 div会显示出来 */}
      <div className={classNames('cartPanel', visible && count>0 && 'visible')}>
        <div className="header">
          <span className="text">购物车</span>
          <span className="clearCart" onClick={() => dispatch(clearCart({}))}>
            清空购物车
          </span>
        </div>

        {/* 购物车列表 */}
        <div className="scrollArea">
          {cartList.map(item => {
            return (
              <div className="cartItem" key={item.id}>
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  <Count
                    count={item.count}
                    onPlus={() => dispatch(incrementCount(item))}
                    onMinus={() => dispatch(decrementCount(item))}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Cart
