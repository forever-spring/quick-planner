import { StyleSheet, View } from "react-native";
import { useContext } from "react";

import { TextButton } from "./buttons";

import { containers } from "../assets/utils/common";
import { settingsContext } from "../assets/utils/settings";


export default function Tour({endAction}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';

	return (
		<View style={containers[theme]}>
			<TextButton label='Start App' action={endAction} style={styles.button} />
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		alignSelf: 'center',
		alignContent: 'center',
	}
});