'use strict'

import React, {PropTypes} from 'react'
import {NavigationExperimental, View, StyleSheet} from 'react-native'
import { connect } from 'react-redux'

import First from './First'
import Second from './Second'
import Third from './Third'
import Modal from './Modal'
import { navigatePop } from '../actions'

const {
	Transitioner: NavigationTransitioner,
	Card: NavigationCard,
	Header: NavigationHeader
} = NavigationExperimental

class AppContainer extends React.Component {
	render() {
		let { navigationState, backAction } = this.props

		return (
			<NavigationTransitioner
				navigationState={navigationState}
				style={styles.container}
				render={ props => (
					<View style={styles.container}>
						<NavigationCard
							{...props}
							style={props.scene.route.key === 'Modal' ? NavigationCard.CardStackStyleInterpolator.forVertical(props) : undefined}
							onNavigateBack={backAction}
							panHandlers={props.scene.route.key === 'Modal' ? null : undefined}
							renderScene={this._renderScene}
							key={props.scene.route.key}
						/>
						<NavigationHeader
							{...props}
							onNavigateBack={backAction}
							renderTitleComponent={ props => {
								const title = props.scene.route.title
								return <NavigationHeader.Title>{title}</NavigationHeader.Title>
							}}
						/>
					</View>
				)}
			/>
		)
	}

	_renderScene({scene}) {
		const { route } = scene

		switch(route.key) {
		case 'First':
			return <First />
		case 'Second':
			return <Second />
		case 'Third':
			return <Third />
		case 'Modal':
			return <Modal />
		}
	}
}

AppContainer.propTypes = {
	navigationState: PropTypes.object,
	backAction: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default connect(
	state => ({
		navigationState: state.navigationState
	}),
	dispatch => ({
		backAction: () => {
			dispatch(navigatePop())
		}
	})
)(AppContainer)
