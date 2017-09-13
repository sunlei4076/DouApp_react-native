import React,{Component} from 'react'
import {StyleSheet, TouchableOpacity,View, Text, Image} from 'react-native'
export default class Header extends Component {
	render(){
		const {initobj, navigator } = this.props;
		console.log(this.props);
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.backView} onPress={()=>navigator.pop()}>
					<View style={styles.backIcon}></View>
					<Text style={styles.backName}>{initobj.backTitle}</Text>
				</TouchableOpacity>
				<View style={styles.title}>
					<Text style={styles.backName}>{initobj.title}</Text>
				</View>
				<View style={{flex:1}}></View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container:{
		height:64,
		backgroundColor:'#3497FF',
		flexDirection:'row',
		alignItems:'center',
		paddingTop:20,
	},
	backView:{
		flexDirection:'row',
		flex:1,
		justifyContent:'center',
		alignItems:'center',
	},
	backIcon:{
		width:15,
		height:15,
		borderLeftWidth:4*StyleSheet.hairlineWidth,
		borderBottomWidth:4*StyleSheet.hairlineWidth,
		borderColor:'#fff',
		transform: [{rotate: '45deg'}],
	},
	backName:{
		color:'#fff',
		fontSize:17,
		fontWeight:'bold',
	},
	title:{
		flex:3,
		alignItems:'center',
		justifyContent:'center',
		marginLeft:5,
		marginRight:5,
	}
})