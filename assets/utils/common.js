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
		tintColor: themeColors.dark,
	},
	dark:{
		tintColor: themeColors.light,
	},
	primary:{
		tintColor: themeColors.primary.original,
	},
	gray:{
		tintColor: themeColors.gray,
	},
	accent: {
		tintColor: themeColors.accent.original,
	}
});

export const imageColorInvert = StyleSheet.create({
	light: {
		tintColor: themeColors.light,
	},
	dark:{
		tintColor: themeColors.dark,
	},
});

export const textStyle = StyleSheet.create({
	body:{
		fontFamily: 'BalooBhaijaan2_400Regular',
		fontSize: 22*PixelRatio.getFontScale(),
		lineHeight: 32*PixelRatio.getFontScale(),
		verticalAlign: 'middle',
		textAlign: 'justify',
	},
	bodyStroked:{
		fontFamily: 'BalooBhaijaan2_400Regular',
		fontSize: 22*PixelRatio.getFontScale(),
		lineHeight: 32*PixelRatio.getFontScale(),
		verticalAlign: 'middle',
		textAlign: 'justify',
		textDecorationLine: 'line-through',
	},
	label:{
		fontFamily: 'BalooBhaijaan2_500Medium',
		fontSize: 22*PixelRatio.getFontScale(),
		lineHeight: 32*PixelRatio.getFontScale(),
		verticalAlign: 'middle',
		textAlign: 'justify',
	},
	title:{
		fontFamily: 'BalooBhaijaan2_500Medium',
		fontSize: 26*PixelRatio.getFontScale(),
		lineHeight: 36*PixelRatio.getFontScale(),
		verticalAlign: 'middle',
		textAlign: 'justify',
	},
	huge:{
		fontFamily: 'BalooBhaijaan2_500Medium',
		fontSize: 30*PixelRatio.getFontScale(),
		lineHeight: 40*PixelRatio.getFontScale(),
		verticalAlign: 'middle',
		textAlign: 'justify',
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
	primary:{
		color: themeColors['primary']['original'],
	}
});

export const textColorInvert = StyleSheet.create({
	dark:{
		color: themeColors['dark'],
	},
	light:{
		color: themeColors['light'],
	}
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

export const shadow = StyleSheet.create({
	dark: {
		elevation: 4,
		shadowColor:themeColors.light,
		shadowOffset:{width:0,height:0},
		shadowOpacity:0.5,
		shadowRadius: 4,
	},
	light: {
		elevation: 4,
		shadowColor:themeColors.dark,
		shadowOffset:{width:0,height:0},
		shadowOpacity:0.5,
		shadowRadius: 4,
	}
})

export const modalBasic = StyleSheet.create({
	light: {
		backgroundColor: themeColors.light+'dd',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	dark: {
		backgroundColor: themeColors.dark+'dd',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	box: {
		margin: 8*PixelRatio.get(),
		borderRadius: 8*PixelRatio.get(),
		padding: 8*PixelRatio.get(),
		gap: 8*PixelRatio.get()
	}
});

export const textInput = StyleSheet.create({
	borderBottom: {
		padding: 4*PixelRatio.get(),
		paddingVertical: 2*PixelRatio.get(),
		borderBottomWidth: 1*PixelRatio.get(),
	},
	roundCorner: {
		paddingHorizontal: 4*PixelRatio.get(),
		paddingVertical: 2*PixelRatio.get(),
		borderWidth: 0.75*PixelRatio.get(),
		borderRadius: 4*PixelRatio.get(),
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	light: {
		borderColor: themeColors.dark,
		backgroundColor: themeColors.light,
		color: themeColors.dark,
	},
	dark: {
		borderColor: themeColors.light,
		backgroundColor: themeColors.dark,
		color: themeColors.light,
	}
});