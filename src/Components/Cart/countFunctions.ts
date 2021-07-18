import * as _ from "lodash";

function goodsCollection(goodsIndexes: string[]) {
  return _.toPairs(
    _.countBy(goodsIndexes))
    .map((item: [string, number]) => {
      return _.flatten([item[0]
        .split(',')
        .map((elem: string) => parseInt(elem, 10)), item[1]])
    })
    .sort((a: number[], b: number[]) => a[0] - b[0]);
}

function removeGoods(productIndexes: number[]) {
  sessionStorage
    .removeItem(sessionStorage
      .key(Object
        .values(sessionStorage)
        .map((item) => String(item)
          .split(' '))
        .findIndex(item => (parseInt(item[0], 10) === productIndexes[0]) &&
          parseInt(item[1], 10) === productIndexes[1])) as string);
}

export { goodsCollection, removeGoods }