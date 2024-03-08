import { Pressable, Text, StyleSheet, Image, View, PixelRatio } from "react-native";
import { useContext, useState } from "react";

import { icons, textColorInvert, textStyle, imageColorInvert, shadow } from "../assets/utils/common";
import { settingsContext } from '../assets/utils/settings';
import { themeColors } from "../assets/utils/colors";

export function TextButton({label,action,style,layout}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';

	if(style==undefined){
		style=StyleSheet.create({});
	}
	if(layout==undefined){
		layout = (h)=>{};
	}

	return (
		<Pressable 
			onPress={action} 
			style={{...shadow[theme],...style,...styles.button}} 
		>
			<Text 
				style={{...textStyle.label,...textColorInvert[theme],textAlign:'center'}}
				onLayout={(obj)=>layout(obj['nativeEvent']['layout']['height'])}
			>{label}</Text>
		</Pressable>
	);
}

export function TextIconButton({icon,label,action,style}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const dir = ['fa'].includes(useContext(settingsContext).AppLanguage)?'rtl':'ltr';

	if(style==undefined){
		style={};
	}

	return (
		<Pressable onPress={action} style={{...styles.button,...shadow[theme],...style,...styles.combo}}>
			<Image source={iconSource[icon]} style={{...icons.smallIcon,...imageColorInvert[theme],...icons[dir]}} />
			<Text style={{...textStyle.label,...textColorInvert[theme]}}>{label}</Text>
		</Pressable>
	);
}

export function IconButton ({icon,action}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const dir = ['fa'].includes(useContext(settingsContext).AppLanguage)?'rtl':'ltr';

	return (
		<Pressable onPress={action} style={{...styles.button,...shadow[theme],...styles.iconButton}}>
			<Image source={iconSource[icon]} style={{...icons.mediIcon,...imageColorInvert[theme],...icons[dir]}} />
		</Pressable>
	);
}

export function HoverButton({icon,action}){
	return (
		<View style={styles.hoverView}>
			<IconButton icon={icon} action={action}/>
		</View>
	);
}

export function DialButton({icon, labels, actions}){
	const [open,setOpen] = useState(false);

	const handle = (i)=>{
		setOpen(false);
		actions[i]();
	};

	if(open){
		return(
			<View style={styles.hoverView}>
				{[0,1].map(i=>
					<TextButton 
						label={labels[i]} 
						action={()=>handle(i)} 
						style={{
							marginHorizontal:30,
							marginVertical:7.5,
						}}
					/>
				)}
				<IconButton icon='close' action={()=>setOpen(false)} />
			</View>
		);
	} else {
		return (<HoverButton icon={icon} action={()=>setOpen(true)} />);
	}
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: themeColors.primary.original,
		paddingHorizontal: 30,
		paddingVertical: 15,
		borderRadius: 15
	},
	combo: {
		flex: 1,
		flexDirection: 'row',
		gap: 7.5,
		alignItems: 'center',
		height: Math.max(20,30*PixelRatio.getFontScale()),
	},
	iconButton: {
		paddingHorizontal: 15,
		alignSelf: 'flex-end',
		margin: 30,
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
	add: require('../assets/icons/add.png'),
	close: require('../assets/icons/close.png'),
	back: require('../assets/icons/back.png'),
	play: require('../assets/icons/play.png'),
	next: require('../assets/icons/next.png'),
	prev: require('../assets/icons/prev.png'),
	blank: require('../assets/icons/blank.png'),
}