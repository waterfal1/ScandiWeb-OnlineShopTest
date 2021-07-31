import * as _ from "lodash";

//counting a number of goods in storage
function goodsCollection(goodsIndexes: number[]): (string | number[][] | number)[][] {
  return _.toPairs(
    _.countBy(goodsIndexes))
    .map((item: [string, number]) =>
    [item[0]
      .split(',')[0], [item[0]
      .split(',')
      .slice(1)
      .map((item: string) => parseInt(item))], item[1]])
    // @ts-ignore
    .sort((a, b) => a[0] - b[0]);
}

//find goods indexes in database
function searchIndexes(goodsAmount: (string | number[][] | number)[][], products: { id: string; name: string;
gallery: string[]; prices: { amount: string; currency: string }[] }[]): number[] {
  return _.flatten(goodsAmount.map((item) => {
    return products.map((el: {id: string, name: string, gallery: string[],
      prices: {amount: string, currency: string}[]}, index: number) => {
      if (item[0] === el.id)
        return index
      // @ts-ignore
    }).filter((value: number) => value || value === 0)
  }))
}

function removeGoods(productIndexes: (string | number[][] | number)[]) {
  const goodsFromStorage = JSON.parse(sessionStorage.getItem('Goods') as string);
  const res = goodsFromStorage.map((element: number[][], index: number) => {
    // @ts-ignore
    if (element[0] === productIndexes[0] && _.isEqual(element[1], _.flatten(productIndexes[1])))
      return index
  }).filter((value: number | undefined) => value);
  goodsFromStorage.splice(res[res.length-1], 1)
  return goodsFromStorage
}

// if we add goods from main page we add with default attributes
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

function amountUpHelper(productIndexes: (string | number[][] | number)[]): void {
  const goodsFromStorage = JSON.parse(sessionStorage.getItem('Goods') as string);
  // @ts-ignore
  goodsFromStorage.push([productIndexes[0], _.flatten(productIndexes[1])]);
  sessionStorage.setItem('Goods', JSON.stringify(goodsFromStorage));
}

export { goodsCollection, searchIndexes, removeGoods, productsAttributes, addGoodsToStorage, amountUpHelper }
