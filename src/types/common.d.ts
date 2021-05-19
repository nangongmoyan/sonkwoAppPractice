/**
 *
 * created by lijianpo on 2021/05/19
 */

declare interface routeProps {
  key: string
  name: string
  params: object
}

declare interface navigationProps {
  pop: Function
  push: Function
  reset: Function
  goBack: Function
  replace: Function
  navigate: Function
  popToTop: Function
  dispatch: Function
  canGoBack: Function
  isFocused: Function
  setParams: Function
  setOptions: Function
  addListener: Function
  removeListener: Function
  dangerouslyGetParent: Function
  dangerouslyGetState: Function
}

declare interface routeAndNavigation {
  route: routeProps
  navigation: navigationProps
}
