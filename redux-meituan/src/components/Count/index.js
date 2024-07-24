import './index.scss'

const Count = ({ onPlus, onMinus, count }) => {

  return (
    <div className="goods-count">
      <span className="button minus" onClick={onMinus}></span>
      <span className="count">{count}</span>
      <span className="button plus" onClick={onPlus}></span>
    </div>
  )
}

export default Count
