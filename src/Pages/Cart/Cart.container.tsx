import React from 'react';
import './Cart.styles.scss';
import Cart from './Cart';
import { connect } from 'react-redux';
import { setCurrency } from '../../store/Currency/actions';
import { setGoods } from '../../store/ChoseGoods/actions';

class CartContainer extends React.Component<{
  setCurrency: (value: number) => { type: string, payload: number },
  stateCurrency: number, categoryThings: string, stateSelectedItem: number,
  setGoods: (value: number) => { type: string, payload: number } }> {

  render() {
    return <Cart setCurrency={this.props.setCurrency} stateCurrency={this.props.stateCurrency}
                 setGoods={this.props.setGoods} stateSelectedItem={this.props.stateSelectedItem}/>;
  }
}

const mapStateToProps = (state: { currency: { value: number; }; selectedItem: { value: number; }; }) => {
  return {
    stateCurrency: state.currency.value,
    stateSelectedItem: state.selectedItem.value,
  }
}

const mapDispatchToProps = {
  setCurrency,
  setGoods,
}

export default connect(mapStateToProps, mapDispatchToProps)(CartContainer)
