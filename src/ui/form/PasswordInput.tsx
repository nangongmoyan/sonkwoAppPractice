/**
 *
 * created by lijian po on 2021/07/05
 */
import { useLocale } from '@contexts/locale'
import React from 'react'
import { BasicInput } from './BasicInput'

const passwordValidation = {
  required: {
    value: true,
    message: '密码不能我空',
  },
}

const PasswordInput: React.FC<any> = ({}) => {
  const { t } = useLocale()

  return (
    <BasicInput
      name="password"
      secureTextEntry={true}
      placeholder={t('LANG17')}
      validation={passwordValidation}
    />
  )
}

export { PasswordInput }
