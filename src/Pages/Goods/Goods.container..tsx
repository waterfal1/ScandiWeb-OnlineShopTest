import React from 'react';
import './Goods.styles.scss';
import Good from './Goods';
import { setNewCategory } from '../../store/CategoryWasChosen/actions';
import { connect } from 'react-redux';
import { setCurrency } from '../../store/Currency/actions';
import { addCounter } from '../../store/CartCounter/actions';
import { setGoods } from '../../store/ChoseGoods/actions';
import { addGoodsToCart } from '../../store/CartGoodsHome/actions';

class GoodsContainer extends React.Component<{
  setCurrency: (value: string) => { type: string, payload: string },
  stateCurrency: string, categoryThings: string, setNewCategory: (value: string) => { type: string, payload: string },
  stateCounter: number, addCounter: (value: number) => { type: string, payload: number }, stateSelectedItem: number,
  setGoods: (value: number) => { type: string, payload: number } }> {
  render() {
    return <Good setCurrency={this.props.setCurrency} stateCurrency={this.props.stateCurrency}
                 stateCounter={this.props.stateCounter} addCounter={this.props.addCounter}
                 stateSelectedItem={this.props.stateSelectedItem} setGoods={this.props.setGoods}/>;
  }
}

const mapStateToProps = (state: {
  currency: { value: string; }; categoryChanging: { value: string; };
  counter: { value: number; }; selectedItem: { value: number; }; cartGoods: { value: number[]; }; }) => {
  return {
    stateCurrency: state.currency.value,
    categoryThings: state.categoryChanging.value,
    stateCounter: state.counter.value,
    stateSelectedItem: state.selectedItem.value,
    stateCart: state.cartGoods.value,
  }
}

const mapDispatchToProps = {
  setCurrency,
  setNewCategory,
  addCounter,
  setGoods,
  addGoodsToCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsContainer)
