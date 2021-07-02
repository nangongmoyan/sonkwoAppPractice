/**
 *
 * created by lijianpo on 2021/07/02
 */
import pipe from 'ramda/es/pipe'
import produce, { Draft } from 'immer'
import create, { State, StateCreator } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import AsyncStorage from '@react-native-community/async-storage'

const withImmer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>,
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce<T>(fn)), get, api)

const withPersist = (name: string) => <T extends State>(
  config: StateCreator<T>,
) => persist(config, { name: name, getStorage: () => AsyncStorage })

export const createStore = pipe(withImmer, create)

export const createPersistStore = (name: string) =>
  pipe(withImmer, withPersist(name), create)
