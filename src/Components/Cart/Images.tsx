import React from 'react';
import '../../Pages/Goods/Goods.styles.scss';

export default class Images extends React.Component<{imagesState: number[], product: {gallery: string[] }, num: number,
  imageDown: (index: number, length: number) => void, imageUp: (index: number, length: number) => void}> {
  render() {
    const { num, product, imagesState, imageUp, imageDown } = this.props;
    return (
      <div className='cart-third-flex-element'>
        <img className='cart-small-img' src={product.gallery[imagesState[num]]} alt='picture1' />
        {product.gallery.length > 1
          ? <>
              <div onClick={() => imageDown(num, product.gallery.length)} className='arrow-rev arrow-left-rev pointer'/>
              <div onClick={() => imageUp(num, product.gallery.length)} className='arrow-rev arrow-right-rev pointer'/>
            </>
          : <></>
        }
      </div>
    )
  }
}
