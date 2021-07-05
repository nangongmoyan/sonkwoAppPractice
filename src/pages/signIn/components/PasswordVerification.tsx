/**
 * created by lijianpo on 2021/07/05
 */
import { Divider } from '@ui'
import { useDispatch } from '@hooks'
import React, { useRef } from 'react'
import { useLocale } from '@contexts/locale'
import { FormProvider } from '@contexts/form'
import { useSignInContext } from '@contexts/signIn'
import { BasicInput, PasswordInput, SubmitButton } from 'ui/form'
import AgreementPolicy from '@features/common/components/AgreementPolicy'
import SubmitLoading from '@components/SubmitLoading'
import { signInByPwd } from '@actions/user_action'

const PasswordVerification: React.FC<any> = ({}) => {
  const { t } = useLocale()
  const dispatch = useDispatch()
  const loadingRef = useRef<any>()
  const { callback } = useSignInContext()

  const onSubmit = (data: any) => {
    loadingRef.current.show('正在登录...')
    dispatch(
      signInByPwd(data, (result) => {
        callback(result)
        loadingRef.current.hide()
      }),
    )
  }

  return (
    <FormProvider>
      <>
        <BasicInput name="account" placeholder="输入邮箱或手机号" />
        <Divider height={20} />
        <PasswordInput name="password" />
        <Divider height={20} />
        <AgreementPolicy style={{ marginTop: 20, marginBottom: 36 }} />
        <SubmitButton onSubmit={onSubmit} title={t('LANG20')} />
        <SubmitLoading ref={loadingRef} />
      </>
    </FormProvider>
  )
}

export { PasswordVerification }
