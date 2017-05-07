/**
 * 2番目の画面用のContainerを定義する（scene/SecondScene.jsと1:1で対応する）
 */

//connectメソッドを用いてstoreをpropで読めるようにする
import {
  connect
} from 'react-redux'

//対応するComponentを設定する
import SecondScreen from '../components/SecondScreen'

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
      dispatch(navigatePush('Third'))
    },
    onModalButtonPress: () => {
      dispatch(navigatePush('Modal'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecondScreen)
