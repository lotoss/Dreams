define (['jquery', 'album/stamp.model', 'album/box.view', 'album/color.collect'], function ($, AlbumConst, BoxView, BoxesCol) {
	
	return AlbumConst = AlbumConst.extend({
		defautls: _.extend(AlbumConst.prototype.defaults, {
			box: null
		}),
		
		inits: AlbumConst.prototype.addInits( function(args) {
			
			
			//Создание и сохранение вьюшки
			this.views['box'] = new BoxView({ el: $('#box'), model: this });
			
			//Создание коллекций
			this.boxes = new BoxesCol();
			this.boxes.parent = this;
			this.on('load:data', function(){ this.boxes.loadData();});
			
			//События изменения 
			this.on('changeBoxType', this.changeBoxType);
			this.on('changeBoxColor', this.changeBoxColor);
			
			//Загрузка Коллекций
			this.on('load:boxes', this.loadBoxes);
			
			this.boxColors = new Backbone.Collection;
		}),
		
		ready: AlbumConst.prototype.addReady('ready:boxes', function(){
			this.validateBox();
			this.views[3].showBoxInfo().render();
			this.on('change:color', this.validateBox);
			this.on('change:cover', this.validateBox);
		}),
		
		//Box events
		changeBoxType: function(data){
			
			var type = data == 0 ? 'box' : data == 1 ? 'cofr' : null;
			
			if(!type) {
				this.set('box', null);
			} else {
				this.boxColors.reset( this.boxes.filter(function(el){ return el.get('type') == type; }) );
				this.boxColors.comparator = function(chapter){
					 return chapter.get('order');
				}
				if (type == 'cofr') {
					var acsepts = this.get('color').get('cofr');
					this.boxColors.reset( this.boxColors.filter( function (el){ 
						if( _.include( acsepts, el.get('name') ) ){
							el.set('order', _.indexOf(acsepts,  el.get('name') ) ); 
							return true; 
						}
						return false;
					}) );
				}
				
				if( this.boxColors.indexOf(this.get('box')) == -1)
					this.set('box', this.boxColors.at(0) );
			}
			
			this.calcPrice();
			this.views[3].showBoxInfo().showNav().render();
			
			this.setURL();
		},
		
		validateBox: function(){
			
			var boxType = this.get('box');
			boxType = !boxType ? 2 : boxType.get('type') == 'box' ? 0 : 1
			this.changeBoxType(boxType);
				
			/*if(this.get('coverType') == 'photo' && this.get('box') && this.get('box').get('type') == 'cofr' ){
				
				this.boxColors.reset( this.boxes.where({type: 'box'}) );//filter(function(el){ return el.get('type') == 'box'; }) );
				
				this.set('box', this.boxColors.at(0) );
				this.view.showBoxInfo();
			}*/
			this.views[3].showBoxInfo();
			return this;
		},
		
		changeBoxColor: function(data){
			
			this.set('box', this.boxColors.at(data) );
			
			this.view.showBoxInfo().render();
			
			this.setURL();
		},
		
		
		loadBoxes: function(){
			var self = this;
			//Установка по умолчанию, замена значений объектами
			
			
			if(self.get('box') !== null){
				
				if( typeof(self.get('box')) == 'number'){
					var box = this.boxes.at(self.get('box'))
				} else {
					var box = this.boxes.filter(function(el){ return el.get('name') == self.get('box'); });
				}
				
				
				if( $.isArray(box) ){
					var cover = this.get('coverType');
					
					
					
					if(cover != 'photo' && box.length > 1)
						box = box[1];
					else
						box = box[0];
				}
				
				this.set('box', box);
				
				var type = this.get('box').get('type');
				
				this.boxColors.reset( this.boxes.filter(function(el){ return el.get('type') == type; }) );
				
			}
			
			this.trigger('ready:boxes', 'ready:boxes');
			
		},
		
		stamp_calcPrice: AlbumConst.prototype.calcPrice,
		
		calcPrice: function(extend) {
			
			var wholePrice = this.stamp_calcPrice(true);
			
			//Цена за короб
			if( this.get('doneStep') > 1 &&  this.get('box')){
				var box = this.get('box');
				if(box.get('type') != 'box')
					wholePrice += box.get('price');
				else if(this.get('format') == 'big_square' || this.get('format') == 'big_rect')
					wholePrice += box.get('price').big;
				else {
					wholePrice += box.get('price').small;
				}
			}
			
			if(extend){
				return wholePrice;
			} else {
				this.set('wholePrice', wholePrice);
				return this;
			}
		}
		
		
	});
});