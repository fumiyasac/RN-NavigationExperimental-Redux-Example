/**
 * ナビゲーションボタン作成用のComponentを定義する
 */

import React, {PropTypes} from 'react'

//ReactNativeのコンポーネントを使う
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

const NavButton = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.buttonHandler}>
      <Text style={styles.label}>Go to {props.destLabel}
        Page</Text>
    </TouchableOpacity>
  )
}

//このComponentに引き渡されるthis.propsに対するバリデーション
NavButton.propTypes = {
  destLabel: PropTypes.string.isRequired,
  buttonHandler: PropTypes.func.isRequired
}

//スタイル設定
const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: '#3C5773',
    alignSelf: 'stretch'
  },
  label: {
    color: '#F4F4E9',
    textAlign: 'center'
  }
})

//エクスポート宣言
export default NavButton
