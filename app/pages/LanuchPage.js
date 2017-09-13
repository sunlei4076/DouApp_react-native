import React,{Component} from 'react'
import {
	StyleSheet,
	View,
	Text,
	Image,
	InteractionManager,
	BackAndroid
} from 'react-native'

import TabbarPage from './TabbarPage'

export default class LanuchPage extends Component {
	componentDidMount() {
		const {navigator } = this.props;
		this.timer = setTimeout(()=>{
			// console.log("lanuch_finshed");
			navigator.resetTo({
				component:TabbarPage,
				name:'TabbarPage',
			})
		},500)
		BackAndroid.addEventListener('hardwareBackPress',this.backAndroidPress);
	}
	render(){
		return (
			<View style={styles.container}>
				<Image style={{flex:1, width:'100%'}} source={require('../../src/images/LaunchImage-700-568h.png')}/>
			</View>
		);
	}

	componentDidUnmount() {
		BackAndroid.removeEventListener('hardwareBackPress',this.backAndroidPress)
	}
	backAndroidPress=()=>{
		const {navigator } = this.props;
		const routes = navigator.getCurrentRoutes();
		if (routes.length > 1) {
			navigator.pop();
			return true
		}else{
			return false
		}
	}
}
const styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#666666'
	}
})
