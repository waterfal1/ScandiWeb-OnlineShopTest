import React from 'react';
import '../../Pages/Goods/Goods.styles.scss';
import SelectedAttributes from "./Cart.GoodsAtrributesSelected.component";
import NonSelectedAttributes from "./Cart.GoodsNonAttributeSelected.component";
import {NavLink} from "react-router-dom";
import {goodsCollection, removeGoods} from "./countFunctions";

export default class GoodsInCart extends React.Component<{
  data: {
    products: {
      id: string, name: string,
      prices: { amount: string, currency: string }[], gallery: string[],
      attributes: { items: { displayValue: string }[]; }[];
    }[]
  }, stateCurrency: string, stateSelectedItem: number,
  setGoods: (value: number) => { type: string, payload: number }
}, {
  attribute: number, setAmount: boolean,
  amounts: number[], imageState: number[], attributesState: number[], stateRender: boolean
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
      attribute: 0, setAmount: false, amounts: [], imageState: [], attributesState: [],
      stateRender: true
    }
  }

  attributeSelected = (index: number, newAttributeIndex: number): void => {
    const newState = this.state.attributesState;
    newState[index] = newAttributeIndex;
    this.setState({attributesState: newState});
  }

  componentDidMount(): void {
    this.setState({setAmount: true})
  }

  setAmount = (amounts: number[]): void => {
    this.setState({amounts: amounts})
  }

  setNewPlusAmount = (index: number, productIndexes: number[]): void => {
    sessionStorage.setItem(String(this.props.stateSelectedItem + 1), productIndexes[0] + ' ' + productIndexes[1]);
    const newState = this.state.amounts;
    newState[index] = this.state.amounts[index] + 1;
    this.setState({amounts: newState});
    this.props.setGoods(this.props.stateSelectedItem + 1)
  }

  setNewMinusAmount = (index: number, productIndexes: number[]): void | undefined => {
    removeGoods(productIndexes)
    if (this.state.amounts[index] === 1) {
      const newState = this.state.amounts;
      newState.splice(index, 1)
      this.setState({amounts: newState});
      return;
    }
    const newState = this.state.amounts
    newState[index] = this.state.amounts[index] - 1;
    this.setState({amounts: newState});
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

  setAttributes = (attributes: number[]): void => {
    this.setState({attributesState: attributes})
  }

  render() {
    const goodsFromStorage: string[] = Object.values(sessionStorage).map((item) => item.split(' '));
    const goodsAmount = goodsCollection(goodsFromStorage);
    const amount = goodsAmount.map((item: number[]) => item[2]);
    const attributes = goodsAmount.map((item: number[]) => item[1]);
    if (!this.state.setAmount) {
      const images = new Array(amount.length).fill(0, 0, amount.length);
      this.setImagesState(images);
      this.setAmount(amount);
      this.setAttributes(attributes);
    }
    const products = this.props.data.products;
    return (
      <>
        {goodsAmount.map((productIndexes: number[], index: number) => (
          <div key={index} className='cart-common-container'>
            <div className='cart-goods-container'>
              <NavLink to='/goods'>
                <p className='cart-first-text'>{products[productIndexes[0]].name}</p>
                <p className='cart-first-text grey-color'>{products[productIndexes[0]].id}</p>
                <p className='cart-goods-padding'>
                  {products[productIndexes[0]].prices[parseInt(this.props.stateCurrency, 10)].currency}
                  {' '}{products[productIndexes[0]].prices[parseInt(this.props.stateCurrency, 10)].amount}
                </p>
              </NavLink>
              <div className='cart-attributes cart-goods-padding'>
                {products[productIndexes[0]].attributes.length !== 0 ?
                  products[productIndexes[0]].attributes[0].items.map((el: { displayValue: string }, number: number) =>
                    (this.state.attributesState[index] === number ?
                      <SelectedAttributes index={index} ind={number}
                                          attributeSelected={() => this.attributeSelected(index, number)}
                                          displayValue={el.displayValue}/> :
                      <NonSelectedAttributes index={index} ind={number} attributeSelected={() =>
                        this.attributeSelected(index, number)} displayValue={el.displayValue}/>)) : <></>}
              </div>
            </div>
            <div className='cart-center-flex-element'>
              <button onClick={() => this.setNewPlusAmount(index, productIndexes)} className='btn-counter'>+</button>
              {this.state.setAmount ? this.state.amounts[index] : productIndexes[1]}
              <button onClick={() => this.setNewMinusAmount(index, productIndexes)} className='btn-counter'>-</button>
            </div>
            <div className='cart-third-flex-element'>
              <img className='cart-small-img'
                   src={products[productIndexes[0]].gallery[this.state.imageState[index]]} alt='picture1'/>
              <div onClick={() => this.changeImageMinus(index, products[productIndexes[0]].gallery.length)}
                   className='arrow-rev arrow-left-rev pointer'/>
              <div onClick={() => this.changeImagePlus(index, products[productIndexes[0]].gallery.length)}
                   className='arrow-rev arrow-right-rev pointer'/>
            </div>
          </div>
        ))}
      </>
    )
  }
}
