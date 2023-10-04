import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext } from "react";


export const settingsContext=createContext(null);

export function storeSettings(key,value){
	switch(typeof(value)){
		case 'boolean':
			value=value?'true':'false';
			break;
		case 'number':
			value=String(value);
			break;
		case undefined:
			value='';
	}
	try{
		AsyncStorage.setItem(key,value);
	} catch(e){
		console.log(e);
	}
}

export function flipTheme(state) {
	storeSettings('DarkTheme',!state);
	return !state;
}

export function setLang(state, action) {
	// action: str > 'en' , 'fa' < , 'es' , 'ar' >

	storeSettings('AppLanguage',action);
	return action;
}

export function setCal(state,action) {
	// action: num > 1: gregory, 2: persian

	if(typeof(action)=='string'){
		action=Number(action);
	}
	storeSettings('Calendar',action);
	return action;
}

export function setDateStyle(state,action) {
	// action: num > 1: dd mm yy, 2: mm dd yy, 3: dd month yy, 4: month dd yy

	if(typeof(action)=='string'){
		action=Number(action);
	}
	storeSettings('DateStyle',action);
	return action;
}

export function setWeekStart(state,action) {
	// action: num > 0: sunday, 1: monday, 6:saturday

	if(typeof(action)=='string'){
		action=Number(action);
	}
	storeSettings('WeekStart',action);
	return action;
}

// call dispatch(action) to call reducers