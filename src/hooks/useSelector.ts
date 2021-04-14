/**
 * Selector
 * created by lijianpo on 2021/04/14
 */
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from 'store'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
