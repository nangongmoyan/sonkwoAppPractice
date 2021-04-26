/**
 *  底部tab
 * created by lijianpo on 2021/04/12
 */
import React from 'react'
import { Image } from 'react-native'
import { ThemeColors } from 'ui/theme'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { tabSatcks } from '@pages/'

// 选项卡页签tab navigator 实例
const Tab = createBottomTabNavigator()

function TabScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource
          switch (route.name) {
            case 'Mall':
              iconSource = focused
                ? require('@source/images/homeFocus.png')
                : require('@source/images/home.png')
              break
            case 'Game':
              iconSource = focused
                ? require('@source/images/gameFocus.png')
                : require('@source/images/game.png')
              break
            case 'Community':
              iconSource = focused
                ? require('@source/images/communityFocus.png')
                : require('@source/images/community.png')
              break
            case 'Cart':
              iconSource = focused
                ? require('@source/images/cartFocus.png')
                : require('@source/images/cart.png')
              break
            case 'UserHome':
              iconSource = focused
                ? require('@source/images/mineFocus.png')
                : require('@source/images/mine.png')
              break
          }
          return <Image source={iconSource} style={{ height: 25, width: 25 }} />
        },
      })}
      tabBarOptions={{
        activeTintColor: ThemeColors.Default,
        inactiveTintColor: '#85858C',
      }}
    >
      {tabSatcks.map(({ name, component, options }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={options}
        />
      ))}
    </Tab.Navigator>
  )
}

export { TabScreen }
