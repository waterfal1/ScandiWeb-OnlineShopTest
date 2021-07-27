import React from 'react';
import './Goods.styles.scss';
import Good from './Goods';
import { connect } from 'react-redux';
import { setCurrency } from '../../store/Currency/actions';
import { setGoods } from '../../store/ChoseGoods/actions';

class GoodsContainer extends React.Component<{
  setCurrency: (value: number) => { type: string, payload: number }, stateCurrency: number, stateSelectedItem: number,
  setGoods: (value: number) => { type: string, payload: number } }> {
  render() {
    return <Good setCurrency={this.props.setCurrency} stateCurrency={this.props.stateCurrency}
                 stateSelectedItem={this.props.stateSelectedItem} setGoods={this.props.setGoods} />;
  }
}

const mapStateToProps = (state: {
  currency: { value: number; }; categoryChanging: { value: string; }; selectedItem: { value: number; }; }) => {
  return {
    stateCurrency: state.currency.value,
    stateSelectedItem: state.selectedItem.value
  }
}

const mapDispatchToProps = {
  setCurrency,
  setGoods
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsContainer)
