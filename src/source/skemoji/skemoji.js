/**
 *
 * created by lijianpo po on 2021/05/27
 */
import { unionWith } from 'lodash'
import { EMOJI } from 'source/emoji/emoji'

const first = [
  {
    key: require('../skemoji/1dianzan.gif'),
    value: '/{1_点赞}',
    packageName: '杉果表情1号',
  },
  { key: require('../skemoji/1yiwen.gif'), value: '/{1_疑问}' },
  { key: require('../skemoji/1deyi.gif'), value: '/{1_得意}' },
  { key: require('../skemoji/1daoqian.gif'), value: '/{1_道歉}' },
  { key: require('../skemoji/1beici2.gif'), value: '/{1_背刺2}' },
  { key: require('../skemoji/1beici.gif'), value: '/{1_背刺}' },
  { key: require('../skemoji/1bukey.gif'), value: '/{1_补key}' },
  { key: require('../skemoji/1fakey.gif'), value: '/{1_发key}' },
  { key: require('../skemoji/1songkey.gif'), value: '/{1_送key}' },
  { key: require('../skemoji/1doge.gif'), value: '/{1_doge}' },
  { key: require('../skemoji/1huaji.gif'), value: '/{1_滑稽}' },
  { key: require('../skemoji/1xiaoku.gif'), value: '/{1_笑哭}' },
  { key: require('../skemoji/1wude.gif'), value: '/{1_武德}' },
  { key: require('../skemoji/1cahan.gif'), value: '/{1_擦汗}' },
  { key: require('../skemoji/1xiale.gif'), value: '/{1_瞎了}' },
]

const second = [
  {
    key: require('../skemoji/2liuliuliu.gif'),
    value: '/{2_666}',
    packageName: '杉果表情2号',
  },
  { key: require('../skemoji/2hi.gif'), value: '/{2_HI}' },
  { key: require('../skemoji/2keyne.gif'), value: '/{2_KEY呢}' },
  { key: require('../skemoji/2baibai.gif'), value: '/{2_拜拜}' },
  { key: require('../skemoji/2beici.gif'), value: '/{2_背刺}' },
  { key: require('../skemoji/2dai.gif'), value: '/{2_呆}' },
  { key: require('../skemoji/2e.gif'), value: '/{2_呃}' },
  { key: require('../skemoji/2haha.gif'), value: '/{2_哈哈}' },
  { key: require('../skemoji/2huaji.gif'), value: '/{2_滑稽}' },
  { key: require('../skemoji/2zhenjing.gif'), value: '/{2_震惊}' },
  { key: require('../skemoji/2kelian.gif'), value: '/{2_可怜}' },
  { key: require('../skemoji/2yingyingying.gif'), value: '/{2_嘤嘤嘤}' },
  { key: require('../skemoji/2ku.gif'), value: '/{2_哭}' },
  { key: require('../skemoji/2nu.gif'), value: '/{2_怒}' },
  { key: require('../skemoji/2xixi.gif'), value: '/{2_嘻嘻}' },
  { key: require('../skemoji/2xiexie.gif'), value: '/{2_谢谢}' },
]
const SONKWO_EMOJI = [first, second, EMOJI]
const All_EMOJI_OBJECT = unionWith(first, second, EMOJI)
export { SONKWO_EMOJI, All_EMOJI_OBJECT }
