import React from 'react';
import '../../Pages/Goods/Goods.styles.scss';
import AttributesCart from './AttributesCart';
import SelectedAttributesHeader from '../Header/SelectedAttributesHeader';
import NonSelectedAttributes from './NonSelectedAttribute';

export default class AttributesContainer extends React.Component<{goodsAmount: (string | number[][] | number)[][],
  goodsCounter: number, product: {attributes: {id: string, name: string,  items: { value: string }[]; }[]},
  attributeSelected: (goodsNumber: number, attributeIndex: number, newAttributeIndex: number) => void}> {

  goodsAttributesRendering = (attributes: { id: string; name: string; items: { value: string }[]}[],
    goodsCounter: number, goodsAmount: (string | number | number[][])[][], attributeSelected: (goodsNumber: number,
      attributeIndex: number, newAttributeIndex: number) => void) => {
    // if we have attributes we go through them and render selected and unselected
    if (attributes.length !== 0) {
      return attributes.map((element, attributeIndex: number) => (
        <div key={element.id} className='attributes-columns'>
          <AttributesCart attributeName={element.name} />
          <div className='cart-attribute-row' key={attributeIndex}>
            {this.attributeLoop(element.items, attributeSelected, goodsCounter, attributeIndex, goodsAmount)}
          </div>
        </div>
      ))}
    return null
  }

  attributeLoop = (items: { value: string }[], attributeSelected: (goodsNumber: number, attributeIndex: number,
    newAttributeIndex: number) => void, goodsCounter: number , attributeIndex: number, goodsAmount: (string | number |
    number[][])[][]) => {
    return items.map((item, counter: number) => {
      // @ts-ignore
      if (goodsAmount[goodsCounter][1][0][attributeIndex] == counter)
        return <SelectedAttributesHeader key={counter} attributeSelected={() =>
          attributeSelected(goodsCounter, attributeIndex, counter)} value={item.value}/>
      return <NonSelectedAttributes key={counter} index={attributeIndex} counter={counter} value={item.value}
        attributeSelected={() => attributeSelected(goodsCounter, attributeIndex, counter)} />
    })
  }

  render() {
    const { product,goodsCounter, goodsAmount, attributeSelected } = this.props;
    return (
      <div className='cart-attributes cart-goods-padding'>
        {this.goodsAttributesRendering(product.attributes, goodsCounter, goodsAmount, attributeSelected)}
      </div>
    )
  }
}
