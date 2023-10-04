import { Text, View, ScrollView } from "react-native";
import { useContext } from "react";

import Header from "../components/topBars";

import { containers } from "../assets/utils/common";
import { settingsContext } from "../assets/utils/settings";

export default function About(props){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';

	return(
		<View style={containers[theme]}>
			<Header page='about' navigation={props.navigation} navBar={false} />
			<View style={containers.scroll}><ScrollView>
				<Text>About</Text>
			</ScrollView></View>
		</View>
	);
}