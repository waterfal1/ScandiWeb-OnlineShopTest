export const initialState = {
  value: '',
}

export function categoryReducer(state: {value: string} = initialState, action: { type: string; payload: string; }) {
  switch (action.type) {
    case 'CATEGORY_CHANGE':
      return { ...state, value: action.payload}
    default: return state;
  }
}