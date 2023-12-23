import { View, Text, TextInput, Modal, Pressable, StyleSheet, PixelRatio } from "react-native";
import { useState, useContext, useEffect } from "react";

import DropDown from './dropDown';
import { TextButton } from "./buttons";
import { WarningModalOne } from "./warn";

import { categoryColors,themeColors } from "../assets/utils/colors";
import { createModals } from "../assets/utils/translations";
import { textColor, textStyle,modalBasic,shadow, textInput } from "../assets/utils/common";
import { settingsContext } from "../assets/utils/settings";

import { getCategories, addTask, addCategory } from "../assets/utils/data";


export function TaskModal({mode,onEnd,refresh,task,cat_id}){
	// mode > 0: create, 1: edit
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const lang = useContext(settingsContext).AppLanguage;

	const [warn,setWarn] = useState(false);
	const [message,setMessage] = useState('');

	const [categories, setCategories] = useState(false);
	useEffect(()=>{
		const getCat = async()=>{
			setCategories(await getCategories());
		};
		getCat();
	},[]);

	const [lbl,setLbl] = useState(mode?task.name:'');
	const [cat,setCat] = useState(mode?task.category.id:cat_id);
	const [note,setNote] = useState(mode?task.note:'');
	const createTask = async() =>{
		if(cat!==0 && lbl!==''){
			await addTask(lbl,note,cat);
			refresh();
			onEnd();
		} else if(cat!==0){
			setMessage(createModals.warn.task[lang][0]);
			setWarn(true);
		} else if(lbl!==''){
			setMessage(createModals.warn.task[lang][1]);
			setWarn(true);
		} else {
			setMessage(createModals.warn.task[lang][2]);
			setWarn(true);
		}
	}
	const updateTask = async() =>{
		if(cat!==0&&lbl!==''){
			await task.update(lbl,note,cat);
			refresh();
			onEnd();
		} else if(cat!==0){
			setMessage(createModals.warn.task[lang][0]);
			setWarn(true);
		} else if(lbl!==''){
			setMessage(createModals.warn.task[lang][1]);
			setWarn(true);
		} else {
			setMessage(createModals.warn.task[lang][2]);
			setWarn(true);
		}
	};

	return (
		<View style={modalBasic[theme]}><View style={{...modalBasic.box,...shadow[theme],...styles[theme]}}>
			<Text style={{...textStyle.label,...textColor[theme],textAlign: 'center'}}>{createModals.newTask.label[lang][mode]}</Text>
			<TextInput 
				selectionColor={themeColors.accent.original} 
				placeholder={createModals.newTask.fill[lang]}
				placeholderTextColor={themeColors.gray} 
				style={{...textInput.borderBottom,...textInput[theme],...textStyle.body}}
				value={lbl}
				onChangeText={setLbl} 
				autoCapitalize="words" 
			/>
			<TextInput 
				selectionColor={themeColors.accent.original} 
				placeholder={createModals.newTask.note[lang]}
				placeholderTextColor={themeColors.gray} 
				style={{...textInput.roundCorner,...textInput[theme],...textStyle.body,...styles.note}}
				value={note}
				onChangeText={setNote} 
				multiline={true} 
				numberOfLines={5} 
			/>
			<DropDown defaultVal={createModals.newTask.cat[lang]} val={cat?cat:''} options={categories?categories:[]} action={setCat} />
			<TextButton 
				label={createModals.newTask.label[lang][mode]} 
				action={mode?updateTask:createTask} 
				style={styles.button} 
			/>
			<Modal transparent={true} visible={warn} animationType="fade" onRequestClose={()=>setWarn(false)}>
				<WarningModalOne text={message} end={()=>setWarn(false)} />
			</Modal>
		</View></View>
	);
}

export function CategoryModal({mode,onEnd,refresh,category}){
	// mode > 0: create, 1: edit
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const lang = useContext(settingsContext).AppLanguage;

	const [warn,setWarn] = useState(false);
	const [message,setMessage] = useState('');

	const [lbl,setLbl] = useState(mode?category.name:'');
	const [col,setCol] = useState(mode?category.color:'violet');
	const createCat = async() => {
		if(lbl!==''){
			await addCategory(lbl,col);
			refresh();
			onEnd();
		} else {
			setMessage(listPage.warn.category[lang]);
			setWarn(true);
		}
	};
	const updateCat = async() => {
		if(lbl!==''){
			await category.update(lbl,col);
			refresh();
			onEnd();
		} else {
			setMessage(listPage.warn.category[lang]);
			setWarn(true);
		}
	};

	const [height,setHeight] = useState(0);
	const calcHeight = (h) => {
		if(height===0){
			setHeight(h+76*PixelRatio.get());
		}
	};

	return (
		<View style={modalBasic[theme]}><View style={{...modalBasic.box,...shadow[theme],...styles[theme]}}>
			<Text style={{...textStyle.label,...textColor[theme],textAlign: 'center'}}>{createModals.newCat.label[lang][mode]}</Text>
			<TextInput 
				selectionColor={themeColors.accent.original} 
				placeholder={createModals.newCat.fill[lang]}
				placeholderTextColor={themeColors.gray} 
				style={{...textInput.borderBottom,...textInput[theme],...textStyle.body}}
				value={lbl}
				onChangeText={setLbl} 
				autoCapitalize="words" 
			/>
			<View style={{minHeight:height,marginVertical:8*PixelRatio.get()}} onLayout={(obj)=>calcHeight(obj['nativeEvent']['layout']['height'])}>
				<Text style={{...textStyle.label,...textColor[theme],...styles[theme]}}>{createModals.newCat.color[lang]}</Text>
				<View style={styles.colorWrap}>
					{Object.keys(categoryColors).map(color=>
						<Color color={color} selected={color===col} action={()=>{setCol(color)}} />
					)}
				</View>
			</View>
			<TextButton 
				label={createModals.newCat.label[lang][mode]} 
				action={mode?updateCat:createCat} 
				style={styles.button} 
			/>
			<Modal transparent={true} visible={warn} animationType="fade" onRequestClose={()=>setWarn(false)}>
				<WarningModalOne text={message} end={()=>{setWarn(false)}} />
			</Modal>
		</View></View>
	);
}
function Color({color,selected,action}){
	if(selected){
		return (
			<View style={{...styles.color,borderColor:categoryColors[color],...styles.colorSelectBorder}}>
				<View style={{...styles.colorSelect,backgroundColor:categoryColors[color]}} />
			</View>
		);
	} else {
		return (
			<Pressable 
				style={{
					...styles.color,
					backgroundColor: categoryColors[color],
				}} 
				onPress={action}
			></Pressable>
		);
	}
}

const styles = StyleSheet.create({
	light: {
		backgroundColor: themeColors.light,
	},
	dark: {
		backgroundColor: themeColors.dark,
	},
	colorWrap: {
		width: 132*PixelRatio.get(),
		height: 76*PixelRatio.get(),
		flex: 1,
		gap: 8*PixelRatio.get(),
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 8*PixelRatio.get(),
	},
	colorSelect: {
		width: 12*PixelRatio.get(),
		height: 12*PixelRatio.get(),
		borderRadius: 6*PixelRatio.get(),
	},
	colorSelectBorder: {
		borderWidth: 0.75*PixelRatio.get(),
		padding: 3.25*PixelRatio.get(),
	},
	color: {
		width: 20*PixelRatio.get(),
		height: 20*PixelRatio.get(),
		borderRadius: 10*PixelRatio.get(),
	},
	button: {
		alignSelf: 'flex-end',
	},
	note: {
		verticalAlign: 'top',
		paddingHorizontal: 8*PixelRatio.get(),
		paddingVertical: 8*PixelRatio.get(),
	}
});