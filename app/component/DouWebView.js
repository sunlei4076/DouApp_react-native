import React,{Component} from 'react'
import {StyleSheet,View, WebView} from 'react-native'
import Header from './Header'
export default class DouWebView extends Component {
	render() {
		const {navigator,backName, title, url} = this.props;
		console.log(this.props);
		return (
			<View style={styles.container}>
				<Header navigator={navigator} initobj={{backTitle: backName, title: title}} />
				<WebView startInLoadingState={true}
				         style={{width:'100%',height:'100%'}}
				         source={{uri:url}}
				/>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container:{
		flex:1,
	},
	title:{
		fontSize:16,
		marginLeft:10,
		marginTop:10,
		marginBottom:10
	},
	text:{
		marginLeft:10,
		marginRight:10,
		color:'#000D22'
	}
})