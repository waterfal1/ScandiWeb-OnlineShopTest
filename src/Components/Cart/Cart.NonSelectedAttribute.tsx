import React from 'react';
import '../../Pages/Cart/Cart.styles.scss';

export default class NonSelectedAttributes extends React.Component<{ index: number, ind: number,
  attributeSelected: (input: number, input2: number) => void, value: string, displayValue: string }> {
  render() {
    const { value, ind, index, displayValue, attributeSelected } = this.props;
    const divStyle = { background: value, color: value}
    return (
      <div style={divStyle} onClick={() => attributeSelected(index, ind)}
           className='cart-box pointer'>{displayValue}
      </div>
    )
  }
}
