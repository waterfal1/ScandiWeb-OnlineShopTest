import React from 'react';
import '../../Pages/Goods/Goods.styles.scss';

export default class AttributeName extends React.Component<{
  attributeSelected: (input1: number, input2: number, input3: number) => void, value: string, productIndex: number,
  attributeIndex: number, itemIndex: number}> {
  render() {
    const { productIndex, attributeIndex, itemIndex, value } = this.props;
    const divStyle = { background: value, color: value, border: `10px solid ${value}`,
      boxShadow: '0 0 4px 0 rgba(50, 50, 50, 1)' };
    return (
      <div style={divStyle} onClick={() => this.props.attributeSelected(productIndex, attributeIndex, itemIndex)}
           className='goods-attribute-box goods-selected pointer'>
        {value}
      </div>
    )
  }
}
