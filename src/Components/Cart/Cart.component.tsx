import React from 'react';
import * as _ from "lodash";
import '../../Pages/Goods/Goods.styles.scss';
import NonSelectedAttributes from './Cart.GoodsNonAttributeSelected.component';
import SelectedAttributesHeader from '../Header/SelectedAttributesHeader';
import AttributesCart from './AttributesCart';
import { NavLink } from 'react-router-dom';
import { goodsCollection } from './countFunctions';

export default class GoodsInCart extends React.Component<{ data: {
    products: {
      id: string, name: string,
      prices: { amount: string, currency: string }[], gallery: string[],
      attributes: { items: { displayValue: string }[]; }[];
    }[]
  }, stateCurrency: string, stateSelectedItem: number,
  setGoods: (value: number) => { type: string, payload: number }
}, {
  attribute: number, setAmount: boolean,
  amounts: any, imageState: number[], stateRender: boolean
}> {

  constructor(props: {
    data: {
      products: {
        id: string; name: string; prices: { amount: string; currency: string; }[];
        gallery: string[]; attributes: { items: { displayValue: string; }[]; }[];
      }[];
    }; stateCurrency: string;
    stateSelectedItem: number; setGoods: (value: number) => { type: string; payload: number; };
  } |
    Readonly<{
      data: {
        products: {
          id: string; name: string; prices: { amount: string; currency: string; }[];
          gallery: string[]; attributes: { items: { displayValue: string; }[]; }[];
        }[];
      };
      stateCurrency: string; stateSelectedItem: number;
      setGoods: (value: number) => { type: string; payload: number; };
    }>) {
    super(props)
    this.state = {
      attribute: 0, setAmount: false, amounts: [], imageState: [],
      stateRender: true
    }
  }

  attributeSelected = (num: number, productIndex: number, attributeIndex: number, index: number): void => {
    const fromStorage = JSON.parse(sessionStorage.getItem('Goods') as string);
    const goodsAmount = goodsCollection(fromStorage);
    goodsAmount.map((item: any, ind: number) => {
      if (ind === num) {
        item[1][0][attributeIndex] = String(index)
      }
    })
    const res = goodsAmount.map((item: any) => [item[0], _.flatten(item[1])]);
    sessionStorage.removeItem('Goods');
    sessionStorage.setItem('Goods', JSON.stringify(res));
    this.props.setGoods(this.props.stateSelectedItem + 1)
  }

  componentDidMount(): void {
    this.setState({setAmount: true})
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

  changeImagePlus = (index: number, length: number): void => {
    const picture = this.state.imageState;
    if (picture[index] < length - 1)
      picture[index] = this.state.imageState[index] + 1;
    else
      picture[index] = 0
    this.setState({imageState: picture});
  }

  changeImageMinus = (index: number, length: number): void => {
    const picture = this.state.imageState;
    if (picture[index] > 0)
      picture[index] = this.state.imageState[index] - 1;
    else
      picture[index] = length - 1
    this.setState({imageState: picture});
  }

  setImagesState = (images: number[]): void => {
    this.setState({imageState: images});
  }

  chosedGoods = (input: string): void => {
    localStorage.setItem('goodsSelected', input);
  }

  render() {
    const goodsFromStorage = JSON.parse(sessionStorage.getItem('Goods') as string);
    const goodsAmount = goodsCollection(goodsFromStorage);
    if (!this.state.setAmount) {
      const images = new Array(goodsAmount.length).fill(0, 0, goodsAmount.length);
      this.setImagesState(images);
    }
    const stateCurrency  = this.props.stateCurrency;
    const products = this.props.data.products;
    const res = _.flatten(goodsAmount.map((item: any) => {
      return products.map((el: {id: string, name: string, gallery: string[],
        prices: {amount: string, currency: string}[]}, index: number) => {
        if (item[0] === el.id)
          return index
        // @ts-ignore
      }).filter((value: number) => value || value === 0)
    }))
    return (
        <>{res.map((productIndexes: any, num: number) => (
          <div key={num} className='cart-common-container'>
            <div className='cart-goods-container'>
              <NavLink to='/goods' onClick={() => this.chosedGoods(products[productIndexes].id)}>
                <p className='cart-first-text'>{products[productIndexes].name}</p>
                <p className='cart-first-text weight-normal'>{products[productIndexes].id}</p>
                <p className='cart-goods-padding'>
                  {sessionStorage.getItem('Currency') ? sessionStorage.getItem('Currency') : <>&#36;</>}
                  {products[productIndexes].prices[parseInt(stateCurrency, 10)].amount}
                </p>
              </NavLink>
              <div className='cart-attributes cart-goods-padding'>
                {products[productIndexes].attributes.length !== 0 ? products[productIndexes].attributes
                  .map((element: any, index: number) => (   <div key={element.id} className='attributes-columns'>
                    <AttributesCart attributeName={element.name} /><div className='cart-attribute-row' key={index}>
                    {element.items
                      // @ts-ignore
                      .map((item: any, ind: number) => (goodsAmount[num][1][0][index] == ind ?
                        <SelectedAttributesHeader key={ind} attributeSelected={() => this.attributeSelected(num, productIndexes, index, ind)}
                                                  displayValue={item.displayValue} /> :
                        <NonSelectedAttributes index={index} ind={ind} attributeSelected={() =>
                          this.attributeSelected(num, productIndexes, index, ind)} displayValue={item.displayValue} />))}</div></div>)) : <></>}
              </div>
            </div>
            <div className='cart-center-flex-element'>
              <button onClick={() => this.setNewPlusAmount(goodsAmount[num])} className='cart-window-counter-btn'>+</button>
                {goodsAmount[num][2]}
              <button onClick={() => this.setNewMinusAmount(goodsAmount[num])} className='cart-window-counter-btn'>-</button>
            </div>
            <div className='cart-third-flex-element'>
              <img className='cart-small-img'
                   src={products[productIndexes].gallery[this.state.imageState[num]]} alt='picture1'/>
              {products[productIndexes].gallery.length > 1 ?
                <><div onClick={() => this.changeImageMinus(num, products[productIndexes].gallery.length)}
                     className='arrow-rev arrow-left-rev pointer'/>
                <div onClick={() => this.changeImagePlus(num, products[productIndexes].gallery.length)}
                     className='arrow-rev arrow-right-rev pointer'/></> : <></>
              }
            </div>
          </div>
        ))}
        </>
    )
  }
}
