/**
 *
 * created by lijianpo on 2021/04/25
 */
import React, { useState, useEffect, useMemo } from 'react'
import {
  TouchableWithoutFeedback,
  StyleSheet,
  StyleProp,
  ImageStyle,
} from 'react-native'
import { getImageSize, getImageUri } from './imageApi'
import FastImage from 'react-native-fast-image'

interface MyImageProps {
  uri: string
  width: number
  height?: number
  style?: StyleProp<ImageStyle>
  resizeMode?: FastImage.ResizeMode
  onPress?: () => void
  children?: React.ReactNode
}
const MyImage = ({
  uri,
  width,
  height,
  onPress,
  style,
  ...restProps
}: MyImageProps) => {
  // TODO: use default size 1, cause divisor can't be 0 when calculate size
  const [imageRealSize, setImageRealSize] = useState({ width: 1, height: 1 })
  const [imageSizeFetched, setImageSizeFetched] = useState(() => {
    if (width && height) {
      return true
    } else {
      return false
    }
  })

  useEffect(() => {
    // TODO: https://stackoverflow.com/questions/56442582/react-hooks-cant-perform-a-react-state-update-on-an-unmounted-component
    let isCancelled = false

    async function fetchImageSize() {
      try {
        // unit is px
        const { width: realWidth, height: realHeight } = await getImageSize(uri)
        if (!isCancelled) {
          setImageRealSize({ width: realWidth, height: realHeight })
          setImageSizeFetched(true)
        }
      } catch (e) {
        // console.log('get image size failed, image url: ' + uri, e)
      }
    }

    fetchImageSize()
    return () => {
      isCancelled = true
    }
  }, [uri])

  const { imageUri, imageSize } = useMemo(() => {
    const imageWidth = Math.round(width)
    const imageHeight = height
      ? Math.round(height)
      : Math.round((imageRealSize.height * width) / imageRealSize.width)
    const size = { width: imageWidth, height: imageHeight }

    return {
      imageUri: getImageUri(uri, size, imageRealSize),
      imageSize: size,
    }
  }, [uri, imageRealSize, width, height])

  // TODO: preload background
  if (!imageUri || !imageSizeFetched) return null

  return (
    <TouchableWithoutFeedback onPress={onPress} disabled={!onPress}>
      <FastImage
        source={{
          uri: imageUri,
        }}
        style={StyleSheet.flatten([imageSize, style])}
        {...restProps}
      />
    </TouchableWithoutFeedback>
  )
}

export default React.memo(MyImage)
