import React,{Component} from 'react'
import {StyleSheet, TouchableOpacity,View, Text, Image} from 'react-native'

export default class   BookItem extends Component {
	render(){
	const {row} = this.props;
		return (
			<TouchableOpacity style={[styles.row,styles.item]} {...this.props}>
				<View style={[styles.center, {marginLeft: 10}]}>
					<Image source={{uri: row.images.medium}} style={styles.book_image}/>
				</View>
				<View style={styles.content}>
					<Text numberOfLines={1}>{row.title}</Text>
					<Text style={[{marginTop:10},styles.publisher]} numberOfLines={1}>{row.publisher}</Text>
					<Text style={[{marginTop:10},styles.publisher]} numberOfLines={1}>{row.author[0]}</Text>
					<View style={[styles.row,{marginTop: 10}]}>
						<Text style={styles.price}>{row.price}</Text>
						<Text style={styles.pages}>{row.pages}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		flex:1
	},
	row:{
		flexDirection:'row'
	},
	item:{
		height:120,
		borderTopWidth:StyleSheet.hairlineWidth,
		borderBottomWidth:StyleSheet.hairlineWidth,
		marginTop:5,
		marginBottom:5,
		borderColor:'#ccc'
	},
	center:{
		justifyContent:'center',
		alignItems:'center',
	},
	book_image:{
		width:80,
		height:100,
		resizeMode:Image.resizeMode.contain
	},
	content:{
		marginTop:10,
		marginLeft:10,
	},
	publisher:{
		color:'#a3a3a3',
		fontSize:13,
	},
	price:{
		color:'#2bb2a3',
		fontSize:16,
	},
	pages:{
		marginLeft:10,
		color:'#a7a0a0'
	}
})