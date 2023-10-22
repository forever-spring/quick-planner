import { Pressable, Text, StyleSheet, PixelRatio, Image, View } from "react-native";
import { useContext } from "react";

import { icons, textColorInvert, textStyle, imageColorInvert, shadow } from "../assets/utils/common";
import { settingsContext } from '../assets/utils/settings';
import { themeColors } from "../assets/utils/colors";

export function TextButton({label,action,style,layout}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';

	if(style==undefined){
		style={};
	}
	if(layout==undefined){
		layout = (obj)=>{return null;};
	}

	return (
		<Pressable onPress={action} style={{...styles.button,...shadow[theme],...style}} 
			onLayout={(obj)=>layout(obj['nativeEvent']['layout']['height'])}
		>
			<Text style={{...textStyle.label,...textColorInvert[theme]}}>{label}</Text>
		</Pressable>
	);
}

export function TextIconButton({icon,label,action,style}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';

	if(style==undefined){
		style={};
	}

	return (
		<Pressable onPress={action} style={{...styles.button,...shadow[theme],...style,...styles.combo}}>
			<Image source={iconSource[icon]} style={{...icons.smallIcon,...imageColorInvert[theme]}} />
			<Text style={{...textStyle.label,...textColorInvert[theme]}}>{label}</Text>
		</Pressable>
	);
}

export function HoverButton({icon,action}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';

	return (
		<View style={styles.hoverView}>
			<Pressable onPress={action} style={{...styles.button,...shadow[theme],...styles.hoverButton}}>
				<Image source={iconSource[icon]} style={{...icons.bigIcon,...imageColorInvert[theme]}} />
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: themeColors.primary.original,
		paddingHorizontal: 16*PixelRatio.get(),
		paddingVertical: 8*PixelRatio.get(),
		borderRadius: 8*PixelRatio.get()
	},
	combo: {
		flex: 1,
		flexDirection: 'row',
		gap: 4*PixelRatio.get(),
		alignItems: 'center',
	},
	hoverButton: {
		paddingHorizontal: 8*PixelRatio.get(),
		alignSelf: 'flex-end',
		margin: 16*PixelRatio.get(),
	},
	hoverView: {
		position: 'absolute',
		bottom: 0,
		end:0,
	}
});

const iconSource = {
	plan: require('../assets/icons/plan-button.png'),
	archive: require('../assets/icons/archive-button.png'),
}