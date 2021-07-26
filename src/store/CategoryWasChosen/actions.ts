export const CATEGORY_CHANGE = 'CATEGORY_CHANGE';

export const setNewCategory = (value: string) => ({
  type: CATEGORY_CHANGE,
  payload: value
})