import React from 'react'
import {
	StyleSheet,
	ActivityIndicator,
	View
} from 'react-native'
import Dimensions from 'Dimensions'

export default {
	size:{
		width:Dimensions.get('window').width,
		height:Dimensions.get('window').height
	},
	loading:
	<View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
		<ActivityIndicator size='large'/>
	</View>,



	get(url,successCallback,failCallback){
			fetch(url)
				.then(res=>res.json())
				.then(res=>successCallback(res))
				.catch(err=>failCallback(err));
	}

}
