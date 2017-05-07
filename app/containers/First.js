/**
 * 最初の画面用のContainerを定義する（scene/FirstScene.jsと1:1で対応する）
 * ※ Reduxで画面を切り替える画面に関連するものはこの中に記載する
 */

//connectメソッドを用いてstoreをpropで読めるようにする
import {
  connect
} from 'react-redux'

//対応するComponentを設定する
import FirstScreen from '../components/FirstScreen'

//actionCreatorsの中から画面遷移に必要なアクションを選ぶ
import {
  navigatePush
} from '../actions'

//connectメソッドで対応する見た目のComponentへデータやコールバック関するを渡す
// mapStateToProps：globalなstateから利用する値をとってきてthis.propsにセットする
// mapDispatchToProps：this.method.actionHoge()を呼ぶとstore.dispatch()が呼ばれる → アクションを定義している場合にはそのアクションメソッドを設定
// http://qiita.com/yuichiroTCY/items/a3ca7d9d415049d02d60
const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    onButtonPress: () => {
      dispatch(navigatePush('Second'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstScreen)
