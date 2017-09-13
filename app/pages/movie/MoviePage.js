import React,{Component} from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList
} from 'react-native'
import Search from '../../component/Search'
import DouWebView from '../../component/DouWebView'
import util from '../../common/util'
import apiserivice from '../../common/apiserivice'

export default class MoviePage extends Component {
	constructor(props){
		super(props)
		this.state={
			data : {},
			keywords : "西游记",
			isLoading: true
		}
	}
	componentDidMount() {
		this.searchRequest();
	}
	searchRequest=()=>{
		this.setState({
			isLoading:true
		})
		const api = apiserivice.movie_search+'?count=30&q='+this.state.keywords
		console.log('api',api);
		util.get(api,(data)=>{
			if (!data.subjects){
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
		const array = this.state.data.subjects == null ? [] : this.state.data.subjects
		console.log(this.state.data);
		return (
			<View style={styles.container}>
				{this._renderHeader()}
				<FlatList
					data={array}
					keyExtractor={this._keyExtractor}
					renderItem={this._renderItem}
					refreshing={this.state.isLoading}
					onRefresh={this.searchRequest}/>
			</View>
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
	_keyExtractor=(item)=>{
		return item.id
	}
	_renderItem=(data)=>{
		const {item} = data;
		console.log(item);
		return (
			<View style={cellStyles.item}>
				<View>
					<Image style={cellStyles.leftView} source={{uri:item.images.medium}}/>
				</View>
				<View style={cellStyles.rightView}>
					<Text style={{marginBottom:2.5}}>名称：{item.title}</Text>
					<Text style={{marginBottom:2.5}}>演员：{item.casts.map((obj)=>obj.name).join('、')}</Text>
					<Text style={{marginBottom:2.5}}>评分：{item.rating.average}</Text>
					<Text style={{marginBottom:2.5}}>时间：{item.year}</Text>
					<Text style={{marginBottom:2.5}}>标签：{item.genres.join('、')}</Text>
					<TouchableOpacity style={cellStyles.detailBtn} onPress={()=>
						this.props.navigator.push({
							component: DouWebView,
							params: {
								backName:'电影',
								title:item.title,
								url:item.alt,
							}
						})
					} >
						<Text>详情</Text>
					</TouchableOpacity>
				</View>
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
	text:{
		justifyContent:'center',
		alignItems:'center'
	}
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
const cellStyles = StyleSheet.create({
	item:{
		flexDirection:'row',
		marginTop:5,
		paddingTop:15,
		paddingLeft:10,
		height:155,
		borderTopWidth:StyleSheet.hairlineWidth,
		borderBottomWidth:StyleSheet.hairlineWidth,
		borderColor:'#ddd',
	},
	leftView:{
		width:80,
		height:110,
		resizeMode:Image.resizeMode.contain,
	},
	rightView:{
		marginLeft:10,
		marginRight:10,
	},
	detailBtn:{
		justifyContent:'center',
		alignItems:'center',
		height:32,
		width:60,
		borderWidth:StyleSheet.hairlineWidth,
		borderRadius:3,
		borderColor:'#3c9bfd',
		marginLeft:20,
		marginTop:5,
	}
})