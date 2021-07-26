export const initialState = {
  value: '',
}

export function currencyReducer(state: {value: string} = initialState, action: { type: string; payload: string; }) {
  switch (action.type) {
    case 'CURRENCY_CHANGE':
      return { ...state, value: action.payload}
    default: return state;
  }
}