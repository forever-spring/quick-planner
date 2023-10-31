import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, Pressable, StyleSheet, PixelRatio, Modal } from "react-native";
import { useContext, useEffect, useState, useRef } from "react";

import { TaskModal, CategoryModal } from "./createModals";
import { WarningModalTwo } from "./warn";

import { settingsContext } from "../assets/utils/settings";
import { textStyle, textColor, icons, imageColor } from "../assets/utils/common";
import { categoryColors } from "../assets/utils/colors";
import { deleteWarn } from "../assets/utils/translations";


export function PlannedItem({planned,refresh}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';
	
	const [done, setDone] = useState(false);
	const [task, setTask] = useState(false);
	const [name, setName] = useState('');

	useEffect(()=>{
		const setUp = async()=>{
			await planned.getTask();
			setName(planned.task.name);
			setDone(planned.task.done);
			setTask(true);
		};
		setUp();
	},[]);

	const flipDone = async()=>{
		planned.task.flipDone();
		setDone(!done);
	};

	const remove = ()=>{
		refresh(planned.task.id);
	};

	if(!task){} else {
		return(
			<View style={styles.row}>
				<TapButton icon={done?'checkboxChecked':'checkbox'} action={flipDone} />
				<Pressable onLongPress={remove}>
					<Text style={{...textStyle.body,...textColor[theme],...styles.label}}>{name}</Text>
				</Pressable>
			</View>
		);
	}
}

function TaskItem({task,full,picked,refresh}){
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
					<Text style={{...styles.done,...styles.label,...textStyle.body,...textColor[theme]}}>{task.name}</Text>
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
					<Text style={{...styles.label,...textStyle.body,...textColor[theme]}}>{task.name}</Text>
					<TapButton icon='done' action={flipDone} />
					<TapButton icon='edit' action={()=>setModal(true)} />
					<TapButton icon='delete' action={()=>setWarn(true)} />
				</View>
			);
		}
	} else {
		if(task.done){} else {
			return (
				<Pressable onPress={()=>pick(task.id)} style={styles.row}>
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
	} else {
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
						{category.tasks.map(task=><TaskItem task={task} full={false} picked={picked} />)}
					</View>
				:null}
			</LinearGradient>
		);
	}
}

function TapButton({icon,action}){
	const theme = useContext(settingsContext).DarkTheme ? 'dark' : 'light';

	return (
		<Pressable onPress={action} style={styles.button}>
			<Image source={iconSource[icon]} style={{...icons.smallIcon,...imageColor[theme]}} />
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
});