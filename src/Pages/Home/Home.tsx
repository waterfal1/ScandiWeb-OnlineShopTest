import React from 'react';
import './Home.styles.scss';
import InStock from '../../Components/Stock/InStock';
import NotInStock from '../../Components/Stock/NotInStock';
import { query } from './getData'
import { addGoodsToStorage, productsAttributes } from '../../Components/functions';
import {MyGoods} from "./ProductsClass";

interface HomeProps {
  setCurrency: (value: number) => { type: string, payload: number }
  stateSelectedItem: number
  setGoods: (value: number) => { type: string, payload: number }
  stateCurrency: number
  categoryThings: string
  setNewCategory: (value: string) => { type: string, payload: string }
}

interface MyHomeState {
  loading: boolean
  counter: number
  data: MyGoods
  loadAttributes: boolean
  attributes: number[][]
}

export default class Home extends React.Component<HomeProps, MyHomeState> {
  private currentCategory: string;
  constructor(props: HomeProps) {
    super(props)
    this.state = {data: new MyGoods( {
      category: {
        __typename: '',
        name: '',
        products: [{
          id: '',
          name: '',
          inStock: '',
          gallery: [''],
          description: '',
          category: '',
          attributes: [{
            id: '',
            name: '',
            items: [{
              value: '',
              displayValue: ''
            }]
          }],
          prices: [{
            __typename: '',
            currency: '',
            amount: '' }]
        }]
      }
    }), loading: false, counter: 0, loadAttributes: false,
      attributes: [[0]]};
    this.currentCategory = '';
  }

  componentDidMount(): void {
    this.fetchData()
  }

  componentDidUpdate(prevProps:Readonly<{categoryThings: string}>): void {
    if (this.props.categoryThings !== prevProps.categoryThings) {
      this.fetchData();
    }
  }

  fetchData = (): void => {
    query(`
      query { 
        category${this.currentCategory} {
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
        this.setState({loading: true, data: new MyGoods(result.data)})
      })
  }

  increment = (id: string, attributes: number[]): void => {
    addGoodsToStorage(id, attributes)
    this.setState({counter: this.state.counter + 1});
    this.props.setGoods(this.props.stateSelectedItem + 1);
  }

  choseGoods = (input: string): void => {
    localStorage.setItem('goodsSelected', input);
    this.props.setNewCategory('');
  }

  productAttributes = (): void => {
    const products = this.state.data.data.category.products;
    this.setState({ loadAttributes: true });
    const result = productsAttributes(products)
    this.setState({ attributes: result})
  };

  changeClass = (): void => {
    const classChange = document.querySelector('.text-active');
    if (classChange === null) return;
    classChange.className = 'navbar-link-block'
  }

  blocksRendering = () => {
    const blocksOnPage = Array.from(Array(this.state.data.data.category.products.length).keys());
    const products = this.state.data.data.category.products;
    return blocksOnPage.map((item: number) => {
      if (products[item].inStock && this.state.loadAttributes)
        return <InStock choseGoods={this.choseGoods} item={item} products={products} attributes={this.state.attributes}
                        stateCurrency={this.props.stateCurrency} counter={this.increment} />
      else
        return <NotInStock item={item} products={products} stateCurrency={this.props.stateCurrency}
                           choseGoods={this.choseGoods} />
    })

  }

  render() {
    if (!this.props.categoryThings) {this.changeClass()}
    this.currentCategory = `(input: {title: "${this.props.categoryThings}"})`;
    if (!this.state.loading) return '....Loading';
    if (!this.state.loadAttributes) {this.productAttributes()}
    let {name} = this.state.data.data.category;
    name = name[0].toUpperCase() + name.substring(1)
    if (this.props.categoryThings) {
      name = this.props.categoryThings;
      name = name[0].toUpperCase() + name.substring(1)
    }
    return (
      <main>
        <div className='category-name'>{name}</div>
        <div className='category-block-on-page'>
          {this.blocksRendering()}
        </div>
      </main>
    );
  }
}
