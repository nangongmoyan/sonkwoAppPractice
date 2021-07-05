/**
 * created by lijianpo on 2021/07/05
 */

import { useQuery } from '@hooks'
import { Area, gameApi } from '@sonkwo/sonkwo-api'
const fetchActivationKeys = async (id: number, area: Area) => {
  const res = await gameApi.getKey(id, area)
  console.log({ res })
  return res
}

const useActivationKeys = (id: number, area: Area) => {
  return useQuery(['activationKeys', id, area], () =>
    fetchActivationKeys(id, area),
  )
}

export { useActivationKeys }
