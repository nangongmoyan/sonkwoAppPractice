/**
 *
 * created by lijianpo on 2021/04/14
 */
import React, { useEffect, useMemo } from 'react'
import Button from 'ui/button'
import { toastShort } from '@util'
import { ThemeColors } from 'ui/theme'
import TokenButton from './TokenButton'
import { Row, TextInput, StyleSheet } from '@ui'
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
  useController,
} from 'react-hook-form'
import { useLocale } from '@contexts/locale'

const Provider = ({ children }) => {
  const methods = useForm()
  return <FormProvider {...methods}>{children}</FormProvider>
}
// const BasicInput = ({
//   name,
//   validation,
//   renderLeft,
//   renderRight,
//   textinputStyle,
//   defaultValue,
//   ...restProps
// }) => {
//   const { register, setValue, getValues } = useFormContext()
//   const defaultValidation = { required: true }
//   const ref = register(name, { ...defaultValidation, ...validation })

//   useEffect(() => {
//     setValue(name, defaultValue, true)
//   }, [setValue, name, defaultValue])

//   return (
//     <Row>
//       {renderLeft && renderLeft()}
//       <TextInput
//         clearButtonMode="always"
//         ref={ref}
//         style={[styles.textinput, textinputStyle]}
//         placeholderTextColor={'#c2c2c5'}
//         defaultValue={defaultValue}
//         onChangeText={(text) => setValue(name, text, true)}
//         underlineColorAndroid="transparent"
//         selectionColor="black"
//         {...restProps}
//       />
//       {renderRight && renderRight(getValues())}
//     </Row>
//   )
// }

const BasicInput = ({
  name,
  control,
  renderLeft,
  renderRight,
  textinputStyle,
  validation,
  defaultValue,
  ...restProps
}) => {
  // const { register, getValues } = useFormContext()
  const { register } = useForm()
  const defaultValidation = { required: true }
  const ref = register(name, { ...defaultValidation, ...validation })
  const { field } = useController({ control, name, defaultValue: '' })
  console.log({ field })
  const { value, onBlur, onChange } = field
  // console.log({ ref })
  useEffect(() => {
    onChange(defaultValue)
  }, [defaultValue])
  return (
    <Row style={{ width: '80%' }}>
      {renderLeft && renderLeft()}
      <TextInput
        ref={ref}
        value={value}
        {...restProps}
        // onBlur={onBlur}
        selectionColor="black"
        clearButtonMode="always"
        placeholderTextColor={'#c2c2c5'}
        underlineColorAndroid="transparent"
        onChangeText={(value) => onChange(value)}
        style={[styles.textinput, textinputStyle]}
      />
      {/* <Controller
        name={name}
        defaultValue=""
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={ref}
            value={value}
            {...restProps}
            onBlur={onBlur}
            selectionColor="black"
            clearButtonMode="always"
            placeholderTextColor={'#c2c2c5'}
            underlineColorAndroid="transparent"
            onChangeText={(value) => onChange(value)}
            style={[styles.textinput, textinputStyle]}
          />
        )}
      /> */}
      {renderRight && renderRight()}
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
    handleSubmit,
    formState: { errors },
  } = useForm()

  console.log({ errors })
  const onPress = (setStart) => {
    // console.log({ field })
    // console.log({ errors })
    // const data = getValues()
    // if (errors.phone) {
    //   toastShort(errors.phone?.message || '请输入手机号')
    // } else {
    //   setStart(true)
    //   sendToken(data.phone)
    // }
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
      placeholder={t('LANG11')}
      secureTextEntry={true}
      validation={passwordValidation}
    />
  )
}

const SubmitButton = ({ onSubmit, ...restProps }) => {
  const { handleSubmit } = useForm()
  const { getValues, errors, watch } = useFormContext()

  console.log({ errors })
  const onPress = () => {
    const data = getValues()
    console.log({ data })
    handleSubmit(onSubmit(data))
  }

  const allField = watch()

  const disabled = useMemo(() => {
    const fields = Object.keys(allField)
    return fields.some((field) => !allField[field])
  }, [allField])

  return (
    <Button
      style={{ borderRadius: 30 }}
      linear
      textStyle={{ fontSize: 15 }}
      onPress={onPress}
      disabled={disabled}
      color={ThemeColors.Default}
      {...restProps}
    />
  )
}
export default {
  Provider,
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
