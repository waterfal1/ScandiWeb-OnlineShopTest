import React from 'react';
import CurrentCurrency from '../Cart/CurrentCurrency';

export default class TotalCost extends React.Component<{totalCost: string}> {
  render() {
    return (
      <div className='cart-window-total-cost'>
        <p>Total</p>
        <p>
          <CurrentCurrency />
          {this.props.totalCost}
        </p>
      </div>
    )
  }
}
