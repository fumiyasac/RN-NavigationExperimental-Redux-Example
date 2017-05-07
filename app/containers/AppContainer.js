'use strict'

/**
 * 画面遷移コントロール用のContainerを定義する（App.jsと1:1で対応する）
 * sceneディレクトリ内に入っている各々のコンテンツ表示のコントロールに関しては`NavigationExperimental`を利用
 * ※参考記事：First look: React Native NavigationExperimental Part 1
 * https://medium.com/react-native-training/first-look-react-native-navigator-experimental-9a7cf39a615b
 */
// ※こちらはヘッダーを設定した遷移のパターンになります。

import React, {PropTypes} from 'react'

//ReactNativeのコンポーネントを使う
import {NavigationExperimental, View, StyleSheet} from 'react-native'

//connectメソッドを用いてstoreをpropで読めるようにする
import {connect} from 'react-redux'

//表示対象の画面に対応するContainerを選ぶ
import First from './First'
import Second from './Second'
import Third from './Third'
import Modal from './Modal'

//actionCreatorsの中から画面遷移に必要なアクションを選ぶ
import {navigatePop} from '../actions'

//NavigationExperimentalで画面の構成に必要なものを別のComponet名で使用する
const {Transitioner: NavigationTransitioner, Card: NavigationCard, Header: NavigationHeader} = NavigationExperimental

class AppContainer extends React.Component {

  //Routing・Container・Componentの対応を行う
	// → _renderSceneで各種遷移先の設定を行ってNavigationCardStackでのアクションと紐づける
  render() {

    //画面遷移のステート値と戻る際のアクションをthis.propsより取得する
    let {navigationState, backAction} = this.props

    return (
      <NavigationTransitioner navigationState={navigationState} style={styles.container} render={props => (
        <View style={styles.container}>
          <NavigationCard {...props} style={props.scene.route.key === 'Modal'
            ? NavigationCard.CardStackStyleInterpolator.forVertical(props)
            : undefined} onNavigateBack={backAction} panHandlers={props.scene.route.key === 'Modal'
            ? null
            : undefined} renderScene={this._renderScene} key={props.scene.route.key}/>
          <NavigationHeader {...props} onNavigateBack={backAction} renderTitleComponent={props => {
            const title = props.scene.route.title return <NavigationHeader.Title>{title}</NavigationHeader.Title>
          }}/>
        </View>
      )}/>
    )
  }

  //NavigationCardStackで遷移に応じて表示するComponentを決定する
  _renderScene({scene}) {

    //画面遷移に対応するrouteオブジェクトを取得する(※navigationReducer.jsを参照)
    const {route} = scene

    //Reducerの画面遷移に関するステートのkeyに応じて表示する画面を切り替える
    switch (route.key) {
      case 'First':
        return <First/>
      case 'Second':
        return <Second/>
      case 'Third':
        return <Third/>
      case 'Modal':
        return <Modal/>
    }
  }
}

//このコンテナに引き渡されるpropsに対するバリデーション
//navigationState: Reducerから取得したオブジェクト
//backAction: 遷移先から遷移元へ戻るコールバック関数
AppContainer.propTypes = {
  navigationState: PropTypes.object,
  backAction: PropTypes.func.isRequired
}

//スタイル設定
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

//connectメソッドで対応する見た目のComponentへデータやコールバック関するを渡す
// ※書き方メモ：export default connect(mapStateToProps, mapDispatchToProps)(Class)の形で記述する
export default connect(state => ({navigationState: state.navigationState}), dispatch => ({
  backAction: () => {
    dispatch(navigatePop())
  }
}))(AppContainer)
