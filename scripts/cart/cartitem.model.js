//Список альбомов в корзине
define (['jquery', 'backbone', 'cart/cartitem.view'], function ($, Backbone, CartElementView) {
	return CartElement = Backbone.Model.extend ({
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
			console.log(data['paperType'], this.attributes['paperType'])
			data['coverFormat'] = cover.get('labels').format[0] + ' ' + cover.get('labels').format[1];
			data['coverColor'] = color.get('title');
			data['coverFormatPrice'] = cover.get('basePrice');
			data['coverPage'] = this.attributes['pages'];
			data['coverPagePrice'] = ( this.attributes['pages'] - cover.get('minPage') ) * cover.get('pagePrice');
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
});



