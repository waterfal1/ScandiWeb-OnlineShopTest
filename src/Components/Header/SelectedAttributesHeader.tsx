import React from 'react';
import './Header.style.scss';

export default class SelectedAttributesHeader extends React.Component<{
  attributeSelected: (input: number) => void, displayValue: string }> {
  render() {
    const { displayValue, attributeSelected } = this.props;
    return (
      <div onClick={() => attributeSelected} className='cart-box cart-selected pointer'>
         {displayValue}
      </div>
    )
  }
}
