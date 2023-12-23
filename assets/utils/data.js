import * as sqlite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { weekDays,noDay } from "./translations";


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
		if(!this.date && !this.month && !this.year && !this.day){
			return noDay[lang];
		}
		let day=this.day?'    -    '+weekDays[lang][this.day]:' ';
		switch(mode){
			case 1:
				return String(this.date)+'    '+String(this.month)+'    '+String(this.year)+day;
			case 2:
				return String(this.month)+'    '+String(this.date)+'    '+String(this.year)+day;
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
	constructor(taskId,rank){
		this.taskId=taskId;
		this.rank=rank;
	}
	async getTask(){
		const db= sqlite.openDatabase('quickPlanner');
		let [task] = await db.execAsync([
			{sql:'SELECT * FROM task WHERE rowid=?',args:[this.taskId]}
		],true);
		task=task.rows[0];
		let [cat] = await db.execAsync([
			{sql:'SELECT * FROM category WHERE rowid=?',args:[task.category]}
		],true);
		cat=cat.rows[0];
		this.task=new Task(this.taskId,task.name,task.done,task.note, new TaskCategory(task.category,cat.name,cat.color));
		db.closeAsync();
		return this.task;
	}
}

class Task {
	constructor(id,name,done,note,category){
		this.id=id;
		this.name=name;
		this.done=Boolean(done); // save with Number(done)
		this.note=note;
		this.category=category; // to be retrieved before construction
	}
	storeCategory(){
		return this.category.id;
	}
	async flipDone(){
		this.done=!this.done;
		const db=sqlite.openDatabase('quickPlanner');
		await db.execAsync([
			{sql:'UPDATE task SET done=? WHERE rowid=?',args:[Number(this.done),this.id]}
		],false);
		db.closeAsync();
	}
	async del(){
		const db=sqlite.openDatabase('quickPlanner');
		await db.execAsync([
			{sql:'DELETE FROM task WHERE rowid=?',args:[this.id]},
			{sql:'DELETE FROM planned WHERE task=?',args:[this.id]}
		],false);
		db.closeAsync();
	}
	async update(name,note,cat){
		// cat is catId
		const db=sqlite.openDatabase('quickPlanner');
		let [ct]=await db.execAsync([
			{sql:'SELECT rowid,* FROM category WHERE rowid=?',args:[cat]},
			{sql:'UPDATE task SET name=?,note=?,category=? WHERE rowid=?',args:[name,note,cat,this.id]}
		],false);
		ct=ct.rows[0];
		this.category=new TaskCategory(ct.rowid,ct.name,ct.color);
	}
}
class TaskCategory {
	constructor(id,name,color,update){
		this.id=id;
		this.name=name;
		this.color=color;
		this._update=update;
	}
	setUpdate(update){
		this._update=update;
	}
	async update(name,color){
		this.name=name;
		this.color=color;
		await this._update(name,color);
	}
}
class Category {
	constructor(id,name,color,tasks){
		this.id=id;
		this.name=name;
		this.color=color; // a string, name of the color
		this.tasks=tasks;
		for(let task of this.tasks){
			task.category.setUpdate(this.update);
		}
	}
	getShort(){
		return new TaskCategory(this.id,this.name,this.color,this.update);
	}
	async update(name,color){
		this.name=name;
		this.color=color;
		const db=sqlite.openDatabase('quickPlanner');
		await db.execAsync([
			{sql:'UPDATE category SET name=?,color=? WHERE rowid=?',args:[this.name,this.color,this.id]}
		],false);
		db.closeAsync();
	}
	async del(){
		const db=sqlite.openDatabase('quickPlanner');
		const tids=this.tasks.map(t=>t.id);
		await db.execAsync([
			{sql:'DELETE FROM task WHERE category=?',args:[this.id]},
			{sql:'DELETE FROM planned WHERE task IN ('+tids.map(i=>'?').join()+')',args:[...tids]},
			{sql:'DELETE FROM category WHERE rowid=?',args:[this.id]}
		],false);
		db.closeAsync();
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
		const db=sqlite.openDatabase('quickPlanner');
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
		{sql:'CREATE TABLE task(name TEXT NOT NULL, done INTEGER NOT NULL DEFAULT 0, category INTEGER NOT NULL, note TEXT DEFAULT ?, FOREIGN KEY(category) REFERENCES category(rowid))',args:['']},
		{sql:'CREATE TABLE plan(day TEXT, gratitudes TEXT)',args:[]},
		{sql:'CREATE TABLE planned(task INTEGER NOT NULL, plan INTEGER NOT NULL, rank INTEGER NOT NULL, FOREIGN KEY(task) REFERENCES task(rowid), FOREIGN KEY(plan) REFERENCES plan(rowid))',args:[]}
	],false);

	db.closeAsync();
}

export async function update1DB(){
	const db=sqlite.openDatabase('quickPlanner');

	await db.execAsync([
		{sql:'ALTER TABLE task ADD note TEXT DEFAULT \'\' ',args:[]}
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
		{sql:'SELECT task,rank FROM planned WHERE plan=? ORDER BY rank',args:[id]}
	],true);
	planned = planned.rows;

	db.closeAsync();

	return new Plan(id,plan.day,plan.gratitudes,planned.map(row=>new Planned(row.task,row.rank)));
}

export async function addCategory(label,color){
	const db=sqlite.openDatabase('quickPlanner');
	await db.execAsync([
		{sql:'INSERT INTO category(name,color) VALUES(?,?)',args:[label,color]}
	],false);
	db.closeAsync();
}
export async function getCategories(){
	const db=sqlite.openDatabase('quickPlanner');
	let [categories]=await db.execAsync([
		{sql:'SELECT rowid,name FROM category ORDER BY name ASC',args:[]}
	],true);
	res={};
	categories.rows.forEach(item => {
		res[item.rowid]=item.name;
	});
	db.closeAsync();
	return res;
}
export async function getCategoriesFull(){
	const db=sqlite.openDatabase('quickPlanner');
	let [categories]=await db.execAsync([
		{sql:'SELECT rowid,* FROM category ORDER BY name ASC',args:[]}
	],true);
	let cats=[];
	let category;
	let tasks;
	for(const cat of categories.rows){
		category=new TaskCategory(cat.rowid,cat.name,cat.color);
		[tasks]= await db.execAsync([
			{sql:'SELECT rowid,* FROM task WHERE category=? ORDER BY name ASC',args:[cat.rowid]}
		],true);
		tasks=tasks.rows.map(task=>new Task(task.rowid,task.name,task.done,task.note,category));
		cats=cats.concat(new Category(category.id,category.name,category.color,tasks));
	}
	db.closeAsync();
	return cats;
}

export async function addTask(label,note,category){
	const db=sqlite.openDatabase('quickPlanner');
	await db.execAsync([
		{sql:'INSERT INTO task(name,note,category) VALUES(?,?,?)',args:[label,note,Number(category)]}
	],false);
	db.closeAsync();
}

export async function getExcludes(){
	const db=sqlite.openDatabase('quickPlanner');
	const active=await AsyncStorage.getItem('activeDay');
	let [excludes]=await db.execAsync([
		{sql:'SELECT task FROM planned WHERE plan=?',args:[Number(active)]}
	],true);
	db.closeAsync();
	return excludes.rows.map(t=>t.task);
}

export async function addPlanned(plan,task,rank){
	const db=sqlite.openDatabase('quickPlanner');
	await db.execAsync([
		{sql:'INSERT INTO planned(task,plan,rank) VALUES(?,?,?)',args:[task,plan,rank]}
	],false);
	let [planned] = await db.execAsync([
		{sql:'SELECT task,rank FROM planned WHERE plan=? ORDER BY rank',args:[plan]}
	],true);
	planned=planned.rows;
	db.closeAsync();
	return planned.map(row=>new Planned(row.task,row.rank));
}

export async function getPlanned(plan){
	const db=sqlite.openDatabase('quickPlanner');
	let [planned] = await db.execAsync([
		{sql:'SELECT task,rank FROM planned WHERE plan=? ORDER BY rank',args:[plan]}
	],true);
	planned=planned.rows;
	db.closeAsync();
	return planned.map(row=>new Planned(row.task,row.rank));
}

export async function delPlanned(plan,task){
	const db=sqlite.openDatabase('quickPlanner');
	await db.execAsync([
		{sql:'DELETE FROM planned WHERE plan=? AND task=?',args:[plan,task]}
	],false);
	db.closeAsync();
}

export async function getArchived(active){
	const db=sqlite.openDatabase('quickPlanner');
	let [plans] = await db.execAsync([
		{sql:'SELECT rowid,day FROM plan WHERE NOT rowid=? ORDER BY rowid DESC',args:[active]}
	],true);
	plans=plans.rows;
	db.closeAsync();
	return plans.map(row=>new Archived(row.rowid,new Day(row.rowid,row.day)));
}

export async function delPlan(id){
	const db=sqlite.openDatabase('quickPlanner');
	await db.execAsync([
		{sql:'DELETE FROM planned WHERE plan=?',args:[id]},
		{sql:'DELETE FROM plan WHERE rowid=?',args:[id]}
	],false);
	db.closeAsync();
}