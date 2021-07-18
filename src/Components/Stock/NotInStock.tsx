import React from 'react';
import cart from '../../assets/Circle_Icon.svg';
import { NavLink } from 'react-router-dom';

export default class InStock extends React.Component<{products: {products: {name: string, gallery: string[],
  prices: {amount: string, currency: string}[]}[]}, item: number, choseGoods: (input: number) => void,
  stateCurrency: string}> {
  render() {
    const products = this.props.products.products;
    return (
          <div  onClick={() => this.props.choseGoods(this.props.item)} className='product-card'>
            <div className='not-in-stock'>
              <NavLink to={'/goods'}>
              <img className='goods-image' src={products[this.props.item].gallery[0]} alt='Jacket'/>
              <div className='out-of-stock-text'>Out of Stock</div>
              <p> {products[this.props.item].name}</p>
              <p>{products[this.props.item].prices[parseInt(this.props.stateCurrency, 10)].currency}{' '}
              {products[this.props.item].prices[parseInt(this.props.stateCurrency, 10)].amount}</p>
            </NavLink>
            </div>
            <img className='on-hover-cart' src={cart} alt='Cart' />
          </div>
    )
  }
}
