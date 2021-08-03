export interface Products {
  category: {
    __typename: string
    name: string
    products: {
      id: string
      name: string
      inStock: string
      gallery: string[]
      category: string
      description: string
      attributes: {
        id: string
        name: string
        items: {
          value: string
          displayValue: string
        }[]
      }[]
      prices: {
        __typename: string
        currency: string,
        amount: string }[]
    }[]
  }

}

export class MyGoods {
  data: Products
  constructor(data: Products) {
    this.data = data
  }
}