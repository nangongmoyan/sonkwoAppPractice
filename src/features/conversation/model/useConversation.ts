/**
 *
 * created by lijianpo on 2021/05/21
 */

import { queryClient, useDispatch, useQuery } from '@hooks'
import { conversationApi } from '@sonkwo/sonkwo-api'
import { useCallback, useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import * as R from 'ramda'

const fetchConversations = async () => {
  const res = await conversationApi.getConversations()
  return {
    conversations: R.sort(
      R.descend(R.path(['privateMessage', 'createdAtTimestamp'])),
    )(res.conversations),
  }
}

const useConversation = () => useQuery('conversations', fetchConversations)

const setConversationQueryCache = (id: Id) => {
  const dispatch = useDispatch()
  const clearConversation = useCallback(() => {
    queryClient.setQueryData('conversations', (oldData) => {
      oldData.conversations = oldData.conversations.map((conversation) => {
        if (conversation.id === id) {
          if (conversation.unreadCount) {
            conversation.unreadCount.value = 0
          } else {
            conversation = { ...conversation, unreadCount: 0 }
          }
        }
        return conversation
      })
      return oldData
    })
  }, [id])

  // 退出时清零 conversation unread
  // badge private_message -1

  useEffect(() => {
    return () => {
      clearConversation()
      // dispatch(badgesAction.decrement('private_message'))
    }
  }, [])
}

const fetchPrivateMessages = async (id: number, page: number) => {
  return conversationApi.getPrivateMessages(id, page)
}

const usePrivateMessages = (id: number) => {
  return useInfiniteQuery(['messages', id], ({ pageParam = 1 }) =>
    fetchPrivateMessages(id, pageParam),
  )
}
export { useConversation, setConversationQueryCache, usePrivateMessages }
