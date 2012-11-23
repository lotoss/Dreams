Backbone.emulateHTTP = true;
//Список альбомов в корзине
CartElement = Backbone.Model.extend({
	urlRoot: CartOptions.url,
	
	initialize: function(){
		
		if(!this.id && this.get('title') != 'cards' )
			this.parseData();
		
		this.on('changeQuant',this.changeQuant);
		
		this.view = new CartElementView({ model: this });
	},
	
	defaults: {
		cover_id: null,
		color_id: null,
		forzatz_id: null,
		stamp_id: null,
		stamp_color_id: null,
		box_id: null,
		box_stamp_id: null,
		box_stamp_color_id: null,
		cards: null,
		cardsStamp: null
		
	},
	
	//Events
	editAlbum: function(){
		this.collection.parent.trigger('editAlbum', this.attributes );
	},
	
	changeQuant: function(data){
		var quantity = this.get('quantity') + data.diff;
		if(quantity < 1) quantity = 1;
		this.set('quantity', quantity);
		this.save({
			quantity: this.get('quantity')
		});
		this.view.renderQuant().renderPrice();
		this.collection.parent.view.showTotalPrice();
	},
	
	deleteAlbum: function(){
		var self = this;
		
		Backbone.sync('delete', this, { url: this.urlRoot + '/' + this.id ,
			success: function(){
				
				//Удаление модели, элемента и перерисовка корзины 
				var model = self.collection.parent;
				self.collection.remove(self);
				model.view.showTotalPrice().render();
				self.view.$el.fadeOut('fast', function(){
					$(this).remove();
				});
				
			}
		});
		
		
		
	},
	
	getTotalPrice: function(){
		return this.get('quantity') * this.get('wholePrice') - (this.get('quantity') - 1) * this.get('discPerAlbum');
	},
	
	//Преобразование данных
	parseData: function(){
		
		if (this.get('cards') === true)
			return this;
		
		var data = this.defaults;
		
		var color = this.attributes['color'];
		var cover = this.attributes['cover'];
		
		//Заголовок и изображение
		data['title'] = cover.get('labels').format[0] + ' в ' + color.get('labels')[0];
		data['img'] = options.colorsFolder + '/' + color.get('src');
		
		//Покрытие
		data['coverType'] = cover.get('labels').type;
		data['paperType'] = this.attributes['paperType'];
		
		data['coverFormat'] = cover.get('labels').format[0] + ' ' + cover.get('labels').format[1];
		data['coverColor'] = color.get('title');
		data['coverFormatPrice'] = cover.get('basePrice');
		data['coverPage'] = this.attributes['pages'];
		console.log(cover)
		/*var addPages = this.get('pages') - this.activeCover.get('default');
		addPages = addPages < 0 ? 0 : addPages;
		
		var wholePrice = this.activeCover.get('basePrice') + addPages  * this.activeCover.get('pagePrice');*/
		var addPages = this.attributes['pages'] - cover.get('default');
		addPages = addPages < 0 ? 0 : addPages;
		data['coverPagePrice'] = addPages  * cover.get('pagePrice');
		data['cover_id'] = cover.get('cover_id');
		data['color_id'] = color.get('color_id');
		/*data['forzatz_id'] = 0;
		data['stamp_id'] = 0;
		data['stamp_color_id'] = 0;*/
		
		if( cover.get('type') == 'photo' ){
			//Форзац
			var forzatz = this.attributes['forzatz'];
			data['forzatz'] = forzatz.get('labels');
			data['forzatzPrice'] = forzatz.get('price')[cover.get('format')];
			data['forzatz_id'] = forzatz.get('forzatz_id');
		} else {
			
			//Тиснение
			var stamp = this.attributes['stamp'];
			
			data['stampType'] = 'Нет';
			if(stamp !== null){
				data['stampType'] = stamp.get('labels')[0];
				data['stampSystType'] = stamp.get('labels')[1];
				data['stamp_id'] = stamp.get('stamp_id');
				data['stampColor'] = this.attributes['stampColor'].get('title');
				data['stamp_color_id'] = this.attributes['stampColor'].get('stamp_color_id');
				if( stamp.get('price') )
					data['stampPrice'] = stamp.get('price');
			}
		}
		
		//Логотип фотографа
		data['stampLogo'] = this.attributes['coverLogo'] ? 'Да' : 'Нет';
		data['stampLogoPrice'] = this.attributes['coverLogo'] ?  CartOptions.value.stampLogoPrice : 0;
		
		//Короб
		var box = this.attributes['box'];
		data['boxType'] = 'Нет';
		/*data['box_id'] = 0;
		data['box_stamp_id'] = 0;
		data['box_stamp_color_id'] = 0;*/
		if(box !== null){
			data['title'] += ',<br/>' + box.get('labels')[0].toLocaleLowerCase();   
			data['boxType'] = box.get('labels')[0];
			data['boxColor'] = box.get('labels')[1];
			data['boxPrice'] = box.get('price');
			data['box_id'] = box.get('box_id');
			if(box.get('type') == 'box'){
				data['boxPrice'] = (cover.get('format') == 'big_rect' || cover.get('format') == 'big_square') ? data['boxPrice']['big'] : data['boxPrice']['small'];
			}
			
			//Тиснение на коробе
			if (box.get('type') == 'cofr') {
				if (this.attributes['boxStampSet']) {
					var boxstamp = this.attributes['boxStamp'];
					data['box_stamp_id'] = 0;
					data['boxStampType'] = 'Нет';
					if(boxstamp !== null){
						data['boxStampType'] = this.attributes['boxStampSet'] ? boxstamp.get('labels')[0] : data['stampType'];
						data['box_stamp_id'] = boxstamp.get('stamp_id');
					}
				} else{
					data['boxStampType'] = data['stampType'];
				}
				
				data['boxStampColor'] = this.attributes['boxStampColor'].get('title');
				data['box_stamp_color_id'] = this.attributes['boxStampColor'].get('stamp_color_id');
				
				if(boxstamp && boxstamp.get('name') == 'custom' )
					data['boxStampPrice'] = data['stampPrice'] ? 0 : boxstamp.get('price');
				
				data['boxStampLogo'] = this.attributes['boxLogo'] ? 'Да' : 'Нет';
				data['boxStampLogoPrice'] = this.attributes['boxLogo'] ? (CartOptions.value.stampLogoPrice - data['stampLogoPrice']) : 0;
			}
		}
		
		
		data['quantity'] = 1;
		data['wholePrice'] = this.attributes['wholePrice'];
		data['discPerAlbum'] = cover.get('discPerAlbum');
		data['url'] = this.attributes['url'];
		
		this.clear().set(data);
		
		return this;
	}
});

CartElementView = Backbone.View.extend({
	
	events:{
		'click .item_contents, .item_state': 'showDetails',
		'click .item_edit': 'editAlbum',
		'click .item_delete': 'deleteAlbum',
		'click .ctr .dec, .ctr .inc' : 'changeQuant',
		'mousedown  .ctr .dec, selectstart  .ctr .dec' : function() {return false;},
		'mousedown  .ctr .inc, selectstart  .ctr .inc' : function() {return false;}
	},
	
	initialize: function(){
		
		//Инициализация шаблонных функций
		this.renderCartProperty =  _.template( $('#cart_item_property').html() );
		this.renderCartItem =  _.template( $('#cart_item').html() );
		
		//Генерация представления
		this.setElement( this.model.get('title') !== 'cards' ? $( this.getCartItem() ) : $('#card_complect').html() );
		
		
	},
	
	renderQuant: function(){
		this.$('.items_quantity .quan').val( this.model.get('quantity') + ' шт.' );
		return this;
	},
	
	renderPrice: function(){
		
		this.$('.items_cost span').text( this.model.getTotalPrice() );
		return this;
	},
	
	//Установка св-в обложки
	getItemCoverProps: function(album){
		var attributes = [];
		
		//Тип Обложки
		attributes.push( {
			key: CartOptions.label.coverType,
			value: album.get('coverType'),
			price: 0
		} );
		
		//Тип бумаги
		attributes.push( {
			key: CartOptions.label.paperType,
			value: CartOptions.value.paperType[album.get('paperType') ? 1 : 0],
			price: 0
		} );
		
		//Цвет Обложки
		if (album.get('coverType') != CartOptions.value.coverFhoto) {
			attributes.push( {
				key: CartOptions.label.coverColor,
				value: album.get('coverColor'),
				price: 0
			} );
		}
		
		
		//Формат Обложки
		attributes.push( {
			key: CartOptions.label.coverFormat,
			value: album.get('coverFormat'),
			price: album.get('coverFormatPrice')
		} );
		
		//Страницы
		attributes.push( {
			key: CartOptions.label.coverPage,
			value: album.get('coverPage'),
			price: album.get('coverPagePrice')
		} );
		
		//Форзац
		
		if (album.get('coverType') == CartOptions.value.coverFhoto) {
			attributes.push( {
				key: CartOptions.label.forzatz,
				value: album.get('forzatz'),
				price: album.get('forzatzPrice')
			} );
		}
		
		//Тиснение
		if (album.get('coverType') != CartOptions.value.coverFhoto) {
			
			attributes.push( {
				key: CartOptions.label.stampType,
				value: album.get('stampType'),
				price: album.get('stampPrice')
			} );
			
			if(album.get('stampType') != 'Нет'){
				attributes.push( {
					key: CartOptions.label.stampColor,
					value: album.get('stampColor'),
					price: 0
				} );
			}
			
			
			attributes.push( {
				key: CartOptions.label.stampLogo,
				value: album.get('stampLogo'),
				price:  album.get('stampLogoPrice') 
			} );
		
		}
		
		return attributes;
	},
	
	//Установка св-в короба
	getItemBoxProps: function(album){
		var attributes = [];
		
		//Тип Коробки
		attributes.push( {
			key: CartOptions.label.boxType,
			value: album.get('boxType'),
			price: album.get('boxPrice') || 0
		} );
		
		if (album.get('boxType') != 'Нет'){
			attributes.push( {
				key: CartOptions.label.boxColor,
				value: album.get('boxColor'),
				price: 0
			} );
		}
		
		//Тиснение на коробе
		if (album.get('boxType') != 'Нет' && album.get('boxStampType') !== undefined) {
			attributes.push( {
				key: CartOptions.label.boxStampType,
				value: album.get('boxStampType'),
				price: (album.get('boxStampType') == 'Свое' && album.get('stampType') != 'Свое') ? album.get('stampPrice') : 0
			} );
			if (album.get('boxStampType') != 'Нет') {
				attributes.push( {
					key: CartOptions.label.boxStampColor,
					value: album.get('boxStampColor'),
					price: album.get('boxStampPrice') || 0
				} );
			}
			
			attributes.push( {
				key: CartOptions.label.boxStampLogo,
				value: album.get('boxStampLogo'),
				price: album.get('boxStampLogoPrice') || 0
			} );
		}
		
		/*
		boxStampType: 'Тиснение на коробе',
		boxStampColor: 'Цвет тиснения',
		boxStampLogo: 'Логотип фотографа',*/
		
		return attributes;
	},
	
	//Возврат сгенерированного HTML
	getCartItem: function(){
		var album = this.model;
		
		//Заполнение свойств
		var coverProps = this.getItemCoverProps(album);
		var boxProps = this.getItemBoxProps(album);
		
		
		//Рендеринг свойств
		var coverPropsHTML = '', boxPropsHTML = '';
		for (var i = 0; i < coverProps.length; i++) {
			coverPropsHTML += this.renderCartProperty( coverProps[i] );
		}
		
		for (var i = 0; i < boxProps.length; i++) {
			boxPropsHTML += this.renderCartProperty( boxProps[i] );
		}
		
		//Рендеринг элемента
		var item = this.renderCartItem({
			title: album.get('title'),
			quantity: album.get('quantity'),
			sale_per_element: album.get('discPerAlbum'),
			total_price: album.getTotalPrice(),
			image_url: album.get('img'),
			property_album: coverPropsHTML,
			property_box: boxPropsHTML
		});
		
		return item;
	},
	
	showDetails: function(event){
		event.preventDefault();
		var $this = $(event.currentTarget);
		
		$this.closest('.item').toggleClass('open');
	},
	
	deleteAlbum: function(event){
		event.preventDefault();
		var $this = $(event.currentTarget);
		
		this.model.deleteAlbum();
	},
	
	editAlbum: function(event){
		event.preventDefault();
		var $this = $(event.currentTarget);
		
		this.model.editAlbum();
	},
	
	changeQuant: function(event){
		event.preventDefault();
		var $this = $(event.currentTarget);
		
		if( $this.hasClass('inc') ){
			this.model.trigger('changeQuant', { diff: 1} );
		} else {
			this.model.trigger('changeQuant', { diff: -1} );
		}
	}
	
});


//Коллекция альбомов
CartColl = Backbone.Collection.extend({
	model: CartElement,
	url: CartOptions.url,
	
	initialize: function(){
		
		var self = this;
		
		this.on('add', this.syncAdd);
		this.on('remove', this.change);
		
		
		if(option.cart){
			this.reset(option.cart);
			
		} else {
			this.fetch({success: function(){
				self.parent.view.showList();
				this.change();
			}});
		}
		
		
	},
	
	syncAdd: function(model, collection){
		var self = this;
		
		model.save({}, {
			success: function cartCollSave(model, response){
				model.set('id', response.id);
				
			}
		});
	},
	
	change: function() {
		
		var quant = this.parent.get('cards') ? this.models.length - 1 : this.models.length;
		
		var ending = quant == 1 ? '' : (quant > 1 && quant < 5) ? 'а' : 'ов';
		$('#control .cart span').text( quant ? ('('+ quant +' альбом'+ ending +')') : '(пусто)');
	}, 
	
	comparator: function(el1, el2){
		if(el1.get('last') == 1)
			return 1;
		if(el2.get('last') == 1)
			return -1;		
		return 0;
	}
	
});
