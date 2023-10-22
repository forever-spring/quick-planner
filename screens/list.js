import { Text, View, ScrollView } from "react-native";
import { GestureHandlerRootView,GestureDetector, Gesture, Directions } from "react-native-gesture-handler";
import { useContext } from "react";

import Header from "../components/topBars";

import { containers } from "../assets/utils/common";
import { settingsContext } from "../assets/utils/settings";


export default function List(props){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const swipe = Gesture.Fling().direction(Directions.LEFT).onStart(()=>{
		props.navigation.navigate('plan');
	});
	
	return(
		<View style={containers[theme]}>
			<Header page='list' navigation={props.navigation} navBar={true} />
			<GestureHandlerRootView style={containers.scroll}><GestureDetector gesture={swipe}><ScrollView>
				<Text>List</Text>
			</ScrollView></GestureDetector></GestureHandlerRootView>
		</View>
	);
}