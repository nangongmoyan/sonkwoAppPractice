/**
 * 编辑资料样式集
 * created by lijianpo on 2021/02/27
 */

import { StyleSheet } from '@ui'
import { adaptiveWidth } from '@util'

const editInfoStyle = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: adaptiveWidth(200),
  },
  camera: {
    position: 'absolute',
    width: 30,
    height: 30,
    backgroundColor: '#000',
    borderRadius: 15,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export { editInfoStyle }
