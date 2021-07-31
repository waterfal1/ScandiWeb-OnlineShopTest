import React from 'react';
import '../../Pages/Goods/Goods.styles.scss';

export default class Buttons extends React.Component<{
  setAmountDown: (input: (string | number[][] | number)[]) => void | undefined,
  setAmountUp: (input: (string | number[][] | number)[]) => void,
  goodsAmount: (string | number[][] | number)[][], num: number }> {
  render() {
    const { num, goodsAmount, setAmountUp, setAmountDown } = this.props;
    return (
      <div className='cart-center-flex-element'>
        <button onClick={() => setAmountUp(goodsAmount[num])} className='cart-window-counter-btn'>
          +
        </button>
        {goodsAmount[num][2]}
        <button onClick={() => setAmountDown(goodsAmount[num])} className='cart-window-counter-btn'>
          -
        </button>
      </div>
    )
  }
}
