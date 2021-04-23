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
import { useLocale } from '@contexts/locale'
import { Button, Alert, TextInput } from 'react-native'
import { useDispatch } from '@hooks'
import { useForm, Controller, useController } from 'react-hook-form'
import { sendSms, signInWithSms } from '@actions/user_action'
import AgreementPolicy from './AgreementPolicy'
interface Props {
  signParams: SignParams
}

const PhoneVerification: React.FC<Props> = ({ signParams }) => {
  // const onSubmit = (data) => Alert.alert(JSON.stringify(data))
  const { t } = useLocale()
  const dispatch = useDispatch()

  const sendToken = useCallback(
    (phone) => {
      dispatch(sendSms({ kind: 'login', number: phone }))
    },
    [dispatch],
  )

  const onSubmit = (data: SignInSmsParam) => {
    const params = { data, signParams }
    console.log({ params })
    dispatch(signInWithSms(params))
    // dispatch(signInWithSms(params))
    // ref.current.show('正在登录...')
    // signInWithSms(data, () => ref.current.hide())
  }

  return (
    <Form.Provider>
      <>
        <Form.PhoneInput name="phone" />
        <Divider height={1} color="#DEDEE3" />
        <Divider height={15} />
        <Form.TokenInput for="phone" sendToken={sendToken} />
        <Divider height={1} color="#DEDEE3" />
        <AgreementPolicy style={{ marginTop: 20, marginBottom: 36 }} />
        <Form.SubmitButton onSubmit={onSubmit} title={t('LANG20')} />
      </>
    </Form.Provider>
  )
}

export default PhoneVerification
