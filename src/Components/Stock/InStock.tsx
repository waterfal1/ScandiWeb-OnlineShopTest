import React from 'react';
import cart from '../../assets/Circle_Icon.svg';
import { NavLink } from 'react-router-dom';

export default class InStock extends React.Component<{
  products: { products: { name: string, gallery: string[], prices: { amount: string, currency: string }[] }[] },
  counter: (input: number) => void, choseGoods: (input: number) => void, item: number, stateCurrency: string}> {
  render() {
    const products  = this.props.products.products;
    const { item, choseGoods, counter } = this.props;
    return (
      <div onClick={() => choseGoods(item)} className='product-card'>
        <div className='in-stock'>
          <NavLink to={'/goods'}>
            <img className='goods-image' src={products[item].gallery[0]} alt='Image'/>
            <p> {products[item].name}</p>
            <p> {products[item].prices[parseInt(this.props.stateCurrency, 10)].currency}{" "}
          {products[item].prices[parseInt(this.props.stateCurrency, 10)].amount}
          </p>
          </NavLink>
          <img onClick={() => counter(item)} className='on-hover-cart' src={cart} alt='Cart' />
        </div>
      </div>
    )
  }
}
