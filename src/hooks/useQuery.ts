/**
 *
 */
import {
  useQuery,
  QueryClientProvider,
  QueryClient,
  QueryCache,
} from 'react-query'

const queryCache = new QueryCache()
const queryClient = new QueryClient()
export { useQuery, queryCache, QueryClientProvider, queryClient }
