import React from 'react';
import '../../Pages/Goods/Goods.styles.scss';

export default class AttributeName extends React.Component<{attributeName: string}> {
  render() {
    return (
      <p className='goods-attribute'> {this.props.attributeName}:</p>
    )
  }
}
