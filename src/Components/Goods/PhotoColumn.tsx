import React from 'react';
import '../../Pages/Goods/Goods.styles.scss';

export default class PhotoColumn extends React.Component<{changeImage: (index: number) => void,
  product: {gallery: string[]}}> {
  render() {
    const { product, changeImage } = this.props;
    return (
      <div className='goods-page-photo-column'>
        {product.gallery.map((item: string, pictureIndex: number) => (
          <img key={pictureIndex} className='small-img pointer' onClick={() => changeImage(pictureIndex)}
               src={item} alt='picture1' />
        ))}
      </div>
    )
  }
}
