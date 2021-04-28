/**
 *
 * changed by lijianpo on 2021/04/25
 */

import { Divider, Form } from '@ui'
import React, { useCallback } from 'react'
import { useLocale } from '@contexts/locale'
import { useDispatch } from '@hooks'
import { FormProvider } from '@contexts/form'
import { sendSms, signInWithSms } from '@actions/user_action'
import AgreementPolicy from './AgreementPolicy'
interface Props {
  signParams: SignParams
}

const PhoneVerification: React.FC<Props> = ({ signParams }) => {
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
    dispatch(signInWithSms(params))
    // dispatch(signInWithSms(params))
    // ref.current.show('正在登录...')
    // signInWithSms(data, () => ref.current.hide())
  }

  return (
    <FormProvider>
      <>
        <Form.PhoneInput name="phone" />
        <Divider height={20} />
        <Form.TokenInput for="phone" sendToken={sendToken} />
        <Divider height={20} />
        <AgreementPolicy style={{ marginTop: 20, marginBottom: 36 }} />
        <Form.SubmitButton onSubmit={onSubmit} title={t('LANG20')} />
      </>
    </FormProvider>
  )
}

export default PhoneVerification
