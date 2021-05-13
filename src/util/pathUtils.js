/**
 *
 * created by lijianpo on 2021/05/13
 */

const queryString = require('query-string')

const urlToPathAndParams = (url, uriPrefix) => {
  const searchMatch = url.match(/^(.*)\?(.*)$/)
  const params = searchMatch
    ? queryString.parse(searchMatch[2], { arrayFormat: 'bracket' })
    : {}
  const urlWithoutSearch = searchMatch ? searchMatch[1] : url
  const delimiter = uriPrefix ?? '://'
  let path = urlWithoutSearch.split(delimiter)[1]
  if (path === undefined) {
    path = urlWithoutSearch
  }
  if (path === '/') {
    path = ''
  }

  if (path[path.length - 1] === '/') {
    path = path.slice(0, -1)
  }
  return { path, params }
}

export { urlToPathAndParams }
