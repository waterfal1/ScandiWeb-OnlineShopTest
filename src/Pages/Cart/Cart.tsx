import React from 'react';
import './Cart.styles.scss';
import { query } from '../Home/getData';
import { ApolloQueryResult } from '@apollo/client';
import GoodsInCart from '../../Components/Cart/Cart.component';

export default class Cart extends React.Component<{
  stateCurrency: string,
  setCurrency: (value: string) => { type: string, payload: string }, stateSelectedItem: number,
  setGoods: (value: number) => { type: string, payload: number } },
  { data: ApolloQueryResult<any>, loading: boolean }> {

  constructor(props: {
    stateCurrency: string; setCurrency: (value: string) => { type: string; payload: string; };
    stateSelectedItem: number; setGoods: (value: number) => { type: string; payload: number; };
  } |
    Readonly<{
      stateCurrency: string; setCurrency: (value: string) => { type: string; payload: string; };
      stateSelectedItem: number; setGoods: (value: number) => { type: string; payload: number; };
    }>) {
    super(props)
    this.state = {data: {data: {}, loading: false, networkStatus: 0}, loading: false}
  }

  componentDidMount(): void {
    query(`
      query { category {
        products {
        id
        name
        gallery
        attributes {
        items {
        displayValue
        }}
        prices {
        currency
        amount
        }}
      }}
    `)
      .then(result => {
        this.setState({loading: true, data: result})
      })
  }

  render() {
    if (!this.state.loading)
      return '....Loading'
    return (
      <section>
        <div className='cart-name'>Cart</div>
        <div> {sessionStorage.length === 0 ? <div className='cart-name'>You cart is empty</div> :
          <GoodsInCart stateCurrency={this.props.stateCurrency} stateSelectedItem={this.props.stateSelectedItem}
                       setGoods={this.props.setGoods} data={this.state.data.data.category}/>}
        </div>
      </section>
    );
  }
}
