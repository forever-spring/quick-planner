import { StyleSheet, View } from "react-native";
import { useContext } from "react";

import { TextButton } from "./buttons";

import { containers } from "../assets/utils/common";
import { settingsContext } from "../assets/utils/settings";


export default function Tour({endAction}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const lang = useContext(settingsContext).AppLanguage;
	const dir = lang in ['fa']?'rtl':'ltr';

	return (
		<View style={{...containers[theme],...containers[dir],...styles.wrap}}>
			<TextButton label='Done' action={endAction} style={styles.button} />
		</View>
	);
}

const styles = StyleSheet.create({
	wrap:{
		width: '100%',
		height: '100%',
	},
	button: {
		alignSelf: 'center',
		alignContent: 'center',
	}
});