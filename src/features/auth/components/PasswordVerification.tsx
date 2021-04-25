/**
 *
 * created by lijianpo on 2121/04/14
 */
import React from 'react'
import { Form, Column, Divider } from '@ui'
import { FormProvider } from '@contexts/form'
import AgreementPolicy from './AgreementPolicy'
import { useLocale } from '@contexts/locale'
import { useDispatch } from '@hooks'
import { signInWithPass } from '@actions/user_action'

interface Props {
  signParams: SignParams
}

const PasswordVerification: React.FC<Props> = ({ signParams }) => {
  const { t } = useLocale()
  const dispatch = useDispatch()
  const onSubmit = (data: SignInPasswordParam) => {
    dispatch(signInWithPass(data))
  }
  return (
    <FormProvider>
      <>
        {/* <Form.Ba name="phone" /> */}
        <Form.BasicInput name="account" placeholder="输入邮箱或手机号" />
        <Divider height={20} />
        <Form.PasswordInput name="password" />
        <Divider height={20} />
        <AgreementPolicy style={{ marginTop: 20, marginBottom: 36 }} />
        <Form.SubmitButton onSubmit={onSubmit} title={t('LANG20')} />
      </>
    </FormProvider>
  )
}

export default PasswordVerification
