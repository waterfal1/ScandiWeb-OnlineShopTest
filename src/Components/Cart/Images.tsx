import React from 'react';
import '../../Pages/Goods/Goods.styles.scss';

interface ImagesProps {
  imagesState: number[]
  product: { gallery: string[]}
  imageUp: (index: number, length: number) => void
  goodsCounter: number
  imageDown: (index: number, length: number) => void
}

export default class Images extends React.Component<ImagesProps> {
  imageSwitcher = (length: number, goodsCounter: number, imageUp: (index: number, length: number) => void,
                   imageDown: (index: number, length: number) => void) => {
    if (length > 1)
      return <>
        <div onClick={() => imageDown(goodsCounter, length)} className='arrow-rev arrow-left-rev pointer'/>
        <div onClick={() => imageUp(goodsCounter, length)} className='arrow-rev arrow-right-rev pointer'/>
      </>
    return null
  }

  render() {
    const {goodsCounter, product, imagesState, imageUp, imageDown} = this.props;
    return (
      <div className='cart-third-flex-element'>
        <img className='cart-small-img' src={product.gallery[imagesState[goodsCounter]]} alt='picture1'/>
        {this.imageSwitcher(product.gallery.length, goodsCounter, imageUp, imageDown)}
      </div>
    )
  }
}
