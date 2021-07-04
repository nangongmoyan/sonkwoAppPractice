/**
 *
 * created by lijian po on 2021/07/05
 */
import { useLocale } from '@contexts/locale'
import React from 'react'
import { BasicInput } from './BasicInput'

const phonePattern = /^1[3-9]\d{9}$/i
const phoneValidation = {
  required: {
    value: true,
    message: '手机号为空',
  },
  pattern: {
    value: phonePattern,
    message: '手机号错误',
  },
}

const PhoneInput: React.FC<any> = ({}) => {
  const { t } = useLocale()

  return (
    <BasicInput
      name="phone"
      maxLength={11}
      placeholder={t('LANG15')}
      keyboardType="phone-pad"
      validation={phoneValidation}
    />
  )
}

export { PhoneInput }
