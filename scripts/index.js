options = {
	//colorCollUrl: '/ajax/colors',
	//coverCollUrl: '/ajax/covers',
	popupCollUrl: '/ajax/popups',
	/*forzatzCollUrl: '/ajax/forzatz',
	stampsUrl: '/ajax/stamps',
	boxesUrl: '/ajax/boxes',*/
	dataUrl: '/ajax/data',
	
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
window.user = {
	id: 10,
	firstname: 'Александр',
	surename: 'Прокопенко',
	phone: '+380637268477',
	email: 'donald-dack@mail.ru',
	money: 25340,
	discount: true
}



debug = '';
//debug = 'InitsDebug';

jQuery(function(){
	//Точка запуска приложения
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

