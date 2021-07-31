import React from 'react';
import HeaderCurrencies from "./Currencies";
import cart from "../../assets/cart.svg";
import CartMenu from "./CartMenu";

export default class CurrenciesAndCart extends React.Component<{changeCurrency: () => void, currentCurrency: string,
  currencies: [{ currency: string }], handleCurrency: (index: string) => void, setCartBar: () => void,
  goodsAmount: (string | number[][] | number)[][], cartWindowClose: boolean, toggleCartWindow: () => void,
  stateCurrency: number, setCurrency: (value: number) => {type: string, payload: number}, stateSelectedItem: number,
  setGoods: (value: number) => {type: string, payload: number}, cartBar: boolean}> {

  cartRendering = (cartWindowClose: boolean, toggleCartWindow: () => void) => {
    if (cartWindowClose)
      return <CartMenu toggleCartWindow={toggleCartWindow} stateCurrency={this.props.stateCurrency}
                  setCurrency={this.props.setCurrency} stateSelectedItem={this.props.stateSelectedItem}
                  setGoods={this.props.setGoods} />
    return null
  }

  render() {
    const { changeCurrency, currentCurrency, cartBar, goodsAmount, currencies, handleCurrency, setCartBar,
      cartWindowClose, toggleCartWindow } = this.props
    return (
      <>
        <div className='column-container'>
          <div className='currency-container' onClick={changeCurrency}>
            {sessionStorage.getItem('Currency') ? sessionStorage.getItem('Currency') : currentCurrency}
            <div className='arrow-down' />
          </div>
          {cartBar ? <HeaderCurrencies currencies={currencies} handleCurrency={handleCurrency} /> : null}
        </div>
        <img onClick={setCartBar} className='a-number-of' src={cart} alt='Cart' />
        {goodsAmount.length > 0 ? <div className='number'>{goodsAmount.length}</div>: null}
        {this.cartRendering(cartWindowClose, toggleCartWindow)}
      </>
    )
  }
}
