export const CART_GOODS = 'CART_GOODS';

export const addGoodsToCart = (value: number[]) => ({
  type: CART_GOODS,
  payload: value
})
