/**
 * created by lijianpo on 2021/06/30
 */
import React, {
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react'
import {
  CenterModal,
  Column,
  MyText,
  Image,
  StyleSheet,
  MyButton,
  TouchableOpacity,
  Row,
  Button,
  MyListView,
} from '@ui'
import { useActivationKeys } from '@features/activationCode/model'
import { get } from 'lodash'
import { toastMessage, vw } from '@util'
import { SkuKeyIcon } from '@features/common/components'
import { Clipboard } from '@native'

enum errorResponse {
  wait = '请求过于频繁，请稍后再试',
  presell = '预售游戏',
  rule = '激活码规则异常',
  refunding = '已申请退款',
  no_available_key = '暂时缺KEY',
  invalid_operation_block = '异常操作被封，请等待1小时',
}
const CodeKeyModal = forwardRef((props, ref) => {
  const { codeInfo, area } = props
  const keyId = get(codeInfo, 'id')
  const skuName = get(codeInfo, 'name')
  const keyType = get(codeInfo, 'keyType')
  const skuKeyName = get(codeInfo, 'skuKeyName')
  const [visible, setVisible] = useState(false)
  const result = useActivationKeys(keyId, area)
  const gameKeys = get(result, 'data.gameKeys', [])
  const access = get(result, 'data.messages.access[0]', null)
  const reason = get(result, 'data.messages.reason[0]', null)
  const errMessage = errorResponse[reason] || errorResponse[access] || ''
  console.log({ result })
  useImperativeHandle(ref, () => ({
    showModal: () => setVisible(true),
  }))

  const closeModal = useCallback(() => setVisible(false), [])

  const copyKey = (code: string) => {
    Clipboard.setString(code)
    toastMessage('复制成功')
  }

  const renderItem = useCallback(({ item }) => {
    return (
      <Row style={styles.itemContainer}>
        <MyText>{item.code}</MyText>
        <Column style={styles.copyContainer}>
          <Button
            title="复制"
            color="#FF5722"
            style={styles.copyBtn}
            onPress={() => copyKey(item.code)}
          />
        </Column>
      </Row>
    )
  }, [])
  return (
    <CenterModal isVisible={visible} onClose={closeModal}>
      <>
        {gameKeys.length > 0 ? (
          <>
            <MyText numberOfLines={1} style={styles.title}>
              {skuName}
            </MyText>
            <Row style={styles.platform}>
              <SkuKeyIcon
                size={24}
                keyType={keyType}
                style={{ marginRight: 6 }}
              />
              <MyText size={15} numberOfLines={1} weight="semibold">
                平台：{skuKeyName}
              </MyText>
              <Column style={{ flex: 1 }} />
              <MyText color="#0288D1">使用帮助</MyText>
            </Row>
            <MyListView
              data={gameKeys}
              renderItem={renderItem}
              style={{ width: vw(80), height: 500 }}
            />
          </>
        ) : null}
        {errMessage !== '' ? (
          <Column align="center">
            <Image
              source={require('@source/images/regret.png')}
              style={styles.image}
            />
            <MyText size={14} color="red">
              {errMessage}
            </MyText>
            <MyButton
              title="知晓了"
              textSize={16}
              onPress={closeModal}
              style={styles.knowBtn}
              linear={['#FF9017', '#FF6D3F']}
            />
          </Column>
        ) : null}
      </>
      <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
        <Image
          style={styles.closeImg}
          source={require('@source/images/closeModal.png')}
        />
      </TouchableOpacity>
    </CenterModal>
  )
})

export { CodeKeyModal }

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    width: vw(72),
    lineHeight: 24,
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  platform: {
    width: vw(72),
    marginTop: 15,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 125,
    height: 125,
    marginVertical: 10,
  },
  knowBtn: {
    width: 160,
    height: 40,
    marginTop: 10,
    borderRadius: 20,
  },
  closeBtn: {
    bottom: -80,
    width: vw(80),
    marginLeft: -vw(40),
    alignItems: 'center',
    position: 'absolute',
  },
  closeImg: {
    width: 50,
    height: 50,
  },
  itemContainer: {
    height: 42,
    marginTop: 20,
    width: vw(72),
    borderRadius: 4,
    paddingLeft: 10,
    backgroundColor: '#f5f5f5',
  },
  copyContainer: {
    right: 0,
    position: 'absolute',
  },
  copyBtn: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
})
