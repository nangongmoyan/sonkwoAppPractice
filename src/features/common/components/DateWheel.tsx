/**
 * 日期滚轮
 * created by lijianpo on 2021/04/28
 */
import Wheel from '@components/Wheel'
import { Column, Row } from '@ui'
import React, { useCallback, useMemo, useState } from 'react'

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const DaysCount = [
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
]
const DateWhell: React.FC<any> = () => {
  const [date, setDate] = useState(new Date())

  const isLeapYear = (year: number) => {
    return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
  }

  const { years } = useMemo(() => {
    const tmpYears = []
    for (let i = 1970; i <= 2100; ++i) {
      tmpYears.push(i)
    }
    return { years: tmpYears }
  }, [])

  const onDateChange = useCallback(
    (year, month, day) => {
      date.setFullYear(year)
      const daysCount = DaysCount[isLeapYear(year) ? 1 : 0][month]
      if (day > daysCount) {
        day = daysCount
        date.setDate(day)
        date.setMonth(month)
      } else {
        date.setMonth(month)
        date.setDate(day)
      }
      setDate(date)
    },
    [date],
  )

  const { year, month, day } = useMemo(() => {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
    }
  }, [date])

  const { days } = useMemo(() => {
    const tmpDays = []
    const daysCount = DaysCount[isLeapYear(year) ? 1 : 0][month]
    for (let i = 1; i <= daysCount; ++i) {
      tmpDays.push(i)
    }
    return { days: tmpDays }
  }, [year, month, DaysCount])
  return (
    <Column style={{ flex: 1 }}>
      <Row
        style={{
          backgroundColor: 'red',
          padding: 20,
          justifyContent: 'center',
        }}
      >
        <Wheel
          style={{ height: 200, width: 80 }}
          itemStyle={{ textAlign: 'center' }}
          items={years}
          index={years.indexOf(year)}
          onChange={(index) => {
            onDateChange(years[index], month, day)
          }}
        />
        <Wheel
          style={{ height: 200, width: 80 }}
          itemStyle={{ textAlign: 'center' }}
          items={months}
          index={months.indexOf(month + 1)}
          onChange={(index) => onDateChange(year, months[index] - 1, day)}
        />
        <Wheel
          style={{ height: 200, width: 80 }}
          itemStyle={{ textAlign: 'center' }}
          items={days}
          index={days.indexOf(day)}
          onChange={(index) => onDateChange(year, month, days[index])}
        />
      </Row>
    </Column>
  )
}

export { DateWhell }
