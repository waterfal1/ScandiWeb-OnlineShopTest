import React from 'react';
import './Goods.styles.scss';
import { query } from '../Home/getData'
import { ApolloQueryResult } from '@apollo/client'
import Description from '../../Components/Goods/Description'
import PhotoColumn from '../../Components/Goods/PhotoColumn';
import AttributesRows from '../../Components/Goods/AtrributesRows';
import {addGoodsToStorage, productsAttributes} from "../../Components/functions";

export default class Goods extends React.Component<{
  stateCurrency: number, setCurrency: (value: number) => { type: string, payload: number }, stateSelectedItem: number,
  setGoods: (value: number) => { type: string, payload: number }
}, {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: ApolloQueryResult<any>, loading: boolean,
  imageState: number, attributeNumber: number, counter: number, attributes: [number[]],
  loadAttributes: boolean
}> {
  constructor(props: {
    stateCurrency: number; setCurrency: (value: number) => { type: string; payload: number; };
    stateSelectedItem: number; setGoods: (value: number) => { type: string; payload: number; }; }) {
    super(props)
    this.state = { data: {data: {}, loading: false, networkStatus: 0}, loading: false, imageState: 0,
      attributeNumber: 0, counter: 0, attributes: [[]], loadAttributes: false
    }
  }

  componentDidMount(): void {
    query(`
      query { 
        category {
          products {
            id
            name
            inStock
            gallery
            description
            attributes {
              id
              name
              items {
                value
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
        this.setState({loading: true, data: result});
      })
  }

  changeImage = (index: number): void => {
    this.setState({imageState: index});
  }

  attributeSelected = (productIndex: number, attributeIndex: number, index: number): void => {
    const newState = this.state.attributes;
    newState[productIndex][attributeIndex] = index
    this.setState({attributeNumber: index, attributes: newState});
  }

  attributeNonSelected = (productIndex: number, attributeIndex: number, index: number): void => {
    const newState = this.state.attributes;
    newState[productIndex][attributeIndex] = index;
    this.setState({attributeNumber: index, attributes: newState});
  }

  addToCart = (id: string, attributes: number[]): void => {
    this.setState({counter: this.state.counter + 1});
    addGoodsToStorage(id, attributes)
    this.props.setGoods(this.props.stateSelectedItem + 1);
  }

  productAttributes = (): void => {
    let products = this.state.data.data.category.products
    this.setState({ loadAttributes: true })
    products = productsAttributes(products)
    this.setState({ attributes: products})
  }

  findProductIndex = (productId: string | null, products: {id: string, name: string, gallery: string[],
    prices: {amount: string, currency: string}[]}[]): number => {
    // @ts-ignore
    return products
      .map((el: {id: string, name: string, gallery: string[], prices: {amount: string, currency: string}[]},
            index: number) => {
        if (productId === el.id)
          return index
      }).filter((value) => value || value === 0)[0]
  }

  renderButton = (products: {id: string, inStock: string}[], productIndex: number, attributes: [number[]]) => {
    if (products[productIndex].inStock)
      return <button onClick={() => this.addToCart(products[productIndex].id, attributes[productIndex])}
                     className='add-to-cart-btn pointer'>ADD TO CART</button>
    return <p>Out of Stock</p>
  }

  render() {
    if (!this.state.loading) return '....Loading';
    if (!this.state.loadAttributes) {
      this.productAttributes()
    }
    const products = this.state.data.data.category.products;
    const productId = localStorage.getItem('goodsSelected');
    const productIndex = this.findProductIndex(productId, products)
    const {attributes, imageState, loadAttributes } = this.state;
    return (
      <div className='goods-page-container'>
        <PhotoColumn changeImage={this.changeImage} product={products[productIndex]} />

        <div className='goods-page-main-photo'>
          <img className='goods-page-main-photo-flex' src={products[productIndex].gallery[imageState]}
               alt='picture2' />
        </div>

        <div className='goods-description'>
          <p className='goods-name'> {products[productIndex].name}</p>
          <p className='goods-name weight-normal'> {products[productIndex].id}</p>

          <AttributesRows attributes={attributes} product={products[productIndex]} productIndex={productIndex}
                          loadAttributes={loadAttributes} attributeNonSelected={this.attributeNonSelected}
                          attributeSelected={this.attributeSelected} />

          <p className='price'>{products[productIndex].prices[this.props.stateCurrency].__typename}:</p>
          <p className='price price-padding'>
            {sessionStorage.getItem('Currency') ? sessionStorage.getItem('Currency') : <>&#36;</>}
            {products[productIndex].prices[this.props.stateCurrency].amount}
          </p>

          {this.renderButton(products, productIndex, attributes)}
          <Description description={products[productIndex].description} />
        </div>
      </div>
    );
  }
}
