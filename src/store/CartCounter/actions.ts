export const INCREMENT = 'INCREMENT';

export const addCounter = (value: number) => ({
  type: INCREMENT,
  payload: value
})
