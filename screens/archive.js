import { Text, View, ScrollView, PixelRatio, StyleSheet, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView,GestureDetector, Gesture, Directions } from "react-native-gesture-handler";
import { useContext, useEffect, useState } from "react";

import Header from "../components/topBars";
import { TapButton, PlannedItem } from "../components/items";
import { HoverButton } from "../components/buttons";

import { containers, textStyle, textColor } from "../assets/utils/common";
import { settingsContext } from "../assets/utils/settings";

import { getArchived, getPlan, delPlan } from "../assets/utils/data";


export default function Archive(props){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const lang = useContext(settingsContext).AppLanguage;
	const dir = lang in ['fa']?'rtl':'ltr';
	const mode = useContext(settingsContext).DateStyle;
	const swipe = Gesture.Fling().direction(Directions.RIGHT).onStart(()=>{
		props.navigation.navigate('plan');
	});

	const [archives,setArchives] = useState([]);
	const [archive,setArchive] = useState({});
	const [listView,setListView] = useState(true);

	useEffect(()=>{
		const setUp = async()=>{
			const value=await AsyncStorage.getItem('activeDay');
			if(Number(value)){
				setArchives(await getArchived(value));
			}
		};
		setUp();
	});

	const pick = async(id)=>{
		setArchive(await getPlan(id));
		setListView(false);
	};
	const back = ()=>{
		setArchive({});
		setListView(true);
	};
	const del = async(id)=>{
		await delPlan(id);
		const value=await AsyncStorage.getItem('activeDay');
		setArchive(await getArchived(value));
	};
	
	if(listView){
		return(
			<View style={{...containers[theme],...containers[dir]}}>
				<Header page='archive' navigation={props.navigation} navBar={true} />
				<GestureHandlerRootView style={containers.scroll}><GestureDetector gesture={swipe}><ScrollView>
					{archives.map(item=>
						<View style={styles.row}>
							<Text style={{...textColor[theme],...textStyle.label,...styles.label}}>
								{item.day.display(mode,lang)}
							</Text>
							<TapButton icon='view' action={()=>pick(item.id)} />
							<TapButton icon='delete' action={()=>del(item.id)} />
						</View>
					)}
				</ScrollView></GestureDetector></GestureHandlerRootView>
			</View>
		);
	} else {
		return(
			<View style={{...containers[theme],...containers[dir]}}>
				<Header page='archive' navigation={props.navigation} navBar={true} />
				<GestureHandlerRootView style={containers.scroll}><GestureDetector gesture={swipe}><ScrollView>
					<Text style={{...textStyle.label,...textColor[theme],textAlign:'center',margin: 16*PixelRatio.get()}}>
						{archive.day.display(mode,lang)}
					</Text>
					<View style={styles.wrap}>
						<Text style={{...textStyle.label,...textColor[theme],paddingVertical:4*PixelRatio.get()}}>On that day, I was grateful for:</Text>
						<Text style={{...textStyle.body,...textColor[theme],...styles.gratitudes}}>1. {archive.gratitudes[0]}</Text>
						<Text style={{...textStyle.body,...textColor[theme],...styles.gratitudes}}>2. {archive.gratitudes[1]}</Text>
						<Text style={{...textStyle.body,...textColor[theme],...styles.gratitudes}}>3. {archive.gratitudes[2]}</Text>
					</View>
					<View style={styles.wrap}>
						<Text style={{...textStyle.label,...textColor[theme]}}>Tasks</Text>
						{archive.planned.map(p=><PlannedItem edit={false} planned={p} />)}
					</View>
				</ScrollView></GestureDetector></GestureHandlerRootView>
				<HoverButton icon='back' action={back} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 4*PixelRatio.get(),
	},
	label: {
		flex: 1,
		alignContent: 'stretch',
	},
	wrap: {
		marginHorizontal: 16*PixelRatio.get(),
		marginVertical: 8*PixelRatio.get()
	},
	gratitudes: {
		marginStart: 12*PixelRatio.get(),
		marginVertical: 4*PixelRatio.get(),
	}
});