/**
 *
 * created by lijianopo on 2021/07/04
 */

import { vw } from '@util'
import { Row } from '../flex'
import { useFormContext } from 'react-hook-form'
import React, { useEffect, useCallback } from 'react'
import { StyleSheet, ViewStyle, TextInput } from 'react-native'

interface Props {
  name: string
  defaultValue?: string
  validation?: any
  renderLeft?: any
  renderRight?: any
  textinputStyle?: ViewStyle
  containerStyle?: ViewStyle
}

const BasicInput: React.FC<Props> = ({
  name,
  validation,
  renderLeft,
  renderRight,
  textinputStyle,
  containerStyle,
  defaultValue,
  ...restProps
}) => {
  const defaultValidation = { required: true }
  const { register, setValue, getValues } = useFormContext()
  const ref = register(name, { ...defaultValidation, ...validation })

  useEffect(() => {
    setValue(name, defaultValue, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }, [defaultValue, name, setValue])

  const onChangeText = useCallback(
    (value) => {
      setValue(name, value, {
        shouldValidate: true,
        shouldDirty: true,
      })
    },
    [name, setValue],
  )
  return (
    <Row style={[styles.container, containerStyle]}>
      {renderLeft && renderLeft()}
      <TextInput
        ref={ref}
        {...restProps}
        selectionColor="black"
        clearButtonMode="always"
        defaultValue={defaultValue}
        placeholderTextColor={'#c2c2c5'}
        underlineColorAndroid="transparent"
        style={[styles.textinput, textinputStyle]}
        onChangeText={(value) => onChangeText(value)}
      />
      {renderRight && renderRight(getValues())}
    </Row>
  )
}

export { BasicInput }

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: vw(80),
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEE3',
  },
  textinput: {
    flex: 1,
    height: 40,
    padding: 0,
    fontSize: 20,
    color: '#222',
    lineHeight: 20,
  },
})
