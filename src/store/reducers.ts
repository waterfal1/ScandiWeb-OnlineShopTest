import { combineReducers } from 'redux';
import { currencyReducer } from './Currency/reducers';
import { categoryReducer } from './CategoryWasChosen/reducers';
import { counterReducer } from './CartCounter/reducers';
import { goodsReducer } from './ChoseGoods/reducers';
import { CartGoodsHomeReducer } from './CartGoodsHome/reducers';

export default combineReducers({
  currency: currencyReducer,
  categoryChanging: categoryReducer,
  counter: counterReducer,
  selectedItem: goodsReducer,
  cartGoods: CartGoodsHomeReducer,
})