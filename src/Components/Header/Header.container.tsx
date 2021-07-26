import React from 'react';
import './Header.style.scss';
import { setNewCategory } from '../../store/CategoryWasChosen/actions';
import Header from './Header.component';
import { connect } from 'react-redux';
import { setCurrency } from '../../store/Currency/actions';
import { addCounter } from '../../store/CartCounter/actions';
import { setGoods } from '../../store/ChoseGoods/actions';

class HeaderContainer extends React.Component<{stateCurrency: string,
  setCurrency: (value: string) => {type: string, payload: string}, categoryThings: string,
  setNewCategory: (value: string) => {type: string, payload: string}, stateCounter: number,
  addCounter: (value: number) => {type: string, payload: number},
  stateSelectedItem: number, setGoods: (value: number) => {type: string, payload: number} }> {
  render() {
    return <Header stateCurrency={this.props.stateCurrency} setCurrency={this.props.setCurrency}
                   categoryThings={this.props.categoryThings} setNewCategory={this.props.setNewCategory}
                   stateSelectedItem={this.props.stateSelectedItem} setGoods={this.props.setGoods}
    />;
  }
}

const mapStateToProps = (state: { currency: { value: string; }; categoryChanging: { value: string; };
  counter: { value: number; }; selectedItem: { value: number; }; }) => {
    return {
      stateCurrency: state.currency.value,
      categoryThings: state.categoryChanging.value,
      stateCounter: state.counter.value,
      stateSelectedItem: state.selectedItem.value,
    }
}

const mapDispatchToProps =  {
  setCurrency,
  setNewCategory,
  addCounter,
  setGoods,
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
