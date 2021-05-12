/**
 *
 * created by lijianpo on 2021/05/12
 */

import { queryClient, useQuery } from '@hooks'
import { notiApi } from '@sonkwo/sonkwo-api'
const fetchUserNotification = async () => notiApi.getNotiSetting()

function useUserNotification() {
  return useQuery('notiSetting', fetchUserNotification)
}

const setNotificationQueryCache = (value: boolean, route: string) => {
  queryClient.setQueryData('notiSetting', (oldData) => {
    return {
      pushSetting: {
        ...oldData.pushSetting,
        [route]: value,
      },
    }
  })
}
export { useUserNotification, setNotificationQueryCache }
