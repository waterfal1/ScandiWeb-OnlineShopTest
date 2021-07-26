import React from 'react';
import './Header.style.scss';

export default class HeaderCurrencies extends React.Component<{
  currencies: [{ currency: string }], handleCurrency: (input: string) => void }> {
  render(): React.ReactNode {
    const currenciesSigns = [<>&#36;</>, <>&#163;</>, <>&#36;</>, <>&#165;</>, <>&#8381;</>]
    return (
      <div className='currency-list'>
        {this.props.currencies.map((currency: { currency: string }, index: number) => (
          <div key={index} onClick={() => this.props.handleCurrency(String(index))}>
            <span id={String(index)}>{currenciesSigns[index]}</span>{currency.currency}
          </div>))}
      </div>)
  }
}
