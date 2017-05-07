/**
 * 最初の画面用のComponentを定義する
 */

import React, {PropTypes} from 'react'

//ReactNativeのコンポーネントを使う
import {View, Text, StyleSheet} from 'react-native'

//共通遷移用のボタン（ナビゲーション用のボタン）を定義する
import NavButton from './NavButton'

const FirstScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>First Screen</Text>
      {/* ナビゲーションボタン用のコンポーネントへ情報を引き渡して遷移ボタンを作成する */}
      <NavButton destLabel="Second" buttonHandler={props.onButtonPress}/>
    </View>
  )
}

//このComponentに引き渡されるthis.propsに対するバリデーション
FirstScreen.propTypes = {
  onButtonPress: PropTypes.func.isRequired
}

//スタイル設定
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F9CB2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 30
  }
})

//エクスポート宣言
export default FirstScreen
