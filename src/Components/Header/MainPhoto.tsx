import React from 'react';

interface MainPhotoProps {
  product: {gallery: string[]}
  imageState: number
}

export default class MainPhoto extends React.Component<MainPhotoProps> {
  render() {
    const { product, imageState } = this.props;
    return (
      <div className='goods-page-main-photo'>
        <img className='goods-page-main-photo-flex' src={product.gallery[imageState]}
             alt='picture2' />
      </div>
    )
  }
}
