/**
 *
 * created by lijianpo on 2021/04/28
 */

import { WALLET } from '@util/action_types'

export const setWallet = (data) => ({
  type: WALLET.SET_WALLET,
  data,
})
