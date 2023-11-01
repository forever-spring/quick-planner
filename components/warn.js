import { View, Text, StyleSheet, PixelRatio } from "react-native";
import { useState, useContext, useRef } from "react";

import { TextButton } from "./buttons";

import { settingsContext } from "../assets/utils/settings";
import { modalBasic, shadow, textStyle, textColor } from "../assets/utils/common";
import { warnButton } from "../assets/utils/translations";
import { themeColors } from "../assets/utils/colors";


export function WarningModalOne({text,end}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const lang = useContext(settingsContext).AppLanguage;

	return(
		<View style={modalBasic[theme]}><View style={{...modalBasic.box,...shadow[theme],...styles[theme]}}>
			<Text style={{...textStyle.body,...textColor.primary}}>{text}</Text>
			<TextButton label={warnButton.one[lang]} action={end}/>
		</View></View>
	);
}

export function WarningModalTwo({text,back,ok}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const lang = useContext(settingsContext).AppLanguage;

	const calc = useRef({
		b: false,
		c: false,
	});
	const [bHeight,setBHeight] = useState(50*PixelRatio.get());
	const [cHeight,setCHeight] = useState(200*PixelRatio.get());
	const calcBHeight = (h)=>{
		if(!calc.current.b){
			let newH = h + 16*PixelRatio.get();
			if(calc.current.c){
				setCHeight(cHeight+newH);
			}
			setBHeight(newH);
			calc.current.b=true;
		}
	};
	const calcCHeight = (obj)=>{
		if(!calc.current.c){
			let h = obj['nativeEvent']['layout']['height'];
			if(calc.current.b){
				setCHeight(h+bHeight+24*PixelRatio.get());
			} else {
				setCHeight(h+24*PixelRatio.get());
			}
			calc.current.c=true;
		}
	};
	
	return (
		<View style={modalBasic[theme]}><View style={{...styles[theme],...shadow[theme],...modalBasic.box,height:cHeight}}>
			<Text style={{...textStyle.body,...textColor[theme]}} onLayout={calcCHeight}>{text}</Text>
			<View style={{...styles.buttons,minHeight:bHeight}}>
				<TextButton label={warnButton.two[lang][0]} action={back} style={{height:bHeight}} layout={calcBHeight} />
				<TextButton label={warnButton.two[lang][1]} action={ok} style={{height:bHeight}} layout={calcBHeight} />
			</View>
		</View></View>
	);
}

const styles = StyleSheet.create({
	buttons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		gap: 4*PixelRatio.get(),
	},
	light: {
		backgroundColor: themeColors.light,
	},
	dark: {
		backgroundColor: themeColors.dark,
	},
});