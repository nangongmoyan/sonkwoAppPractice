/**
 * 导出UI组件
 * changed by lijianpo on 2021/04/25
 */
export {
  View,
  Text,
  Image,
  Switch,
  Platform,
  FlatList,
  UIManager,
  StatusBar,
  TextInput,
  PixelRatio,
  Dimensions,
  StyleSheet,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
} from 'react-native'

export {
  BorderlessButton,
  TouchableOpacity as GHOpacity,
  TouchableHighlight as GHHighlight,
  TouchableNativeFeedback as GHNativeFeedback,
  TouchableWithoutFeedback as GHWithoutFeedback,
} from 'react-native-gesture-handler'

export LinearGradient from 'react-native-linear-gradient'
export { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
export { default as Icon } from './icon'
export { default as Form } from './form'
export { default as Avatar } from './avatar'
export { default as Button} from './button'
export { default as Divider } from './divider'
export { default as SvgIcon} from './svgIcon'
export { default as NavItem } from './navItem'
export { default as MyStatusBar } from './statusBar'
export { default as Flex, Row, Column } from './flex'
export { default as ShadowBox } from './shadowBox'
export { default as Browser } from './webview/browser'
export { default as HeadTabView } from './headTabView'
export { default as MyHListView} from './listview/HListView'
export { default as MyText, weights as fontWeights } from './text'
export { default as CustomStackHeader} from './header/customStackHeader'
export { default as MyButton } from './button/button'
