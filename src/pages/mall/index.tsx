/**
 * 商城页
 * created by lijianpo on 2021/04/12
 */
import React from 'react'
import { View, Text } from 'react-native'
const Mall = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text onPress={() => navigation.toggleDrawer()}>商城页面</Text>
    </View>
  )
}

export { Mall }
