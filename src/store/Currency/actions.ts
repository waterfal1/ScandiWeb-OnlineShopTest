export const CURRENCY_CHANGE = 'CURRENCY_CHANGE';

export const setCurrency = (value: number) => ({
  type: CURRENCY_CHANGE,
  payload: value
})
