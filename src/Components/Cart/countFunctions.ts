import * as _ from "lodash";

function goodsCollection(goodsIndexes: string[]): ((string | (string[])[] | number)[])[] {
  return _.toPairs(
    _.countBy(goodsIndexes))
    .map((item: [string, number]) =>
    [item[0].split(',')[0], [item[0].split(',').slice(1)], item[1]])
    // @ts-ignore
    .sort((a, b) => a[0] - b[0]);
}

export { goodsCollection }