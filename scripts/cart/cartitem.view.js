define (['jquery', 'backbone'], function ($, Backbone) {
	return CartElementView = Backbone.View.extend({
		
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
});


