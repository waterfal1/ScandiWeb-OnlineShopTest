export const initialState = {
  value: 0,
}

export function counterReducer(state: {value: number} = initialState, action: {type: string, payload: number}) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, value: action.payload}
    default: return state;
  }
}