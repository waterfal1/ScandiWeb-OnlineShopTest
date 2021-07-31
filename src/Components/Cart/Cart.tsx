import React from 'react';
import * as _ from 'lodash';
import '../../Pages/Goods/Goods.styles.scss';
import {amountUpHelper, goodsCollection, removeGoods, searchIndexes} from '../functions';
import GoodsName from './GoodsName';
import AttributesContainer from './AttributesContainer';
import Buttons from './Buttons';
import Images from './Images';

export default class GoodsInCart extends React.Component<{ data: { products: { id: string, name: string, prices: {
  amount: string, currency: string }[], gallery: string[], attributes: { id: string, name: string,
  items: { value: string, displayValue: string }[]; }[]; }[] }, stateCurrency: number, stateSelectedItem: number,
  setGoods: (value: number) => { type: string, payload: number } }, { setAmount: boolean, imagesState: number[]  }> {

  constructor(props: {
    data: { products: { id: string; name: string; prices: { amount: string; currency: string; }[]; gallery: string[];
    attributes: { id: string, name: string, items: { value: string, displayValue: string; }[]; }[]; }[]; };
    stateCurrency: number; stateSelectedItem: number;
    setGoods: (value: number) => { type: string; payload: number; }; } ) {
    super(props)
    this.state = { setAmount: false, imagesState: [] }
  }

  attributeSelected = (goodsNumber: number, attributeIndex: number, newAttributeIndex: number): void => {
    const fromStorage = JSON.parse(sessionStorage.getItem('Goods') as string);
    // update goods in storage after new attributes selected
    const goodsAmount = goodsCollection(fromStorage);
    goodsAmount.map((item, ind: number) => {
      if (ind === goodsNumber) {
        // @ts-ignore
        item[1][0][attributeIndex] = String(newAttributeIndex);
      }
    })
    // @ts-ignore
    const goodsToStorage = goodsAmount.map((item) => [item[0], _.flatten(item[1])]);
    sessionStorage.removeItem('Goods');
    sessionStorage.setItem('Goods', JSON.stringify(goodsToStorage));
    this.props.setGoods(this.props.stateSelectedItem + 1);
  }

  componentDidMount(): void {
    this.setState({ setAmount: true })
  }

  // adding goods to storage
  setAmountUp = (productIndexes: (string | number[][] | number)[]): void => {
    amountUpHelper(productIndexes)
    this.props.setGoods(this.props.stateSelectedItem + 1)
  }

  // searching goods in storage and remove
  setAmountDown = (productIndexes: (string | number[][] | number)[]): void | undefined => {
    const goods = removeGoods(productIndexes)
    sessionStorage.removeItem('Goods');
    sessionStorage.setItem('Goods', JSON.stringify(goods));
    this.props.setGoods(this.props.stateSelectedItem + 1)
  }

  imageUp = (index: number, length: number): void => {
    const picture = this.state.imagesState;
    if (picture[index] < length - 1)
      picture[index] = this.state.imagesState[index] + 1;
    else
      picture[index] = 0;
    this.setState({ imagesState: picture });
  }

  imageDown = (index: number, length: number): void => {
    const picture = this.state.imagesState;
    if (picture[index] > 0)
      picture[index] = this.state.imagesState[index] - 1;
    else
      picture[index] = length - 1
    this.setState({imagesState: picture});
  }

  setImagesState = (images: number[]): void => {
    this.setState({ imagesState: images });
  }

  choseGoods = (goodsId: string): void => {
    localStorage.setItem('goodsSelected', goodsId);
  }

  productRender = (productsIndexes: number[], products: { id: string, name: string, prices: {
      amount: string, currency: string }[], gallery: string[], attributes: { id: string, name: string,
      items: { value: string, displayValue: string }[]; }[]; }[], goodsAmount: (string | number[][] | number)[][]) => {
    return productsIndexes.map((productIndex: number, goodsCounter: number) => (
      <div key={goodsCounter} className='cart-common-container'>
        <div className='cart-goods-container'>
          <GoodsName stateCurrency={this.props.stateCurrency} product={products[productIndex]}
                     choseGoods={() => this.choseGoods(products[productIndex].id)} />
          <AttributesContainer goodsAmount={goodsAmount} goodsCounter={goodsCounter}
                               product={products[productIndex]} attributeSelected={this.attributeSelected} />
        </div>
        <Buttons setAmountDown={this.setAmountDown} setAmountUp={this.setAmountUp}
                 goodsAmount={goodsAmount} goodsCounter={goodsCounter} />
        <Images imagesState={this.state.imagesState} imageDown={this.imageDown}
                imageUp={this.imageUp} product={products[productIndex]} goodsCounter={goodsCounter} />
      </div>
    ))
  }

  render() {
    const goodsFromStorage = JSON.parse(sessionStorage.getItem('Goods') as string);
    const goodsAmount = goodsCollection(goodsFromStorage);
    if (!this.state.setAmount) {
      // setting initial state of goods images
      const images = new Array(goodsAmount.length).fill(0, 0, goodsAmount.length);
      this.setImagesState(images);
    }
    const products = this.props.data.products;
    const productsIndexes = searchIndexes(goodsAmount, products);
    return <>{this.productRender(productsIndexes, products, goodsAmount)}</>
  }
}
