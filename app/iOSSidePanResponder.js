/**
 * A near straight copy of the default NavigationLinearPanResponder,
 * but restricts the recognition of the gesture to coming from just the
 * side of the screen, as iOS does by default
 *
 * @providesModule iOSSidePanResponder
 * @flow
 * @typechecks
 */
const Animated = require('Animated')
const NavigationAbstractPanResponder = require('NavigationAbstractPanResponder')

const clamp = require('clamp')

import type {
	NavigationPanPanHandlers,
	NavigationSceneRendererProps,
} from 'NavigationTypeDefinition'

/**
 * The duration of the card animation in milliseconds.
 */
const ANIMATION_DURATION = 250

/**
 * The threshold to invoke the `onNavigate` action.
 * For instance, `1 / 3` means that moving greater than 1 / 3 of the width of
 * the view will navigate.
 */
const POSITION_THRESHOLD = 1 / 3

/**
 * The threshold (in pixels) to start the gesture action.
 */
const RESPOND_THRESHOLD = 15

/**
 * The threshold (in pixels) to finish the gesture action.
 */
const DISTANCE_THRESHOLD = 100

/**
 * Primitive gesture directions.
 */
const Directions = {
	'HORIZONTAL': 'horizontal',
	'VERTICAL': 'vertical',
}

export type NavigationGestureDirection = 'horizontal' | 'vertical'

/**
 * Primitive gesture actions.
 */
const Actions = {
	// The gesture to navigate backward.
	// This is done by swiping from the left to the right or from the top to the
	// bottom.
	BACK: {type: 'back'},
};

/**
 * Pan responder that handles the One-dimensional gesture (horizontal or
 * vertical).
 */
class iOSSidePanResponder extends NavigationAbstractPanResponder {

	_isResponding: boolean;
	_isVertical: boolean;
	_props: NavigationSceneRendererProps;
	_startValue: number;

	constructor(
		direction: NavigationGestureDirection,
		props: NavigationSceneRendererProps,
	) {
		super()
		this._isResponding = false
		this._isVertical = direction === Directions.VERTICAL
		this._props = props
		this._startValue = 0
	}

	onMoveShouldSetPanResponder(event: any, gesture: any): boolean {
		const props = this._props

		if (props.navigationState.index !== props.scene.index) {
			return false
		}

		const layout = props.layout
		const isVertical = this._isVertical
		const axis = isVertical ? 'dy' : 'dx'
		const moveAxis = isVertical ? 'moveY' : 'moveX'
		const index = props.navigationState.index
		const distance = isVertical ?
			layout.height.__getValue() :
			layout.width.__getValue()

		return (
			Math.abs(gesture[axis]) > RESPOND_THRESHOLD &&
			gesture[moveAxis] < (distance * 0.1) &&
			distance > 0 &&
			index > 0
		)
	}

	onPanResponderGrant(): void {
		this._isResponding = false
		this._props.position.stopAnimation((value: number) => {
			this._isResponding = true
			this._startValue = value
		})
	}

	onPanResponderMove(event: any, gesture: any): void {
		if (!this._isResponding) {
			return
		}

		const props = this._props
		const layout = props.layout
		const isVertical = this._isVertical
		const axis = isVertical ? 'dy' : 'dx'
		const index = props.navigationState.index
		const distance = isVertical ?
			layout.height.__getValue() :
			layout.width.__getValue()

		const value = clamp(
			index - 1,
			this._startValue - (gesture[axis] / distance),
			index
		)

		props.position.setValue(value)
	}

	onPanResponderRelease(event: any, gesture: any): void {
		if (!this._isResponding) {
			return
		}

		this._isResponding = false

		const props = this._props
		const isVertical = this._isVertical
		const axis = isVertical ? 'dy' : 'dx'
		const index = props.navigationState.index
		const distance = gesture[axis]

		props.position.stopAnimation((value: number) => {
			this._reset()
			if (distance > DISTANCE_THRESHOLD	|| value <= index - POSITION_THRESHOLD) {
				props.onNavigate(Actions.BACK)
			}
		})
	}

	onPanResponderTerminate(): void {
		this._isResponding = false
		this._reset()
	}

	_reset(): void {
		const props = this._props
		Animated.timing(
			props.position,
			{
				toValue: props.navigationState.index,
				duration: ANIMATION_DURATION,
			}
		).start()
	}
}

function createPanHandlers(
	direction: NavigationGestureDirection,
	props: NavigationSceneRendererProps,
): NavigationPanPanHandlers {
	const responder = new iOSSidePanResponder(direction, props)
	return responder.panHandlers
}

function forHorizontal(
	props: NavigationSceneRendererProps,
): NavigationPanPanHandlers {
	return createPanHandlers(Directions.HORIZONTAL, props)
}

function forVertical(
	props: NavigationSceneRendererProps,
): NavigationPanPanHandlers {
	return createPanHandlers(Directions.VERTICAL, props)
}

module.exports = {
	Actions,
	Directions,
	forHorizontal,
	forVertical,
}