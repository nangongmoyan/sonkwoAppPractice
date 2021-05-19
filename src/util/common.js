/**
 * created by lijianpo on 2021/04/29
 */

/**
 * 判断是否为空对象
 * @param {*} obj
 * @returns boolean
 */
const checkNullObj = (obj) => Object.keys(obj).length === 0

/**
 *
 * @param {*} cb
 * @param {*} wait
 */
let timeout = null
const debounce = (cb, wait = 500) => {
  if (timeout !== null) clearTimeout(timeout)
  timeout = setTimeout(() => {
    timeout = null
    cb && cb()
  }, wait)
}
export { checkNullObj, debounce }
