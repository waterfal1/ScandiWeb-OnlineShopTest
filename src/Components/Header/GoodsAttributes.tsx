import React from 'react';
import Attributes from './Attributes';

export default class GoodsAttributes extends React.Component<{attributeSelected: (index: number) => void,
  setAmountUp: (productIndexes: (string | number | string[][])[]) => void,
  setAmountDown: (productIndexes: (string | number | string[][])[] | number[][]) => void | undefined,
  goodsAmount: (string | number | string[][])[][], stateCurrency: string, productsIndexes: number[],
  products: {id: string, name: string, gallery: string[], prices: {amount: string}[],
    attributes: {id: string, name: string,  items: { displayValue: string; }[]; }[] }[]}> {

  render() {
    const { attributeSelected, goodsAmount, products, stateCurrency, productsIndexes, setAmountUp,
      setAmountDown } = this.props;
    return (
      <>
        {productsIndexes.map((productIndex: number, num: number) => (
          <div key={num} className='cart-window-container'>
            <div className='window-first-container'>
              <p className='cart-window-name'>{products[productIndex].name}</p>
              <p className='cart-window-name'>{products[productIndex].id}</p>
              <p className='goods-cost'>
                {sessionStorage.getItem('Currency') ? sessionStorage.getItem('Currency') : <>&#36;</>}
                {products[productIndex].prices[parseInt(stateCurrency, 10)].amount}
              </p>
              <div className='cart-window-attribute-row'>
                {products[productIndex].attributes.length !== 0
                  ? products[productIndex].attributes
                  .map((element: {name: string, items: {displayValue: string}[]}, index: number) => (
                    <div key={index}>
                      {element.name}{element.items
                      // @ts-ignore
                      .map((item: {displayValue: string}, ind: number) => (goodsAmount[num][1][0][index] == ind
                        ? <Attributes key={ind} attributeSelected={() => attributeSelected(ind)}
                                    displayValue={item.displayValue} />
                        : <></>
                      ))}
                    </div>))
                  : <></>}
              </div>
            </div>

            {/*buttons*/}
            <div className='cart-window-center-flex-element'>
              <button onClick={() => setAmountUp(goodsAmount[num])} className='cart-window-counter-btn'>
                +
              </button>
              {goodsAmount[num][2]}
              <button onClick={() => setAmountDown(goodsAmount[num])} className='cart-window-counter-btn'>
                -
              </button>
            </div>

            {/*picture*/}
            <div className='cart-window-last-flex-element'>
              <img className='cart-window-img' src={products[productIndex].gallery[0]} alt='picture1'/>
            </div>
          </div>
        ))}
      </>
    )
  }
}
