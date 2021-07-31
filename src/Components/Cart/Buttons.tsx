import React from 'react';
import '../../Pages/Goods/Goods.styles.scss';

export default class Buttons extends React.Component<{
  setAmountUp: (input: (string | number[][] | number)[]) => void, goodsAmount: (string | number[][] | number)[][],
  setAmountDown: (input: (string | number[][] | number)[]) => void | undefined, goodsCounter: number }> {
  render() {
    const { goodsCounter, goodsAmount, setAmountUp, setAmountDown } = this.props;
    return (
      <div className='cart-center-flex-element'>
        <button onClick={() => setAmountUp(goodsAmount[goodsCounter])} className='cart-window-counter-btn'>+</button>
        {goodsAmount[goodsCounter][2]}
        <button onClick={() => setAmountDown(goodsAmount[goodsCounter])} className='cart-window-counter-btn'>-</button>
      </div>
    )
  }
}
