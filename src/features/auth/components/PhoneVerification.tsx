// /**
//  *
//  * created by lijianpo on 2021/04/14
//  */
// import React, { useCallback, useRef } from 'react'
// import { Form, Divider, Column } from '@ui'
// // import { FormProvider } from '@contexts/form'
// import AgreementPolicy from './AgreementPolicy'
// import { useLocale } from '@contexts/locale'
// import { useDispatch } from '@hooks'
// import { toastShort } from '@util'
// import { sendSms, signInWithSms } from '@actions/user_action'
// import SubmitLoading from '@components/SubmitLoading'
// import { useForm, FormProvider, useFormContext } from 'react-hook-form'

// interface Props {
//   signParams: SignParams
// }
// const PhoneVerification: React.FC<Props> = ({ signParams }) => {
//   const { t } = useLocale()
//   const methods = useForm()
//   const { handleSubmit } = methods
//   const dispatch = useDispatch()
//   const ref = useRef<any>()

//   const sendToken = useCallback(
//     (phone) => {
//       dispatch(sendSms({ kind: 'login', number: phone }))
//     },
//     [dispatch],
//   )

//   const onSubmit = (data: SignInSmsParam) => {
//     const params = { data, signParams }
//     // dispatch(signInWithSms(params))
//     // ref.current.show('正在登录...')
//     // signInWithSms(data, () => ref.current.hide())
//   }

//   return (
//     <FormProvider {...methods}>
//       <Column>
//         <Form.PhoneInput name="phone" />
//         <Divider height={1} color="#DEDEE3" />
//         <Divider height={15} />
//         <Form.TokenInput sendToken={sendToken} for="phone" />
//         <Divider height={1} color="#DEDEE3" />
//         <AgreementPolicy style={{ marginTop: 20, marginBottom: 36 }} />
//         <Form.SubmitButton
//           onSubmit={onSubmit}
//           // onSubmit={handleSubmit((data) => {
//           //   console.log({ data })
//           // })}
//           title={t('LANG20')}
//         />
//         {/* <SubmitLoading ref={ref} /> */}
//         <SubmitLoading ref={ref} />
//       </Column>
//     </FormProvider>
//   )
// }

// export default PhoneVerification

import { Divider, Form, Text, View } from '@ui'
import React, { useCallback } from 'react'
import { Button, Alert, TextInput } from 'react-native'
import { useDispatch } from '@hooks'
import { useForm, Controller, useController } from 'react-hook-form'
import { sendSms } from '@actions/user_action'
import AgreementPolicy from './AgreementPolicy'
interface Props {
  signParams: SignParams
}

const Input = ({ name, control }) => {
  // const { field } = useController({
  //   control,
  //   defaultValue: '',
  //   name,
  // })
  // const { onChange, onBlur, value } = field
  // return <TextInput value={field.value} onChangeText={field.onChange} />

  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={{
            width: 200,
            height: 30,
            borderWidth: 1,
            borderColor: 'black',
          }}
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
          value={value}
        />
      )}
      name={name}
      rules={{ required: true }}
      defaultValue=""
    />
  )
}
const PhoneVerification: React.FC<Props> = ({ signParams }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => Alert.alert(JSON.stringify(data))
  console.log({ errors })
  // const sendToken = useCallback(
  //   (phone) => {
  //     dispatch(sendSms({ kind: 'login', number: phone }))
  //   },
  //   [dispatch],
  // )
  const dispatch = useDispatch()
  const sendToken = useCallback(
    (phone) => {
      console.log({ phone })
      // dispatch(sendSms({ kind: 'login', number: phone }))
    },
    [dispatch],
  )
  return (
    <Form.Provider>
      <>
        <Form.PhoneInput name="phone" control={control} />
        <Divider height={1} color="#DEDEE3" />
        <Divider height={15} />
        <Form.TokenInput control={control} for="phone" sendToken={sendToken} />
        <Divider height={1} color="#DEDEE3" />
        <AgreementPolicy style={{ marginTop: 20, marginBottom: 36 }} />
        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </>
    </Form.Provider>
  )
}

export default PhoneVerification
