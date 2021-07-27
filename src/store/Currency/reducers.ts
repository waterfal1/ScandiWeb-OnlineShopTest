export const initialState = {
  value: 0
}

export function currencyReducer(state: {value: number} = initialState, action: { type: string; payload: number; }) {
  switch (action.type) {
    case 'CURRENCY_CHANGE':
      return { ...state, value: action.payload}
    default: return state;
  }
}