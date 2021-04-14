/**
 * 组件样式集
 * create by lijianpo on 2021/04/14
 */

import { StyleSheet } from '@ui'
import { adaptiveWidth, adaptiveHeight, vw } from '@util'

const componentsStyles = StyleSheet.create({
  submitLoading: {
    width: vw(32),
    height: vw(32),
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#00000080',
    paddingHorizontal: adaptiveWidth(30),
    paddingVertical: adaptiveWidth(30),
  },
})

export { componentsStyles }
