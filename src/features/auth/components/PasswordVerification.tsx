/**
 *
 * created by lijianpo on 2121/04/14
 */
import React, { useRef } from 'react'
import { Form, Divider } from '@ui'
import { FormProvider } from '@contexts/form'
import AgreementPolicy from './AgreementPolicy'
import { useLocale } from '@contexts/locale'
import { useDispatch } from '@hooks'
import { signInWithPass } from '@actions/user_action'
import SubmitLoading from '@components/SubmitLoading'

const PasswordVerification: React.FC<any> = ({}) => {
  const { t } = useLocale()
  const dispatch = useDispatch()
  const loadingRef = useRef<any>()
  const onSubmit = (data: SignInPasswordParam) => {
    loadingRef.current.show('正在登录...')
    dispatch(signInWithPass(data, () => loadingRef.current.hide()))
  }
  return (
    <FormProvider>
      <>
        <Form.BasicInput name="account" placeholder="输入邮箱或手机号" />
        <Divider height={20} />
        <Form.PasswordInput name="password" />
        <Divider height={20} />
        <AgreementPolicy style={{ marginTop: 20, marginBottom: 36 }} />
        <Form.SubmitButton onSubmit={onSubmit} title={t('LANG20')} />
        <SubmitLoading ref={loadingRef} />
      </>
    </FormProvider>
  )
}

export default PasswordVerification
