/**
 * 画面遷移に関するActionTypeを定義する
 */
export const NAVIGATE = 'NAVIGATE'
export const NAV_PUSH = 'NAV_PUSH'
export const NAV_POP = 'NAV_POP'
export const NAV_JUMP_TO_KEY = 'NAV_JUMP_TO_KEY'
export const NAV_JUMP_TO_INDEX = 'NAV_JUMP_TO_INDEX'
export const NAV_RESET = 'NAV_RESET'

/**
 * 画面遷移に関するActionCreatorsを定義する
 */
//ステートの値に渡された画面にPushで遷移するアクション
export function navigatePush(state) {
  state = typeof state === 'string' ? {
    key: state,
    title: state
  } : state
  return {
    type: NAV_PUSH,
    state
  }
}

//ステートの値に渡された画面にPopで遷移するアクション
export function navigatePop() {
  return {
    type: NAV_POP
  }
}

//渡されたキー値に応じて該当画面へ遷移するアクション
export function navigateJumpToKey(key) {
  return {
    type: NAV_JUMP_TO_KEY,
    key
  }
}

//渡されたインデックス値に応じて該当画面へ遷移するアクション
export function navigateJumpToIndex(index) {
  return {
    type: NAV_JUMP_TO_INDEX,
    index
  }
}

//現在のナビゲーションの状態をリセットするアクション
export function navigateReset(routes, index) {
  return {
    type: NAV_RESET,
    index,
    routes
  }
}
