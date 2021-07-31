import React from 'react';
import './Header.style.scss';

export default class SelectedAttributesHeader extends React.Component<{ attributeSelected: (input: number) => void,
  value: string }> {
  render() {
    const { attributeSelected, value } = this.props;
    const divStyle = { background: value, color: value, border: `30px solid ${value}`,
      boxShadow: '0 0 4px 0 rgba(50, 50, 50, 1)' }
    return (
      <div style={divStyle} onClick={() => attributeSelected} className='cart-box cart-selected pointer'>{value}</div>
    )
  }
}
