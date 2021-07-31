import React from 'react';
import '../../Pages/Cart/Cart.styles.scss';

export default class NonSelectedAttributes extends React.Component<{ index: number, counter: number,
  attributeSelected: (input: number, input2: number) => void, value: string }> {
  render() {
    const { value, counter, index, attributeSelected } = this.props;
    const divStyle = { background: value, color: value}
    return (
      <div style={divStyle} onClick={() => attributeSelected(index, counter)} className='cart-box pointer'>{value}</div>
    )
  }
}
