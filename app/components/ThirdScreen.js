/**
 * 3番目の画面用のComponentを定義する
 */

import React, {PropTypes} from 'react'

//ReactNativeのコンポーネントを使う
import {View, Text, StyleSheet} from 'react-native'

//共通遷移用のボタン（ナビゲーション用のボタン）を定義する
import NavButton from './NavButton'

const ThirdScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Third Screen</Text>
      <NavButton destLabel="Home" buttonHandler={props.onButtonPress}/>
    </View>
  )
}

//このComponentに引き渡されるthis.propsに対するバリデーション
ThirdScreen.propTypes = {
  onButtonPress: PropTypes.func.isRequired
}

//スタイル設定
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#79BD8F',
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
export default ThirdScreen
