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




Cart = Backbone.Model.extend({
	defaults: {
		user: window.user,
		activeStep: 0,
		doneStep: 0,
		albumsReady: false,
		delivery: '#office',
		cards: false,
		cardsStamp: false,
		cardsStampChecked: false
		
	},
	
	initialize: function(){
		this.view = new CartView({el: $('#basket'), model: this });
		this.set('albums', new CartColl() ) ;
		this.get('albums').parent = this;
		
		
		this.addCardsPopup();
		this.view.showList().showTotalPrice();
		
		this.on('editAlbum', this.editAlbum);
		this.on('navigation', this.navigation);
		this.on('addLink', this.addLink);
		this.on('change:user', this.changeUser);
		this.on('changeDelivery', this.changeDelivery);
		this.on('pay', this.pay);
		this.on('change:cards', this.changeCards);
		
		this.on('change:user', function(){
			console.error('change:user');
			console.log(this.get('user'));
		});
		
		this.get('albums').change();
		this.validateAlbums();
	},
	
	changeUser: function() {
		album.view.render();
		this.view.changeUser().showTotalPrice();	
	},
	
	addAlbum: function(){
		if(window.album.id === undefined){
			this.get('albums').add(window.album.attributes);
			this.get('albums').change();
		} else {
			
			var album = this.get('albums').where({id: window.album.id})[0];
			
			album.clear({silent: true}).set(window.album.attributes).parseData().set('id',  window.album.id).view.initialize();
			album.save();
		}
		
		this.view.showList().showTotalPrice();
		this.openCart();
	},
	
	openCart: function() {
		blockC.show('basket');	
		$('#control li').removeClass('active').eq(1).addClass('active');
		this.set({activeStep: 0, doneStep: 0}).view.render();
	},
	
	editAlbum: function(params) {
		this.parent.trigger('editAlbum', params);
	},
	
	navigation: function(option) {
		var idx = $(option.event.currentTarget).parent().index();
		
		this.set('activeStep', idx);
		if( this.get('activeStep') > this.get('doneStep') ) {
			this.set('doneStep', this.get('activeStep') );
		}
		this.validateAlbums();
		
	},
	
	//Подсчет стоимости всех альбомов
	getTotalPrice: function(){
		var albums = this.get('albums');
		var totalPrice = 0;
		
		albums.each(function(val){
			totalPrice += val.getTotalPrice();
		});
		
		if( this.get('cards') ){
			totalPrice += CartOptions.coverCards.price;
			if( this.get('cardsStamp') )
				totalPrice += CartOptions.coverCards.coverCardStampPice;
		}
		
		return totalPrice;
	},
	
	addLink: function(option) {
		var $this = $(option.event.currentTarget),
			idx = $this.closest('.basket_items li').index();
			
		this.get('albums').at(idx).set('link', $this.val() == '' ? undefined :  $this.val() ).save();
		
		this.validateAlbums();
	},
	
	validateAlbums: function() {
		var albums = this.get('albums');
		var albumsReady = true;
		albums.each(function(val) {
			if( !val.get('link') &&  !(val.get('cards') == true && val.get('cardsStamp') == false) )
				albumsReady = false;
		});
		
		this.set('albumsReady', albumsReady);
		this.view.render();
	},
	
	changeDelivery: function(method){
		this.set('delivery', method).view.render().showTotalPrice();
	},
	
	pay: function(data) {
		var self = this;
		
		//Информация о объектах заказа
		data.albums = [];
		this.get('albums').forEach(function(el){
			data.albums.push(el.attributes);
		});
				
		$.post(CartOptions.order, data, function payCallback(data){
			if(data.status == 'ok') {
				self.view.$('section.done .item_title span').text(data.order_id);
				self.view.$('section.done .done').show();
				self.view.$('section.done .success').hide();
				
				self.set('activeStep', 3).view.render();
				self.get('albums').forEach(function(el){
					if(el.get('title') != 'cards')
					el.deleteAlbum();
				});
				
				self.set({
					cards: false,
					cardsStamp: false,
					cardsStampChecked: false
				});
				
				setTimeout( function() {
					if (data.redirect)
						window.location.href = data.redirect;
				}, 2000);
				
				
			}
		}, 'json');
		
			
	},
	
	changeCards: function(){
		if( this.get('cards') ) {
			this.get('albums').add({
				title: 'cards',
				wholePrice: 0,
				quantity: 1,
				cardsStamp: this.get('cardsStamp'),
				cards: true,
				discPerAlbum: 0, 
				last: '1'
			});
			this.validateAlbums();
			this.view.render();
		} else {
			this.get('albums').where({title: 'cards'})[0].deleteAlbum();
		}
	},
	
	addCardsPopup: function(){
		var self = this;
		popupC.popups.add({
			'name': 'popupcards',
			'content': $('#cards-popup').html(),
			'slider': CartOptions.coverCards.slider
		});
		
		popupC.view.renderCards = function(){
			this.$('.price_small span').text(
				CartOptions.coverCards.price + ( cart.get('cardsStamp') ? CartOptions.coverCards.coverCardStampPice : 0 )
			);
			
			if( cart.get('cardsStampChecked') == false ) {
				this.$('.app_nav li').eq(1).hide();
			} else {
				this.$('.app_nav li').eq(1).show();
			}
			
			this.$('.app_nav li').eq( cart.get('cardsStamp') ? 0 : 1).addClass('active')
				.siblings().removeClass('active');
			
		};
		
		//Выбор тиснения на карточках
		popupC.view.events['click .app_nav a'] = function(event){
			event.preventDefault();
			
			if( $(event.currentTarget).parent().index() === 0)
				cart.set('cardsStamp', true);
			else 
				cart.set('cardsStamp', false);
			
			cart.set('cardsStampChecked', true);
			
			this.renderCards();
		
		};
		
		//Добавление набора карточек в заказ
		popupC.view.events['click .button_submit'] = function(event){
			event.preventDefault();
			cart.set('cards', true);
			cart.view.render().showTotalPrice();
			$('#popup .window, #overlay').fadeOut(300);
			window.route.navigate('cart');
		};
		
		//Коррекция закрытия попака карточек
		popupC.view.events['click .close'] = function(event){
			event.preventDefault();
			
			if(this.model.get('name') == 'popupcards') {
				this.overlay.fadeOut(300);
				this.window.fadeOut(300);
				window.route.navigate('cart');
			} else {
				this.hide();
			}
				
		};
		popupC.view.delegateEvents();
		
		//Удаление карточек из списка
		this.view.events['click .card_complect .remove a'] = function(event){
			event.preventDefault();
			cart.set('cards', false);
			cart.view.render().showTotalPrice();
			
		};
		
		this.view.delegateEvents();
		
		//Установка параметров карточек корзины
		var cards = this.get('albums').where({title: 'cards'});
		if(cards.length) {
			this.set('cards', true);
			this.set('cardsStampChecked', true);
			if (cards[0].get('stamp') )
				this.set('cardsStamp', true);
		}
	}
	
});



