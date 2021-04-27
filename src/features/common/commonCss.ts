/**
 *
 * created by lijianpo on 2021/04/27
 */

import { StyleSheet } from '@ui'
import { adaptiveWidth } from '@util'

const commonStyles = StyleSheet.create({
  saveContaine: {
    width: adaptiveWidth(100),

    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
})

export { commonStyles }
