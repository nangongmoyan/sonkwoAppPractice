/**
 *
 * created by lijianpo on 2021/05/22
 */
import React, { useCallback, useRef, useState } from 'react'
import { FlatList, View } from '@ui'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'
import { deviceHeight, isiOS } from '@util'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { ChatItem } from './ChatItem'

const ChatView: React.FC<any> = ({
  messageList,
  headerHeight,
  flatListProps,
  inverted = false,
  allPanelHeight = 200,
  iphoneXBottomPadding = 34,
}) => {
  const chatList = useRef(null)
  const currentList = messageList
    .slice()
    .sort((a, b) => (inverted ? b.time - a.time : a.time - b.time))
  console.log({ currentList })
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [keyboardShow, setKeyboardShow] = useState(false)
  const [visibleHeight, setVisibleHeight] = useState(useSharedValue(0))
  const [viewHeaderHeight, setViewHeaderHeight] = useState(headerHeight)

  const panelContainerHeight =
    allPanelHeight + (isIphoneX() ? iphoneXBottomPadding : 0)

  const transYValue = useDerivedValue(() => {
    return interpolate(
      visibleHeight.value,
      [0, 1],
      [
        deviceHeight - viewHeaderHeight,
        keyboardShow
          ? deviceHeight - keyboardHeight - viewHeaderHeight
          : deviceHeight - viewHeaderHeight - panelContainerHeight,
      ],
      Extrapolate.CLAMP,
    )
  })

  const animatedViewStyle = useAnimatedStyle(() => {
    return isiOS
      ? {
          backgroundColor: 'transparent',
          // transform: [{ translateY: transYValue.value }],
        }
      : {
          flex: 1,
          backgroundColor: 'transparent',
        }
  })

  const closeAll = useCallback(() => {
    return console.log('xxx')
  }, [])

  const renderItem = useCallback(({ item, index }) => {
    return <ChatItem message={item} chatType="friend" showUserName={true} />
  }, [])

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
      }}
      // onLayout={(e) => (this.rootHeight = e.nativeEvent.layout.height)}
    >
      <Animated.View style={animatedViewStyle}>
        {/* <TouchableOpacity
          activeOpacity={1}
          onPress={closeAll}
          style={{ flex: 1, backgroundColor: 'transparent' }}
        > */}
        <FlatList
          {...flatListProps}
          ref={chatList}
          data={currentList}
          inverted={inverted}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          automaticallyAdjustContentInsets={false}
          // ListFooterComponent={renderLoadEarlier}
          showsVerticalScrollIndicator={true}
        />
        {/* </TouchableOpacity> */}
      </Animated.View>
    </View>
  )
}

export { ChatView }
// import { Clipboard } from '@native'
// import { Image, TouchableOpacity,FlatList } from '@ui'
// import { isiOS } from '@util'
// import React, { useRef, useState, useEffect } from 'react'
// import {  Animated,Easing, StyleSheet, View,Keyboard, Platform} from 'react-native'

// let ImageComponent = Image
// const ChatView: React.FC<any> = ({
//   inverted,
//   headerHeight,
//   isIPhonex,
//   usePopView,
//   iphoneXBottomPadding,
//   CustomImageComponent,
//   pressAvatar,
//   sendMessage,
//   checkPermission,
//   setPopItems,
//   popverStyle,
//   allPanelAnimateDuration,
//   requestAndroidPermission,
//   onMessageLongPress,
//   changeHeaderLeft,
//   renderChatBg,
//   containerBackgroundColor,
//   chatBackgroundImage,
//   chatWindowStyle,
//   flatListProps,
//   messageList,
//   renderLoadEarlier,
//   extraData,
//   onScroll,
//   showsVerticalScrollIndicator,
//   onEndReachedThreshold,
//   showInput,
// }) => {
//   // ImageComponent = CustomImageComponent || Image
//   const chatList = useRef<any>()
//   const [listY, setListY] = useState(0)
//   const [tabSelect, setTabSelect] = useState(0)
//   const [modalTitle, setModalTitle] = useState('')
//   const [pressIndex, setPressIndex] = useState(-1)
//   const [isInverted, setIsInverted] = useState(false)
//   const [cursorIndex, setCursorIndex] = useState(0)
//   const [emojiShow, setEmojiShow] = useState(false)
//   const [panelShow, setPanelShow] = useState(false)
//   const [imageSource, setImageSource] = useState('')
//   const [currentIndex, setCurrentIndex] = useState(-1)
//   const [contentHeight, setContentHeight] = useState(0)
//   const [isPanelShow, setIsPanelShow] = useState(false)
//   const [isEmojiShow, setIsEmojiShow] = useState(false)
//   const [isSelfMessage, setIsSelfMessage] = useState(true)
//   const [selectMultiple, setSelectMultiple] = useState(false)
//   const [keyboardHeight, setKeyboardHeight] = useState(0)
//   const [listVisibleHeight, setListVisibleHeight] = useState(0)
//   const [keyboardShow, setKeyboardShow] = useState(false)
//   const [saveChangeSize, setSaveChangeSize] = useState(0)
//   const [messageContent, setMessageContent] = useState('')
//   const [inputChangeSize, setInputChangeSize] = useState(0)
//   const [messageSelected, setMessageSelected] = useState([])
//   const [xHeight, setXHeight] = useState(iphoneXBottomPadding)
//   const [imageModalShow, setimageModalShow] = useState(false)

//   const keyboardWillShowListener = useRef(null);
//   const keyboardWillHideListener = useRef(null);
//   const keyboardDidShowListener = useRef(null);
//   const keyboardDidHideListener = useRef(null);

//   useEffect(()=>{
//       Platform.OS==='android' && _willShow()
//       Platform.OS==='android' && _willHide()
//       isiOS && _didShow()
//       isiOS && _didHide()
//       return ()=>{
//         Platform.OS==='android' && _willRemove()
//         isiOS && _didRemove()
//       }
//   },[])

//   const _willShow = () => {
//     keyboardWillShowListener.current = Keyboard.addListener('keyboardWillShow',(e)=>{
//       setXHeight(0)
//       setKeyboardShow(true)
//       setKeyboardHeight(e.endCoordinates.height)
//       Animated.timing(this.visibleHeight,{
//         toValue:1,
//         duration:e.duration,
//         useNativeDriver: false,
//         easing:Easing.inOut(Easing.ease)
//       }).start()
//       if(emojiShow) {
//         return closeEmoji()
//       }
//       if(panelShow){
//         return closePanel()
//       }
//     })

//   }

//   const _willHide = () => {
//     keyboardWillHideListener.current = Keyboard.addListener('keyboardWillHide',(e)=>{
//       setKeyboardShow(false)
//       if(emojiShow) {
//         return showEmoji()
//       }
//       if(panelShow){
//         return showPanel()
//       }
//       Animated.timing(this.visibleHeight, {
//         toValue:0,
//         duration:e.duration,
//         useNativeDriver:false,
//         easing:Easing.inOut(Easing.ease)
//       }).start()
//       setXHeight(iphoneXBottomPadding)
//     })
//   }

//   const _didShow = () => {
//     keyboardDidShowListener.current = Keyboard.addListener('keyboardDidShow',(e)=>{
//       setKeyboardShow(true)
//     })
//   }

//   const _didHide = () => {
//     keyboardDidHideListener.current= Keyboard.addListener('keyboardDidHide',(e)=>{
//       setKeyboardShow(false)
//       if(emojiShow){
//         return showEmoji()
//       }
//       if(panelShow){
//         return showPanel()
//       }
//     })
//   }
//   const  _willRemove = () => {
//     keyboardWillShowListener.current.remove();
//     keyboardWillHideListener.current.remove();
//   }

//   const _didRemove = () => {
//     keyboardDidShowListener.current.remove();
//     keyboardDidHideListener.current.remove();
//   }
//   const _sendMessage = (type, content) => {
//     // this._userHasBeenInputed = true
//     if (type === 'text' && content.trim().length !== 0) {
//       content = changeEmojiText(messageContent).join('')
//     }
//     sendMessage(type, content, this.isInverted)
//     // this.InputBar.input && this.InputBar.clear()
//     setMessageContent('')
//     if (inverted) {
//       // this.time && clearTimeout(this.time)
//     } else {
//       // this.chatList.scrollToOffset({ y: 0, animated: false })
//     }
//   }

//   const _changeMethod = () => {
//     // setShowVoice(!showVoice, () => {
//     //   if (!isiOS && showVoice && !this.androidHasAudioPermission) {
//     //     const hasPermission = await checkPermission()
//     //     this.androidHasAudioPermission = hasPermission
//     //     !hasPermission && requestAndroidPermission()
//     //   }
//     // })

//     setSaveChangeSize(inputChangeSize)
//     // this.time && clearTimeout(this.time)
//     this.time = setTimeout(
//       () => this.InputBar.input && this.InputBar.input.focus(),
//       300,
//     )

//     if (showVoice && panelShow) {
//       setXHeight(iphoneXBottomPadding)
//       return this.closePanel(true)
//     }

//     if (!showVoice && emojiShow) {
//       setXHeight(iphoneXBottomPadding)
//       return this.closeEmoji(true)
//     }
//   }

//   const _changeText = (e) => setMessageContent(e)

//   const _onContentSizeChange = (e) => {
//     const changeHeight = e.nativeEvent.contentSize.height
//     if (changeHeight === 34) return
//     setInputChangeSize(changeHeight <= 70 ? changeHeight : 70)
//     if(!inverted){
//       // chatList && chatList.scrollToEnd([animated:true])
//     }
//   }

//   const _pressAvatar = (isSelf, targetId) =>{
//     pressAvatar(isSelf, targetId)
//     this.closeAll()
//   }

//   const _scrollToBottom = (listHeightAndWidth){
//     if(listHeightAndWidth !== undefined){
//       const  {contentHeight} = listHeightAndWidth
//       this.isInverted = contentHeight > this.listHeight
//     }

//     if(!inverted){
//       setTimeout(()=>{
//         chatList && chatList.scrollToEnd({
//           animated: this._userHasBeenInputed
//         })
//       }, this._userHasBeenInputed?0:130)
//     }
//   }

//   const _onFous = () => {
//     if(!isiOS){
//       this.closeAll(()=>{
//         this.inputBar.input && this.InputBar.input.focus()
//       })
//     }
//   }

//   const showPanel = (callback)=> {
//     setXHeight(0)
//     Animated.parallel([
//       Animated.timing(isiOS?this.visibleHeight:this.paddingHeight,{
//         toValue:1,
//         useNativeDriver:true,
//         duration: allPanelAnimateDuration
//       }),
//       Animated.timing(this.panelHeight,{
//         toValue:1,
//         useNativeDriver:true,
//         easing: Easing.inOut(Easing.ease),
//         duration:allPanelAnimateDuration,
//       })
//     ]).start(()=>{
//       callback && callback()
//       setPanelShow(true)
//     })
//   }

//    const closePanel =(realClose= false, callback) => {
//      Animated.parallel([
//        Animated.timing(isiOS?this.visibleHeight:this.paddingHeight,{
//          useNativeDriver:true,
//          toValue: realClose?0:1,
//          duration: allPanelAnimateDuration
//        }),
//        Animated.timing(this.panelHeight,{
//          toValue:0,
//          useNativeDriver:true,
//          easing:Easing.inOut(Easing.ease),
//          duration:allPanelAnimateDuration
//        })
//      ]).start(()=>{
//        setPanelShow(false)
//        callback && callback()
//      })
//    }

//    const isSHowPanel = () => {
//      if(isiOS){
//        if(panelShow){
//          return this.InputBar.input && this.InputBar.input.focus()
//        }else{
//          if(emojiShow){
//            return closeEmoji(false, ()=>showPanel())
//          }
//          if(!keyboardShow){
//            showPanel()
//          }else{
//            setXHeight(0)
//            setPanelShow(true)
//            setKeyboardHeight(0)
//            setKeyboardShow(false)
//            this.InputBar.input && this.InputBar.input.blur()
//          }
//        }
//      }else{
//        if(panelShow){
//          return closePanel(true,()=>{this.InputBar.input && this.InputBar.input.docus()})
//        }else{
//          if(emojiShow){
//            return  closeEmoji(false,()=>showPanel())
//          }
//          if(!keyboardShow){
//            showPanel()
//          }else{
//            setPanelShow(true)
//            setKeyboardShow(false)
//          }
//        }
//      }
//    }

//    const showEmoji = (callback)=>{
//      setXHeight(0)
//      Animated.parallel([
//        Animated.timing(isiOS? this.visibleHeight:this.paddingHeight,{
//          toValue:1,
//          useNativeDriver:false,
//          duration: allPanelAnimateDuration
//        }),
//        Animated.timing(this.emojiHeight,{
//          toValue:1,
//          useNativeDriver:false,
//         easing:Easing.inOut(Easing.ease),
//         duration:allPanelAnimateDuration
//        })
//      ]).start(()=>[
//        setEmojiShow(true)
//        callback && callback()
//      ])
//    }

//    const closeEmoji = (realColose = false, callback) => {
//      Animated.parallel([
//        Animated.timing(isiOS?this.visibleHeight:this.paddingHeight,{
//          useNativeDriver:false,
//          toValue: realColose?0:1,
//          duration: allPanelAnimateDuration
//        }),
//        Animated.timing(this.emojiHeight,{
//          toValue:0,
//          useNativeDriver:false,
//          easing:Easing.inOut(Easing.ease),
//          duration:allPanelAnimateDuration
//        })
//      ]).start(()=>{
//        setEmojiShow(false)
//       callback && callback()
//      })
//    }

//    const tabEmoji = () => {
//      if(isiOS){
//        if(emojiShow){
//          return this.InputBar.input && this.InputBar.input.focus()
//        }
//        if(panelShow){
//          return closePanel(false,()=>showEmoji())
//        }
//        if(!keyboardShow){
//          showEmoji()
//        }else{
//          setXHeight(0)
//          setEmojiShow(true)
//          setKeyboardHeight(0)
//          setKeyboardShow(false)
//        this.InputBar.input && this.InputBar.input.blur()
//        }
//      }else{
//        if(emojiShow){
//          return closeEmoji(true,()=>this.InputBar.input && this.InputBar.input.focus())
//        }else{
//         if(panelShow){
//           return closeEmoji(false,()=>showEmoji())
//         }
//         if(!keyboardShow){
//           showEmoji()
//         }else{
//           setEmojiShow(true)
//           setKeyboardShow(false)
//           this.InputBar.input && this.InputBar.input.blur()
//         }
//        }
//      }
//    }

//    const selectMultiple = (isSelect, index, message) => {
//      const messageArr = messageSelected
//      const existArr = messageArr.filter((item)=>item.index===index)
//      if(existArr.length === 0) {
//       messageArr.push({index, isSelect,message})
//       setMessageSelected(messageArr)
//      }else{
//        const filterArr = messageArr.filter((item)=>item.index !== index)
//        isSelect && filterArr.push({index, isSelect, message})
//        setMessageSelected(filterArr)
//      }
//    }

//    const _openMultipleSelect = () => {
//       setSelectMultiple(true)
//       Animated.timing(this.leftHeight,{
//         toValue:1,
//         duration:200,
//         useNativeDriver:false,
//         easing:Easing.linear()
//       }).start()
//    }

//    const _closeMultipleSelect = () => {
//      setCurrentIndex(-1)
//      setSelectMultiple(false)
//      Animated.timing(this.leftHeight,{
//        toValue:0,
//        duration:200,
//        useNativeDriver:false,
//        easing:Easing.linear()
//      }).start()
//    }

//    const show = (view,type, index,text,message) => {
//      if(!usePopView){
//        onMessageLongPress(type, index, text,message)
//      }else{
//        view.measure((x,y,width,height,pageX,pageY)=>{
//          let items = null
//          if(setPopItems){
//            items = setPopItems(type,index,text,message)
//          }else{
//             items = [
//               {title:'删除',onPress:()=>
//                 delMessage({index,message}, this.isInverted)
//               },
//               {
//                 title:'多选',
//                 onPress:()=>multipleSelect(index,message)
//               }
//             ]
//             if(type==='text'){
//               items = [
//                 {
//                   title:'复制',
//                   onPress:()=>Clipboard.setString(text)
//                 },
//                 {title:'删除',onPress:()=>
//                   delMessage({index,message}, this.isInverted)
//                 },
//                 {
//                   title:'多选',
//                   onPress:()=>multipleSelect(index,message)
//                 }
//               ]
//             }
//          }
//          if(items == null)  console.error('need to return items')
//          if(items.length >0){
//            PopView.show({x:pageX,y:pageY,width,height},items, {popoverStyle: popverStyle})
//          }
//        })
//      }
//    }

//    const multipleSelect = (index,message) => {
//      closeAll()
//      Keyboard.dismiss()
//      _openMultipleSelect()
//      changeHeaderLeft()
//      if(index !== undefined){
//        messageSelected.length = 0,
//        setCurrentIndex(index)
//        messageSelected.push({index,message,isSelect:true})
//      }
//    }

//    const closeAll =(callback)=>{
//     if(panelShow){
//       setXHeight(iphoneXBottomPadding)
//       return closePanel(true, callback)
//     }

//     if(emojiShow){
//       setXHeight(iphoneXBottomPadding)
//       return closeEmoji(true, callback)
//     }
//    }

//    const _loadHistory = async(code:string) => {
//      const emojiReg = new RegExp('\\[[^\\]]+\\]', 'g')
//     if(code===''){ return}
//     let lastText = ''
//     const currentTextLength = messageContent.length

//     if(code ==='/{del}'){ //删除键
//       if(currentTextLength){
//         return
//       }

//       if(cursorIndex < currentTextLength){//光标在字符串中间
//         const emojiIndex = messageContent.search(emojiReg)//匹配到的第一个表情符号
//         if(emojiIndex === -1) { //没有匹配表情符
//           const preStr = messageContent.substring(0, cursorIndex)
//           const nextStr = messageContent.substring(cursorIndex)
//           lastText = preStr.substring(0,preStr.length-1)+ nextStr
//           setCursorIndex(preStr.length-1)
//         }else{
//           const preStr = messageContent.substring(0, cursorIndex)
//           const nextStr = messageContent.substring(cursorIndex)
//           const lastChar = preStr.charAt(preStr.length-1)
//           if(lastChar === ']'){
//             const castArray = preStr.match(emojiReg)
//             if(!castArray){
//               const cast = castArray[castArray.length-1]
//               lastText = preStr.substring(0, preStr.length - cast.length) +nextStr
//               setCursorIndex(preStr.length - cast.length)
//             }else{
//               lastText = preStr.substring(0, preStr.length - 1) + nextStr
//               setCursorIndex(preStr.length - 1)
//             }
//           }else{
//             lastText = preStr.substring(0, preStr.length-1) + nextStr
//             setCursorIndex(preStr.length-1)
//           }
//         }
//       }else{ //光标在字符串最后
//         const lastChar = messageContent.charAt(currentTextLength-1)
//         if(lastChar === ']'){
//           const castArray = messageContent.match(emojiReg)
//           if(castArray){
//             const cast = castArray[castArray.length - 1]
//             lastText = messageContent.substring(0, messageContent.length - 1)
//             setCursorIndex(messageContent.length - 1)
//           }else{
//             lastText = messageContent.substring(0, messageContent.length - 1)
//             setCursorIndex(messageContent.length-1)
//           }
//         }else{
//           lastText = messageContent.substring(0, currentIndex-1)
//           setCursorIndex(currentIndex-1)
//         }
//       }
//     }else{
//       if(cursorIndex<= currentIndex){
//         lastText = messageContent + EMOJIS_ZH[code]
//         setCursorIndex(lastText.length)
//       }else{
//         const preTemp = messageContent.substring(0, cursorIndex)
//         const nextTemp = messageContent.substring(currentIndex, currentTextLength)

//         lastText = preTemp + EMOJIS_ZH[code] + nextTemp
//         setCursorIndex(cursorIndex+ EMOJIS_ZH[code] .length)
//       }
//     }
//     setMessageContent(lastText)
//    }
//    const saveProssIndex = (id) =>  setPressIndex(id)

//    const renderBackGround = (background) => {
//      if(background === null) return null
//      if(renderChatBg === undefined){
//        const source = typeof background ==='number'?background:{uri:background}
//        return (
//          <ImageComponent source={source} style={{position:'absolute',width, top:0,height}} resizeMode='cover' />
//        )
//      }else{
//        return renderChatBg(background)
//      }
//    }

//    const renderItem =({item,index})=>{
//     return  <ChatItem

//     />
//    }
//    const currentList = messageList.slice().sort((a,b)=>inverted
//    ?(b.time-a.time)
//    :(a.time-b.time))
//    const panelContainerHeight = allPanelHeight+(this.isIphoneX?iphoneXBottomPadding:0)
//   return (
// <View style={{backgroundColor:containerBackgroundColor, flex:1,position:'absolute'}} onLayout={e=>this.rootHeight = e.nativeEvent.layout.height}>
//     {renderBackGround(chatBackgroundImage)}
//     <Animated.View style={
//       isiOS?{
//         backgroundColor:'transparent',
//         height: this.visibleHeight.interpolate({
//           inputRage:[0,1],
//           outputRange:[
//             height-this,HeaderHeight,
//             keyboardShow?height-keyboardHeight-this.HeaderHeight:
//             height-this.HeaderHeight-panelContainerHeight
//           ]
//         })
//       }:
//       {flex:1, backgroundColor:'transparent'}
//     }>
//       <TouchableOpacity
//       activeOpacity={1}
//         onPress={closeAll}
//         style={StyleSheet.flatten([chatWindowStyle,{flex:1,backgroundColor:'transparent'}])}
//       >
//         <FlatList
//         {...flatListProps}
//         ref={chatList}
//         inverted={inverted}
//         data={currentList}
//         ListFooterComponent={renderLoadEarlier}
//         extraData={extraData}
//         automaticallyAdjustContentInsets={false}
//         onScroll={e=>onScroll(e)}
//         showsVerticalScrollIndicator= {showsVerticalScrollIndicator}
//         onEndReachedThreshold={onEndReachedThreshold}
//         enableEmptySections
//         scrollEventThrottle={100}
//         keyExtractor={(item)=>`${item.id}`}
//         onEndReached={_loadHistory}
//         onLayout={e=>{
//           _scrollToBottom()
//           this.listHeight = e.nativeEvent.layout.height
//         }}
//         onContentSizeChange={(contentWidth, contentHeight)=>_scrollToBottom({contentWidth,contentHeight})}
//         renderItem={renderItem}

//         />
//       </TouchableOpacity>
//       {showInput?
//       <ImputBar/>:null
//     }
//     {usePopView?<DelPanel/>:null}
//     <PanelContainer/>
//     </Animated.View>
// </View>
//   )
// }

// export { ChatView }

// const styles = StyleSheet.create({

// })
