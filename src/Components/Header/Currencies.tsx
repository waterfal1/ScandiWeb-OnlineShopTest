import React from 'react';
import './Header.style.scss';

export default class HeaderCurrencies extends React.Component<{
  currencies: [{ currency: string }], handleCurrency: (input: string) => void }> {

  currenciesRender = () => {
    const currenciesSigns = [<>&#36;</>, <>&#163;</>, <>&#36;</>, <>&#165;</>, <>&#8381;</>]
    return this.props.currencies.map((currency: { currency: string }, index: number) => (
      <div key={index} onClick={() => this.props.handleCurrency(String(index))}>
        <span id={String(index)}>{currenciesSigns[index]}</span>
        {currency.currency}
      </div>
    ))
  }

  render(): React.ReactNode {
    return <div className='currency-list'>{this.currenciesRender()}</div>
  }
}
