/**
 *
 * created by lijianpo on 2021/04/12
 */

import React, { useRef, createRef, useState, useEffect } from 'react'
import { ThemeColors } from 'ui/theme'
// import { DrawerScreen } from './drawer'
import { RootRouteScreen } from './stacks'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer, InitialState } from '@react-navigation/native'

const Drawer = createDrawerNavigator() //  抽屉drawer实例

const getActiveRouteName = (state) => {
  const route = state.routes[state.index]

  if (route.state) {
    //Dive into nested navigarors
    return getActiveRouteName(route.state)
  }

  return route.name
}

export default function App() {
  const routeNameRef = useRef()
  const navigationRef = createRef()
  const [currentRoute, setCurrentRoute] = useState('MainTabBar')
  const [initialState, setInitialState] = useState(InitialState)

  useEffect(() => {
    const state = navigationRef.current.getRootState()
    // Save the initial route name
    routeNameRef.current = getActiveRouteName(state)
  }, [navigationRef])

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      onStateChange={(state) => {
        const previousRouteName = routeNameRef.current
        const currentRouteName = getActiveRouteName(state)

        if (previousRouteName !== currentRouteName) {
          // The line below uses the @react-native-firebase/analytics tracker
          // Change this line to use another Mobile analytics SDK
          console.log(previousRouteName, currentRouteName)
          setCurrentRoute(currentRouteName)
        }
        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName
      }}
    >
      <Drawer.Navigator
        // drawerStyle={{
        //   width: vw(75),
        //   backgroundColor: ThemeColors.WhiteSmoke,
        // }}
        drawerType="slide"
        initialRouteName="Home"
        overlayColor="transparent"
        keyboardDismissMode={'none'}
        // drawerContent={(props) => (
        //   <DrawerScreen {...props} userInfo={userInfo} />
        // )}
      >
        <Drawer.Screen
          name="Root"
          component={RootRouteScreen}
          options={{ swipeEnabled: false }}
        />
      </Drawer.Navigator>
      {/* {userInfo.id !== '' ? (
        <Drawer.Navigator
          drawerStyle={{
            width: vw(75),
            backgroundColor: ThemeColors.WhiteSmoke,
          }}
          drawerType="slide"
          initialRouteName="Home"
          overlayColor="transparent"
          keyboardDismissMode={'none'}
          drawerContent={(props) => (
            <DrawerScreen {...props} userInfo={userInfo} />
          )}
        >
          <Drawer.Screen
            name="Root"
            component={RootRouteScreen}
            options={{ swipeEnabled: false }}
          />
        </Drawer.Navigator>
      ) : (
        <SignInRouteScreen />
      )} */}
    </NavigationContainer>
  )
}
