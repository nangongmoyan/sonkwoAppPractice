import { useLocale } from '@contexts/locale'
import { SignInProvider } from '@contexts/signIn'
import { useSetToken } from '@features/auth/model'
import { CustomStackHeader, GHWithoutFeedback, MyText, Column } from '@ui'
import { adaptiveFont, deviceStorage } from '@util'
import React, { useState, useMemo, useCallback } from 'react'
import { PhoneVerification } from './components'
import { PasswordVerification } from './components/PasswordVerification'

const SignIn = ({}) => {
  const { t } = useLocale()
  const setToken = useSetToken()
  const [smsMethod, toggleMethod] = useState(true)
  const { methodText, toggleText } = useMemo(() => {
    const sms = t('LANG11')
    const password = t('LANG12')
    return {
      methodText: smsMethod ? t('LANG13') : t('LANG14'),
      toggleText: smsMethod ? password : sms,
    }
  }, [t, smsMethod])
  const signInCallback = useCallback(
    (data: any) => {
      setToken(data)
      deviceStorage.save('userInfo', data)
    },
    [setToken],
  )

  const switchMethod = () => {
    toggleMethod((c) => !c)
  }
  return (
    <SignInProvider type="normal" callback={signInCallback}>
      <Column style={{ flex: 1 }} align="center">
        <CustomStackHeader
          renderRight={() => (
            <GHWithoutFeedback onPress={switchMethod}>
              <MyText
                color="grey"
                size={adaptiveFont(14)}
                style={{ marginRight: 20 }}
              >
                {toggleText}
              </MyText>
            </GHWithoutFeedback>
          )}
        />
        <MyText
          weight="semibold"
          size={adaptiveFont(24)}
          style={{ marginTop: 45, marginBottom: 60 }}
        >
          {methodText}
        </MyText>
        {smsMethod ? <PhoneVerification /> : <PasswordVerification />}
      </Column>
    </SignInProvider>
  )
}

export { SignIn }
