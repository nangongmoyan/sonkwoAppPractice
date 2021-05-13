/**
 *
 * created by lijianpo on 2021/04/14
 */
import React, { useEffect, useMemo } from 'react'
import Button from 'ui/button'
import { toastMessage, vw } from '@util'
import { ThemeColors } from 'ui/theme'
import TokenButton from './TokenButton'
import { Row, TextInput, StyleSheet } from '@ui'
import { useFormContext } from 'react-hook-form'
import { useLocale } from '@contexts/locale'

const BasicInput = ({
  name,
  validation,
  renderLeft,
  renderRight,
  textinputStyle,
  containerStyle,
  defaultValue,
  ...restProps
}) => {
  const { register, setValue, getValues } = useFormContext()
  const defaultValidation = { required: true }
  const ref = register(name, { ...defaultValidation, ...validation })

  useEffect(() => {
    setValue(name, defaultValue, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }, [defaultValue])

  const onChangeText = (value) => {
    setValue(name, value, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }
  return (
    <Row style={[styles.container, containerStyle]}>
      {renderLeft && renderLeft()}
      <TextInput
        ref={ref}
        {...restProps}
        defaultValue={defaultValue}
        selectionColor="black"
        clearButtonMode="always"
        placeholderTextColor={'#c2c2c5'}
        underlineColorAndroid="transparent"
        style={[styles.textinput, textinputStyle]}
        onChangeText={(value) => onChangeText(value)}
      />
      {renderRight && renderRight(getValues())}
    </Row>
  )
}
// create special input here
const phonePattern = /^1[3-9]\d{9}$/i
const phoneValidation = {
  required: {
    value: true,
    message: '手机号为空',
  },
  pattern: {
    value: phonePattern,
    message: '手机号错误',
  },
}
const PhoneInput = ({ ...props }) => {
  const { t } = useLocale()
  return (
    <BasicInput
      name="phone"
      maxLength={11}
      validation={phoneValidation}
      placeholder={t('LANG15')}
      keyboardType="phone-pad"
      {...props}
    />
  )
}

const TokenInput = ({ sendToken, ...props }) => {
  const { t } = useLocale()
  const {
    getValues,
    formState: { errors },
  } = useFormContext()

  const onPress = (setStart) => {
    const data = getValues()
    if (errors.phone) {
      toastMessage(errors.phone?.message || '请输入手机号')
    } else {
      setStart(true)
      sendToken(data.phone)
    }
  }
  return (
    <BasicInput
      name="token"
      placeholder={t('LANG16')}
      keyboardType="number-pad"
      renderRight={() => <TokenButton onPress={onPress} />}
      {...props}
    />
  )
}

const passwordValidation = {
  required: {
    value: true,
    message: '密码不能我空',
  },
}

const PasswordInput = () => {
  const { t } = useLocale()
  // const [isSecure, setSecure] = useState(true)
  return (
    <BasicInput
      name="password"
      placeholder={t('LANG17')}
      secureTextEntry={true}
      validation={passwordValidation}
    />
  )
}

const SubmitButton = ({ onSubmit, ...restProps }) => {
  const {
    watch,
    getValues,
    formState: { errors },
  } = useFormContext()

  const onPress = () => {
    const data = getValues()
    onSubmit(data)
  }

  const allField = watch()

  const disabled = useMemo(() => {
    const fields = Object.keys(allField)
    return (
      Object.keys(errors).length > 0 || fields.some((field) => !allField[field])
    )
  }, [errors, allField])

  return (
    <Button
      linear
      onPress={onPress}
      disabled={disabled}
      style={{ borderRadius: 30 }}
      textStyle={{ fontSize: 15 }}
      color={ThemeColors.Default}
      {...restProps}
    />
  )
}
export default {
  BasicInput,
  PhoneInput,
  TokenInput,
  PasswordInput,
  SubmitButton,
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: '#DEDEE3',
    borderBottomWidth: 1,
    paddingBottom: 0,
    height: 40,
    width: vw(80),
  },
  textinput: {
    flex: 1,
    padding: 0,
    fontSize: 20,
    lineHeight: 20,
    height: 40,
    color: '#222',
  },
})
