/**
 * Dimensions
 * created by lijianpo on 2021/04/14
 */
import { isiOS } from '@util'
import { Dimensions } from '@ui'
import ExtraDimensions from 'react-native-extra-dimensions-android'

function useDimensions() {
  const { width, height } = isiOS
    ? Dimensions.get('window')
    : {
        width: ExtraDimensions.get('REAL_WINDOW_WIDTH'),
        height: ExtraDimensions.get('REAL_WINDOW_HEIGHT'),
      }

  return { width, height }
}

export default useDimensions
