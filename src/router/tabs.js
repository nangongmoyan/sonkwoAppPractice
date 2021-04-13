/**
 *  底部tab
 * created by lijianpo on 2021/04/12
 */
import React from 'react'
import { Mall } from '@pages/mall'
import { Game } from '@pages/game'
import { Cart } from '@pages/cart'
import { Mine } from '@pages/mine'
import { Image } from 'react-native'
import { ThemeColors } from 'ui/theme'
import { Community } from '@pages/community'
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
            case 'Mine':
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
        <Tab.Screen name={name} component={component} options={options} />
      ))}
      {/* <Tab.Screen
        name="Mall"
        component={Mall}
        options={{ tabBarLabel: '首页' }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{ tabBarLabel: '游戏' }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{ tabBarLabel: '社区' }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{ tabBarLabel: '购物车' }}
      />
      <Tab.Screen
        name="Mine"
        component={Mine}
        options={{ tabBarLabel: '我的' }}
      /> */}
    </Tab.Navigator>
  )
}

export { TabScreen }
