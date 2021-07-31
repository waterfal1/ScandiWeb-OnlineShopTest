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
  render() {
    const { attributes, product, productIndex, loadAttributes, attributeSelected, attributeNonSelected } = this.props;
    return (
      <>
        {product.attributes.length !== 0
        ? <div className='attributes'>
            {product.attributes.map((attribute, attributeIndex: number) => (
              loadAttributes
                ? <div key={attribute.id} className='attributes-columns'>
                    <AttributeName attributeName={attribute.name} />
                    <div className='goods-attribute-row'>
                      {attribute.items.map((item: { value: string, displayValue: string }, itemIndex: number) => (
                        attributes[productIndex][attributeIndex] == itemIndex
                          ? <AttributeSelected productIndex={productIndex} attributeIndex={attributeIndex}
                                               itemIndex={itemIndex} attributeSelected={attributeSelected}
                                               displayValue={item.displayValue}
                                               value={item.value}  />
                          : <AttributeNonSelected productIndex={productIndex} attributeIndex={attributeIndex}
                                                  itemIndex={itemIndex} attributeNonSelected={attributeNonSelected}
                                                  displayValue={item.displayValue}
                                                  value={item.value} />
                      ))}
                    </div>
                  </div>
                : <></>
            ))}

          </div>
        : <></>
      }
      </>
    )
  }
}
