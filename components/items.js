import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, Pressable, StyleSheet, PixelRatio, Modal } from "react-native";
import { useContext, useEffect, useState } from "react";

import { TaskModal, CategoryModal } from "./createModals";
import { WarningModalTwo } from "./warn";
import { TextButton } from "./buttons";

import { settingsContext } from "../assets/utils/settings";
import { textStyle, textColor, icons, imageColor, modalBasic, shadow } from "../assets/utils/common";
import { categoryColors,themeColors } from "../assets/utils/colors";
import { deleteWarn, infoModal } from "../assets/utils/translations";
import { getExcludes } from "../assets/utils/data";

export function InfoModal({text,end}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const lang = useContext(settingsContext).AppLanguage;

	return(
		<View style={modalBasic[theme]}><View style={{...modalBasic.box,...shadow[theme],...styles[theme]}}>
			<Text style={{...textStyle.body,...textColor[theme]}}>{text}</Text>
			<TextButton label={infoModal[lang]} action={end}/>
		</View></View>
	);
}

export function PlannedItem({edit,planned,refresh}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	
	const [done, setDone] = useState(false);
	const [task, setTask] = useState(false);
	const [name, setName] = useState('');
	const [info, setInfo] = useState(false);

	useEffect(()=>{
		const setUp = async()=>{
			setTask(await planned.getTask());
			setName(planned.task.name);
			setDone(planned.task.done);
		};
		setUp();
	},[]);

	const flipDone = async()=>{
		task.flipDone();
		setDone(!done);
	};

	const remove = ()=>{
		refresh(task.id);
	};

	const voidCallBack = ()=>{};

	if(!task){} else {
		if(edit){
			return(
				<View style={styles.row}>
					<Modal transparent={true} visible={info} animationType="fade" onRequestClose={()=>setInfo(false)}>
						<InfoModal text={task.note} end={()=>setInfo(false)} />
					</Modal>
					<TapButton icon={done?'checkboxChecked':'checkbox'} action={flipDone} />
					<Pressable onPress={()=>setInfo(true)} onLongPress={remove}>
						<Text style={{...textStyle.body,...textColor[theme]}}>{name}</Text>
					</Pressable>
				</View>
			);
		} else {
			return(
				<View style={styles.row}>
					<TapButton icon={done?'checkboxChecked':'checkbox'} action={voidCallBack} />
					<Pressable onLongPress={voidCallBack}>
						<Text style={{...textStyle.body,...textColor[theme],...styles.label}}>{name}</Text>
					</Pressable>
				</View>
			);
		}
	}
}

function TaskItem({task,full,picked,refresh,exclude}){
	const theme = useContext(settingsContext).DarkTheme? 'dark': 'light';
	const lang = useContext(settingsContext).AppLanguage;

	const [done,setDone] = useState(task.done);
	const flipDone = ()=>{
		setDone(!done);
		task.flipDone();
	};

	const del = async()=>{
		await task.del();
		setWarn(false);
		refresh();
	};

	const [modal,setModal] = useState(false);
	const [warn,setWarn] = useState(false);
	const [info,setInfo] = useState(false);

	const pick = ()=>{
		picked(task.id);
	};

	if(full){
		if(done){
			return (
				<View style={styles.row}>
					<Modal transparent={true} visible={warn} animationType="fade" onRequestClose={()=>setWarn(false)}>
						<WarningModalTwo text={deleteWarn.task[lang]} back={()=>setWarn(false)} ok={del} />
					</Modal>
					<Modal transparent={true} visible={info} animationType="fade" onRequestClose={()=>setInfo(false)}>
						<InfoModal text={task.note} end={()=>setInfo(false)} />
					</Modal>
					<Pressable style={styles.label} onPress={()=>setInfo(true)}>
						<Text style={{...styles.done,...styles.label,...textStyle.body,...textColor[theme]}}>{task.name}</Text>
					</Pressable>
					<TapButton icon='undone' action={flipDone} />
					<TapButton icon='delete' action={del} />
				</View>
			);
		} else {
			return (
				<View style={styles.row}>
					<Modal transparent={true} visible={modal} animationType="fade" onRequestClose={()=>setModal(false)}>
						<TaskModal onEnd={()=>setModal(false)} refresh={refresh} mode={1} task={task} />
					</Modal>
					<Modal transparent={true} visible={warn} animationType="fade" onRequestClose={()=>setWarn(false)}>
						<WarningModalTwo text={deleteWarn.task[lang]} back={()=>setWarn(false)} ok={del} />
					</Modal>
					<Modal transparent={true} visible={info} animationType="fade" onRequestClose={()=>setInfo(false)}>
						<InfoModal text={task.note} end={()=>setInfo(false)} />
					</Modal>
					<Pressable style={styles.label} onPress={()=>setInfo(true)}>
						<Text style={{...textStyle.body,...textColor[theme]}}>{task.name}</Text>
					</Pressable>
					<TapButton icon='done' action={flipDone} />
					<TapButton icon='edit' action={()=>setModal(true)} />
					<TapButton icon='delete' action={()=>setWarn(true)} />
				</View>
			);
		}
	} else {
		if(task.done||exclude.includes(task.id)){} else {
			return (
				<Pressable onPress={pick} style={styles.row}>
					<Text>{task.name}</Text>
				</Pressable>
			);
		}
	}
}

export function CategoryItem({category,full,picked,refresh}){
	const theme = useContext(settingsContext).DarkTheme? 'dark': 'light';
	const lang = useContext(settingsContext).AppLanguage;

	const [open,setOpen] = useState(true);
	const flipOpen = ()=>{
		setOpen(!open);
	};

	const del = async()=>{
		await category.del();
		setWarn(false);
		refresh();
	};

	const [exclude,setExclude] = useState(false);
	useEffect(()=>{
		const get= async()=>{
			setExclude(await getExcludes());
		};
		if(!full){
			get();
		}
	},[]);

	const [modal,setModal] = useState(false);
	const [warn,setWarn] = useState(false);

	if(full){
		return (
			<LinearGradient 
				colors={[categoryColors[category.color]+'ff',categoryColors[category.color]+'00']} 
				start={{x:0,y:0}} 
				end={{x:0.04,y:0}} 
				style={styles.wrap} 
			><View style={styles.row}>
				<Modal transparent={true} visible={modal} animationType="fade" onRequestClose={()=>setModal(false)}>
					<CategoryModal onEnd={()=>setModal(false)} refresh={refresh} mode={1} category={category.getShort()} />
				</Modal>
				<Modal transparent={true} visible={warn} animationType="fade" onRequestClose={()=>setWarn(false)}>
					<WarningModalTwo text={deleteWarn.cat[lang]} back={()=>setWarn(false)} ok={del} />
				</Modal>
				<TapButton icon={open?'expanded':'collapsed'} action={flipOpen} />
				<Text style={{...styles.label,...textStyle.label,...textColor[theme]}}>{category.name}</Text>
				<TapButton icon='edit' action={()=>setModal(true)} />
				<TapButton icon='delete' action={()=>setWarn(true)} />
			</View>
				{open?
					<View style={styles.taskBlock}>
							{category.tasks.map(task=><TaskItem task={task} full={true} refresh={refresh} />)}
					</View>
				:null}
			</LinearGradient>
		);
	} else if(!exclude){} else {
		return (
			<LinearGradient 
				colors={[categoryColors[category.color]+'ff',categoryColors[category.color]+'00']} 
				start={{x:0,y:0}} 
				end={{x:0.04,y:0}} 
				style={styles.wrap} 
			>
				<View style={styles.row}>
					<TapButton icon={open?'expanded':'collapsed'} action={flipOpen} />
					<Text style={{...styles.label,...textStyle.label,...textColor[theme]}}>{category.name}</Text>
				</View>
				{open?
					<View style={styles.taskBlock}>
						{category.tasks.map(task=><TaskItem task={task} full={false} picked={picked} exclude={exclude} />)}
					</View>
				:null}
			</LinearGradient>
		);
	}
}

export function TapButton({icon,action}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	const dir = ['fa'].includes(useContext(settingsContext).AppLanguage)?'rtl':'ltr';

	return (
		<Pressable onPress={action} style={styles.button}>
			<Image source={iconSource[icon]} style={{...icons.smallIcon,...imageColor[theme],...icons[dir]}} />
		</Pressable>
	);
}

const iconSource = {
	expanded: require('../assets/icons/expanded.png'),
	collapsed: require('../assets/icons/collapsed.png'),
	done: require('../assets/icons/done.png'),
	undone: require('../assets/icons/undone.png'),
	edit: require('../assets/icons/edit.png'),
	delete: require('../assets/icons/delete.png'),
	checkbox: require('../assets/icons/checkbox.png'),
	checkboxChecked: require('../assets/icons/checkbox-checked.png'),
	view: require('../assets/icons/view.png'),
	copy: require('../assets/icons/copy.png'),
	remove: require('../assets/icons/close.png'),
};

const styles = StyleSheet.create({
	done: {
		textDecorationLine: 'line-through',
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 4*PixelRatio.get(),
	},
	wrap: {
		marginBottom: 16*PixelRatio.get(),
	},
	label: {
		flex: 1,
		alignContent: 'stretch',
	},
	taskBlock: {
		marginStart: 18*PixelRatio.get(),
	},
	button: {
		padding: 4*PixelRatio.get(),
	},
	planned:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 4*PixelRatio.get(),
	},
	light: {
		backgroundColor: themeColors.light,
	},
	dark: {
		backgroundColor: themeColors.dark,
	},
});