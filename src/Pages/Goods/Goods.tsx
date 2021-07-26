import React from 'react';
import './Goods.styles.scss';
import {query} from '../Home/getData'
import {ApolloQueryResult} from '@apollo/client'
import Description from '../../Components/Goods/Description'
import AttributeName from "../../Components/Goods/AttributeName.component.";
import AttributeSelected from "../../Components/Goods/AttributeSelected";
import AttributeNonSelected from "../../Components/Goods/AttributeNonSelected";
import * as _ from "lodash";

export default class Goods extends React.Component<{
  stateCurrency: string, setCurrency: (value: string) => { type: string, payload: string }, stateCounter: number,
  addCounter: (value: number) => { type: string, payload: number }, stateSelectedItem: number,
  setGoods: (value: number) => { type: string, payload: number }
}, {
  data: ApolloQueryResult<any>, loading: boolean,
  imageState: number, attributeNumber: number, counter: number, attributes: [number[]],
  loadAttributes: boolean
}> {
  constructor(props: {
    stateCurrency: string; setCurrency: (value: string) => { type: string; payload: string; };
    stateCounter: number; addCounter: (value: number) => { type: string; payload: number; }; stateSelectedItem: number;
    setGoods: (value: number) => { type: string; payload: number; }; } | Readonly<{
    stateCurrency: string;
    setCurrency: (value: string) => { type: string; payload: string; }; stateCounter: number;
    addCounter: (value: number) => { type: string; payload: number; }; stateSelectedItem: number;
    setGoods: (value: number) => { type: string; payload: number; }; }>) {
    super(props)
    this.state = {
      data: {data: {}, loading: false, networkStatus: 0}, loading: false, imageState: 0,
      attributeNumber: 0, counter: 0, attributes: [[]], loadAttributes: false
    }
  }

  componentDidMount(): void {
    query(`
      query { category {
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
        console.log(result)
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
    const goodsFromStorage = JSON.parse(sessionStorage.getItem('Goods') as string);
    if (goodsFromStorage) {
      goodsFromStorage.push([id, attributes]);
      sessionStorage.setItem('Goods', JSON.stringify(goodsFromStorage));
    }
    else {
      sessionStorage.setItem('Goods', JSON.stringify([[id, attributes]]));
    }
    this.props.addCounter(this.state.counter + 1);
    this.props.setGoods(this.props.stateSelectedItem + 1);
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
  }

  render() {
    if (!this.state.loading)
      return '....Loading';
    if (!this.state.loadAttributes) {
      this.productAttributes()
    }
    const products = this.state.data.data.category.products;
    const productIndex = localStorage.getItem('goodsSelected');
    const res =
      products.map((el: {id: string, name: string, gallery: string[],
        prices: {amount: string, currency: string}[]}, index: number) => {
        if (productIndex === el.id)
          return index
      }).filter((value: number) => value || value === 0)[0]
    const attributes = this.state.attributes;
    return (
      <div className='goods-page-container'>
        <div className='goods-page-photo-column'>
          {products[res].gallery.map((item: string, pictureIndex: number) => (
            <img key={pictureIndex} className='small-img pointer' onClick={() => this.changeImage(pictureIndex)}
                 src={item} alt='picture1' />
          ))}
        </div>
        <div className='goods-page-main-photo'>
          <img className='goods-page-main-photo-flex' src={products[res].gallery[this.state.imageState]}
               alt='picture2' />
        </div>
        <div className='goods-description'>
          <p className='goods-name'> {products[res].name}</p>
          <p className='goods-name weight-normal'> {products[res].id}</p>
          {products[res].attributes.length !== 0 ?
              <div className='attributes'>
                {products[res].attributes.map((attribute: any, attributeIndex: number) => (
                  this.state.loadAttributes ?
                <div key={attribute.id} className='attributes-columns'>
                  <AttributeName attributeName={attribute.name} />
                  <div className='goods-attribute-row'>
                  {attribute.items.map((item: { displayValue: string }, itemIndex: number) => (
                    attributes[res][attributeIndex] === itemIndex
                    ?
                      <AttributeSelected productIndex={res} attributeIndex={attributeIndex}
                                       itemIndex={itemIndex} attributeSelected={this.attributeSelected}
                                                                              value={item.displayValue}  />
                    :
                    <AttributeNonSelected productIndex={res} attributeIndex={attributeIndex}
                                          itemIndex={itemIndex} attributeNonSelected={this.attributeNonSelected}
                                          value={item.displayValue} />
                    ))}
                  </div>
                  </div> : <></>
                  ))}

              </div> : <></>
          }
          <p className='price'>{products[res].prices[this.props.stateCurrency].__typename}:</p>
          <p className='price price-padding'>
            {sessionStorage.getItem('Currency') ? sessionStorage.getItem('Currency') : <>&#36;</>}
            {products[res].prices[this.props.stateCurrency].amount}
          </p>
          {products[res].inStock ?
            <button onClick={() => this.addToCart(products[res].id, attributes[res])}
                    className='add-to-cart-btn pointer'>ADD TO CART</button> :
            <p>Out of Stock</p>
          }
          <Description description={products[res].description}/>
        </div>
      </div>
    );
  }
}
