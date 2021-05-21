/**
 *
 * created by lijianpo on 2021/05/21
 */

import moment from 'moment'

const useDate = (date: number, format = 'YY-DD', fromNow = false) => {
  const time = typeof date === 'number' ? date * 1000 : date
  if (fromNow && Date.now() - time <= 1000 * 60 * 60 * 24) {
    return moment(time).fromNow()
  }
  return moment(time).format(format)
}

export default useDate
