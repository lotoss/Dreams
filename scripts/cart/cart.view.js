CartView = Backbone.View.extend({
	events: {
		'click .cart_nav a': 'clickNav',
		'click .next_step': 'nextStep',
		'blur .item_download input' : 'blurInput',
		'keyup .item_download input' : 'keypressInput',
		'click .tabs a': 'changeDelivery',
		'click .order .positive .button_submit': 'pay',
		'click .order .check input' : 'showTotalPrice',
		'click .order .warning_input': function(event){
			$(event.currentTarget).removeClass('warning_input').next().remove();
		}
	},
	 
	initialize: function(){
		
		//Функция рендеринга
		this.renderBooking = _.template( $('#cart_list').html() );
		
		var totalPrice = 0;
		
		this.renderLoading = _.template( $('#cart_item_load').html() );
		
		var tempBook = this.renderBooking({
			total_cost: totalPrice,
			discount: totalPrice * 0.1
		});
		
		this.list = $(tempBook).appendTo(this.$el);
		$( $('#load_list').html() + $('#order_form').html() + $('#done').html()).appendTo(this.$el);
		
		this.changeUser().render();
		
		this.timeout = null;
	},
	
	render: function(){
		var step = this.model.get('activeStep');
		switch(step){
			case 0: 
					this.$('section').hide().filter('.list').show();
				break;	
				
			case 1: 
					this.showLoadList().$('section').hide().filter('.loading').show();
				break;	
				
			case 2: 
					this.$('section').hide().filter('.order').show();
				break;	
			
			case 3: 
					this.$('section').hide().filter('.done').show();
				
		}
		
		if(this.model.get('albums') && this.model.get('albums').length == 0) {
			this.model.set('doneStep',0);
		}
		
		this.$('.cart_nav li').removeClass('done active disable')
			.slice(this.model.get('doneStep') + 2).addClass('disable')
			.end().slice(0, this.model.get('doneStep') + 1).addClass('done')
			.end().eq( this.model.get('activeStep') ).addClass('active');
		
		if(this.model.get('albums') && this.model.get('albums').length == 0) {
			this.$('.cart_nav li').eq(1).addClass('disable');
			this.$('.booking .next_step').addClass('disable');
		} else {
			this.$('.booking .next_step').removeClass('disable');
		}
		
		if (this.model.get('albums') 
			&& this.model.get('albums').length != 0
			&& this.model.get('albums').at(0).get('title') == 'cards' 
			&& this.model.get('albumsReady') ) {
			
			this.$('.cart_nav li').eq(1).hide();
		} else {
			this.$('.cart_nav li').eq(1).show();
		}
		
		if ( this.model.get('albumsReady') == false ) {
			this.$('.cart_nav li').eq(2).addClass('disable');
			this.$('.loading .next_step').addClass('disable');
		} else {
			this.$('.cart_nav li').eq(3).addClass('disable');
			this.$('.loading .next_step').removeClass('disable');
		}
		
		this.$('.delivery').hide().filter( this.model.get('delivery') ).show();
		this.$('.tabs a').filter('[href="'+ this.model.get('delivery') +'"]')
			.parent().addClass('active')
			.siblings().removeClass('active');
			
		if(this.model.get('activeStep') == 3){
			this.$('.cart_nav li').slice(0, 3).toggleClass('disable done');
		}
		
		this.$('#delivery_logo_price span').text( CartOptions.deliveryPrice[this.model.get('delivery')] );
		
		if( this.model.get('cards') ){
			this.$('.card_complect .remove').show();
			this.$('.card_complect .add').hide();
		} else {
			this.$('.card_complect .remove').hide();
			this.$('.card_complect .add').show();
		}
			
		
		
		return this;
	},
	
	//Вывод отображений альбомов
	showList: function(){
		var self = this;
		
		var albums = this.model.get('albums');
		
		var $list = this.list.find('.basket_items');
		
		$list.children().detach();
		albums.each(function(val){	
			if (val.get('title') !== 'cards')
				$list.append(val.view.$el);
		});
		
		$list.append( $('#card_complect').html() );
		return this;
	},
	
	//Подсчет стоимости всех альбомов
	showTotalPrice: function(){
		
		var totalPrice = this.model.getTotalPrice();
		
		//Вывод стоимости и скидки на странице корзины
		this.$('.total_value .price_big span').text(totalPrice);
		this.$('.total_value .discount_mywed span').text(Math.floor(totalPrice * CartOptions.dicsPro ) );
		
		if( this.model.get('user') && this.model.get('user').discount ) {
			this.$('.discount_mywed.pro').hide();
			this.$('.discount_mywed.free').show();
		} else {
		
			this.$('.discount_mywed.pro').show();
			this.$('.discount_mywed.free').hide();
		}
		
		//Расчет оплаты с учетом доставки 
		totalPrice += CartOptions.deliveryPrice[this.model.get('delivery')];
		
		var toPay =  this.model.get('user') ? (this.model.get('user').discount ? Math.ceil( totalPrice * (1-CartOptions.dicsPro)) : totalPrice ): totalPrice;
		
		//Вывод оплаты, средств на счету и остатка после оплаты на странице заказа
		this.$('.total .price_big span').text(toPay);
		this.$('.total p .balance').text(this.model.get('user').money);
		
		//Проверка остатка на счету и выбор сообщения 
		if(this.model.get('user').money - toPay >= 0 ){
			//При положительном остатке
			this.$('.positive').show();
			this.$('.negative').hide();
			
			//Вывод остатка после оплаты на странице заказа
			this.$('.total p .rest').text(this.model.get('user').money - toPay);
			
			//Проверка требования согласия с условиями
			if( this.$('.order .check input').is(':checked') )
				this.$('.positive .total .button_submit').removeClass('disable');
			else 
				this.$('.positive .total .button_submit').addClass('disable');
		} else {
			//При отрицательном остатке
			this.$('.positive').hide();
			this.$('.negative').show();
			
			//Вывод остатка после оплаты на странице заказа
			this.$('.total p .rest').text( -(this.model.get('user').money - toPay) );
		}
		
		return this;
	},
	
	showLoadList: function(){
		var $load_list = this.$('.loading .basket_items'),
			self = this,
			albums = this.model.get('albums'),
			first = true,
			cardsFlag = false;
		
		$load_list.children().detach();
		
		albums.each(function(val){	
			if( val.get('title') == 'cards' ) {
				cardsFlag = val;
				return;
			}
				
			$load_list.append( self.renderLoading({
				title: val.get('title'),
				img: val.get('img'),
				logo: (val.get('stampLogo') == 'Да' || val.get('boxStampLogo') == 'Да') ? true : false,
				first: first,
				link: val.get('link') || false
			}) );
			
			first = false;
		});
		
		
		if(!cardsFlag) 
			return this;
		
		$load_list.append( self.renderLoading({
				title: 'Комплект карточек с образцами ткани и кожи',
				img: false,
				logo: cardsFlag.get('stamp'),
				first: first,
				link: cardsFlag.get('stamp') ? (cardsFlag.get('link') || false) : 'disable'
			}) );
		
		return this;
	},
	
	blurInput: function(event){
	
		clearTimeout(this.timeout);
		this.model.trigger('addLink', {event: event});
		return false;
	},
	
	keypressInput: function(event){
		var self = this;
		clearTimeout(this.timeout);
		this.timeout  = setTimeout(function(){ 
			$(event.currentTarget).blur();
		}, 500); 
	},
	
	clickNav: function(event){
		event.preventDefault();
		var $this = $(event.currentTarget);
		if(  $this.parent().is('.active, .disable') )
			return;
		
		this.model.trigger('navigation', { event: event, context: event.currentTarget } );
	},
	
	nextStep: function(event) {
		event.preventDefault();
		
		if( $(event.currentTarget).hasClass('disable') )
			return;
		
		
	},
	
	changeUser: function(){
		var user = this.model.get('user');
		if(user !== undefined) {
			this.$('[name="firstname"]').val(user.firstname);
			this.$('[name="surename"]').val(user.surename);
			this.$('[name="phone"]').val(user.phone);
			this.$('[name="email"]').val(user.email);
		}
		
		
		return this;
	},
	
	changeDelivery: function(event){
		event.preventDefault();
		this.model.trigger('changeDelivery', $(event.currentTarget).attr('href') ); 
		
	},
	
	pay: function(event){
		event.preventDefault();
		
		if( $(event.currentTarget).is('.disable') )
			return;
			
		var $inputs = this.$('.order select, .order input, .order textarea'),
			data = {},
			valide = true;
			
		//валидация данных
		$inputs.slice(0, 4).each( function() {
			if($(this).is('.requare')){
				if( $(this).val() === '' ){
					valide = false;
					$(this).addClass('warning_input').after('<div class="warning_text">Заполните поле</div>');
				} else {
					data[$(this).attr('name')] = $(this).val();
				}
			} else {
				if( $(this).val() !== '' )
					data[$(this).attr('name')] = $(this).val();
			}
			
		});
		
		data['delivery'] = this.model.get('delivery');
		
		$inputs.filter(data['delivery']+' *').each(function(){
			if($(this).is('.requare')){
				if( $(this).val() === '' ){
					valide = false;
					$(this).addClass('warning_input').after('<div class="warning_text">Заполните поле</div>');
				} else {
					data[$(this).attr('name')] = $(this).val();
				}
			} else {
				if( $(this).val() !== '' )
					data[$(this).attr('name')] = $(this).val();
			}
		});
		
		if (valide) {
			this.model.trigger('pay', data);
			this.$('.total .button_submit').addClass('disable');
		}
			
	}
	
});

CardsComplectView = Backbone.View.extend({
	
	events: {
		
	}, 
	
	initialize: function(){
		
	}
	
});