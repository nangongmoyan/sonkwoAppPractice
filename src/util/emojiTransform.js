/**
 *
 * created by lijianpo on 2021/05/28
 */
import React from 'react'
import { Text } from 'react-native'
import { findIndex } from 'lodash'
import { All_EMOJI_OBJECT } from 'source/skemoji/skemoji'
import FastImage from 'react-native-fast-image'
const emojiReg = new RegExp(
  '\\/\\{[0-9][_][\u4e00-\u9fa5_a-zA-Z0-9]{1,14}\\}',
  'g',
)

const getActualText = (textContent: string) => {
  let views = []
  matchContentString(textContent, views)
  return views
}
const matchContentString = (textContent, views) => {
  if (textContent.length === 0) return
  let emojiIndex = textContent.search(emojiReg)
  let checkIndexArray = []
  // 若匹配不到，则直接返回一个全文本
  if (emojiIndex === -1) {
    views.push(<Text>{textContent}</Text>)
  } else {
    if (emojiIndex !== -1) {
      checkIndexArray.push(emojiIndex)
    }
    // 取index最小者
    let minIndex = Math.min(...checkIndexArray)
    // 将0-index部分返回文本
    views.push(<Text> {textContent.substring(0, minIndex)}</Text>)
    // 将index部分作分别处理
    matchEmojiString(textContent.substring(minIndex), views)
  }
}

const matchEmojiString = (emojiStr, views) => {
  let castStr = emojiStr.match(emojiReg)
  let emojiLength = castStr[0].length
  const emojiIndex = findIndex(All_EMOJI_OBJECT, (v) => v.value === castStr[0])
  const emojiImg = All_EMOJI_OBJECT[emojiIndex].key
  if (emojiImg) {
    views.push(
      <FastImage
        style={{ width: 25, height: 25 }}
        resizeMethod={'auto'}
        source={emojiImg}
      />,
    )
  }
  matchContentString(emojiStr.substring(emojiLength), views)
}
export { getActualText }
