import React,{Component} from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	ListView
} from 'react-native'
import Search from '../../component/Search'
import BookItem from './BookItem'
import BookDetailPage from './BookDetailPage'
import util from '../../common/util'
import apiserivice from '../../common/apiserivice'

export default class BookPage extends Component {
	constructor(props){
		super(props)
		const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2});
		this.state={
			dataSource : ds,
			data:null,
			keywords : "js",
			isLoading: false
		}
	}
	componentDidMount() {
		this.searchRequest()
	}
	searchRequest=()=>{
		this.setState({
			isLoading:true
		})
		const api = apiserivice.book_search+'?count=30&q='+this.state.keywords
		console.log('api',api);
		util.get(api,(data)=>{
			if (!data.books){
				return alert('内容空！！！！');
			}
			this.setState({
				data:data,
				isLoading:false
			})
		},(err)=>{
			console.log(err);
			this.setState({
				isLoading:false
			})
			alert(err);
		});
	}
	render() {
		return (
			<View style={styles.container}>
				{this._renderHeader()}
				{ this.state.isLoading ? util.loading :
					this.state.data != null && this.state.data.books && <ListView
					dataSource={ this.state.dataSource.cloneWithRows(this.state.data.books)}
					renderRow={(row)=>this._renderRow(row)}
					/>
				}
			</View>
		);
	}
	_renderRow = (row)=>{
		console.log("row",row);
		return (
			<BookItem row={row} onPress={()=>
				this.props.navigator.push({
					component: BookDetailPage,
					params: {
						row: row
					}
				})} />
		);
	}
	_renderHeader=()=>{
		return (
			<View style={[styles.row, {paddingTop: 20,height:64}]}>
				<Search placeholder='请输入要搜索的内容' value={this.state.keywords} onChangeText={(val)=> this.setState({keywords:val})}/>
				<TouchableOpacity style={headerStyle.btn} onPress={()=>this.searchRequest()}>
					<Text style={{color:'#fff'}}>搜索</Text>
				</TouchableOpacity>
			</View>
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
	center:{
		justifyContent:'center',
		alignItems:'center',
	},
})

const headerStyle = StyleSheet.create({

	btn:{
		paddingLeft:5,
		width:50,
		backgroundColor:'#0091ff',
		justifyContent:'center',
		alignItems:'center'
	}
})