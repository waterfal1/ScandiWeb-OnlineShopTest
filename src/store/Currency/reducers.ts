export const initialState = {
  value: 0,
}

export function currencyReducer(state: any = initialState, action: any) {
  switch (action.type) {
    case 'CURRENCY_CHANGE':
      return { ...state, value: action.payload}
    default: return state;
  }
}