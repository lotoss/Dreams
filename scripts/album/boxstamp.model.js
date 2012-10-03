AlbumConst = AlbumConst.extend({
	
		
	defautls: _.extend(AlbumConst.prototype.defaults, {
		boxStamp: null,
		lastBoxStamp: 'our_day',
		boxStampColor: 'blint',
		boxLogo: false,
		boxLogoSet: false,
		boxStampSet: false,
		/*boxStampColorSet: false,*/
		firstOpen: true
	}),
	
	inits: AlbumConst.prototype.addInits( function(args) {
		
		
		//Создание и сохранение вьюшки
		this.views.push( new BoxStampView({ el: $('#boxstamp'), model: this }) );
		
		//События изменения 
		this.on('changeBoxStampType', this.changeBoxStamp);
		this.on('changeBoxStampColor', this.changeBoxStamp);
		this.on('changeBoxStamp', this.changeBoxStamp);
		this.on('setBoxLogo', this.setBoxLogo);
		
		
		
		
		//Загрузка Коллекций
		this.on('load:boxStampColor', this.loadBoxStampColor);
	}),
	
	ready: AlbumConst.prototype.addReady(['ready:stamps', 'ready:boxStampColor'] , function(){
		
		this.views[4].drawLogo().showLogoInfo().render().showColors();
		//this.on('change:stampColor', this.validateStampColor);
		this.on('change:box', this.validateStampColor);
	}),
	
	//BoxStampView Events
	changeBoxStamp: function(_data){
		
		var self = this;
		switch(_data.type){
			//Смена типа тиснения
			case 'type':
				
				
				this.set('boxStamp', _data.index == 0 ? 
						this.get('lastBoxStamp')
					: _data.index == 1 ? 
						this.stamps.find(function(el){ return el.get('name') == 'custom'; }) 
						: null
				);
				
				this.set('boxStampSet', true);
				
				this.calcPrice();
				break;
			
			//Смена цвета тиснения	
			case 'color':
				
				var acsepts = this.get('box').get('stamp');

				var colors = this.stampColor.filter(function(el){ 
					return _.include(acsepts, el.get('name') );
				});
				
				this.set('boxStampColor', colors[_data.index] );
				this.set('boxStampColorSet', true);
				break;
				
			//Смена тиснения		
			case 'stamp':
				
				var idx = this.stamps.indexOf(this.get('boxStamp'));
				
				idx += _data.dir;
				
				if(idx == 0)
					idx = this.stamps.length - 2;
				
				if(idx == this.stamps.length - 1)
					idx = 1;
				
				this.set('boxStamp',  this.stamps.at(idx) );
				this.set('lastBoxStamp',  this.get('boxStamp') );
				
				this.set('boxStampSet', true);
				
				break;
		}
		
		this.view.render().showColors();
		
		this.setURL();
	},
	
	validateStampColor: function(){
		if( !this.get('boxStampColorSet') )
			this.set('boxStampColor', this.get('stampColor') );
		this.views[4].showColors();
	},
	
	setBoxLogo: function(_data){
		
		if( !this.get('boxLogoSet') ){
			this.view.revertBook();
		}
		
		this.set('boxLogoSet', true);
		this.set('boxLogo', _data ? false : true);
		this.set('openAlbum', true);
		
		this.calcPrice().views[4].showLogoInfo().render();
		
		this.setURL();
	},
	
	loadBoxStampColor: function(){
		var self = this;
		
		this.stampColor.reset( this.colors.where({ type:'stamp'}) );
		
		if( typeof( this.get('boxStampColor') ) == 'number' ){
			this.set('boxStampColor', this.stampColor.at( this.get('boxStampColor') ) ) ;
			
		} else {
			this.set('boxStampColor', this.colors.where({type: 'stamp', name: this.get('boxStampColor') })[0] );
			
		}
		
		this.trigger('ready:boxStampColor');
	},
	
	box_calcPrice: AlbumConst.prototype.calcPrice,
	
	calcPrice: function(extend) {
		
		var wholePrice = this.box_calcPrice(true);
		
		//Цена за тиснение на коробе
		var boxstamp_price = this.get('boxStamp') ? this.get('boxStamp').get('price') : 0;
		var stamp_price = this.get('stamp') ? this.get('stamp').get('price') : 0;
		
		
		wholePrice += stamp_price ? 0 : boxstamp_price;
		
		if( this.get('coverLogo') || this.get('boxLogo') ) {
			wholePrice += this.stamps.where({name: 'logo'})[0].get('price');
		}
		
		if(extend){
			return wholePrice;
		} else {
			this.set('wholePrice', wholePrice);
			return this;
		}
	}
	
});