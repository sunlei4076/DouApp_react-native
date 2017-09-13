import React,{Component} from 'react'
import {StyleSheet,View,TextInput} from 'react-native'

export default class Search extends Component{
	render(){
		return (
		<View style={styles.flex_1}>
			<TextInput style={[styles.flex_1,styles.input]} {...this.props}/>
		</View>
		);
	}
}
const styles = StyleSheet.create({
	flex_1:{
		flex:1
	},
	input:{
		borderColor:'#DDD',
		borderWidth:StyleSheet.hairlineWidth,
		paddingLeft:5,
		height:40
	}
})