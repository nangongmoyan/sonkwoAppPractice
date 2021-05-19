/**
 * hooks导出类
 * created by lijianpo on 2021/04/14
 */
export { useTypedSelector } from './useSelector'
export { default as useInterval } from './useInterval'
export { default as usePrevious } from './usePrevious'
export { useNavigation, useRoute } from '@react-navigation/native'
export { useNavigationParam } from 'react-navigation-hooks'
export { default as useDimensions } from './useDimensions'
export { useDispatch, useStore, useSelector } from 'react-redux'
export { useSafeAreaInsets as useSafeArea } from 'react-native-safe-area-context'
export {
  useQuery,
  queryCache,
  queryClient,
  QueryClientProvider,
} from './useQuery'
