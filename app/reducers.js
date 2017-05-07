/**
 * 画面遷移に関する処理を行うReducerを定義する
 */

import {
  combineReducers
} from 'redux'

//NavigationStateUtilsを利用して画面遷移処理の実態を記載する
// → 受け取ったステートを元に繊維に関する処理を組み立てる
// (参考)NavigatorExperimentalの実装例を雑に読む
// https://hogehuga.com/post-1334/
import * as NavigationStateUtils from 'NavigationStateUtils'

//使用するActionTypeのインポート
import {
  NAV_PUSH,
  NAV_POP,
  NAV_JUMP_TO_KEY,
  NAV_JUMP_TO_INDEX,
  NAV_RESET
} from './actions'

//初期状態のステート
const initialNavState = {
  index: 0,
  routes: [{
    key: 'First',
    title: 'First'
  }]
}

//ステートの変化で画面が行えるようにする
function navigationState(state = initialNavState, action) {

	//typeプロパティに応じて処理を決定する
  switch (action.type) {

    //PUSHでの遷移の場合
    case NAV_PUSH:
      if (state.routes[state.index].key === (action.state && action.state.key)) return state
      return NavigationStateUtils.push(state, action.state)

    //POPでの遷移の場合
    case NAV_POP:
      if (state.index === 0 || state.routes.length === 1) return state
      return NavigationStateUtils.pop(state)

    //キー値の合致する画面への遷移の場合
    case NAV_JUMP_TO_KEY:
      return NavigationStateUtils.jumpTo(state, action.key)

    //インデックス値の合致する画面への遷移の場合
    case NAV_JUMP_TO_INDEX:
      return NavigationStateUtils.jumpToIndex(state, action.index)

    //遷移を初期化する場合
    case NAV_RESET:
      return {
        ...state,
        index: action.index,
        routes: action.routes
      }

    default:
      return state
  }
}

//navigationStateで処理したステートこのアプリケーションの画面遷移に関するステートとしている
const appReducers = combineReducers({
  navigationState
})

//エクスポート宣言
export default appReducers
