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
  data: ApolloQueryResult<any>, loadAttributes: boolean, attributes: [number[]] }> {
  private currentCategory: string;
  constructor(props: any) {
    super(props)
    this.state = {data: {data: {}, loading: false, networkStatus: 0}, loading: false, counter: 0, loadAttributes: false,
      attributes: [[0]]};
    this.currentCategory = '';
  }

  componentDidMount(): void {
    this.fetchData()
  }

  componentDidUpdate(prevProps:Readonly<{categoryThings: string }>): void {
    if (this.props.categoryThings !== prevProps.categoryThings) {
      this.fetchData();
    }
  }

  fetchData = (): void => {
    query(`
      query { category${this.currentCategory} {
        name
        products {
        id
        name
        inStock
        gallery
        category
        attributes {
        id
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
      .then((result) => {
        console.log(result)
        this.setState({loading: true, data: result})
      })
  }

  increment = (id: string, attributes: number[]): void => {
    const goodsFromStorage = JSON.parse(sessionStorage.getItem('Goods') as string);
    if (goodsFromStorage) {
      goodsFromStorage.push([id, attributes]);
      sessionStorage.setItem('Goods', JSON.stringify(goodsFromStorage));
    }
    else {
      sessionStorage.setItem('Goods', JSON.stringify([[id, attributes]]));
    }
    this.setState({counter: this.state.counter + 1});
    this.props.addCounter(this.state.counter + 1);
    // this.props.setGoods(this.props.stateSelectedItem + 1);
  }

  choseGoods = (input: string): void => {
    localStorage.setItem('goodsSelected', input);
    this.props.setNewCategory('');
  }

  productAttributes = (): void => {
    let products = this.state.data.data.category.products
    this.setState({ loadAttributes: true })
    products = products.map((product: {attributes: {name: string, items: {displayValue: string}[]}[]}) => {
      if (product.attributes.length > 0)
        return product.attributes.map((item) => 0)
      else
        return []})
    this.setState({ attributes: products})
  };

  changeClass = (): void => {
    const qwe = document.querySelector('.text-active');
    if (qwe === null) return;
    qwe.className = 'navbar-link-block'
  }

  render() {
    if (!this.props.categoryThings) {
      this.changeClass()
    }
    else {
      this.currentCategory = `(input: {title: "${this.props.categoryThings}"})`;
    }
    if (!this.state.loading) return '....Loading';
    if (!this.state.loadAttributes) {
      this.productAttributes()
    }
    let {name} = this.state.data.data.category;
    name = name[0].toUpperCase() + name.substring(1)
    const blocksOnPage = Array.from(Array(this.state.data.data.category.products.length).keys());
    if (this.props.categoryThings) {
      name = this.props.categoryThings;
      name = name[0].toUpperCase() + name.substring(1)
    }
    const products = this.state.data.data.category.products;
    return (
      <main>
        <div className='category-name'>{name}</div>
        <div className='category-block-on-page'>
          {blocksOnPage.map((item: number) => {
            return (products[item].inStock && this.state.loadAttributes ?
              <InStock choseGoods={this.choseGoods} item={item} products={products} attributes={this.state.attributes}
                       stateCurrency={this.props.stateCurrency} counter={this.increment}/> :
              <NotInStock item={item} products={products}
                          stateCurrency={this.props.stateCurrency} choseGoods={this.choseGoods}/>)
          })
          }
        </div>
      </main>
    );
  }
}
