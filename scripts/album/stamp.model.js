define (['jquery', 'album/forzatz.model', 'album/stamp.view', 'album/stamp.collect'], 
	function ($, AlbumConst, StampView, StampsCol) {
	
	return AlbumConst = AlbumConst.extend({
		defautls: _.extend(AlbumConst.prototype.defaults, {
			stamp: 'love_story',
			lastStamp:'our_day',
			stampColor: 'blint',
			coverLogo: false,
			coverLogoSet: false
		}),
		
		inits: AlbumConst.prototype.addInits( function(args) {
			
			//Создание и сохранение вьюшки
			this.views['stamp'] = new StampView({ model: this });
			
			//Создание коллекций
			this.stamps = new StampsCol();
			this.stamps.parent = this;
			this.on('load:data', function(){ this.stamps.loadData(); });
			
			//События изменения 
			this.on('changeStamptype', this.changeStamp);
			this.on('changeStampcolor', this.changeStamp);
			this.on('changeStamp', this.changeStamp);
			this.on('setLogo', this.setLogo);
			
			//Загрузка Коллекций
			this.on('load:stamps', this.loadStamps);
			this.on('load:colors', this.loadStampColor);
			
			//Доп коллекции 
			this.stampColor = new Backbone.Collection;
				
		}),
		
		ready: AlbumConst.prototype.addReady(['ready:stamps', 'ready:stampColor'], function(){
			this.views['stamp'].drawLogo().showColors().showLogoInfo().render();
			this.views['boxstamp'].showLogoInfo();
			this.on('change:color', this.validateStamp);
		}),
		
		validateStamp: function(){
			this.views['stamp'].showColors();
		},
		
		changeStamp: function(_data){
			var self = this;
			this.set('backSide', false);
			
			
			switch(_data.type){
				//Смена типа тиснения
				case 'type':
					
					this.set('stamp', _data.index == 0 ? 
							this.get('lastStamp')
						: _data.index == 1 ? 
							this.stamps.find(function(el){ return el.get('name') == 'custom'; }) 
							: null
					);
					
					if( !this.get('boxStampSet') )
						this.set('boxStamp', this.get('stamp') );
						
					this.calcPrice();
					break;
				
				//Смена цвета тиснения	
				case 'color':
					
					var acsepts = this.get('color').get('stamp');
					
					var colors = this.stampColor.filter(function(el){ 
						return _.include(acsepts, el.get('name') );
					});
					
					
					this.set('stampColor', colors[_data.index] );
					
					break;
					
				//Смена тиснения		
				case 'stamp':
					
					var idx = this.stamps.indexOf(this.get('stamp'));
					
					idx += _data.dir;
					
					if(idx == 0)
						idx = this.stamps.length - 2;
					
					if(idx == this.stamps.length - 1)
						idx = 1;
					
					this.set('stamp',  this.stamps.at(idx) );
					this.set('lastStamp',  this.get('stamp') );
					
					if( !this.get('boxStampSet') )
						this.set('boxStamp', this.get('stamp') );
					break;
			}
			
			this.views['stamp'].render().showColors();
			
			this.setURL();
		},
		
		setLogo: function(_data){
			/*if( !this.get('coverLogoSet') ){
				this.view.revertBook();
			}*/
			this.set('backSide', true);
			
			this.set('coverLogoSet', true);
			this.set('coverLogo', _data ? false : true);
			
			this.calcPrice().views['stamp'].showLogoInfo().render();
			this.views['boxstamp'].showLogoInfo();
			this.setURL();
		},
		
		
		loadStamps: function(){
			var self = this;
			
			if( typeof( this.get('stamp') ) == 'number' ){
				var stamp = this.stamps.at( this.get('stamp') );
			} else {
				var stamp = this.stamps.find(function(el){ return el.get('name') == self.get('stamp'); });
			}
			
			this.set('stamp', stamp);
			
			if(stamp != null && stamp.get('name') != 'custom')
				this.set('lastStamp', stamp);
			else	
				this.set('lastStamp', this.stamps.find(function(el){ return el.get('name') == self.get('lastStamp'); }) );
				
			this.set('lastBoxStamp', this.stamps.where({name: this.get('lastBoxStamp') })[0] );
			
			if( typeof ( this.get('boxStamp') ) == 'number' ){
			
				var boxStamp = this.stamps.at( this.get('boxStamp') );
				
				this.set('boxStamp', boxStamp );
				
				if(boxStamp.get('name') != 'custom')
					this.set('lastBoxStamp', this.get('boxStamp') );
					
				this.set('boxStampSet', true);
			} else if( this.get('boxStamp') !== null ) {
			
				this.set('boxStamp', this.get('stamp') );
				this.set('lastBoxStamp', this.get('stamp') );
			}
			
				
			
			
			this.trigger('ready:stamps', 'ready:stamps');
		},
		
		loadStampColor: function(){
			var self = this;
			
			this.stampColor.reset( this.colors.where({ type:'stamp'}) );
			
			if( typeof( this.get('stampColor') ) == 'number' ){
				this.set('stampColor', this.stampColor.at( this.get('stampColor') ) ) ;
				
			} else {
				this.set('stampColor', this.colors.where({type: 'stamp', name: this.get('stampColor') })[0] );
				
			}
			
			this.trigger('ready:stampColor');
			this.trigger('load:boxStampColor');
		},
		
		forzatz_calcPrice: AlbumConst.prototype.calcPrice,
		
		calcPrice: function(extend) {
			
			var wholePrice = this.forzatz_calcPrice(true);
			
			//Цена за тиснение
			var stamp = this.get('stamp');
			if(this.get('doneStep') > 0 && stamp != undefined && stamp.get && this.get('coverType') != 'photo'){
				wholePrice += stamp.get('price');
				
			}
			
			/*if(this.get('coverLogo')) {
				wholePrice += this.stamps.where({name: 'logo'})[0].get('price');
			}*/
			
			if(extend){
				return wholePrice;
			} else {
				this.set('wholePrice', wholePrice);
				return this;
			}
		}
	});
});