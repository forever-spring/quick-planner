import { getLocales } from "expo-localization";
import {
	useFonts,
	BalooBhaijaan2_400Regular,
	BalooBhaijaan2_500Medium,
} from '@expo-google-fonts/baloo-bhaijaan-2';
import {preventAutoHideAsync, hideAsync} from 'expo-splash-screen';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useReducer,useState } from 'react';

import About from './screens/about';
import Settings from './screens/settings';
import List from './screens/list';
import Plan from './screens/plan';
import Archive from './screens/archive';
import Welcome from "./screens/welcome";

import * as Hooks from './assets/utils/settings.js';
import { initDB, update1DB } from "./assets/utils/data";


const NavStack=createNativeStackNavigator();
preventAutoHideAsync();

export default function App() {
	const lang = getLocales()[0].languageCode;
	const theme= Appearance.getColorScheme();

	const [fontsLoaded] = useFonts({
		BalooBhaijaan2_400Regular,
		BalooBhaijaan2_500Medium,
	});
	const [settingsLoaded, setSettingsLoaded] = useState(false);
	const [init, setInit] = useState(false);
	const [db,setDb] = useState(false);

	const appSettings={
		DarkTheme: theme=='dark' ? true : false,
		AppLanguage: ['fa','en'].includes(lang) ? lang : 'en',
		DateStyle: 1,
		WeekStart: 1,
	};
	const dispatch={
		DarkTheme: null,
		AppLanguage: null,
		DateStyle: null,
		WeekStart: null,
	};
	[appSettings.DarkTheme, dispatch.DarkTheme] = useReducer(Hooks.flipTheme, appSettings.DarkTheme);
	[appSettings.AppLanguage, dispatch.AppLanguage] = useReducer(Hooks.setLang, appSettings.AppLanguage);
	[appSettings.DateStyle, dispatch.DateStyle] = useReducer(Hooks.setDateStyle, appSettings.DateStyle);
	[appSettings.WeekStart, dispatch.WeekStart] = useReducer(Hooks.setWeekStart, appSettings.WeekStart);
	useEffect(() => {
		const fetch = async (key) => {
			try{
				value=await AsyncStorage.getItem(key);
				if(value==null){
					Hooks.storeSettings(key,appSettings[key]);
				}
				return value;
			} catch(e){
				return null;
			}
		};
		const loadSettings = async () => {
			for(item in appSettings){
				value=await fetch(item);
				if(value!=null){
					switch(item){
						case 'DarkTheme':
							value = (value=='true') ? true : false;
							break;
						case 'DateStyle':
						case 'WeekStart':
							value = Number(value);
					}
					if(value!=appSettings[item]){
						dispatch[item](value);
					}
				}
			}
			setSettingsLoaded(true);
		}
		loadSettings();
	}, []);

	useEffect(()=>{
		const initial = async() => {
			const value = await AsyncStorage.getItem('init');
			if(value==null){
				await initDB();
				await AsyncStorage.setItem('update1','done');
				setDb(true);
			} else {
				setInit(true);
				setDb(true);
			}
		};
		initial();
	},[]);
	
	if(!fontsLoaded || !settingsLoaded || !db) {
		return null;
	} else if(!init) {
		hideAsync();
		return (
			<Hooks.settingsContext.Provider value={appSettings}>
				<Welcome signal={setInit} />
			</Hooks.settingsContext.Provider>
		);
	} else {
		hideAsync();
		return (
			<NavigationContainer><Hooks.settingsContext.Provider value={appSettings}>
				<NavStack.Navigator initialRouteName='plan'>
					<NavStack.Screen name='plan' component={Plan} options={{header: (props) => null}} />
					<NavStack.Screen name='list' component={List} options={{header: (props) => null}} />
					<NavStack.Screen name='archive' component={Archive} options={{header: (props) => null}} />
					<NavStack.Screen name='about' component={About} options={{header: (props) => null}} />
					<NavStack.Screen name='settings' options={{header: (props) => null}}>
						{(props) => <Settings {...props} dispatchers={dispatch} />}
					</NavStack.Screen>
				</NavStack.Navigator>
			</Hooks.settingsContext.Provider></NavigationContainer>
		);
	}
}