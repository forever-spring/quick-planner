//		TEMPLATE
//
//		export const phraseName = {
//			en: '',
//			fa: '',
//		};

export const settings = {
	DarkTheme:{
		title: {
			en: 'Dark Theme',
			fa: 'تم تیره',
		},
	},
	AppLanguage:{
		title: {
			en: 'Language',
			fa: 'زبان',
		},
		options:{
			en: {
				en: 'en',
				fa: 'فا'
			},
			fa: {
				en: 'en',
				fa: 'فا'
			},
		},
	},
	DateStyle:{
		title: {
			en: 'Date Style',
			fa: 'نوع نمایش تاریخ',
		},
		options: {
			en: {
				1: 'day, month, year',
				2: 'month, day, year',
			},
			fa: {
				1: 'روز ماه سال',
				2: 'ماه روز سال',
			},
		},
	},
	WeekStart:{
		title: {
			en: 'Start of the Week',
			fa: 'شروع هفته',
		},
		options:{
			en: {
				6: 'Saturday',
				0: 'Sunday',
				1: 'Monday'
			},
			fa: {
				6: 'شنبه',
				0: 'یکشنبه',
				1: 'دوشنبه'
			},
		},
	},
};

export const pageTitles = {
	plan:{
		en: 'Quick Planner',
		fa: 'Quick Planner',
	},
	list:{
		en: 'Quick Planner',
		fa: 'Quick Planner',
	},
	archive:{
		en: 'Quick Planner',
		fa: 'Quick Planner',
	},
	about:{
		en: 'About The App',
		fa: 'درباره‌ی اپلیکیشن',
	},
	settings:{
		en: 'Settings',
		fa: 'تنظیمات',
	},
};

export const welcomePage = {
	welcome:{
		en: 'Welcome to ',
		fa: 'خوش آمدید به ',
	},
	paragraphs:{
		en: [
			'This application was designed to be a very simple planner to help you plan your days quickly. We believe planning your day should not take a big chunk of day from you.',
			'Before you plan your day, the app will ask you for 3 things you are grateful for. While you can skip these, I recommend you to fill them out since it helps you to gain a positive outlook in life. Write down any three things that bring you joy.',
			'It is also a good idea to keep your goal and your why in sight to motivate you to stay on track.'
		],
		fa: [
			'این اپلیکیشن طراحی شده تا به سادگی و سریع بتوانید برنامه‌ریزی روزهای خود را انجام دهید. ما اعتقاد داریم که برنامه‌ریزی روزانه نباید خود زمان از شما بگیرد.',
			'پیش از آنکه روز خود را برنامه‌ریزی کنید، اپلیکیشن از شما می‌خواهد تا سه چیز که برای داشتن آن‌ها شکرگزار هستید را بنویسید. هرچند می‌توانید این موارد را رد کنید، پیشنهاد می‌کنیم که آن‌ها را پر کرده تا رویکردی مثبت‌تر به زندگی پیدا کنید.',
			'همچنین بهتر است تا هدف و انگیزه‌ی خود را پیش چشم خود داشته‌باشید تا همیشه آن‌ها را به یاد داشته‌باشید.'
		]
	},
	fills:{
		en: [
			'What is your goal?',
			'Why do you want this?'
		],
		fa: [
			'هدف شما چیست؟',
			'چرا می‌خواهی به آن دست پیدا کنی؟'
		]
	},
	next:{
		en: 'Save & Continue',
		fa: 'ذخیره و ادامه',
	}
};

export const visionBoard = {
	fills:{
		en: [
			'Your Goal',
			'Your Why'
		],
		fa: [
			'هدف شما',
			'انگیزه‌ی شما'
		],
	},
	button:{
		en: 'Save',
		fa: 'ذخیره',
	}
};

export const weekDays={
	en: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
	fa: ['یکشنبه','دوشنبه','سه‌شنبه','چهارشنبه','پنجشنبه','جمعه','شنبه'],
};

export const planPage = {
	fills:{
		date:{
			en: 'Day',
			fa: 'روز',
		},
		month:{
			en: 'Month',
			fa: 'ماه',
		},
		year:{
			en: 'Year',
			fa: 'سال',
		},
		day:{
			en: 'Week Day',
			fa: 'روز هفته',
		},
	},
	gratitude:{
		en: 'Today, I am grateful for:',
		fa: 'امروز، شکرگزار هستم برای:',
	},
	planned:{
		label:{
			en: 'Tasks',
			fa: 'کارها',
		},
		button:{
			en: 'Plan More Tasks',
			fa: 'اضافه‌کردن کار جدید',
		}
	},
	warning:{
		en: 'You are about to archive this plan, after which you will not be able to make any edits. Do you want to proceed?',
		fa: 'شما در حال آرشیو کردن این برنامه هستید و دیگر قادر نخواهید بود آن را ویرایش کنید. آیا می‌خواهید ادامه دهید؟',
	}
};

export const listPage = {
	hover: {
		en: [
			'New Category',
			'New Task'
		],
		fa: [
			'دسته جدید',
			'کار جدید'
		],
	},
};

export const createModals = {
	newCat: {
		label: {
			en: [
				'Create New Category',
				'Update Category'
			],
			fa: [
				'ساخت دسته‌ی جدید',
				'به روز رسانی دسته'
			],
		},
		fill: {
			en: 'Category Title',
			fa: 'عنوان دسته',
		},
		color: {
			en: 'Color',
			fa: 'رنگ',
		},
	},
	newTask: {
		label: {
			en: [
				'Create New Task',
				'Update Task'
			],
			fa: [
				'ساخت کار جدید',
				'به روز رسانی کار'
			],
		},
		fill: {
			en: 'Task Title',
			fa: 'عنوان کار',
		},
		cat: {
			en: 'pick category',
			fa: 'انتخاب دسته',
		},
		note: {
			en: 'Notes',
			fa: 'یادداشت',
		}
	},
	button: {
		en: [
			'Create',
			'Save Changes'
		],
		fa: [
			'بساز',
			'ذخیره‌ی تغییرات'
		]
	},
	warn: {
		category: {
			en: 'Category Title is needed!',
			fa: 'عنوان دسته وارد نشده‌است!',
		},
		task:{
			en:[
				'Task Title is needed!',
				'Each task needs a category!',
				'An Empty Task cannot be created! Press the back button if you don\'t want to create a task.'
			],
			fa:[
				'عنوان کار را وارد کنید!',
				'هر کار باید به یک دسته تعلق داشته‌باشد!',
				'نمی‌توان یک کار بدون محتوا ساخت! اگر نمی‌خواهید کار جدیدی بسازید، از دکمه‌ی برگشت استفاده کنید.',
			],
		}
	}
};

export const warnButton = {
	one: {
		en: 'Got It',
		fa: 'فهمیدم',
	},
	two: {
		en: [
			'Go Back',
			'Proceed'
		],
		fa: [
			'برگرد',
			'ادامه بده'
		],
	},
};

export const deleteWarn = {
	cat: {
		en: 'You are about to delete this category and all its tasks from the app. The tasks will also be deleted from any plan they are in. Are You Sure?',
		fa: 'شما در حال حذف این دسته و کارهای آن هستید. کارها همچنین از برنامه‌ریزی‌ها حذف خواهند شد. آیا مطمئن هستید؟',
	},
	task: {
		en: 'You are about to delete this task. It will also be deleted from any plan it is in. Are You Sure?',
		fa: 'شما در حال حذف این کار هستید. این کار همچنین از برنامه‌ریزی‌ها حذف خواهد شد. آیا مطمئن هستید؟',
	},
};

export const runTutorial = {
	en: 'Run The Tutorial',
	fa: 'نمایش نحوه‌ی کار با اپلیکیشن',
};

export const tutorialButton = {
	en: [
		'Skip',
		'Done'
	],
	fa: [
		'رد کردن',
		'پایان'
	],
};

export const infoModal = {
	en: 'Done',
	fa: 'پایان',
};

