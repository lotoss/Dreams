define (['jquery', 'album/cover.model', 'album/forzatz.view', 'album/forzatz.collect'], function ($, AlbumConst, ForzatzView, ForzatzCol) {
	return AlbumConst = AlbumConst.extend({
		
		defautls: _.extend(AlbumConst.prototype.defaults, {
			forzatz: 'black'
		}),
		
		inits: AlbumConst.prototype.addInits( function(args) {
			
			
			//Создание и сохранение вьюшки
			this.views['forzatz'] =  new ForzatzView({ model: this });
			
			//Создание коллекций
			this.forzatzs = new ForzatzCol();
			this.forzatzs.parent = this;
			this.on('load:data', function(){ this.forzatzs.loadData();});
			
			//События изменения 
			this.on('changeFormat', this.validateForzatzPrice);
			this.on('changeForsatz', this.changeForsatz);
			
			//Загрузка Коллекций
			this.on('load:forzatz', this.loadForzatz);
			
		}),
		
		ready: AlbumConst.prototype.addReady(['ready:forzatz'], function(){
			this.calcPrice();
			this.views['forzatz'].render();
		}),
		
		changeForsatz: function(_index){
			this.set('forzatz', this.forzatzs.at(_index) );
			
			this.calcPrice();
			this.views['forzatz'].render().currForsatzs();
			
			this.setURL();
			
		},
		
		validateForzatzPrice: function(){
			this.views['forzatz'].currForsatzs();
		},
		
		//Load forzatz
		loadForzatz: function(){
			var self = this;
			
			if( typeof( this.get('forzatz') ) == 'number' )
				var forzatz = this.forzatzs.at( this.get('forzatz') ); 
			else
				var forzatz = this.forzatzs.find(function(el){ return  el.get('name') == self.get('forzatz'); }); 
				
			this.set('forzatz', forzatz);
		
			this.views['forzatz'].showForsatzs();
			
			this.trigger('ready:forzatz', 'ready:forzatz');
		},
		
		cover_calcPrice: AlbumConst.prototype.calcPrice,
		
		calcPrice: function(extend) {
			
			var wholePrice = this.cover_calcPrice(true);
			
			//Цена за форзатц
			var forzatz = this.get('forzatz');
			if(forzatz.cid && this.get('coverType') == 'photo' && this.get('doneStep') > 0)
				wholePrice += forzatz.get('price')[this.get('format')];
			
			if(extend){
				return wholePrice;
			} else {
				this.set('wholePrice', wholePrice);
				return this;
			}
		}
		
		
		
		
	});
});