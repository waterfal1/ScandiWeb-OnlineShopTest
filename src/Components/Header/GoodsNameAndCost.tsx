import React from 'react';

export default class GoodsNameAndCost extends React.Component<{product: {id: string, name: string, gallery: string[],
    prices: {amount: string}[] }, stateCurrency: number}> {
  render() {
    const { product, stateCurrency} = this.props
    return (
      <>
        <p className='cart-window-name'>{product.name}</p>
        <p className='cart-window-name'>{product.id}</p>
        <p className='goods-cost'>
          {sessionStorage.getItem('Currency') ? sessionStorage.getItem('Currency') : <>&#36;</>}
          {product.prices[stateCurrency].amount}
        </p>
      </>
    )
  }
}
