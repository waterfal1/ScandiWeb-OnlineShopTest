import { combineReducers } from 'redux';
import { currencyReducer } from './Currency/reducers';
import { categoryReducer } from './CategoryWasChosen/reducers';
import { goodsReducer } from './ChoseGoods/reducers';

export default combineReducers({
  currency: currencyReducer,
  categoryChanging: categoryReducer,
  selectedItem: goodsReducer,
})