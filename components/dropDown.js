import { View, Pressable, Text, Image, Modal, StyleSheet } from 'react-native';
import { useContext, useState, useRef } from 'react';

import { settingsContext } from '../assets/utils/settings';
import { textInput, textStyle, textColor, imageColor, icons, shadow } from '../assets/utils/common';
import { themeColors } from '../assets/utils/colors';

export default function DropDown({defaultVal,val,options,action}){
	const theme=useContext(settingsContext).DarkTheme?'dark':'light';

	const [open,setOpen] = useState(false);
	const [value,setValue] = useState(val);
	const [pose,setPose] = useState(StyleSheet.create({}));
	const elemRef = useRef(null);
	
	const openMenu = ()=>{
		elemRef.current.measure((x,y,width,height,pageX,pageY)=>{
			setPose(StyleSheet.create({left:pageX,top:pageY}));
		});
		setOpen(true);
	};

	const pick = (option) =>{
		action(option);
		setValue(option);
		setOpen(false);
	};

	return (
		<View>
			<Pressable ref={elemRef} onPress={openMenu} style={{...styles.dropDown,...textInput[theme]}}>
				<Text style={{...textStyle.body,...textColor.gray}}>{value===''?defaultVal:options[value]}</Text>
				<Image style={{...imageColor[theme],...icons.bigIcon}} source={require('../assets/icons/dropdown.png')} />
			</Pressable>
			<Modal transparent={true} visible={open} animationType="fade" onRequestClose={()=>setOpen(false)}>
			<View><View style={{...styles.dropDownMenu,...styles[theme],...shadow[theme],...pose}}>
				<Pressable ref={elemRef} onPress={()=>setOpen(false)} style={{...styles.dropDown,borderColor:themeColors[theme]}}>
					<Text style={{...textStyle.body,...textColor.gray}}>{value===''?defaultVal:options[value]}</Text>
					<Image style={{...imageColor[theme],...icons.bigIcon}} source={require('../assets/icons/dropdown.png')} />
				</Pressable>
				{Object.keys(options).map((option)=>{
					if(value!=String(option)){
						return(
							<Pressable style={styles.dropDownItem} onPress={()=>{pick(option)}}>
								<Text style={{...textStyle.body,...textColor[theme]}}>{options[option]}</Text>
							</Pressable>
						);
					}
				})}
			</View></View></Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	dropDown: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingStart: 7.5,
		borderWidth: 1,
		borderRadius: 7.5,
		alignSelf: 'flex-start',
		minHeight: 40,
	},
	dropDownMenu: {
		position: 'absolute',
		padding: 7.5,
		borderRadius: 7.5,
	},
	dropDownItem: {
		padding: 7.5,
	},
	light: {
		backgroundColor: themeColors.light,
	},
	dark: {
		backgroundColor: themeColors.dark,
	},
});