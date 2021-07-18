import React from 'react';
import './Home.styles.scss';
import Home from './Home';
import { setNewCategory } from '../../store/CategoryWasChosen/actions';
import { connect } from 'react-redux';
import { setCurrency } from '../../store/Currency/actions';
import { addCounter } from '../../store/CartCounter/actions';
import { setGoods } from '../../store/ChoseGoods/actions';
import { addGoodsToCart } from '../../store/CartGoodsHome/actions';

class HomeContainer extends React.Component<{
  setCurrency: (value: string) => { type: string, payload: string },
  stateCurrency: string, categoryThings: string, setNewCategory: (value: string) => { type: string, payload: string },
  stateCounter: number, addCounter: (value: number) => { type: string, payload: number }, stateSelectedItem: number,
  setGoods: (value: number) => { type: string, payload: number } }> {
  render() {
    return <Home setCurrency={this.props.setCurrency} stateCurrency={this.props.stateCurrency}
                 stateCounter={this.props.stateCounter} addCounter={this.props.addCounter}
                 categoryThings={this.props.categoryThings} setNewCategory={this.props.setNewCategory}
                 stateSelectedItem={this.props.stateSelectedItem} setGoods={this.props.setGoods}/>;
  }
}

const mapStateToProps = (state: {
  currency: { value: string; }; categoryChanging: { value: string; };
  counter: { value: number; }; selectedItem: { value: number; }; }) => {
  return {
    stateCurrency: state.currency.value,
    categoryThings: state.categoryChanging.value,
    counter: state.counter.value,
    stateSelectedItem: state.selectedItem.value,
  }
}

const mapDispatchToProps = {setCurrency, setNewCategory, addCounter, setGoods, addGoodsToCart}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
