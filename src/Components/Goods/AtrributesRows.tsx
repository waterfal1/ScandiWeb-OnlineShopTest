import React from 'react';
import '../../Pages/Goods/Goods.styles.scss';
import AttributeName from './AttributeName';
import AttributeSelected from './AttributeSelected';
import AttributeNonSelected from './AttributeNonSelected';

export default class AttributesRows extends React.Component<{attributes: number[][]
  attributeSelected: (productIndex: number, attributeIndex: number, index: number) => void,
  attributeNonSelected: (productIndex: number, attributeIndex: number, index: number) => void,
  loadAttributes: boolean, productIndex: number, product: {attributes: {id: string, name: string,
  items: { value: string, displayValue: string; }[];}[]}}> {

  renderAttributesContainer = (attributes: number[][], product: {attributes: {id: string, name: string,
    items: { value: string, displayValue: string; }[];}[]}, productIndex: number, loadAttributes: boolean,
    attributeSelected: (productIndex: number, attributeIndex: number, index: number) => void,
    attributeNonSelected: (productIndex: number, attributeIndex: number, index: number) => void) => {

    if (product.attributes.length !== 0)
      return (
        <div className='attributes'>
          {this.attributesLoop(product, loadAttributes, productIndex, attributes, attributeSelected,
            attributeNonSelected)}
        </div>)
    return null
  }

  attributesLoop = (product: {attributes: {id: string, name: string,
    items: { value: string, displayValue: string; }[];}[]}, loadAttributes: boolean, productIndex: number,
    attributes: number[][], attributeSelected: (productIndex: number, attributeIndex: number, index: number) => void,
    attributeNonSelected: (productIndex: number, attributeIndex: number, index: number) => void) => {

    return product.attributes.map((attribute, attributeIndex: number) => {
      if (loadAttributes) {
        return (
          <div key={attribute.id} className='attributes-columns'>
            <AttributeName attributeName={attribute.name}/>
            <div className='goods-attribute-row'>
              {this.renderAttributes(attribute, attributes, productIndex, attributeIndex, attributeSelected,
                attributeNonSelected)}
            </div>
          </div>)}
      return null
      })
  }

  renderAttributes = (attribute: { id?: string; name?: string; items: { value: string, displayValue: string; }[];},
    attributes: number[][], productIndex: number, attributeIndex: number, attributeSelected: (productIndex: number,
    attributeIndex: number, index: number) => void, attributeNonSelected: (productIndex: number,
    attributeIndex: number, index: number) => void) => {

    return attribute.items.map((item: { value: string, displayValue: string }, itemIndex: number) => {
      if (attributes[productIndex][attributeIndex] == itemIndex)
        return <AttributeSelected productIndex={productIndex} attributeIndex={attributeIndex} itemIndex={itemIndex}
                                  attributeSelected={attributeSelected} value={item.value} />
      else
        return <AttributeNonSelected productIndex={productIndex} attributeIndex={attributeIndex} itemIndex={itemIndex}
                                     attributeNonSelected={attributeNonSelected} value={item.value} />
    })
  }

  render() {
    const { attributes, product, productIndex, loadAttributes, attributeSelected, attributeNonSelected } = this.props;
    return (
      <>
        {this.renderAttributesContainer(attributes, product, productIndex, loadAttributes, attributeSelected,
          attributeNonSelected)}
      </>
    )
  }
}
