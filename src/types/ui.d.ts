/**
 *
 * created by lijianpo on 2021/04/13
 */
declare interface FlexProps {
  // 布局方向
  direction?: 'column' | 'row'
  //
  align?:
    | 'center'
    | 'stretch'
    | 'flex-end'
    | 'flex-start'
    | 'space-around'
    | 'space-between'
  //
  justify?:
    | 'center'
    | 'stretch'
    | 'flex-end'
    | 'flex-start'
    | 'space-evenly'
    | 'space-around'
    | 'space-between'
  //
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  children?: React.ReactNode
  linear?: any
  elevation?: boolean
  style?: object
}

declare type FontFamily = 'normal' | 'beba'
// declare type FontColor = keyof typeof textColors
declare type Weight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold'

declare interface MyTextProps {
  /** font family, normal | beba, default normal */
  family?: FontFamily
  /** 文字颜色，默认 black */
  color?: string
  /** 字号， 并为字体设置行高, 默认 12 */
  size?: number
  /** 字重  default normal */
  weight?: Weight
  /** 自定义行高，用来覆盖字号映射的行高 */
  height?: number
  textAlign?: 'center'
  children: string | React.ReactNode
  style?: object
  numberOfLines?: number
  onPress?: () => void
}

declare interface AvatarProps {
  size?: number
  avatar?: string
  disabled?: boolean
  userId?: number
  style?: object
  otherStyle?: object
}

declare interface DividerProps {
  /**
   * divider height, default hairlineWidth
   */
  height?: number
  /**
   * divider color, default transparent
   */
  color?: string
  style?: object
}

declare interface BadgeProps {
  number: number
  style: object
  labelStyle?: object
}

declare type StatusBarStyle = 'default' | 'light-content' | 'dark-content'
declare interface BarProps {
  translucent?: boolean
  barStyle: StatusBarStyle
  backgroundColor?: string
}

declare interface LoadingProps {
  text?: string
  style?: object
}

declare interface NavItemProps {
  onPress?: () => void
  itemType?: 'switch' | 'normal' | 'hidden'
  leftIcon?: Element
  itemStyle?: object
  rightIcon?: Element
  itemTitle: string
  switchProps?: Element
  itemTitleStyle?: object
  rightContainer?: object
  rightExtraTitle?: Element
  showItemSeparator?: boolean
}

declare interface StackHeaderProps {
  title?: string | Function
  renderRight?: () => React.ReactNode
  renderLeft?: () => React.ReactNode
  children?: React.ReactNode
  style?: object
  containerStyle?: object
  tintColor?: string
  onBackPress?: () => void
  showBack?: boolean
  leftWidth?: number
  rightWidth?: number
}

declare interface EditStackHeader {
  title?: string | Function
  onPress?: () => void
  changeBgColor?: boolean
  changeTextColor?: boolean
}

declare interface IconProps {
  name: string
  size?: number
  color?: string
  onPress?: () => void
  disabled?: boolean
  /**图片右侧文字 */
  text?: string | number
  isTextLeft?: boolean
  /**图标文字间距 */
  textSpace?: number
  style?: object
  textStyle?: object
  /**是否使用gesture-handler中的touchable */
  gh?: boolean
}

declare interface LinearProps {
  start?: { x: any; y: any }
  end?: { x: any; y: any }
  colors?: any
  style?: object
  children?: React.ReactNode
}

declare interface StatusBarProps {
  isDarkStyle: boolean
  statusBarBgColor?: string
}

declare interface ShadowBoxProps {
  children: React.ReactNode
  boxWidth?: number
  boxHeight?: number
  boxStyle?: object
  boxBorderRadius?: number
  boxBackgroundColor?: string
}

declare interface SvgIconProps {
  size: number
  path: string[]
  fill: string[]
  viewBox: string
  style: Object
}

declare interface MyButtonProps {
  icon?: string
  title: string
  style?: Object
  color?: string
  linear?: Object
  onPress?: () => void
  iconProps?: Object
  textSize?: number
  type?: 'solid' | 'outline' | 'transparent'
  containerStyle?: Object
  disabled?: boolean
  textStyle?: Object
}

declare type ModalType = 'center' | 'right' | 'bottom'
