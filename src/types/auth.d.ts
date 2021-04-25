/**
 *
 * created by lijianpo on 2021/04/14
 */

declare interface SignInSmsParam {
  phone: string
  token: string
}

declare interface SignInPasswordParam {
  account: string
  password: string
}
declare interface SignParams {
  route: string
  group: SimpleGroup
  refresh: () => void
}
