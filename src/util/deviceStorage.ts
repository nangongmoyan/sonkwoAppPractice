/**
 *
 * created by lijianpo on 2021/04/13
 */

import { merge } from 'lodash'
import AsyncStorage from '@react-native-community/async-storage'

function addTimestamp(data) {
  return {
    data,
    createTimestamp: Date.now(),
  }
}

const deviceStorage = {
  get(key) {
    if (!Array.isArray(key)) {
      return AsyncStorage.getItem(key).then((value) => {
        return JSON.parse(value)
      })
    }
    return AsyncStorage.multiGet(key).then((values) => {
      return values.map((value) => {
        return JSON.parse(value[1])
      })
    })
  },

  save(key, value) {
    if (!Array.isArray(key)) {
      return AsyncStorage.setItem(key, JSON.stringify(addTimestamp(value)))
    }
    const pairs = key.map((pair) => {
      return [pair[0], JSON.stringify(addTimestamp(pair[1]))]
    })
    return AsyncStorage.multiSet(pairs)
  },

  update(key, value) {
    return deviceStorage.get(key).then((item) => {
      value = typeof value === 'string' ? value : merge({}, item.data, value)
      return AsyncStorage.setItem(key, JSON.stringify(addTimestamp(value)))
    })
  },

  delete(key) {
    if (!Array.isArray(key)) {
      return AsyncStorage.multiRemove(key)
    }
    return AsyncStorage.removeItem(key)
  },

  keys() {
    return AsyncStorage.getAllKeys()
  },

  push(key, value) {
    return deviceStorage.get(key).then((currentValue) => {
      if (currentValue === null) {
        return deviceStorage.save(key, [value])
      }
      if (Array.isArray(currentValue)) {
        return deviceStorage.save(key, [...currentValue, value])
      }
      throw new Error(
        `Existing value for key "${key}" must be of type null or Array, received ${typeof currentValue}.`,
      )
    })
  },
}

export default deviceStorage
