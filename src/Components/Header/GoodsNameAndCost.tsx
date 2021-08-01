import React from 'react';
import CurrentCurrency from '../Cart/CurrentCurrency';

interface GoodsNameAndCostProps {
  product: {id: string, name: string, gallery: string[], prices: {amount: string}[]}
  stateCurrency: number
}

export default class GoodsNameAndCost extends React.Component<GoodsNameAndCostProps> {
  render() {
    const { product, stateCurrency} = this.props
    return (
      <>
        <p className='cart-window-name'>{product.name}</p>
        <p className='cart-window-name'>{product.id}</p>
        <p className='goods-cost'>
          <CurrentCurrency />
          {product.prices[stateCurrency].amount}
        </p>
      </>
    )
  }
}
