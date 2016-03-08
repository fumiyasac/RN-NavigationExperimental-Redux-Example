import { NavigationExperimental } from 'react-native'
// const {
// 	PushAction,
// 	PopAction,
// 	JumpToAction,
// 	JumpToIndexAction,
// 	ResetAction
// } = NavigationExperimental.NavigationReducer.NavigationStackReducer

export const NAVIGATE = 'NAVIGATE'
export const NAV_PUSH = 'NAV_PUSH'
export const NAV_POP = 'NAV_POP'
export const NAV_JUMP_TO_KEY = 'NAV_JUMP_TO_KEY'
export const NAV_JUMP_TO_INDEX = 'NAV_JUMP_TO_INDEX'
export const NAV_RESET = 'NAV_RESET'

export function navigate(destinationKey) {
	return {
		type: NAVIGATE,
		destinationKey
	}
}

// The following action creators were derived from NavigationStackReducer
export function navigatePush(state) {
	return {
		type: NAV_PUSH,
		state
	}
}

export function navigatePop() {
	return {
		type: NAV_POP
	}
}

export function navigateJumpToKey(key) {
	return {
		type: NAV_JUMP_TO_KEY,
		key
	}
}

export function navigateJumpToIndex(index) {
	return {
		type: NAV_JUMP_TO_INDEX,
		index
	}
}

export function navigateReset(children, index) {
	return {
		type: NAV_RESET,
		index,
		children
	}
}