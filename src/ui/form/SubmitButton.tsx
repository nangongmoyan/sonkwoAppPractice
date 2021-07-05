/**
 * created by lijianpo on 2021/07/05
 */
import { vw } from '@util'
import Button from '../button'
import React, { useMemo } from 'react'
import { ThemeColors } from '../theme'
import { useFormContext } from 'react-hook-form'

const SubmitButton: React.FC<any> = ({ onSubmit, ...restProps }) => {
  const {
    watch,
    getValues,
    formState: { errors },
  } = useFormContext()

  const onPress = () => {
    const data = getValues()
    onSubmit(data)
  }

  const allField = watch()

  const disabled = useMemo(() => {
    const fields = Object.keys(allField)
    return (
      Object.keys(errors).length > 0 || fields.some((field) => !allField[field])
    )
  }, [errors, allField])

  return (
    <Button
      linear
      {...restProps}
      onPress={onPress}
      disabled={disabled}
      textStyle={{ fontSize: 15 }}
      color={ThemeColors.Default}
      style={{ borderRadius: 30, width: vw(80) }}
    />
  )
}

export { SubmitButton }
