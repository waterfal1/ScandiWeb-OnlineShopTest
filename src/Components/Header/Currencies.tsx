import React from 'react';
import './Header.style.scss';

interface HeaderCurrenciesProps {
  currencies: { __typename: string; currency: string; amount: string; }[],
  handleCurrency: (input: string) => void
}

export default class HeaderCurrencies extends React.Component<HeaderCurrenciesProps> {

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
