import { StyleSheet, PixelRatio, Dimensions } from "react-native";
import { themeColors } from "./colors";

export const icons = StyleSheet.create({
	smallIcon: {
		width: 10*PixelRatio.get(),
		height: 10*PixelRatio.get(),
	},
	bigIcon: {
		width: 20*PixelRatio.get(),
		height: 20*PixelRatio.get(),
	},
	hugeIcon: {
		width: 30*PixelRatio.get(),
		height: 30*PixelRatio.get(),
	}
});

export const imageColor = StyleSheet.create({
	light: {
		tintColor: themeColors['dark'],
	},
	dark:{
		tintColor: themeColors['light'],
	},
	primary:{
		tintColor: themeColors['primary'].original,
	},
	gray:{
		tintColor: themeColors['gray']
	},
});

export const textStyle = StyleSheet.create({
	body:{
		fontFamily: 'BalooBhaijaan2_400Regular',
		fontSize: 22*PixelRatio.getFontScale(),
		lineHeight: 32*PixelRatio.getFontScale(),
		verticalAlign: 'middle',
	},
	bodyStroked:{
		fontFamily: 'BalooBhaijaan2_400Regular',
		fontSize: 22*PixelRatio.getFontScale(),
		lineHeight: 32*PixelRatio.getFontScale(),
		verticalAlign: 'middle',
		textDecorationLine: 'line-through',
	},
	label:{
		fontFamily: 'BalooBhaijaan2_500Medium',
		fontSize: 22*PixelRatio.getFontScale(),
		lineHeight: 32*PixelRatio.getFontScale(),
		verticalAlign: 'middle',
	},
	title:{
		fontFamily: 'BalooBhaijaan2_500Medium',
		fontSize: 26*PixelRatio.getFontScale(),
		lineHeight: 36*PixelRatio.getFontScale(),
		verticalAlign: 'middle',
	},
});

export const textColor = StyleSheet.create({
	light:{
		color: themeColors['dark'],
	},
	dark:{
		color: themeColors['light'],
	},
	gray:{
		color: themeColors['gray'],
	},
});

export const containers = StyleSheet.create({
	light: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		backgroundColor: themeColors.light,
		paddingTop: 15*PixelRatio.get(),
		width: Dimensions.get('screen').width,
		height: Dimensions.get('screen').height,
	},
	dark: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		backgroundColor: themeColors.dark,
		paddingTop: 15*PixelRatio.get(),
		width: Dimensions.get('screen').width,
		height: Dimensions.get('screen').height,
	},
	scroll: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		paddingTop: 16*PixelRatio.get(),
	},
});