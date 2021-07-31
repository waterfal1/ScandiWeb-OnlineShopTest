import React from 'react';
import '../../Pages/Goods/Goods.styles.scss';

export default class AttributeName extends React.Component<{
  attributeNonSelected: (input1: number, input2: number, input3: number) => void, value: string, displayValue: string,
    productIndex: number, attributeIndex: number, itemIndex: number}> {
  render() {
    const { productIndex, attributeIndex, itemIndex, value, displayValue } = this.props;
    const divStyle = { background: value, color: value };
    return (
      <div style={divStyle} onClick={() => this.props.attributeNonSelected(productIndex, attributeIndex, itemIndex)}
           className='goods-attribute-box pointer'>
        {displayValue}
      </div>
    )
  }
}
