import React from 'react';
import cart from '../../assets/Circle_Icon.svg';
import { NavLink } from 'react-router-dom';

export default class InStock extends React.Component<{
  products: { id: string, name: string, gallery: string[], prices: { amount: string, currency: string }[] }[],
  attributes: [number[]], counter: (input: string, input2: number[]) => void, choseGoods: (input: string) => void,
  item: number, stateCurrency: number}> {
  render() {
    const { item, choseGoods, counter, products, attributes } = this.props;
    return (
      <div onClick={() => choseGoods(products[item].id)} className='product-card'>
        <div className='in-stock'>
          <NavLink to='/goods'>
            <img className='goods-image' src={products[item].gallery[0]} alt='Image'/>
            <p className='goods-name'> {products[item].name}</p>
            <p className='goods-cost'> {sessionStorage.getItem('Currency') ? sessionStorage.getItem('Currency') : <>&#36;</>}
          {products[item].prices[this.props.stateCurrency].amount}
          </p>
          </NavLink>
          <img onClick={() => counter(products[item].id, attributes[item])} className='on-hover-cart' src={cart} alt='Cart' />
        </div>
      </div>
    )
  }
}
