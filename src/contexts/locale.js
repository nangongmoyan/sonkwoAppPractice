/**
 *
 * created by lijianpo on 2021/04/13
 */
import React, { createContext, Component, useContext } from 'react'
import I18n from 'i18n-js'
import * as RNLocalize from 'react-native-localize'
import zh_CN from 'locales/zh-CN'
import en_US from 'locales/en-US'

const locales = RNLocalize.getLocales()
const languageCode = locales[0]?.languageCode
const scriptCode = locales[0]?.scriptCode

const systemLanguage = languageCode
if (systemLanguage) {
  I18n.locale = systemLanguage
} else {
  I18n.locale = 'en'
}

I18n.fallbacks = true
I18n.translations = { zh: zh_CN, en: en_US }

const LocaleContext = createContext({
  t: Function,
  setLocale: () => {},
  locale: I18n.locale,
})

class LocaleProvider extends Component {
  state = {
    locale: I18n.locale,
    setLocale: (locale) => {
      this.setState({ locale })
    },
    t: (key, params) => {
      const text = I18n.t(key, { locale: this.state.locale, ...params })
      if (text.includes('[missing')) {
        return key
      }
      return text
    },
  }
  render() {
    return (
      <LocaleContext.Provider value={this.state}>
        {this.props.children}
      </LocaleContext.Provider>
    )
  }
}

const useLocale = () => {
  const locale = useContext(LocaleContext)
  return locale
}

export { LocaleContext, LocaleProvider, useLocale, I18n }
