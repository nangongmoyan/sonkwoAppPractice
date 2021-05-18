/**
 *
 * created by lijianpo on 2021/05/18
 */
import R from 'ramda'
import * as RA from 'ramda-adjunct'

const toSnakeCase = (str: string) =>
  str.replace(/([A-Z])/g, (x) => R.concat('_', x.toLowerCase()))

const isNotNilObject = R.allPass([RA.isNotNil, RA.isObj])

const snakelizeArray: (input: any[]) => any[] = R.map((x) => snakelizeKeys(x))

const mapKeysAndValues = R.useWith(R.compose(R.fromPairs, R.map), [
  R.identity,
  R.toPairs,
])

// snakelizeKeys
const snakelizeObj = mapKeysAndValues(
  R.juxt([R.o(toSnakeCase, R.head), R.o((x) => snakelizeKeys(x), R.last)]),
)

const snakelizeKeys = R.cond([
  [RA.isArray, snakelizeArray],
  [RA.isFunction, R.identity],
  [isNotNilObject, snakelizeObj],
  [R.T, R.identity],
])

export { snakelizeKeys }
