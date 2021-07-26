import React from 'react';
import '../../Pages/Cart/Cart.styles.scss';

export default class NonSelectedAttributes extends React.Component<{ index: number, ind: number,
  attributeSelected: (input: number, input2: number) => void, displayValue: string }> {
  render() {
    return (
      <div onClick={() => this.props.attributeSelected(this.props.index, this.props.ind)}
           className='cart-box pointer'>{this.props.displayValue}
      </div>
    )
  }
}
