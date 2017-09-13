import React,{Component} from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'
import BookPage from './book/BookPage'
import MoviePage from './movie/MoviePage'
import MusicPage from './music/MusicPage'

export default class TabbarPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedIndex:2
		}
	}
	render() {
		const renderData = [
			{
				component:BookPage,
				title:'Book',
				renderIcon:require('../../src/images/book.png'),
				renderSelectedIcon:require('../../src/images/book_active.png')
			},
			{
				component:MoviePage,
				title:'Movie',
				renderIcon:require('../../src/images/movie.png'),
				renderSelectedIcon:require('../../src/images/movie_active.png')
			},
			{
				component:MusicPage,
				title:'Music',
				renderIcon:require('../../src/images/music.png'),
				renderSelectedIcon:require('../../src/images/music_active.png')
			}
		]
		const renderTab=(Component,index,title,renderIcon,renderSelectedIcon)=>{
			console.log("title",title);
			return (<TabNavigator.Item
				 key={title}
				selected={this.state.selectedIndex === index}
				title={title}
				selectedTitleStyle={styles.selectedTitleStyle}
				renderIcon={()=><Image source={renderIcon} style={styles.tabItemImageStyle}/>}
				renderSelectedIcon={()=><Image source={renderSelectedIcon} style={styles.tabItemImageStyle}/>}
				onPress={()=>this.tabItemSelected(index)}>
				<Component {...this.props} />
			</TabNavigator.Item>)
		}
		return (
			<View style={styles.container}>
				<TabNavigator
					tabBarStyle={{opacity:0.8}}
					sceneStyle={{paddingBottom:49}}
				>
					{renderData.map((item,index)=>
						renderTab(item.component,index,item.title,item.renderIcon,item.renderSelectedIcon)
					)}
				</TabNavigator>
			</View>
		);
	}

	tabItemSelected(index){
		console.log(index);
		this.setState({
			selectedIndex:index
		})
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},

	tabItemImageStyle:{
		width:24,
		height:24
	},
	selectedTitleStyle:{
		color: "#0091ff"
	},
	navBar:{
		backgroundColor:"#0091ff",
	},
	themeColor:{
		color:"#0091ff"
	},
})