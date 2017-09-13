import React,{Component} from  'react'
import Navigator from 'react-native-deprecated-custom-components';
import LanuchPage from './pages/LanuchPage'

export default class App extends Component {

	_renderScene(route, navigator) {
		let Componen = route.component;
		return (
			<Componen {...route.params} navigator={navigator} />
		);
	}
	render() {
		return(
			<Navigator.Navigator
				initialRoute={{
					name:'LanuchPage',
					component:LanuchPage,
				}}
				renderScene={(e,i)=>this._renderScene(e,i)}
			/>
		);
	}

}