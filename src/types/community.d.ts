/**
 *
 * created by lijianpo on 2021/04/14
 */

declare interface Group {
  id: number
  name: string
  description: string
  logo: string
  memberCount: number
  subjectCount: number
  reviewCount: number
  formalType: 'game' | 'official'
  // leaders: SimpleUser[]
  groupSkus?: { skuId: number; region: string; area: string }[]
  /**
   * 点评数据
   */
  evaluation: {
    scoresCount: number
    usersCount: number
  }
  tagIds?: number[]
}

interface SimpleGroup extends Pick<Group, 'id' | 'name' | 'logo' | 'tagIds'> {
  /**
   *  ex: '100|200' # member_count | subject_count
   */
  count: string
  memberCount?: number
  subjectCount?: number
}
