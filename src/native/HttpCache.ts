/**
 *
 * created by lijianpo on 2021/05/10
 */
import { NativeModules } from 'react-native'

const HttpCache = NativeModules.HttpCache

const clearHttpCache = HttpCache.clearCache

const getHttpCacheSize = HttpCache.getHttpCacheSize

const clearImageCache = HttpCache.clearImageCache

const getImageCacheSize = HttpCache.getImageCacheSize

const getCacheSize = async () =>
  (await Promise.all([getHttpCacheSize(), getImageCacheSize()])).reduce(
    (a, b) => a + b,
    0,
  )

const clearCache = async () =>
  Promise.all([clearHttpCache(), clearImageCache()])

export { getCacheSize, clearCache }
