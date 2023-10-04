import { Text, View, ScrollView } from "react-native";
import { useContext } from "react";

import Header from "../components/topBars";

import { containers } from "../assets/utils/common";
import { settingsContext } from "../assets/utils/settings";


export default function Archive(props){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	
	return(
		<View style={containers[theme]}>
			<Header page='archive' navigation={props.navigation} navBar={true} />
			<View style={containers.scroll}><ScrollView>
				<Text>Archive</Text>
			</ScrollView></View>
		</View>
	);
}