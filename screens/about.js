import * as clipboard from 'expo-clipboard';
import { StatusBar } from 'react-native';
import { Text, View, ScrollView, Image, StyleSheet, Modal } from "react-native";
import { useContext, useState } from "react";

import Header from "../components/topBars";
import { TapButton } from '../components/items';
import { TextIconButton } from '../components/buttons';
import Tour from '../components/tour';

import { containers, textColor, textStyle, textColorPrimary, modalBasic, shadow } from "../assets/utils/common";
import { settingsContext } from "../assets/utils/settings";
import { runTutorial } from '../assets/utils/translations';
import { themeColors } from '../assets/utils/colors';

export default function About(props){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const lang = useContext(settingsContext).AppLanguage;
	const dir = ['fa'].includes(lang)?'rtl':'ltr';

	const copyWeb = ()=>{
		clipboard.setStringAsync('https://solacode.ir/');
	};
	const copyMail = ()=>{
		clipboard.setStringAsync('solacode.ahw@gmail.com');
	};
	const copyWallet = ()=>{
		clipboard.setStringAsync('bc1qqluh6n498fpef9wymaarqtkel9f4pln07wv0zc');
	};
	const [tour,setTour] = useState(false);

	return(
		<View style={{...containers[theme],...containers[dir]}}>
			<StatusBar backgroundColor={themeColors[theme]} barStyle={theme==='dark'?'light-content':'dark-content'} />
			<Header page='about' navigation={props.navigation} navBar={false} />
			<View style={containers.scroll}><ScrollView>
				<View style={styles.wrap}>
					<Text style={{...textStyle.body,...textColor[theme]}}>
						<Text style={{...textColor.primary,...textStyle.title}}>Quick Planner</Text> is an android app by</Text>
						<Image source={require('../assets/graphics/logo.png')} style={styles.logo}/>
						<Text style={{...textStyle.body,...textColor[theme]}}>written with React Native.</Text>
				</View>
				<View style={styles.wrap}>
					<View  style={styles.row}>
						<Text style={{...textColorPrimary[theme],...textStyle.label}}>solacode.ir</Text>
						<TapButton icon='copy' action={copyWeb} />
					</View>
				</View>
				<View style={styles.wrap}>
					<Text style={{...textStyle.body,...textColor[theme]}}>
						To report any issues, please contact me via email:
					</Text>
					<View style={styles.row}>
						<Text style={{...textStyle.label,...textColorPrimary[theme]}}>solacode.ahw@gmail.com</Text>
						<TapButton icon='copy' action={copyMail} />
					</View>
				</View>
				<View style={styles.wrap}>
					<Text style={{...textStyle.body,...textColor[theme]}}>
						I am an independant developer. You can support me by donating to my bitcoin wallet. My wallet address is:
					</Text>
					<View style={styles.row}>
						<Text style={{...textStyle.label,...textColorPrimary[theme]}}>
							bc1qqluh6n498fpef9wymaarqtkel9f4pln07wv0zc
						</Text>
						<TapButton icon='copy' action={copyWallet} />
					</View>
				</View>
				<TextIconButton icon='play' label={runTutorial[lang]} action={()=>setTour(true)} style={styles.button} />
			</ScrollView></View>
			<Modal transparent={true} onRequestClose={()=>setTour(false)} animationType="fade" visible={tour}>
				<View style={modalBasic[theme]}><View style={{...modalBasic.box,...shadow[theme],...styles[theme]}}>
					<Tour endAction={()=>setTour(false)} />
				</View></View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	logo: {
		width: '50%',
		marginHorizontal: '25%',
		resizeMode: 'contain',
	},
	link: {
		textDecorationLine: 'underline',
	},
	wrap: {
		margin: 30,
	},
	row:{
		flex:1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 15,
	},
	button: {
		alignSelf: 'center',
		marginBottom: 60
	},
	light: {
		backgroundColor: themeColors.light,
		flex: 1,
	},
	dark: {
		backgroundColor: themeColors.dark,
		flex: 1,
	},
});