/**
 *
 * created by lijianpo on 2021/04/12
 */
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { loggedStacks } from '@pages/'

// 堆栈stack 实例
const RootStack = createStackNavigator()

// const SignInRouteScreen = () => {
//   return (
//     <RootStack.Navigator
//       mode="modal"
//       initialRouteName={'Guide'}
//       screenOptions={{ headerShown: false }}
//     >
//       {unLoggedStacks.map(({ name, component, options }) => (
//         <RootStack.Screen
//           key={name}
//           name={name}
//           options={options}
//           component={component}
//         />
//       ))}
//     </RootStack.Navigator>
//   )
// }

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

export { RootRouteScreen }
