import { StatusBar } from 'react-native';
import { ScrollView, Text, View, Pressable, Image, StyleSheet, PixelRatio } from "react-native";
import { useContext, useState } from "react";

import Header from "../components/topBars";

import { containers, textStyle, textColor, icons, imageColor } from "../assets/utils/common";
import { settingsContext } from "../assets/utils/settings";
import { settings } from "../assets/utils/translations";

export default function Settings(props){
	const context = useContext(settingsContext);
	const lang = context.AppLanguage;
	const dir = lang in ['fa']?'rtl':'ltr';
	const theme = context.DarkTheme? 'dark':'light';
	
	return(
		<View style={{...containers[theme],...containers[dir]}}>
			<StatusBar style={theme} />
			<Header page='settings' navigation={props.navigation} navBar={false} />
			<View style={containers.scroll}><ScrollView>
				<SettingItemSwitch title={settings.DarkTheme.title[lang]} value={theme=='dark'} dispatch={props.dispatchers.DarkTheme} />
				<SettingItemOption title={settings.AppLanguage.title[lang]} options={settings.AppLanguage.options[lang]} selected={settings.AppLanguage.options[lang][lang]} dispatch={props.dispatchers.AppLanguage} />
				<SettingItemOption title={settings.DateStyle.title[lang]} options={settings.DateStyle.options[lang]} selected={settings.DateStyle.options[lang][context.DateStyle]} dispatch={props.dispatchers.DateStyle} />
				<SettingItemOption title={settings.WeekStart.title[lang]} options={settings.WeekStart.options[lang]} selected={settings.WeekStart.options[lang][context.WeekStart]} dispatch={props.dispatchers.WeekStart} />
			</ScrollView></View>
		</View>
	);
}

function SettingItemOption({title,options,selected,dispatch}){
	const [open,setOpen] = useState(false);
	const theme = useContext(settingsContext).DarkTheme? 'dark':'light';

	return(
		<View style={styles.itemWrapper}>
			<Text style={{...textStyle.label,...textColor[theme],verticalAlign:'top',paddingVertical:4*PixelRatio.get()}}>{title}</Text>
			{open ? (
				<View style={styles.optionsWrapper}>
					<Pressable style={styles.button} onPress={()=>{setOpen(false)}}><Text style={{...textStyle.body,...textColor.gray}}>{selected}</Text></Pressable>
					{Object.keys(options).map((optionCode)=>{
						if(options[optionCode]!=selected){
							return (
								<Pressable style={styles.button} onPress={()=>{dispatch(optionCode)}}><Text style={{...textStyle.body,...textColor[theme]}}>{options[optionCode]}</Text></Pressable>
							);
						}
					})}
				</View>
			) : (
				<Pressable style={styles.button} onPress={()=>{setOpen(true);}}><Text style={{...textStyle.body,...textColor.gray}}>{selected}</Text></Pressable>
			) }
		</View>
	);
}

function SettingItemSwitch({title,value,dispatch}){
	const theme = useContext(settingsContext).DarkTheme? 'dark':'light';

	return(
		<View style={styles.itemWrapper}>
			<Text style={{...textStyle.label,...textColor[theme]}}>{title}</Text>
			<Pressable onPress={()=>dispatch()}>
			{value ? (
				<Image style={{...icons.bigIcon,...imageColor['primary']}} source={require('../assets/icons/toggle-on.png')} />
			) : (
				<Image style={{...icons.bigIcon,...imageColor['gray']}} source={require('../assets/icons/toggle-off.png')} />
			)}
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	itemWrapper:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		paddingHorizontal: 12*PixelRatio.get(),
		marginVertical: 6*PixelRatio.get(),
	},
	optionsWrapper:{
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-end',
		gap: 8*PixelRatio.get(),
	},
	button:{
		padding: 4*PixelRatio.get(),
	},
});

