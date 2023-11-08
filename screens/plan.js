import { StatusBar } from 'react-native';
import { Text, View, ScrollView, TextInput, Pressable, Image, StyleSheet, PixelRatio, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView,GestureDetector, Gesture, Directions } from "react-native-gesture-handler";
import { useContext, useEffect, useState, useRef } from "react";
import { useIsFocused } from '@react-navigation/native';

import Header from "../components/topBars";
import VisionBoard from "../components/visionBoard";
import { PlannedItem } from "../components/items";
import { TextIconButton, HoverButton } from "../components/buttons";
import { WarningModalTwo } from "../components/warn";
import { CategoryItem } from "../components/items";

import { containers, textColor, textStyle, textInput, imageColor, icons, shadow, modalBasic } from "../assets/utils/common";
import { planPage, weekDays } from "../assets/utils/translations";
import { settingsContext } from "../assets/utils/settings";
import { themeColors } from "../assets/utils/colors";

import { addPlan, getPlan, getCategoriesFull, addPlanned, getPlanned, delPlanned } from "../assets/utils/data";


export default function Plan(props){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const lang = useContext(settingsContext).AppLanguage;
	const dir = ['fa'].includes(lang)?'rtl':'ltr';

	const swipeR = Gesture.Fling().direction(Directions.RIGHT).onStart(()=>{
		props.navigation.navigate('list');
	});
	const swipeL = Gesture.Fling().direction(Directions.LEFT).onStart(()=>{
		props.navigation.navigate('archive');
	});
	const swipes = Gesture.Race(swipeR,swipeL);

	const [plan, setPlan] = useState({});
	const [warning, setWarning] = useState(false);
	const focus = useIsFocused();

	useEffect(()=>{
		const getActive = async() => {
			try{
				const value=await AsyncStorage.getItem('activeDay');
				if(!Number(value)){
					setPlan(await addPlan());
					AsyncStorage.setItem('activeDay',String(plan.id));
				} else {
					setPlan(await getPlan(Number(value)));
				}
			} catch(e){
				console.log(e);
			}
		};
		getActive();
	},[]);

	const setGratitudes = (one,two,three) => {
		plan.setGratitudes([one,two,three]);
	};
	
	const archivePlan = async() => {
		setWarning(false);
		setPlan({});
		const newPlan = await addPlan();
		setPlan(newPlan);
	};
	
	if(!Object.keys(plan).length){
		return(
			<View style={{...containers[theme],...containers[dir]}}>
				<StatusBar style={theme} />
				<Header page='plan' navigation={props.navigation} navBar={true} />
				<GestureHandlerRootView style={containers.scroll}><GestureDetector gesture={swipes}><ScrollView>
					<VisionBoard />
				</ScrollView></GestureDetector></GestureHandlerRootView>
			</View>
		);
	} else {
		AsyncStorage.setItem('activeDay',String(plan.id));
		return(
			<View style={{...containers[theme],...containers[dir]}}>
				<StatusBar backgroundColor={themeColors[theme]} barStyle={theme==='dark'?'light-content':'dark-content'} />
				<Header page='plan' navigation={props.navigation} navBar={true} />
				<GestureHandlerRootView style={containers.scroll}><GestureDetector gesture={swipes}><ScrollView>
					<VisionBoard />
					<DayComponent day={plan.day} />
					<GratitudesComponent values={plan.getGratitudes()} action={setGratitudes} />
					<PlannedComponent focus={focus} planId={plan.id} />
				</ScrollView></GestureDetector></GestureHandlerRootView>
				<HoverButton icon='archive' action={()=>setWarning(true)} />
				<Modal transparent={true} onRequestClose={()=>setWarning(false)} animationType="fade" visible={warning}>
					<WarningModalTwo text={planPage.warning[lang]} back={()=>setWarning(false)} ok={archivePlan} />
				</Modal>
			</View>
		);
	}
}

function PlannedComponent({focus,planId}){
	const theme = useContext(settingsContext).DarkTheme?'dark':'light';
	const lang = useContext(settingsContext).AppLanguage;

	const [open,setOpen] = useState(false);
	const [planned,setPlanned] = useState([]);
	const categories = useRef([]);
	const openModal = async()=>{
		categories.current=await getCategoriesFull();
		setOpen(true);
	};
	const picked = async(taskId)=>{
		setPlanned(await addPlanned(planId,taskId,planned.length+1));
		setOpen(false);
	};
	const refresh = async(taskId)=>{
		await delPlanned(planId,taskId);
		setPlanned(await getPlanned(planId));
	};

	useEffect(()=>{
		const getTasks = async()=>{
			setPlanned([]);
			setPlanned(await getPlanned(planId));
		};
		if(focus){
			getTasks();
		}
	},[focus]);

	return (
		<View style={styles.planned}>
			<Modal transparent={true} visible={open} onRequestClose={()=>setOpen(false)} animationType="fade">
				<View style={modalBasic[theme]}><View style={{...modalBasic.box,...shadow[theme],...styles[theme],...styles.pickModal}}>
					<ScrollView>
						{categories.current.map(cat=><CategoryItem category={cat} full={false} picked={picked} />)}
					</ScrollView>
				</View></View>
			</Modal>
			<Text style={{...textStyle.label,...textColor[theme]}}>{planPage.planned.label[lang]}</Text>
			<View style={styles.plannedList}>{planned.map(task=><PlannedItem edit={true} planned={task} refresh={refresh} />)}</View>
			<TextIconButton icon='plan' label={planPage.planned.button[lang]} action={openModal} />
		</View>
	);
}

function GratitudesComponent({values,action}){
	const lang = useContext(settingsContext).AppLanguage;
	const theme = useContext(settingsContext).DarkTheme?'dark':'light';
	
	const [one,setOne] = useState(values[0]);
	const [two,setTwo] = useState(values[1]);
	const [three,setThree] = useState(values[2]);

	return(
		<View style={styles.gratitudeView}>
			<Text style={{...textStyle.label,...textColor[theme]}}>{planPage.gratitude[lang]}</Text>
			<View style={styles.gratitudeInput}>
				<Text style={{...textStyle.body,...textColor[theme]}}>1.</Text>
				<TextInput 
					selectionColor={themeColors.accent.original} 
					multiline={true} 
					value={one} 
					onChangeText={(val)=>{setOne(val);action(val,two,three);}} 
					style={{...textInput.borderBottom,...textStyle.body,...textColor[theme],...styles.gratitude,...textInput[theme]}}
				/>
			</View>
			<View style={styles.gratitudeInput}>
				<Text style={{...textStyle.body,...textColor[theme]}}>2.</Text>
				<TextInput 
					selectionColor={themeColors.accent.original} 
					multiline={true} 
					value={two} 
					onChangeText={(val)=>{setTwo(val);action(one,val,three);}} 
					style={{...textInput.borderBottom,...textStyle.body,...textColor[theme],...styles.gratitude,...textInput[theme]}}
				/>
			</View>
			<View style={styles.gratitudeInput}>
				<Text style={{...textStyle.body,...textColor[theme]}}>3.</Text>
				<TextInput 
					selectionColor={themeColors.accent.original} 
					multiline={true} 
					value={three} 
					onChangeText={(val)=>{setThree(val);action(one,two,val);}} 
					style={{...textInput.borderBottom,...textStyle.body,...textColor[theme],...styles.gratitude,...textInput[theme]}}
				/>
			</View>
		</View>
	);
}

function DayComponent({day}){
	const date = useContext(settingsContext).DateStyle==1?['date','month']:['month','date'];
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const lang = useContext(settingsContext).AppLanguage;
	const [d,setD] = useState(day.getDate());
	const [m,setM] = useState(day.getMonth());
	const [y,setY] = useState(day.getYear());

	return(
		<View style={styles.dayView}>
			<TextInput 
				selectionColor={themeColors.accent.original} 
				onChangeText={(val)=>{
					if(date[0]=='date'){
						setD(val);
						day.setDate(val);
					} else {
						setM(val);
						day.setMonth(val);
					}
				}} 
				value={date[0]=='date'?d:m} 
				placeholder={planPage.fills[date[0]][lang]} 
				placeholderTextColor={themeColors.gray} 
				style={{...textStyle.body,...textColor[theme],...textInput.roundCorner,...textInput[theme]}} 
			/>
			<TextInput 
				selectionColor={themeColors.accent.original} 
				onChangeText={(val)=>{
					if(date[1]=='date'){
						setD(val);
						day.setDate(val);
					} else {
						setM(val);
						day.setMonth(val);
					}
				}} 
				value={date[1]=='date'?d:m} 
				placeholder={planPage.fills[date[1]][lang]} 
				placeholderTextColor={themeColors.gray} 
				style={{...textStyle.body,...textColor[theme],...textInput.roundCorner,...textInput[theme]}} 
			/>
			<TextInput 
				selectionColor={themeColors.accent.original} 
				onChangeText={(val)=>{
					setY(val);
					day.setYear(val);
				}} 
				value={y} 
				placeholder={planPage.fills.year[lang]} 
				placeholderTextColor={themeColors.gray} 
				style={{...textStyle.body,...textColor[theme],...textInput.roundCorner,...textInput[theme]}} 
			/>
			<DropDown day={day} options={calcOptions(useContext(settingsContext).WeekStart)} />
		</View>
	);
}

function DropDown({day,options}){
	const theme=useContext(settingsContext).DarkTheme?'dark':'light';
	const lang=useContext(settingsContext).AppLanguage;

	const [open,setOpen] = useState(false);
	const [value,setValue] = useState(day.getDay());
	const [pose,setPose] = useState(StyleSheet.create({}));
	const elemRef = useRef(null);
	
	const openMenu = ()=>{
		elemRef.current.measure((x,y,width,height,pageX,pageY)=>{
			setPose(StyleSheet.create({left:pageX,top:pageY}));
		});
		setOpen(true);
	};

	const pick = (option) =>{
		day.setDay(String(option));
		setValue(option);
		setOpen(false);
	};

	return (
		<View>
			<Pressable ref={elemRef} onPress={openMenu} style={{...styles.dropDown,...textInput[theme]}}>
				<Text style={{...textStyle.body,...textColor.gray}}>{value===''?'Week Day':weekDays[lang][value]}</Text>
				<Image style={{...imageColor[theme],...icons.bigIcon}} source={require('../assets/icons/dropdown.png')} />
			</Pressable>
			<Modal transparent={true} visible={open} animationType="fade" onRequestClose={()=>setOpen(false)}>
			<View><View style={{...styles.dropDownMenu,...styles[theme],...shadow[theme],...pose}}>
				<Pressable ref={elemRef} onPress={()=>setOpen(false)} style={{...styles.dropDown,borderColor:themeColors[theme]}}>
					<Text style={{...textStyle.body,...textColor.gray}}>{value===''?'Week Day':weekDays[lang][value]}</Text>
					<Image style={{...imageColor[theme],...icons.bigIcon}} source={require('../assets/icons/dropdown.png')} />
				</Pressable>
				{options.map((option)=>{
					if(value!=String(option)){
						return(
							<Pressable style={styles.dropDownItem} onPress={()=>{pick(option)}}>
								<Text style={{...textStyle.body,...textColor[theme]}}>{weekDays[lang][option]}</Text>
							</Pressable>
						);
					}
				})}
			</View></View></Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	dayView: {
		flex: 1,
		flexDirection: 'row',
		padding: 8*PixelRatio.get(),
		margin: 8*PixelRatio.get(),
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8*PixelRatio.get(),
	},
	dropDown: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingStart: 4*PixelRatio.get(),
		borderWidth: 0.75*PixelRatio.get(),
		borderRadius: 4*PixelRatio.get(),
	},
	dropDownMenu: {
		position: 'absolute',
		padding: 4*PixelRatio.get(),
		borderRadius: 4*PixelRatio.get(),
	},
	dropDownItem: {
		padding: 4*PixelRatio.get(),
	},
	light: {
		backgroundColor: themeColors.light,
	},
	dark: {
		backgroundColor: themeColors.dark,
	},
	gratitudeView: {
		margin: 16*PixelRatio.get(),
		flex:1,
		gap: 8*PixelRatio.get(),
	},
	gratitudeInput: {
		flex:1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: 8*PixelRatio.get(),
		paddingStart: 8*PixelRatio.get(),
	},
	gratitude: {
		flex: 1,
	},
	planned:{
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		margin: 16*PixelRatio.get(),
		marginTop: 32*PixelRatio.get(),
		gap: 8*PixelRatio.get(),
	},
	plannedList:{
		marginStart: 4*PixelRatio.get(),
		marginEnd: 8*PixelRatio.get(),
		flex:1
	},
	pickModal:{
		height: '75%',
	}
});

const calcOptions = (start) => {
	return [0,1,2,3,4,5,6].map(i=>(i+start)%7);
}