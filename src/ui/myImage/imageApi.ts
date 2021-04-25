/**
 *
 * created by lijianpo on 2021/04/25
 */
interface Size {
  width: number
  height: number
}
const QINIU = 'qiniu'
const ALIYUN = 'aliyun'
const NONE = 'none'

export const getImageType = (url: string) => {
  const qiniuRegex = /s[0-9]+\.sonkwo\.com/g
  const aliyunRegex = /s[0-9]+\.sonkwo\.hk/g

  if (qiniuRegex.test(url)) return QINIU
  if (aliyunRegex.test(url)) return ALIYUN
  return NONE
}

export const getImageSize = async (url: string) => {
  const imageType = getImageType(url)

  if (imageType === NONE)
    throw new Error('[myImage]: the image uri is not valid')

  const urlSizeUrl =
    imageType === QINIU ? `${url}?imageInfo` : `${url}?x-oss-process=image/info`

  try {
    const response = await fetch(urlSizeUrl)
    const size = await response.json()
    const height = imageType === QINIU ? size.height : size.ImageHeight.value
    const width = imageType === QINIU ? size.width : size.ImageWidth.value
    return { height, width }
  } catch (e) {
    throw e
  }
}

export const getImageUri = (url: string, size: Size, originSize: Size) => {
  if (!url) return ''
  const imageType = getImageType(url)
  const CUT_RATIO = 4
  // fast image not work for android devices when url is https
  // need custom okhttpclient
  // let imageUrl = url.replace('https://', 'http://')
  let imageUrl = url
  if (imageType === NONE) return imageUrl

  const cut = size.height && originSize.height / originSize.width >= CUT_RATIO

  // only use cropping for qiniu image now
  const cutParma = `/crop/${originSize.width}x${size.height}`
  const webpParam = '/strip/format/webp'
  const aliyunRegex = /(\w+)(\.sonkwo\.)(hk)/g

  if (imageType === ALIYUN) {
    imageUrl = url.replace(aliyunRegex, (match, p1, p2, p3) => {
      return `${p1}-rc${p2}com`
    })
  }

  return `${imageUrl}?imageMogr2${cut ? cutParma : ''}${webpParam}`
}
