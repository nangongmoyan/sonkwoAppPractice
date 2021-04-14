/**
 * 堆栈stack
 * changed by lijianpo on 2021/04/14
 */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { loggedStacks } from '@pages/'
import { unLoginStacks } from '@pages/'

// 堆栈stack 实例
const RootStack = createStackNavigator()

const UnLoginRouteScreen = () => {
  return (
    <RootStack.Navigator>
      {unLoginStacks.map(({ name, component, options }) => (
        <RootStack.Screen
          key={name}
          name={name}
          options={options}
          component={component}
        />
      ))}
    </RootStack.Navigator>
  )
}

const RootRouteScreen = () => {
  return (
    <RootStack.Navigator
      mode="modal"
      initialRouteName={'TabScreen'}
      screenOptions={{ headerShown: false }}
    >
      {loggedStacks.map(({ name, component, options }) => (
        <RootStack.Screen
          key={name}
          name={name}
          options={options}
          component={component}
        />
      ))}
    </RootStack.Navigator>
  )
}

export { UnLoginRouteScreen, RootRouteScreen }
