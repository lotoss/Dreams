//Application options
options = {
	popupCollUrl: '/ajax/popups',
	dataUrl: '/ajax/data',
	citiesUrl: '/city', 	
	
	stampsImgSrc: '/images/dreamsalbum/uploads/stamps',
	colorsFolder: '/images/dreamsalbum/uploads/materials',
	forzatzFolder: '/images/dreamsalbum/uploads/forsatz',
	boxesFolder: '/images/dreamsalbum/uploads/boxes',
	formatSizes: {
		'big_square' : [29, 29],
		'small_square' : [19, 19],
		'big_rect' : [34, 28.5],
		'small_rect' : [24.5, 21]
	}
}
/**
* Пользователя можно задать либо в начале при загрузке 
* страницы (если он загружает страницу авторизованным), 
* либо после авторизации вызвав метод window.cart.set('user', UserData)
*/
/*window.user = {
	id: 10,
	firstname: 'Александр',
	surename: 'Прокопенко',
	phone: '+380637268477',
	email: 'donald-dack@mail.ru',
	money: 25340,
	discount: true
}*/

//Delivery region list
window.regions = [
	[1, 'Московский'],
	[2, 'Питерский'],
	[3, 'Питерский2']
];

//Cart Options
CartOptions = {
	dicsPerBigPtoto: 300,
	dicsPerAlbum: 500,
	dicsPro: 0.1,
	
	label: {
		coverType: 'Обложка',
		coverColor: 'Цвет',
		coverFormat: 'Формат',
		coverPage: 'Количество страниц',
		stampType: 'Тиснение на обложке',
		stampColor: 'Цвет тиснения',
		stampLogo: 'Логотип фотографа',
		boxType: 'Короб',
		boxColor: 'Цвет',
		boxStampType: 'Тиснение на коробе',
		boxStampColor: 'Цвет тиснения',
		boxStampLogo: 'Логотип фотографа',
		forzatz: 'Форзац',
		paperType: 'Бумага'
	},
	
	value: {
		coverFhoto: 'Фотообложка',
		stampLogoPrice: 500,
		paperType: ['Обычная', 'LayFlat']
	},
	
	url: 'cart',
	order: 'order',
	
	deliveryPrice: {
		'#office': 0,
		'#moskow': 300,
		'#russia': 0,
		'#present': 300
	},
	
	coverCards: {
		price: 1900,
		coverCardStampPice: 500,
		slider: [	'images/dreamsalbum/uploads/cards/alot24.jpg',
					'images/dreamsalbum/uploads/cards/alot25.jpg',
					'images/dreamsalbum/uploads/cards/alot26.jpg',
					'images/dreamsalbum/uploads/cards/white11.jpg',
					'images/dreamsalbum/uploads/cards/white12.jpg' 	]
	} 
		
};


requirejs.config({
	paths: {
		'jquery' 		: 	'/scripts/libs/jquery-1.8.2.min',
		'jquery.selectbox' 		: 	'/scripts/libs/jquery.selectBox.min',
		'underscore' 	: 	'/scripts/libs/underscore-min',
		'backbone' 		: 	'/scripts/libs/backbone-min'

	},

	shim: {

		'jquery.selectbox': {
			deps: ['jquery'],
			exports: 'jQuery.fn.selectBox'
		},
		
		'underscore' : {
			exports: '_'
		},

		'backbone' : {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		}

	},

});


requirejs(['jquery', 'application', 'jquery.selectbox'], function ( $, Application) {
	$(function() {
		
		Backbone.emulateHTTP = true;
		window.application = new Application();
	
		//Социальные ссылки
		$('.socials a').click(function(event){
			event.preventDefault();
		});
		
		$("select").selectBox();
		
		$(window).bind('hashchange', function(event) {
	    	event.preventDefault();
		});
	});

});



