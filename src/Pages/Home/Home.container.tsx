import React from 'react';
import './Home.styles.scss';
import Home from './Home';
import { setNewCategory } from '../../store/CategoryWasChosen/actions';
import { connect } from 'react-redux';
import { setCurrency } from '../../store/Currency/actions';
import { setGoods } from '../../store/ChoseGoods/actions';

class HomeContainer extends React.Component<{
  setCurrency: (value: number) => { type: string, payload: number },
  stateCurrency: number, categoryThings: string, setNewCategory: (value: string) => { type: string, payload: string },
  stateSelectedItem: number, setGoods: (value: number) => { type: string, payload: number } }> {
  render() {
    return <Home setCurrency={this.props.setCurrency} stateCurrency={this.props.stateCurrency}
                 categoryThings={this.props.categoryThings} setNewCategory={this.props.setNewCategory}
                 stateSelectedItem={this.props.stateSelectedItem} setGoods={this.props.setGoods} />;
  }
}

const mapStateToProps = (state: {
  currency: { value: number; }; categoryChanging: { value: string; }; selectedItem: { value: number; }; }) => {
  return {
    stateCurrency: state.currency.value,
    categoryThings: state.categoryChanging.value,
    stateSelectedItem: state.selectedItem.value,
  }
}

const mapDispatchToProps = { setCurrency, setNewCategory, setGoods }

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
