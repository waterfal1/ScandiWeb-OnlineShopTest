import React from 'react';
import '../../Pages/Cart/Cart.styles.scss';

export default class AttributesCart extends React.Component<{attributeName: string}> {
  render() {
    return <p className='cart-goods-attribute'>{this.props.attributeName}:</p>
  }
}
