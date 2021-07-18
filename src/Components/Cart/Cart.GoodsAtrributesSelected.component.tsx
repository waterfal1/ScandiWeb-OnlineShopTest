import React from 'react';
import '../../Pages/Goods/Goods.styles.scss';

export default class SelectedAttributes extends React.Component<{ index: number, ind: number,
  attributeSelected: (input: number, input2: number) => void, displayValue: string }> {
  render() {
    return (
      <div onClick={() => this.props.attributeSelected(this.props.index, this.props.ind)}
           className='cart-box cart-selected pointer'>{this.props.displayValue}
      </div>
    )
  }
}
