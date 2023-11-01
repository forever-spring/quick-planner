import * as clipboard from 'expo-clipboard';
import { Text, View, ScrollView, Image, StyleSheet, PixelRatio } from "react-native";
import { useContext } from "react";

import Header from "../components/topBars";
import { TapButton } from '../components/items';

import { containers, textColor, textStyle, textColorPrimary } from "../assets/utils/common";
import { settingsContext } from "../assets/utils/settings";

export default function About(props){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const dir = useContext(settingsContext).AppLanguage in ['fa']?'rtl':'ltr';

	const copyWeb = ()=>{
		clipboard.setStringAsync('https://foreverspring.ir');
	};
	const copyMail = ()=>{
		clipboard.setStringAsync('foreverspring37@gmail.com');
	};
	const copyWallet = ()=>{
		clipboard.setStringAsync('bc1qqluh6n498fpef9wymaarqtkel9f4pln07wv0zc');
	};

	return(
		<View style={{...containers[theme],...containers[dir]}}>
			<Header page='about' navigation={props.navigation} navBar={false} />
			<View style={containers.scroll}><ScrollView>
				<View style={styles.wrap}>
					<Text style={{...textStyle.body,...textColor[theme]}}>
						<Text style={{...textColor.primary,...textStyle.title}}>Quick Planner</Text> is an android app by</Text>
						<Image source={require('../assets/graphics/fs.png')} style={styles.fs}/>
						<Text style={{...textStyle.body,...textColor[theme]}}>written with React Native.</Text>
					<View  style={styles.row}>
						<Text style={{...textColorPrimary[theme],...textStyle.label}}> https://foreverspring.ir</Text>
						<TapButton icon='copy' action={copyWeb} />
					</View>
				</View>
				<View style={styles.wrap}>
					<Text style={{...textStyle.body,...textColor[theme]}}>
						To report any issues, please contact me via email:
					</Text>
					<View style={styles.row}>
						<Text style={{...textStyle.label,...textColorPrimary[theme]}}>foreverspring37@gmail.com</Text>
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
			</ScrollView></View>
		</View>
	);
}

const styles = StyleSheet.create({
	fs: {
		width: '50%',
		marginHorizontal: '25%',
		resizeMode: 'contain',
	},
	link: {
		textDecorationLine: 'underline',
	},
	wrap: {
		margin: 16*PixelRatio.get(),
	},
	row:{
		flex:1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 8*PixelRatio.get(),
	}
});