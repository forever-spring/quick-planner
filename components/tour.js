import { StyleSheet, View, Image, PixelRatio } from "react-native";
import { useContext, useState } from "react";

import { TextButton, IconButton } from "./buttons";

import { containers } from "../assets/utils/common";
import { settingsContext } from "../assets/utils/settings";
import { tutorialButton } from "../assets/utils/translations";
import { themeColors } from "../assets/utils/colors";


export default function Tour({endAction}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const lang = useContext(settingsContext).AppLanguage;
	const dir = lang in ['fa']?'rtl':'ltr';

	const end = 5;
	const [current,setCurrent] = useState(0);

	if(current>=end){
		return (
			<View style={{...containers[theme],...containers[dir],...styles.wrap}}>
				<TextButton label='Continue' action={endAction} style={styles.button} />
			</View>
		);
	}

	return (
		<View style={{...styles.wrap}}>
			<Image source={shots[lang][current]} style={{...styles.img}} />
			<View style={styles.row}>
				{current===0?<IconButton icon='blank' action={()=>{}} />:<IconButton icon='prev' action={()=>setCurrent(current-1)} />}
				<TextButton label={current+1===end?tutorialButton[lang][1]:tutorialButton[lang][0]} action={endAction} />
				{current+1===end?<IconButton icon='blank' action={()=>{}} />:<IconButton icon='next' action={()=>setCurrent(current+1)} />}
			</View>
		</View>
	);
}

const shots = {
	en: [
		require('../assets/shots/en1.png'),
		require('../assets/shots/en2.png'),
		require('../assets/shots/en3.png'),
		require('../assets/shots/en4.png'),
		require('../assets/shots/en5.png')
	],
	fa: [
		require('../assets/shots/fa1.png'),
		require('../assets/shots/fa2.png'),
		require('../assets/shots/fa3.png'),
		require('../assets/shots/fa4.png'),
		require('../assets/shots/fa5.png')
	],
};

const styles = StyleSheet.create({
	wrap:{
		width: '100%',
		height: '100%',
		padding: 0*PixelRatio.get(),
	},
	button: {
		alignSelf: 'center',
		alignContent: 'center',
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	img: {
		width: '80%',
		height: '80%',
		marginHorizontal: '10%',
		resizeMode: 'stretch',
		borderColor: themeColors.accent.original+'55',
		borderWidth: 0.75*PixelRatio.get(),
		borderRadius: 8*PixelRatio.get(),
	}
});