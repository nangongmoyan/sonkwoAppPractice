/**
 *
 * created by lijianpo on 2021/04/13
 */
import React from 'react'
import { useForm, FormProvider as Provider } from 'react-hook-form'

const FormProvider = ({ children }) => {
  const methods = useForm()
  return <Provider {...methods}>{children}</Provider>
}

export { FormProvider }
