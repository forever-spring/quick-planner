import * as sqlite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { weekDays } from "./translations";


// JS OBJECT DEFINITION

class Day {
	constructor(id,day){
		tmp=JSON.parse(day);
		this.id=id;
		this.date=tmp.date;
		this.month=tmp.month;
		this.year=tmp.year;
		this.day=tmp.day;
	}
	display(mode,lang){
		switch(mode){
			case 1:
				return String(this.date)+'.'+String(this.month)+'.'+String(this.year)+' - '+weekDays[lang][this.day];
			case 2:
				return String(this.month)+'.'+String(this.date)+'.'+String(this.year)+' - '+weekDays[lang][this.day];
			default:
				raise('Wrong mode passed to Day.display(mode,lang)');
		}
	}
	store(){
		return JSON.stringify({
			date:this.date,
			month:this.month,
			year:this.year,
			day:this.day,
		});
	}
	async setDate(date){
		this.date=date;
		const db=sqlite.openDatabase('quickPlanner');
		await db.execAsync([
			{sql:'UPDATE plan SET day=? WHERE rowid=?',args:[this.store(),this.id]}
		],false);
		db.closeAsync();
	}
	async setMonth(month){
		this.month=month;
		const db=sqlite.openDatabase('quickPlanner');
		await db.execAsync([
			{sql:'UPDATE plan SET day=? WHERE rowid=?',args:[this.store(),this.id]}
		],false);
		db.closeAsync();
	}
	async setYear(year){
		this.year=year;
		const db=sqlite.openDatabase('quickPlanner');
		await db.execAsync([
			{sql:'UPDATE plan SET day=? WHERE rowid=?',args:[this.store(),this.id]}
		],false);
		db.closeAsync();
	}
	async setDay(day){
		this.day=day;
		const db=sqlite.openDatabase('quickPlanner');
		await db.execAsync([
			{sql:'UPDATE plan SET day=? WHERE rowid=?',args:[this.store(),this.id]}
		],false);
		db.closeAsync();
	}
	getDate(){
		return this.date;
	}
	getMonth(){
		return this.month;
	}
	getYear(){
		return this.year;
	}
	getDay(){
		return this.day;
	}
}

class Planned {
	constructor(task,order){
		this.task=task; // to be retrieved before construction
		this.order=order;
	}
	storeTask(){
		return this.task.id;
	}
}

class Task {
	constructor(id,name,done,category){
		this.id=id;
		this.name=name;
		this.done=Boolean(done); // save with Number(done)
		this.category=category; // to be retrieved before construction
	}
	storeCategory(){
		return this.category.id;
	}
}

class Category {
	constructor(id,name,color){
		this.id=id;
		this.name=name;
		this.color=color; // a string, name of the color
	}
}

class Archived {
	constructor(id,day){
		this.id=id;
		this.day=day;
	}
}

class Plan {
	constructor(id,day,gratitudes,planned){
		this.id=id;
		this.day=new Day(id,day);
		this.gratitudes=gratitudes.split('#');
		this.planned=planned; // array of Planned, to be retrieved before constructor, ordered by order at retrieval
	}
	storeGratitudes(){
		return this.gratitudes.join('#');
	}
	async setGratitudes(gratitudes){
		this.gratitudes=gratitudes;
		db=sqlite.openDatabase('quickPlanner');
		await db.execAsync([
			{sql:'UPDATE plan SET gratitudes=? WHERE rowid=?',args:[this.storeGratitudes(),this.id]}
		],false);
		db.closeAsync();
	}
	getGratitudes(){
		return this.gratitudes;
	}
}

// DATABASE SETUP CODE

export async function initDB(){
	const db=sqlite.openDatabase('quickPlanner');

	await db.execAsync([
		{sql:'CREATE TABLE category(name TEXT NOT NULL, color TEXT NOT NULL)',args:[]},
		{sql:'CREATE TABLE task(name TEXT NOT NULL, done INTEGER NOT NULL DEFAULT 0, category INTEGER NOT NULL, FOREIGN KEY(category) REFERENCES category(rowid))',args:[]},
		{sql:'CREATE TABLE plan(day TEXT, gratitudes TEXT)',args:[]},
		{sql:'CREATE TABLE planned(task INTEGER NOT NULL, plan INTEGER NOT NULL, rank INTEGER NOT NULL, FOREIGN KEY(task) REFERENCES task(rowid), FOREIGN KEY(plan) REFERENCES plan(rowid))',args:[]}
	],false);

	db.closeAsync();
}

// DATABASE ACTIONS:	add,update,remove,get

export async function addPlan(){
	const db=sqlite.openDatabase('quickPlanner');

	let day=JSON.stringify({
		date:'',
		month:'',
		year:'',
		day:''
	});

	const [result] = await db.execAsync([
		{sql:'INSERT INTO plan(day, gratitudes) VALUES(?,?)',args:[day,'###']}
	],false);

	db.closeAsync();

	return await getPlan(result.insertId);
}
export async function getPlan(id){
	const db=sqlite.openDatabase('quickPlanner');

	let [plan] = await db.execAsync([
		{sql:'SELECT * FROM plan WHERE rowid=?',args:[id]}
	],true);
	plan=plan.rows[0];
	let [planned] = await db.execAsync([
		{sql:'SELECT task,rank FROM planned WHERE plan=?',args:[id]}
	],true);
	planned = planned.rows;

	return new Plan(id,plan.day,plan.gratitudes,planned.map(row=>Planned(row.task,row.order)));
}

