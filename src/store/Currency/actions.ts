export const CURRENCY_CHANGE = 'CURRENCY_CHANGE';

export const setCurrency = (value: string) => ({
  type: CURRENCY_CHANGE,
  payload: value
})
