/**
 *
 * created by lijianpo on 2121/04/14
 */
import React from 'react'
import { Form, Column, Divider } from '@ui'
import { FormProvider } from '@contexts/form'
import AgreementPolicy from './AgreementPolicy'
import { useLocale } from '@contexts/locale'

const PasswordVerification = () => {
  const { t } = useLocale()
  const onSubmit = (data: SignInSmsParam) => {
    // console.log({ data })
  }
  return (
    <FormProvider>
      <Column>
        <Form.PhoneInput
          name="phone"
          textinputStyle={{
            fontSize: 20,
          }}
        />
        <Divider height={1} color="#DEDEE3" />
        <Divider height={15} />
        <Form.PasswordInput name="password" />
        <Divider height={1} color="#DEDEE3" />
        <AgreementPolicy style={{ marginTop: 20, marginBottom: 36 }} />
        <Form.SubmitButton onSubmit={onSubmit} title={t('LANG20')} />
      </Column>
    </FormProvider>
  )
}

export default PasswordVerification
