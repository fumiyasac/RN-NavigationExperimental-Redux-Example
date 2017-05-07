/**
 * 2番目の画面用のComponentを定義する
 */

import React, {PropTypes} from 'react'

//ReactNativeのコンポーネントを使う
import {View, Text, StyleSheet} from 'react-native'

//共通遷移用のボタン（ナビゲーション用のボタン）を定義する
import NavButton from './NavButton'

const SecondScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Second Screen</Text>
      <NavButton destLabel="Third" buttonHandler={props.onButtonPress}/>
      <View style={styles.spacer}>
        <NavButton destLabel="Modal" buttonHandler={props.onModalButtonPress}/>
      </View>
    </View>
  )
}

//このComponentに引き渡されるthis.propsに対するバリデーション
SecondScreen.propTypes = {
  onButtonPress: PropTypes.func.isRequired,
  onModalButtonPress: PropTypes.func.isRequired
}

//スタイル設定
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D690CB',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#ffffff',
    marginBottom: 30
  },
  spacer: {
    marginTop: 20,
    alignSelf: 'stretch'
  }
})

//エクスポート宣言
export default SecondScreen
