/**
 * アプリケーション構築用のファイル
 *
 * (参考) Reduxの基本的な用語や役割について
 * ReactとReduxちょっと勉強したときのメモ
 * http://qiita.com/mgoldchild/items/5be49ea49ebc2e4d9c55#_reference-f1dd704690278d098790
 */

import React, {Component} from 'react'

//createStore, applyMiddlewareを利用する
// → applyMiddlewareを使うことでdispatch関数をラップしactionがreducerに到達する前にmiddlewareがキャッチできるようにする
import {createStore, applyMiddleware} from 'redux'

//<Provider>でコンポーネント表示の元となる<AppContainer>タグをくくる
// → actionのdispatchメソッド ＆ ReduxのStoreからステートを読み込んで使用できるようにする
import {Provider} from 'react-redux'

//非同期処理でアクションを起こすような関数をdispatchに渡せるようにするために「redux-thunk」を利用する
// (下記の記事からの引用)「redux-thunk」とは、actionに関数を与えることを可能にして、任意の処理を実行できるようにするmiddleware
// http://qiita.com/koichirokamoto/items/18f184247ca349cc03a8
import thunk from 'redux-thunk'

//画面遷移管理用のReducerを利用する
import reducers from './reducers'

//従来通り（遷移先のConponentが重ならない）挙動をするcontainer
import AppContainer from './containers/AppContainer'

//カードスタック（遷移先のConponentが重なって行く）挙動をするcontainer
import AppContainerWithCardStack from './containers/AppContainerWithCardStack'

//Redux本来のdispatch処理が実行される前にMiddlewareの処理を実行する
// → 非同期処理でactionを起こすような関数をdispatchに渡せるようにするredux-thunkを仕込む形にする
const store = createStore(reducers, {}, applyMiddleware(thunk));

//コンポーネントの内容を定義する ※ ClassComponent
export default class App extends Component {

	//各種ルーティングに対応するコンポーネントの内容をレンダリングする
  // → この部分では<AppContainer>の中でstore内のステートが利用できるようにする
  render() {
    return (
      <Provider store={store}>
        {/* この部分に行いたい挙動に対応するContainerを記載する */}
        <AppContainerWithCardStack/>
      </Provider>
    )
  }
}
