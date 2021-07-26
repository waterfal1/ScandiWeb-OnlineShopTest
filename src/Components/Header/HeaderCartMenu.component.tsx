import React from 'react';
import { query } from '../../Pages/Home/getData';
import { NavLink } from 'react-router-dom';
import { goodsCollection } from '../Cart/countFunctions';
import Attributes from './Attributes';
import { ApolloQueryResult } from '@apollo/client';
import * as _ from 'lodash';

export default class CartMenu extends React.Component<{stateCurrency: string,
  setCurrency: (value: string) => {type: string, payload: string}, toggleCartWindow: () => void,
  stateSelectedItem: number, setGoods: (value: number) => {type: string, payload: number} },
  { data:  ApolloQueryResult<any>, loading: boolean, amounts: number[], attribute: number, windowState: boolean }> {

  constructor(props: { stateCurrency: string; setCurrency: (value: string) => { type: string; payload: string; };
  toggleCartWindow: () => void; stateSelectedItem: number;
  setGoods: (value: number) => { type: string; payload: number; }; } | Readonly<{ stateCurrency: string;
  setCurrency: (value: string) => { type: string; payload: string; };
  toggleCartWindow: () => void; stateSelectedItem: number;
  setGoods: (value: number) => { type: string; payload: number; }; }>) {
    super(props)
    this.state = {data: {data: {}, loading: false, networkStatus: 0}, loading: false, amounts: [],
      attribute: 0, windowState: false}
  }

  componentDidMount(): void {
    query(`
      query { category {
        name
        products {
        id
        name
        gallery
        attributes {
        name
        items {
        displayValue
        }
        }
        prices {
        currency
        amount
        }
      }
      }
      }
    `)
      .then(result => {
        this.setState({loading: true, data: result})
      })
  }

  setNewPlusAmount = (productIndexes: (number[] | any)[]): void => {
    const goodsFromStorage = JSON.parse(sessionStorage.getItem('Goods') as string);
    goodsFromStorage.push([productIndexes[0], [parseInt(productIndexes[1],10)]]);
    sessionStorage.setItem('Goods', JSON.stringify(goodsFromStorage));
    this.props.setGoods(this.props.stateSelectedItem + 1)
  }

  setNewMinusAmount = (productIndexes: (number[] | any)[]): void | undefined => {
    const goodsFromStorage = JSON.parse(sessionStorage.getItem('Goods') as string);
    goodsFromStorage.splice(goodsFromStorage.map((element: any, index: number) =>
    {if (element[0] === productIndexes[0] && element[1].map((item: number, ind: number) => {return item === productIndexes[1][ind]}))
      return index
    })
      .filter((value: number[] | undefined) => value)[0], 1)
    sessionStorage.removeItem('Goods');
    sessionStorage.setItem('Goods', JSON.stringify(goodsFromStorage));
    this.props.setGoods(this.props.stateSelectedItem + 1)
  }

  attributeSelected = (index: number): void => {
    this.setState({ attribute: index });
  }

  totalCost = (goods: ((string | (string[])[] | number)[])[]) => {
    const products = this.state.data.data.category.products;
    const res = _.flatten(goods.map((item: any) => {
     return products.map((el: {id: string, name: string, gallery: string[],
        prices: {amount: string, currency: string}[]}, index: number) => {
      if (item[0] === el.id)
        return index
    }).filter((value: number) => value || value === 0)
  }))
    return res
      // @ts-ignore
      .map((item: any, index: number) => products[item].prices[this.props.stateCurrency].amount * goods[index][2])
      .reduce((acumulator: number, current: number) => (acumulator + current), 0)
      .toFixed(2)
  }
  render() {
    const goodsFromStorage = JSON.parse(sessionStorage.getItem('Goods') as string);
    const goodsAmount = goodsCollection(goodsFromStorage);
    if (!this.state.loading) return '';
    const products = this.state.data.data.category.products;
    const stateCurrency  = this.props.stateCurrency;
    const totalCost = this.totalCost(goodsAmount);
    const res = _.flatten(goodsAmount.map((item: any) => {
      return products.map((el: {id: string, name: string, gallery: string[],
        prices: {amount: string, currency: string}[]}, index: number) => {
        if (item[0] === el.id)
          return index
      }).filter((value: number) => value || value === 0)
    }))
    return (
      <div className='cart-window'>
        <p className='cart-window-bag'> <strong>My Bag,</strong> {goodsAmount.length} items</p>
        {res.map((productIndexes: any, num: number) => (
          <div key={num} className='cart-window-container'>
            <div className='window-first-container'>
              <p className='cart-window-name'>{products[productIndexes].name}</p>
              <p className='cart-window-name'>{products[productIndexes].id}</p>
              <p className='goods-cost'>
                {sessionStorage.getItem('Currency') ? sessionStorage.getItem('Currency') : <>&#36;</>}
                {products[productIndexes].prices[stateCurrency].amount}
              </p>
              <div className='cart-window-attribute-row'>
                {products[productIndexes].attributes.length !== 0 ? products[productIndexes].attributes
                  .map((element: any, index: number) => (<div key={index}>{element.name}{element.items
                    // @ts-ignore
                    .map((item: any, ind: number) => (goodsAmount[num][1][0][index] == ind ?
                    <Attributes key={ind} attributeSelected={() => this.attributeSelected(ind)}
                                              displayValue={item.displayValue} /> : <></>))}</div>)) : <></>}
              </div>
            </div>
            <div className='cart-window-center-flex-element'>
              <button onClick={() => this.setNewPlusAmount(goodsAmount[num])} className='cart-window-counter-btn'>
                +
              </button>
              {goodsAmount[num][2]}
              <button onClick={() => this.setNewMinusAmount(goodsAmount[num])} className='cart-window-counter-btn'>
                -
              </button>
            </div>
            <div className='cart-window-last-flex-element'>
              <img className='cart-window-img' src={products[productIndexes].gallery[0]} alt='picture1'/>
            </div>
          </div>
        ))}
        <div className='cart-window-total-cost'>
          <p>Total</p>
          <p>{sessionStorage.getItem('Currency') ? sessionStorage.getItem('Currency') : <>&#36;</>}{totalCost}</p>
        </div>
        <div className='cart-window-buttons'>
          <NavLink to='/cart'>
            <button onClick={this.props.toggleCartWindow} className='cart-window-view-btn'> VIEW BAG</button>
          </NavLink>
          <button className='cart-window-checkout-btn'> CHECK OUT</button>
        </div>
      </div>
    )
  }
}