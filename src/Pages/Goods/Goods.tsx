import React from 'react';
import './Goods.styles.scss';
import {query} from '../Home/getData'
import {ApolloQueryResult} from '@apollo/client'
import Description from '../../Components/Goods/Description'

export default class Goods extends React.Component<{
  stateCurrency: string, setCurrency: (value: string) => { type: string, payload: string }, stateCounter: number,
  addCounter: (value: number) => { type: string, payload: number }, stateSelectedItem: number,
  setGoods: (value: number) => { type: string, payload: number }
}, {
  data: ApolloQueryResult<any>, loading: boolean,
  imageState: number, attributeNumber: number, counter: number
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
      attributeNumber: 0, counter: 0
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
        this.setState({loading: true, data: result});
      })
  }

  changeImage = (index: number): void => {
    this.setState({imageState: index});
  }

  attributeSelected = (index: number): void => {
    this.setState({attributeNumber: index});
  }

  attributeNonSelected = (index: number): void => {
    this.setState({attributeNumber: index});
  }

  addToCart = (index: number): void => {
    this.setState({counter: this.state.counter + 1});
    sessionStorage.setItem(String(this.props.stateSelectedItem + 1), String(index) + ' ' +
      String(this.state.attributeNumber));
    this.props.addCounter(this.state.counter + 1);
    this.props.setGoods(this.props.stateSelectedItem + 1);
  }

  render() {
    if (!this.state.loading)
      return '....Loading';
    const products = this.state.data.data.category.products;
    const productIndex = parseInt(localStorage.getItem('goods') as string, 10);
    return (
      <div className='goods-page-container'>
        <div className='goods-page-photo-column'>
          {products[productIndex].gallery.map((item: string, pictureIndex: number) => (
            <img key={pictureIndex} className='small-img pointer' onClick={() => this.changeImage(pictureIndex)}
                 src={item} alt='picture1'/>
          ))}
        </div>
        <div className='goods-page-main-photo'>
          <img className='goods-page-main-photo-flex' src={products[productIndex].gallery[this.state.imageState]}
               alt='picture2'/>
        </div>
        <div className='goods-description'>
          <p className='goods-name'> {products[productIndex].name}</p>
          <p className='goods-name grey-color'> {products[productIndex].id}</p>
          {products[productIndex].attributes.length !== 0 ?
            <>
              <p className='goods-attribute'> {products[productIndex].attributes[0].name}:</p>
              <div className='attributes'>
                {products[productIndex].attributes[0].items.map((item: { displayValue: string }, attributeIndex: number) =>
                  (this.state.attributeNumber === attributeIndex ?
                      <div onClick={() => this.attributeSelected(attributeIndex)}
                           className='goods-attribute-box goods-selected pointer'>
                        {item.displayValue}
                      </div> :
                      <div onClick={() => this.attributeNonSelected(attributeIndex)}
                           className='goods-attribute-box pointer'>
                        {item.displayValue}
                      </div>
                  ))}
              </div>
            </> : <></>
          }
          <p className='price'>{products[productIndex].prices[this.props.stateCurrency].__typename}:</p>
          <p className='price price-padding'>
            {products[productIndex].prices[this.props.stateCurrency].currency}{'  '}
            {products[productIndex].prices[this.props.stateCurrency].amount}
          </p>
          {products[productIndex].inStock ?
            <p>Out of Stock</p> :
            <button onClick={() => this.addToCart(productIndex)} className='add-to-cart-btn pointer'>ADD TO
              CART</button>
          }
          <Description description={products[productIndex].description}/>
        </div>
      </div>
    );
  }
}
