export const initialState = {
  value: []
}

export function CartGoodsHomeReducer(state: {value: number[]} = initialState,
                                     action: {type: string, payload: number[]}) {
  switch (action.type) {
    case 'CART_GOODS':
      return { ...state, value: [...state.value, action.payload]}
    default: return state;
  }
}