import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, PanResponder, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class BottomDrawer extends Component {
	static propTypes = {
		containerHeight: PropTypes.number.isRequired,
		backgroundColor: PropTypes.string,
		containerStyle: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
    panStyle: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
    contentStyle: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ])
	};

	static defaultProps = {
		containerHeight: 500,
		backgroundColor: '#f5f7f9',
		containerStyle: {
			width: width,
			position: 'absolute',
			borderTopLeftRadius: 18,
			borderTopRightRadius: 18
		},

		panStyle: {
			width: 60,
			height: 3,
			backgroundColor: '#ccc',
			position: 'absolute',
			borderRadius: 45,
			top: 20,
			left: width / 2 - 25
    },
    
    contentStyle: {
      paddingBottom: 20,
      paddingTop: 30,
      paddingLeft: 20,
      paddingRight: 20
    }
	};

	constructor(props) {
		super(props);

		this.TOGGLE_THRESHOLD = this.props.containerHeight / 11;
		this.DOWN_DISPLAY = this.props.containerHeight;

		this.UP_POSITION = {
			x: 0,
			y: height - this.DOWN_DISPLAY
		};

		this.DOWN_POSITION = {
			x: 0,
			y: this.UP_POSITION.y + this.DOWN_DISPLAY
		};

		this.state = {
			currentPosition: this.DOWN_POSITION
		};

		// Animation Value
		this.position = new Animated.ValueXY(this.state.currentPosition);

		// Pans
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: this.handlePanResponderMove.bind(this),
			onPanResponderRelease: this.handlePanResponderRelease.bind(this)
		});
	}

	render() {
		return (
			<Animated.View
				style={[
					{ ...this.position.getLayout(), left: 0 },
					this.props.containerStyle,
					{
						height: this.getHeight(),
						backgroundColor: this.props.backgroundColor
					}
				]}
				{...this._panResponder.panHandlers}
			>
				<View style={this.props.panStyle} />
				<View style={this.props.contentStyle}>{this.props.children}</View>
			</Animated.View>
		);
	}

	getHeight() {
		return this.props.containerHeight + Math.sqrt(height);
	}

	handlePanResponderMove(e, gesture) {
		if (this.swipeInBounds(gesture)) {
			this.position.setValue({ y: this.state.currentPosition.y + gesture.dy });
		} else {
			this.position.setValue({ y: this.UP_POSITION.y - this.calculateEase(gesture) });
		}
	}

	close() {
		return this.transitionTo(this.DOWN_POSITION);
	}

	open() {
		return this.transitionTo(this.UP_POSITION);
	}

	handlePanResponderRelease(e, gesture) {
		const { currentPosition } = this.state;

		if (gesture.dy > this.TOGGLE_THRESHOLD && currentPosition === this.UP_POSITION) {
			return this.transitionTo(this.DOWN_POSITION);
		}

		if (gesture.dy < -this.TOGGLE_THRESHOLD && currentPosition === this.DOWN_POSITION) {
			return this.transitionTo(this.UP_POSITION);
		}

		return this.resetPosition();
	}

	swipeInBounds(gesture) {
		return this.state.currentPosition.y + gesture.dy > this.UP_POSITION.y;
	}

	calculateEase(gesture) {
		return Math.min(Math.sqrt(gesture.dy * -1), Math.sqrt(height));
	}

	transitionTo(position) {
		Animated.spring(this.position, { toValue: position }).start();
		return this.setState({ currentPosition: position });
	}

	resetPosition() {
		Animated.spring(this.position, { toValue: this.state.currentPosition }).start();
	}
}
