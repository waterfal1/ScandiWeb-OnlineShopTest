import React from 'react';
import { query } from '../../Pages/Home/getData';
import { NavLink } from 'react-router-dom';
import { goodsCollection, removeGoods } from '../Cart/countFunctions';
import SelectedAttributesHeader from './SelectedAttributesHeader';
import { ApolloQueryResult } from '@apollo/client';


export default class CartMenu extends React.Component<{stateCurrency: string,
  setCurrency: (value: string) => {type: string, payload: string}, toggleCartWindow: () => void,
  stateSelectedItem: number, setGoods: (value: number) => {type: string, payload: number} },
  { data:  ApolloQueryResult<any>, loading: boolean, setAmount: boolean, amounts: number[], attribute: number }> {

  constructor(props: { stateCurrency: string; setCurrency: (value: string) => { type: string; payload: string; };
  toggleCartWindow: () => void; stateSelectedItem: number;
  setGoods: (value: number) => { type: string; payload: number; }; } | Readonly<{ stateCurrency: string;
  setCurrency: (value: string) => { type: string; payload: string; };
  toggleCartWindow: () => void; stateSelectedItem: number;
  setGoods: (value: number) => { type: string; payload: number; }; }>) {
    super(props)
    this.state = {data: {data: {}, loading: false, networkStatus: 0}, loading: false, setAmount: false, amounts: [],
      attribute: 0}
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
    this.setState({setAmount: true})
  }

  setAmount = (amount: number[]): void => {
    this.setState({amounts: amount})
  }

  setNewPlusAmount = (index: number, productIndexes: number[]): void => {
    sessionStorage.setItem(String(this.props.stateSelectedItem + 1), productIndexes[0] + ' ' + productIndexes[1])
    const newState = this.state.amounts;
    newState[index] = this.state.amounts[index] + 1;
    this.setState({amounts: newState});
    this.props.setGoods(this.props.stateSelectedItem + 1)
  }

  setNewMinusAmount = (index: number, productIndexes: number[]): void | undefined => {
    removeGoods(productIndexes)
    if (this.state.amounts[index] === 1) {
      const newState = this.state.amounts;
      newState.splice(index, 1)
      this.setState({amounts: newState});
      return;
    }
    const newState = this.state.amounts
    newState[index] = this.state.amounts[index] - 1;
    this.setState({ amounts: newState });
  }

  attributeSelected = (index: number): void => {
    this.setState({ attribute: index });
  }

  totalCost = (goodsCollection: number[][]): string => {
    const products = this.state.data.data.category.products
    return goodsCollection.map((indexes: number[]) =>
      products[indexes[0]].prices[this.props.stateCurrency].amount * indexes[2])
      .reduce((accumulator, current) => (accumulator + current), 0)
      .toFixed(2);
  }

  render() {
    const goodsFromStorage: string[] = Object.values(sessionStorage).map((item) => item.split(' '));
    const goodsAmount = goodsCollection(goodsFromStorage)
    if (!this.state.setAmount) {
      this.setAmount(goodsAmount.map((item: number[]) => item[2]));
    }
    if (!this.state.loading)
      return '';
    const products = this.state.data.data.category.products;
    const stateCurrency  = this.props.stateCurrency
    const totalCost = this.totalCost(goodsAmount);
    return (
      <div className='cart-window'>
        <p className='cart-window-bag'> My Bag, {sessionStorage.length} items</p>
        {goodsAmount.map((productIndexes: number[], index: number) => (
          <div key={index} className='cart-window-container'>
            <div className='window-first-container'>
              <p className='cart-window-name'>{products[productIndexes[0]].name}</p>
              <p className='cart-window-name'>{products[productIndexes[0]].id}</p>
              <p className='cart-window-cost'>
                {products[productIndexes[0]].prices[stateCurrency].currency}{' '}
                {products[productIndexes[0]].prices[stateCurrency].amount}
              </p>
              <div>
                {products[productIndexes[0]].attributes.length !== 0 ? products[productIndexes[0]].attributes[0].items
                  .map((el: {displayValue: string}, index: number) => (productIndexes[1]) === index ?
                    <SelectedAttributesHeader attributeSelected={() => this.attributeSelected(index)}
                                              displayValue={el.displayValue}/> : <></>) : <></>}
              </div>
            </div>
            <div className='cart-window-center-flex-element'>
              <button onClick={() => this.setNewPlusAmount(index, productIndexes)} className='cart-window-counter-btn'>
                +
              </button>
              {this.state.setAmount ? this.state.amounts[index] : productIndexes[2]}
              <button onClick={() => this.setNewMinusAmount(index, productIndexes)} className='cart-window-counter-btn'>
                -
              </button>
            </div>
            <div className='cart-window-last-flex-element'>
              <img className='cart-window-img' src={products[productIndexes[0]].gallery[0]} alt='picture1'/>
            </div>
          </div>
        ))}
        <div className='cart-window-total-cost'>
          <p>Total</p>
          <p>{totalCost}</p>
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