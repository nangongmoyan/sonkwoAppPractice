/**
 *
 * created by lijianpo on 2021/07/04
 */
import React from 'react'
import { ViewStyle } from 'react-native'
import { useFormContext } from 'react-hook-form'
import { toastMessage } from '@util'
import { useDispatch } from '@hooks'
import { sendSms } from '@actions/user_action'
import { BasicInput } from './BasicInput'
import { useLocale } from '@contexts/locale'
import TokenButton from './TokenButton'
import { TokenType } from '@sonkwo/sonkwo-api'
interface Props {
  type: TokenType
  kind: string
  eventName?: string
  style?: ViewStyle
}

const TokenInput: React.FC<Props> = ({ type, kind }) => {
  const { t } = useLocale()
  const dispatch = useDispatch()
  const {
    getValues,
    formState: { errors },
  } = useFormContext()

  const onPress = () => {
    if (errors.phone) {
      toastMessage(errors.phone?.message || '请输入手机号')
    } else {
      sendToken()
    }
  }

  const sendToken = () => {
    const data = getValues()
    const message: any = { type, kind }
    if (data.phone) message.number = data.phone
    dispatch(sendSms(message))
  }

  return (
    <BasicInput
      name="token"
      placeholder={t('LANG16')}
      keyboardType="number-pad"
      renderRight={() => <TokenButton onPress={onPress} />}
    />
  )
}

export { TokenInput }
