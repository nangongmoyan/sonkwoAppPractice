/**
 *
 * created by lijianpo on 2021/04/26
 */

import { StyleSheet } from '@ui'
import { adaptiveWidth, deviceWidth } from '@util'
import { ThemeColors } from 'ui/theme'

const userHomeStyles = StyleSheet.create({
  userBg: {
    width: deviceWidth,
    height: (deviceWidth * 405) / 375,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  avatarBorder: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: adaptiveWidth(130),
    height: adaptiveWidth(130),
    borderColor: ThemeColors.White,
    borderRadius: adaptiveWidth(65),
  },
  userInfo: {
    paddingVertical: 15,
    paddingHorizontal: adaptiveWidth(40),
  },
  headerRouters: {
    paddingVertical: 15,
    justifyContent: 'space-between',
    paddingHorizontal: adaptiveWidth(72),
  },
  routesItem: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  followFansContainer: {
    height: 100,
    marginTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#222',
  },
  followFans: {
    height: 50,
    width: deviceWidth,
    alignItems: 'center',
    paddingHorizontal: 32,
    // backgroundColor: 'green',
  },
  followFansDiver: {
    width: 1.5,
    height: 15,
    flexDirection: 'row',
    marginHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  steamContainer: {
    height: 100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#027FB7',
  },
  steamLogo: {
    width: 28,
    height: 28,
    marginRight: 30,
  },
})

export { userHomeStyles }
