/**
 *
 * created by lijianpo on 2021/04/13
 */
// search icons from https://oblador.github.io/react-native-vector-icons/
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

// need icon component type
const list: Record<string, any> = {
  // --- AntDesign ---
  close: AntDesign,
  up: AntDesign,
  down: AntDesign,
  clockcircleo: AntDesign,
  caretright: AntDesign,
  pause: AntDesign,
  right: AntDesign,
  link: AntDesign,
  picture: AntDesign,
  like1: AntDesign,
  like2: AntDesign,
  dislike1: AntDesign,
  dislike2: AntDesign,
  question: AntDesign,
  // --- Entypo ---
  'location-pin': Entypo,
  'log-out': Entypo,
  'chevron-right': Entypo,
  camera: Entypo,
  eye: Entypo,
  'eye-with-line': Entypo,
  // --- FontAwesome ---
  check: FontAwesome,
  minus: FontAwesome,
  weixin: FontAwesome,
  filter: FontAwesome,
  // --- MaterialCommunityIcons ---
  download: MaterialCommunityIcons,
  menu: MaterialCommunityIcons,
  comment: MaterialCommunityIcons,
}

export default list
