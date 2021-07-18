import React from 'react';
import './Home.styles.scss';
import {ApolloQueryResult} from '@apollo/client';
import InStock from '../../Components/Stock/InStock';
import NotInStock from '../../Components/Stock/NotInStock';
import { query } from './getData'

export default class Home extends React.Component<{
  setCurrency: (value: string) => { type: string, payload: string }, stateSelectedItem: number,
  setGoods: (value: number) => { type: string, payload: number }, stateCurrency: string, categoryThings: string,
  setNewCategory: (value: string) => { type: string, payload: string }, stateCounter: number,
  addCounter: (value: number) => { type: string, payload: number } }, {
  loading: boolean, counter: number,
  data: ApolloQueryResult<any> }> {
  constructor(props: any) {
    super(props)
    this.state = {data: {data: {}, loading: false, networkStatus: 0}, loading: false, counter: 0}
  }

  componentDidMount(): void {
    query(`
      query { category {
        name
        products {
        name
        inStock
        gallery
        category
        prices {
        currency
        amount
        }
      }
      }
      }
    `)
      .then((result) => {
        this.setState({loading: true, data: result})
      })
  }

  increment = (index: number): void => {
    sessionStorage.setItem(String(this.props.stateSelectedItem + 1), String(index) + ' 0');
    this.setState({counter: this.state.counter + 1});
    this.props.addCounter(this.state.counter + 1);
    this.props.setGoods(this.props.stateSelectedItem + 1);
  }

  choseGoods = (input: number): void => {
    localStorage.setItem('goods', String(input));
  }

  render() {
    if (!this.state.loading) return '....Loading'
    let {name} = this.state.data.data.category;
    let blocksOnPage = Array.from(Array(this.state.data.data.category.products.length).keys());
    if (this.props.categoryThings) {
      name = this.props.categoryThings
      blocksOnPage = this.state.data.data.category.products
        .map((item: { value: { category: string }[] }, index: number) => [item, index])
        .filter((value: { category: string; }[]) => value[0].category === this.props.categoryThings)
        .map((elem: [{ category: string }, number]) => elem[1]);
    }
    const category = this.state.data.data.category;
    return (
      <main>
        <div className='category-name'>{name}</div>
        <div className='category-block-on-page'>
          {blocksOnPage.map((item: number) => {
            return (!category.products[item].inStock ?
              <InStock choseGoods={this.choseGoods} item={item} products={category}
                       stateCurrency={this.props.stateCurrency} counter={this.increment}/> :
              <NotInStock item={item} products={category}
                          stateCurrency={this.props.stateCurrency} choseGoods={this.choseGoods}/>)
          })
          }
        </div>
      </main>
    );
  }
}
