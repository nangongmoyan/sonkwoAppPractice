/**
 *
 * created by lijianpo on 2021/04/14
 */
import React, { useCallback, useRef } from 'react'
import { Form, Divider, Column } from '@ui'
import { FormProvider } from '@contexts/form'
import AgreementPolicy from './AgreementPolicy'
import { useLocale } from '@contexts/locale'
import { useDispatch } from '@hooks'
import { toastShort } from '@util'
import { sendSms, signInWithSms } from '@actions/user_action'
import SubmitLoading from '@components/SubmitLoading'

interface Props {
  signParams: SignParams
}
const PhoneVerification: React.FC<Props> = ({ signParams }) => {
  const { t } = useLocale()
  const dispatch = useDispatch()
  const ref = useRef<any>()

  const sendToken = useCallback(
    (phone) => {
      dispatch(sendSms({ kind: 'login', number: phone }))
    },
    [dispatch],
  )

  const onSubmit = (data: SignInSmsParam) => {
    const params = { data, signParams }
    dispatch(signInWithSms(params))
    // ref.current.show('正在登录...')
    // signInWithSms(data, () => ref.current.hide())
  }

  return (
    <FormProvider>
      <Column>
        <Form.PhoneInput name="phone" />
        <Divider height={1} color="#DEDEE3" />
        <Divider height={15} />
        <Form.TokenInput sendToken={sendToken} for="phone" />
        <Divider height={1} color="#DEDEE3" />
        <AgreementPolicy style={{ marginTop: 20, marginBottom: 36 }} />
        <Form.SubmitButton onSubmit={onSubmit} title={t('LANG20')} />
        {/* <SubmitLoading ref={ref} /> */}
        <SubmitLoading ref={ref} />
      </Column>
    </FormProvider>
  )
}

export default PhoneVerification
