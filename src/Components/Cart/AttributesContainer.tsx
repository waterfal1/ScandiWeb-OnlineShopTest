import React from 'react';
import '../../Pages/Goods/Goods.styles.scss';
import AttributesCart from './AttributesCart';
import SelectedAttributesHeader from '../Header/SelectedAttributesHeader';
import NonSelectedAttributes from './Cart.NonSelectedAttribute';

export default class AttributesContainer extends React.Component<{goodsAmount: (string | number | string[][])[][],
  num: number, product: {attributes: {id: string, name: string,  items: { value: string, displayValue: string; }[]; }[] },
  attributeSelected: (goodsNumber: number, attributeIndex: number, newAttributeIndex: number) => void}> {
  render() {
    const { product, num, goodsAmount, attributeSelected } = this.props;
    return (
      <div className='cart-attributes cart-goods-padding'>
        {product.attributes.length !== 0
          ? product.attributes.map((element, index: number) => (
            <div key={element.id} className='attributes-columns'>
              <AttributesCart attributeName={element.name} />
              <div className='cart-attribute-row' key={index}>
                {element.items
              // @ts-ignore
              .map((item, counter: number) => (goodsAmount[num][1][0][index] == counter
                  ? <SelectedAttributesHeader key={counter} attributeSelected={() =>
                      attributeSelected(num, index, counter)} displayValue={item.value} />
                  : <NonSelectedAttributes index={index} ind={counter} attributeSelected={() =>
                      attributeSelected(num, index, counter)} displayValue={item.value} />
                      ))
                }
              </div>
            </div>
          ))
          : <></>}
      </div>
    )
  }
}
