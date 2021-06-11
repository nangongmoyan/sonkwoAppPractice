/**
 *
 * created by lijianpo on 2021/05/19
 */

import { StyleSheet } from '@ui'
import { adaptiveWidth, deviceWidth, vw } from '@util'
import { ThemeColors } from 'ui/theme'

const walletStyle = StyleSheet.create({
  rightText: {
    fontSize: 13,
    color: ThemeColors.White,
    width: adaptiveWidth(150),
  },
  enabledBalance: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 10,
    fontWeight: '600',
  },
  disabledBalance: {
    fontSize: 14,
    marginLeft: 10,
    color: ThemeColors.Red,
  },
  walletBg: {
    height: 200,
    width: deviceWidth,
    position: 'absolute',
  },
  shadowBox: {
    marginBottom: 30,
    paddingVertical: 10,
    alignItems: 'flex-start',
  },
  walletName: {
    fontSize: 14,
    marginBottom: 15,
    fontWeight: '400',
  },
  walletLogo: {
    width: 40,
    height: (40 * 406) / 320,
  },
  buttonStyle: {
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  divider: {
    width: vw(64),
    marginTop: 10,
    backgroundColor: '#CCC',
  },
  sureButton: {
    height: 40,
    width: vw(64),
    justifyContent: 'center',
  },
  sureText: {
    fontSize: 15,
  },
})

export { walletStyle }
