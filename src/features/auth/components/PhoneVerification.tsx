/**
 *
 * changed by lijianpo on 2021/04/25
 */

import { Divider } from '@ui'
import React, { useCallback, useRef } from 'react'
import { useLocale } from '@contexts/locale'
import { useDispatch } from '@hooks'
import { FormProvider } from '@contexts/form'
import { PhoneInput, TokenInput, SubmitButton } from 'ui/form'
import { TokenType } from '@sonkwo/sonkwo-api'
// import { sendSms, signInWithSms } from '@actions/user_action'
import AgreementPolicy from './AgreementPolicy'
import SubmitLoading from '@components/SubmitLoading'
import { signInBySms } from '@actions/user_action'

const PhoneVerification: React.FC<any> = ({}) => {
  const { t } = useLocale()
  const dispatch = useDispatch()
  const loadingRef = useRef<any>()

  const onSubmit = (data: any) => {
    loadingRef.current.show('正在登录...')
    dispatch(signInBySms(data, () => loadingRef.current.hide()))
  }

  return (
    <FormProvider>
      <>
        <PhoneInput name="phone" />
        <Divider height={20} />
        <TokenInput type={TokenType.Sms} kind="login" for="phone" />
        <Divider height={20} />
        <AgreementPolicy style={{ marginTop: 20, marginBottom: 36 }} />
        <SubmitButton onSubmit={onSubmit} title={t('LANG20')} />
        <SubmitLoading ref={loadingRef} />
      </>
    </FormProvider>
    // <FormProvider>
    //   <>
    //     <Form.PhoneInput name="phone" />
    //     <Divider height={20} />
    //     <Form.TokenInput for="phone" sendToken={sendToken} />
    //     <Divider height={20} />
    //     <AgreementPolicy style={{ marginTop: 20, marginBottom: 36 }} />
    //     <Form.SubmitButton onSubmit={onSubmit} title={t('LANG20')} />
    //     <SubmitLoading ref={loadingRef} />
    //   </>
    // </FormProvider>
  )
}

export default PhoneVerification
