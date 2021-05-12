/**
 * hooks导出类
 * created by lijianpo on 2021/04/14
 */
export { useTypedSelector } from './useSelector'
export { default as useInterval } from './useInterval'
export { default as usePrevious } from './usePrevious'
export { useNavigation } from '@react-navigation/native'
export { default as useDimensions } from './useDimensions'
export { useDispatch, useStore, useSelector } from 'react-redux'
export { useSafeAreaInsets as useSafeArea } from 'react-native-safe-area-context'
export {
  useQuery,
  queryCache,
  queryClient,
  QueryClientProvider,
} from './useQuery'
