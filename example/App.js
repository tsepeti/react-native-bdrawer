import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import BottomDrawer from 'react-native-bdrawer';

export default class App extends Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.welcome} onPress={() => {
          this.refs.DrawerOne.close()
          this.refs.DrawerTwo.close()
          this.refs.DrawerTree.close()
        }}>
					<Text>CloseAll</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.welcome} onPress={() => this.refs.DrawerOne.open()}>
					<Text>Open Drawer 1</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.welcome} onPress={() => this.refs.DrawerTwo.open()}>
					<Text>Open Drawer 2</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.welcome} onPress={() => this.refs.DrawerTree.open()}>
					<Text>Open Drawer 3</Text>
				</TouchableOpacity>

				<BottomDrawer ref="DrawerOne" containerHeight={300}>
					<Text>Drawer</Text>
				</BottomDrawer>

				<BottomDrawer ref="DrawerTwo" containerHeight={300} backgroundColor="red">
					<Text>Drawer - 2</Text>
				</BottomDrawer>

				<BottomDrawer ref="DrawerTree" containerHeight={300} backgroundColor="blue">
					<Text>Drawer - 3</Text>
				</BottomDrawer>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});
