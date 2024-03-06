import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'react-native';
import { Text, View, ScrollView, StyleSheet, TextInput, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";

import { TextButton } from '../components/buttons';
import Tour from '../components/tour';

import { containers, textColor, textStyle, textInput, modalBasic, shadow } from "../assets/utils/common";
import { settingsContext } from '../assets/utils/settings';
import { welcomePage } from '../assets/utils/translations';
import { themeColors } from '../assets/utils/colors';

export default function Welcome({signal}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const lang = useContext(settingsContext).AppLanguage;
	const dir = ['fa'].includes(lang)? 'rtl':'ltr';

	const [tour, setTour] = useState(false);
	const [goal, setGoal] = useState('');
	const [why, setWhy] = useState('');

	const next = () => {
		SecureStore.setItemAsync('goal',goal);
		SecureStore.setItemAsync('why',why);
		setTour(true);
	}
	const finish = () => {
		signal(true);
		AsyncStorage.setItem('init','done');
	}

	return(
		<View style={{...containers[theme],...containers[dir]}}>
			<StatusBar backgroundColor={themeColors[theme]} barStyle={theme==='dark'?'light-content':'dark-content'} />
			<View style={containers.scroll}><ScrollView>
				<Text style={{...textStyle.huge,...textColor[theme],...styles.welcome}}>{welcomePage.welcome[lang]}
					<Text style={textColor.primary}>Quick Planner</Text>
				</Text>
				<View style={styles.paragraphs}>
					<Text style={{...textStyle.body,...textColor[theme],...styles.paragraph}}>{welcomePage.paragraphs[lang][0]}</Text>
					<Text style={{...textStyle.body,...textColor[theme],...styles.paragraph}}>{welcomePage.paragraphs[lang][1]}</Text>
					<Text style={{...textStyle.body,...textColor[theme],...styles.paragraph}}>{welcomePage.paragraphs[lang][2]}</Text>
				</View>
				<View style={styles.form}>
					<TextInput 
						onChangeText={setGoal} 
						placeholder={welcomePage.fills[lang][0]} 
						placeholderTextColor={themeColors.gray} 
						style={{...textInput.borderBottom,...textInput[theme],...textStyle.body,...textColor[theme]}} 
						multiline={true} 
					/>
					<TextInput 
						onChangeText={setWhy} 
						placeholder={welcomePage.fills[lang][1]} 
						placeholderTextColor={themeColors.gray} 
						style={{...textInput.borderBottom,...textInput[theme],...textStyle.body,...textColor[theme]}} 
						multiline={true} 
					/>
					<TextButton label={welcomePage.next[lang]} action={next} style={styles.next}/>
				</View>
			</ScrollView></View>
			<Modal transparent={true} onRequestClose={()=>setTour(false)} animationType="fade" visible={tour}>
				<View style={modalBasic[theme]}><View style={{...modalBasic.box,...shadow[theme],...styles[theme]}}>
					<Tour endAction={finish} />
				</View></View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	welcome: {
		paddingVertical: 60,
		textAlign: 'center',
	},
	paragraphs: {
		padding: 15,
	},
	paragraph: {
		padding: 15,
	},
	form: {
		flex:1,
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'flex-start',
		margin: 30,
		gap: 30,
	},
	next: {
		alignSelf: 'flex-end',
	},
	light: {
		backgroundColor: themeColors.light,
	},
	dark: {
		backgroundColor: themeColors.dark,
	},
});