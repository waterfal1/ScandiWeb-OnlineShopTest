import * as _ from "lodash";

function goodsCollection(goodsIndexes: string[]): ((string | (string[])[] | number)[])[] {
  return _.toPairs(
    _.countBy(goodsIndexes))
    .map((item: [string, number]) =>
    [item[0].split(',')[0], [item[0].split(',').slice(1)], item[1]])
    // @ts-ignore
    .sort((a, b) => a[0] - b[0]);
}

function searchIndexes(goodsAmount: (string | number | string[][])[][], products: { id: string; name: string;
  gallery: string[]; prices: { amount: string; currency: string; }[]; }[]): number[] {
  return _.flatten(goodsAmount.map((item) => {
    return products.map((el: {id: string, name: string, gallery: string[],
      prices: {amount: string, currency: string}[]}, index: number) => {
      if (item[0] === el.id)
        return index
      // @ts-ignore
    }).filter((value: number) => value || value === 0)
  }))
}

function goodsFromStorage(productIndexes: (string | number | string[][])[] | number[][]) {
  const goodsFromStorage = JSON.parse(sessionStorage.getItem('Goods') as string);
  goodsFromStorage.splice(goodsFromStorage.map((element: number[][], index: number) => {
    if (element[0] === productIndexes[0] && element[1].map((item: number, ind: number) => {// @ts-ignore
      return item === productIndexes[1][ind]
    }))
      return index
  })
    .filter((value: number[] | undefined) => value)[0], 1)
  return goodsFromStorage
}

function productsAttributes(products: { attributes: { name: string; items: { displayValue: string; }[]; }[]; }[]) {
  return products.map((product: {attributes: {name: string, items: {displayValue: string}[]}[]}) => {
    if (product.attributes.length > 0)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      return product.attributes.map((item) => 0)
    else
      return []})
}

function addGoodsToStorage(id: string, attributes: number[]) {
  const goods = JSON.parse(sessionStorage.getItem('Goods') as string);
  if (goods) {
    goods.push([id, attributes]);
    sessionStorage.setItem('Goods', JSON.stringify(goods));
  }
  else {
    sessionStorage.setItem('Goods', JSON.stringify([[id, attributes]]));
  }
}

// @ts-ignore
export { goodsCollection, searchIndexes, goodsFromStorage, productsAttributes, addGoodsToStorage }
