import * as SecureStore from 'expo-secure-store';
import { View, Image, Text, Pressable, StyleSheet, PixelRatio, Modal, TextInput } from "react-native";
import { useContext, useEffect, useState } from 'react';

import { TextButton } from './buttons';

import { settingsContext } from '../assets/utils/settings';
import { themeColors } from '../assets/utils/colors';
import { icons,imageColor,textColor, textStyle, textInput, textColorPrimary } from '../assets/utils/common';
import { visionBoard } from '../assets/utils/translations';


export default function VisionBoard(){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const lang = useContext(settingsContext).AppLanguage;
	const dir = lang in ['fa']?'rtl':'ltr';

	const [goal, setGoal] = useState('');
	const [why, setWhy] = useState('');
	const [goalModal, setGoalModal] = useState(false);
	const [whyModal, setWhyModal] = useState(false);

	useEffect(()=>{
		const getContent = async() => {
			setGoal(await SecureStore.getItemAsync('goal'));
			setWhy(await SecureStore.getItemAsync('why'));
		};
		getContent();
	},[]);

	const toggleGoalModal = () => {
		setGoalModal(!goalModal);
	}
	const toggleWhyModal = () => {
		setWhyModal(!whyModal);
	}
	const saveGoal = () => {
		SecureStore.setItemAsync('goal',goal);
		toggleGoalModal();
	};
	const saveWhy = () => {
		SecureStore.setItemAsync('why',why);
		toggleWhyModal();
	};

	return (
		<View style={styles[theme]}>
			<Modal visible={goalModal} transparent={true} animationType='fade'><View style={modals[theme]}>
				<TextInput 
					selectionColor={themeColors.accent.original} 
					onChangeText={setGoal} 
					placeholder={visionBoard.fills[lang][0]} 
					placeholderTextColor={themeColors.gray} 
					value={goal} 
					style={{...textInput.borderBottom,...textInput[theme],...textStyle.body,...textColor[theme]}} 
					multiline={true} 
				/>
				<TextButton label={visionBoard.button[lang]} action={saveGoal} style={modals.button} />
			</View></Modal>
			<Modal visible={whyModal} transparent={true} animationType='fade'><View style={modals[theme]}>
				<TextInput 
					selectionColor={themeColors.accent.original} 
					onChangeText={setWhy} 
					placeholder={visionBoard.fills[lang][1]} 
					placeholderTextColor={themeColors.gray} 
					value={why} 
					style={{...textInput.borderBottom,...textInput[theme],...textStyle.body,...textColor[theme]}} 
					multiline={true} 
				/>
				<TextButton label={visionBoard.button[lang]} action={saveWhy} style={modals.button} />
			</View></Modal>
			<View style={styles.item}>
				<Image style={{...icons.hugeIcon,...imageColor.accent,...icons[dir]}} source={require('../assets/icons/goal.png')} />
				<Pressable style={styles.text} onLongPress={toggleGoalModal}>
					<Text style={{...textStyle.label,...textColorPrimary[theme]}}>{goal}</Text>
				</Pressable>
			</View>
			<View style={styles.item}>
				<Image style={{...icons.hugeIcon,...imageColor.accent,...icons[dir]}} source={require('../assets/icons/why.png')} />
				<Pressable style={styles.text} onLongPress={toggleWhyModal}>
					<Text style={{...textStyle.label,...textColorPrimary[theme]}}>{why}</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	light: {
		elevation: 4,
		shadowColor:themeColors.accent.darkest,
		shadowOffset:{width:0,height:0},
		shadowOpacity:0.5,
		shadowRadius: 4,
		borderRadius: 8*PixelRatio.get(),
		flex: 1,
		padding: 16*PixelRatio.get(),
		gap: 16*PixelRatio.get(),
		margin: 8*PixelRatio.get(),
		backgroundColor: themeColors.light,
	},
	dark: {
		elevation: 4,
		shadowColor:themeColors.accent.lightest,
		shadowOffset:{width:0,height:0},
		shadowOpacity:0.5,
		shadowRadius: 4,
		borderRadius: 8*PixelRatio.get(),
		flex: 1,
		padding: 16*PixelRatio.get(),
		gap: 16*PixelRatio.get(),
		margin: 8*PixelRatio.get(),
		backgroundColor: themeColors.dark,
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: 8*PixelRatio.get(),
	},
	text: {
		flex: 1,
		alignContent: 'stretch',
	},
});
const modals = StyleSheet.create({
	light: {
		backgroundColor: themeColors.light+'dd',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		gap: 16*PixelRatio.get(),
		padding: 16*PixelRatio.get(),
	},
	dark: {
		backgroundColor: themeColors.dark+'dd',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		gap: 16*PixelRatio.get(),
		padding: 16*PixelRatio.get(),
	},
	button: {
		alignSelf: 'center',
	}
});