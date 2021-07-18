import React from 'react';
import './Header.style.scss';

export default class SelectedAttributesHeader extends React.Component<{
  attributeSelected: (input: number) => void, displayValue: string }> {
  render() {
    return (
      <div onClick={() => this.props.attributeSelected} className='cart-window-box cart-window-selected pointer'>
        {this.props.displayValue}
      </div>
    )
  }
}
