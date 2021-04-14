/**
 * 设置应用权限
 * created by lijianpo on 2021/04/13
 */
import {
  Alert,
  Platform,
  NativeModules,
  PermissionsAndroid,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const PERMISSIONS = PermissionsAndroid.PERMISSIONS

const requiredPermissions = [
  PERMISSIONS.CAMERA,
  PERMISSIONS.READ_PHONE_STATE,
  PERMISSIONS.READ_EXTERNAL_STORAGE,
  PERMISSIONS.WRITE_EXTERNAL_STORAGE,
]

const initPermissions = async () => {
  if (Platform.OS === 'ios') return
  try {
    const isFirstLaunch = await AsyncStorage.getItem('isFirstLaunch')
    if (isFirstLaunch === null) {
      AsyncStorage.setItem('isFirstLaunch', '1')
      const granted = await PermissionsAndroid.requestMultiple(
        requiredPermissions,
      )
    } else {
      Promise.all(
        requiredPermissions
          .map((permission) => PermissionsAndroid.check(permission))
          .then((results) => {
            const index = results.indexOf(false)
            if (index > -1) {
              let errorMsg = ''
              switch (index) {
                case 0:
                case 1:
                  errorMsg = '存储权限'
                  break
                case 2:
                  errorMsg = '电话权限'
                  break
                case 3:
                  errorMsg = '相机权限'
                  break
                default:
                  break
              }
              Alert.alert(
                '提示',
                `你${errorMsg}没有用打开，可能会导致应用闪退，去"设置>应用>豆米家>权限"设置一下吧`,
                [
                  { text: '关闭', onPress: () => {} },
                  {
                    text: '去设置',
                    onPress: () =>
                      NativeModules.OpenAppSettings.appDetailsSetting(),
                  },
                ],
              )
            }
          }),
      )
    }
  } catch (e) {
    console.log(e)
  }
}

export { initPermissions }
