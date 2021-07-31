import React from 'react';
import './Header.style.scss';

export default class Attributes extends React.Component<{
  attributeSelected: (input: number) => void, value: string, displayValue: string }> {
  render() {
    const { displayValue, attributeSelected, value } = this.props;
    const divStyle = { background: value, color: value}
    return (
      <div style={divStyle} onClick={() => attributeSelected} className='cart-window-attributes'>
        {displayValue}
      </div>
    )
  }
}
