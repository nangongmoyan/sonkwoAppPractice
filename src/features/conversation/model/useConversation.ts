/**
 *
 * created by lijianpo on 2021/05/21
 */

import { useQuery } from '@hooks'
import { conversationApi } from '@sonkwo/sonkwo-api'
const fetchConversations = async () => conversationApi.getConversations()

function useConversation() {
  return useQuery('conversations', fetchConversations)
}

export { useConversation }
