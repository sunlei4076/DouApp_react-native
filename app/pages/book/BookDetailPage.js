import React,{Component} from 'react'
import {StyleSheet, TouchableOpacity,View, Text, Image, ScrollView} from 'react-native'
import BookItem from './BookItem'
import Header from '../../component/Header'
import util from '../../common/util'
import apiserivice from '../../common/apiserivice'
export default class BookDetailPage extends Component {
	constructor(props){
		super(props)
		this.state = {
			data:null
		}
	}
	componentDidMount() {
		const id = this.props.row.id;
		const url = apiserivice.book_search_id+'/'+id;
		util.get(url, (data)=>{
			console.log(data)
			this.setState({
				data:data,
			})
			}, (err)=>alert(err));
	}
	render() {
		const {navigator,row} = this.props;
		console.log(this.props);
		 return (
			 <View style={styles.container}>
				 <Header navigator={navigator} initobj={{backTitle: '图书', title: row.title}} />
				 <ScrollView>
					 <BookItem row={row}/>
					 {this.state.data ?  this._renderDetail() : util.loading }
				 </ScrollView>
			 </View>
		 );
	}
	_renderDetail=()=>{
		return (<View>
			<View>
				<Text style={styles.title}>图书简介</Text>
				<Text style={styles.text}>{this.state.data.summary}</Text>
			</View>
			<View>
				<Text style={styles.title}>作者简介</Text>
				<Text style={styles.text}>{this.state.data.author_intro}</Text>
			</View>
		</View>);
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