/**
 *
 * created by lijianpo on 2021/07/04
 */
import { useInterval } from '@hooks'
import React, { useState } from 'react'
import { useLocale } from '@contexts/locale'
import { GHWithoutFeedback, MyText } from '@ui'
import { Row } from '../flex'
import { ThemeColors } from '../theme'

interface Props {
  onPress: () => void
}

const TIME = 61

const TokenButton: React.FC<Props> = ({ onPress }) => {
  const { t } = useLocale()
  const [start, setStart] = useState(false)
  const [count, setCount] = useState(TIME)

  useInterval(
    () => {
      if (count === 0) {
        setCount(TIME)
        setStart(false)
      } else {
        setCount(count - 1)
      }
    },
    start ? 1000 : null,
  )

  const isCounting = count < TIME

  const onBtnPress = () => {
    setStart(true)
    onPress && onPress()
  }
  return (
    <GHWithoutFeedback onPress={onBtnPress}>
      <Row>
        {isCounting ? (
          <MyText size={14}>
            {t('LANG19')}（{count}s）
          </MyText>
        ) : (
          <MyText size={14} color={ThemeColors.Default}>
            {t('LANG18')}
          </MyText>
        )}
      </Row>
    </GHWithoutFeedback>
  )
}

export default TokenButton
