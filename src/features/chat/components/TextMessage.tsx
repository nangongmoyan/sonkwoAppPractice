/**
 *
 * created by lijianpo on 2021/05/23
 */
import { View, TouchableOpacity } from '@ui'
import React from 'react'

const TextMessage: React.FC<any> = ({}) => {
  return (
    <View collapsable={false}>
      <View>
        <TouchableOpacity activeOpacity={1} disabled={true}>
          <View>{/* {views} */}</View>
        </TouchableOpacity>
        {/* <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
          }}
        ></View> */}
      </View>
    </View>
  )
}

export { TextMessage }
