/**
 *
 * changed by lijianpo on 2021/06/11
 */

declare type Url = string

declare type Html = string

/** second */
declare type Timestamp = number

declare type Id = number

declare type FIXME = any

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
