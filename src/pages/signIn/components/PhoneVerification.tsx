/**
 *
 * created by lijianpo on 2021/07/05
 */
import { Divider } from '@ui'
import { useDispatch } from '@hooks'
import React, { useRef } from 'react'
import { useLocale } from '@contexts/locale'
import { FormProvider } from '@contexts/form'
import { TokenType } from '@sonkwo/sonkwo-api'
import { signInBySms } from '@actions/user_action'
import { PhoneInput, TokenInput, SubmitButton } from 'ui/form'
import AgreementPolicy from '@features/auth/components/AgreementPolicy'
import SubmitLoading from '@components/SubmitLoading'

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
  )
}

export { PhoneVerification }
