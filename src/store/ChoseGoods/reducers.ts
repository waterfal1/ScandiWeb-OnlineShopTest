export const initialState = {
  value: 0,
}

export function goodsReducer(state: {value: number} = initialState, action: { type: string; payload: number; }) {
  switch (action.type) {
    case 'CHOSE_GOODS':
      return { ...state, value: action.payload}
    default: return state;
  }
}