import React from 'react';
import { query } from '../../Pages/Home/getData';
import {amountUpHelper, goodsCollection, removeGoods, searchIndexes} from '../functions';
import { ApolloQueryResult } from '@apollo/client';
import * as _ from 'lodash';
import GoodsAttributes from './GoodsAttributes';
import CartWindowBag from "./CartWindowBag";
import TotalCost from "./TotalCost";
import Buttons from "./Buttons";

export default class CartMenu extends React.Component<{stateCurrency: number,
  setCurrency: (value: number) => {type: string, payload: number}, toggleCartWindow: () => void,
  stateSelectedItem: number, setGoods: (value: number) => {type: string, payload: number},
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
 }, { data:  ApolloQueryResult<any>, loading: boolean, amounts: number[],
  attribute: number, windowState: boolean }> {

  constructor(props: { stateCurrency: number; setCurrency: (value: number) => { type: string; payload: number; };
  toggleCartWindow: () => void; stateSelectedItem: number;
  setGoods: (value: number) => { type: string; payload: number; }}) {
    super(props)
    this.state = {data: {data: {}, loading: false, networkStatus: 0}, loading: false, amounts: [],
      attribute: 0, windowState: false}
  }

  componentDidMount(): void {
    query(`
      query { 
        category {
          name
          products {
            id
            name
            gallery
            attributes {
              name
              items {
                displayValue
                value
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

  setAmountUp = (productIndexes: (string | number[][] | number)[]): void => {
    amountUpHelper(productIndexes)
    this.props.setGoods(this.props.stateSelectedItem + 1);
  }

  setAmountDown = (productIndexes: (string | number[][] | number)[]): void | undefined => {
    const goods = removeGoods(productIndexes);
    sessionStorage.removeItem('Goods');
    sessionStorage.setItem('Goods', JSON.stringify(goods));
    this.props.setGoods(this.props.stateSelectedItem + 1);
  }

  attributeSelected = (index: number): void => {
    this.setState({ attribute: index });
  }

  // finding indexes of goods in order to find goods cost and after that cost counting
  totalCost = (goods: (string | number[][] | number)[][]): string => {
    const products = this.state.data.data.category.products;
    const result = _.flatten(goods.map((item) => {
     return products.map((el: {id: string, name: string, gallery: string[],
       prices: {amount: string, currency: string}[]}, index: number) => {
       if (item[0] === el.id)
        return index
    }).filter((value: number) => value || value === 0)
  }))
    return result
      // @ts-ignore
      .map((item: number, index: number) => products[item].prices[this.props.stateCurrency].amount * goods[index][2])
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
    const productsIndexes = searchIndexes(goodsAmount, products);
    return (
      <div className='cart-window'>
        <CartWindowBag amount={goodsAmount.length} />
        <GoodsAttributes attributeSelected={this.attributeSelected} goodsAmount={goodsAmount}
                         setAmountUp={this.setAmountUp} setAmountDown={this.setAmountDown}
                         stateCurrency={stateCurrency} productsIndexes={productsIndexes} products={products} />
        <TotalCost totalCost={totalCost} />
        <Buttons toggleCartWindow={this.props.toggleCartWindow} />
      </div>
    )
  }
}