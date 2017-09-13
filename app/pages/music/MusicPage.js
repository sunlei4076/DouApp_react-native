import React,{Component} from 'react'
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	FlatList
} from 'react-native'
import Search from '../../component/Search'
import DouWebView from '../../component/DouWebView'
import util from '../../common/util'
import apiserivice from '../../common/apiserivice'

export default class MusicPage extends Component {
	constructor(props){
		super(props)
		this.state={
			keyword:'Jay',
			isLoading:false,
			data:{}
		}
	}

	componentDidMount() {
		this.fetchDataRequest()
	}
	fetchDataRequest=()=>{
		this.setState({
			isLoading:true
		})
		const url = apiserivice.music_search+'?count=30&q='+this.state.keyword
		util.get(url,(data)=>{
			this.setState({
				isLoading:false
			})
			if (!data.musics){
				return alert('出错啦');
			}
			this.setState({
				data:data,
			})
		},(err)=>{
			this.setState({
				isLoading:false
			})
			alert(err);
		})
	}
	render() {
		const  array = this.state.data.musics ? this.state.data.musics : [];
		console.log(array);
		return (
			<View style={styles.container}>
				{this._renderHeader()}
				{this.state.isLoading ? util.loading :
					<FlatList
						data={array}
						renderItem={this._renderItem}
						keyExtractor={this._keyExtractor}
						refreshing={this.state.isLoading}
						onRefresh={this.fetchDataRequest}/>
					 }
			</View>
		);
	}
	_renderHeader=()=>{
		return(
			<View style={[styles.row, {paddingTop: 20,height:64}]}>
				<Search placeholder='请输入要搜索的内容' value={this.state.keywords} onChangeText={(val)=> this.setState({keyword:val})}/>
				<TouchableOpacity style={headerStyle.btn} onPress={()=>this.fetchDataRequest()}>
					<Text style={{color:'#fff'}}>搜索</Text>
				</TouchableOpacity>
			</View>
		)
	}
	_renderItem=({item,index})=>{
		console.log(item,index);
		return(
			<View style={cellStyles.container}>
				<View style={cellStyles.center}>
					<Image source={{uri:item.image}} style={cellStyles.img}/>
				</View>
				<View style={styles.row}>
					<Text>标题：{item.title}</Text>
				</View>
				<View style={styles.row}>
					<Text style={{flex:1}}>时间：{item.attrs.pubdate}</Text>
					<Text style={{width:120}}>评分：{item.rating.average}</Text>
				</View>
				<View style={cellStyles.center}>
					<TouchableOpacity style={[cellStyles.detailBtn,cellStyles.center]} onPress={()=>{
						this.props.navigator.push({
							component:DouWebView,
							params: {
								backName:'音乐',
								title:item.title,
								url:item.alt,
							}
						})
					}}>
						<Text>详情</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
	_keyExtractor=(item)=>{
		return item.id;
	}
}
const styles = StyleSheet.create({
	container:{
		flex:1
	},
	row:{
	flexDirection:'row',
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
	container:{
		marginTop:10,
		paddingTop:10,
		paddingBottom:10,
		paddingLeft:20,
		paddingBottom:20,
		borderTopWidth:StyleSheet.hairlineWidth,
		borderBottomWidth:StyleSheet.hairlineWidth,
		borderColor:'#ddd'
	},
	center:{
		justifyContent:'center',
		alignItems:'center',
	},
	img:{
		width:70,
		height:70,
		borderRadius:35,
	},
	detailBtn:{
		width:60,
		height:35,
		borderWidth:StyleSheet.hairlineWidth,
		borderColor:'#3082ff',
		borderRadius:3,
	}
})