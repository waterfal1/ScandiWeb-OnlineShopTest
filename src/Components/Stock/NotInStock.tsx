import React from 'react';
import cart from '../../assets/Circle_Icon.svg';
import { NavLink } from 'react-router-dom';

export default class InStock extends React.Component<{products: {id: string, name: string, gallery: string[],
  prices: {amount: string, currency: string}[]}[], item: number, choseGoods: (input: string) => void,
  stateCurrency: number}> {
  render() {
    const { item, choseGoods, products } = this.props;
    return (
          <div  onClick={() => choseGoods(products[item].id)} className='product-card'>
            <div className='not-in-stock'>
              <NavLink to={'/goods'}>
              <img className='goods-image' src={products[item].gallery[0]} alt='Jacket'/>
              <div className='out-of-stock-text'>Out of Stock</div>
              <p className='goods-name'> {products[item].name}</p>
              <p className='goods-cost'>{sessionStorage.getItem('Currency')
                ? sessionStorage.getItem('Currency') : <>&#36;</>}
              {products[item].prices[this.props.stateCurrency].amount}</p>
            </NavLink>
            </div>
            <img className='on-hover-cart' src={cart} alt='Cart' />
          </div>
    )
  }
}
