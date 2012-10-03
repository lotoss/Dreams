
AlbumConst = AlbumConst.extend({
	
	//Разширение параметров по-умолчанию
	defautls: _.extend(AlbumConst.prototype.defaults, {
		coverType: 'cloth',
		lastCloth: 'liloc',
		lastLeather: 'brownl',
		format: 'small_rect',
		pages: 0
	}),
	
	//Разширение инициализации
	inits: AlbumConst.prototype.addInits( function(args) {
		
		
		//Создание и сохранение вьюшки
		this.views.push( new CoverView({ el: $('#album_page'), model: this }) );
		
		//Создание коллекций
		this.colors = new ColorCol();
		this.colors.parent = this;
		this.on('load:data', function(){ this.colors.loadData();});
		
		this.covers = new CoverCol();
		this.covers.parent = this;
		this.on('load:data', function(){ this.covers.loadData();});
		
		//Доп коллекции
		this.visibleColors = new Backbone.Collection;
		
		//События изменения 
		this.on('changeColor', this.changeColor);
		this.on('changeFormat', this.changeFormat);
		this.on('changeCover', this.changeCover);
		this.on('changePages', this.changePages);
		
		//Загрузка Коллекций
		this.on('load:colors', this.loadColor);
		this.on('load:covers', this.loadCover);
		
		//Ожидание готовности всех коллекций
		
	}),
			
	ready: AlbumConst.prototype.addReady(['ready:colors','ready:covers'], function(){
		
		this.calcPrice();
		this.views[0].render().showNav();
	}),
	
	//Обработчик изменения цвета
	changeColor: function(_index){
		
		var new_color = this.visibleColors.at(_index);
		if(new_color){
			this.set('color', new_color );
				
			//Запоминание цвета для данного материала
			this.set(this.get('coverType') == 'cloth' ? 'lastCloth' : 'lastLeather' , new_color);
			
			//Draw активного цвета и альбома
			this.views[0].currColor().render();	
			
			this.setURL();
		}
		
	},
	
	//Обработчик изменения формата
	changeFormat: function(_index){
		var self = this;
		
		//Определение ключа формата
		if(_index !== undefined)
			this.set('format', _index == 0 ? 'big_square' : _index == 1 ? 'small_square' : _index == 2 ? 'big_rect' : 'small_rect');
		
		//Поиск данных о формате (по размеру и типу) и установка
		this.activeCover  = this.covers.find(function(el){  return el.get('format') == self.get('format') && el.get('type') == self.get('coverType'); })
		this.set('cover', this.activeCover);
		
		//Установка страниц и перещет цены
		this.setPages().calcPrice();
		
		//Draw альбома
		this.views[0].showPagesInfo().render();
		
		
		this.setURL();
	},
	
	//Обработчик изменения материала обложки
	changeCover: function(_index){
		//Определение ключа  материала
		this.set('coverType', _index == 0 ? 'leather' : _index == 1 ? 'cloth' : 'photo')
		var self = this;
		
		//Установка цветов материала
		this.visibleColors.reset(this.colors.filter(function(color){ return color.get('type') == self.get('coverType'); }) );
		this.set('color', 
			this.get('coverType') == 'cloth' ? 
				this.get('lastCloth') :  
			this.get('coverType') == 'leather' ? 
				this.get('lastLeather') : 
				this.colors.find(function(el){ return el.get('name') == 'photo' ;}) 
		);
		
		//Поиск данных о формате (по размеру и типу) и установка					
		this.activeCover  = this.covers.find(function(el){  return el.get('format') == self.get('format') && el.get('type') == self.get('coverType'); });
		this.set('cover', this.activeCover);
		
		
		//Установка страниц и перещет цены
		this.setPages().calcPrice();

		//Отображение цветов
		this.views[0].showColors().showPagesInfo().showNav().render();
		
		//this.views[3].showBoxInfo();
		
		this.setURL();
	},
	
	//Обработчик изменения кол-ва страниц
	changePages: function(_diff){
		
		this.setPages(_diff).calcPrice();
		this.views[0].render().showPagesInfo();
		
		this.setURL();
	},
	
	setPages: function(_diff){
		_diff = _diff || 0;
		var pages = this.get('pages') + _diff,
			min_pages = this.activeCover.get('minPage'),
			max_pages = this.activeCover.get('maxPage');

		if(pages < min_pages || min_pages == null)
			pages = min_pages;
			
		if(pages > max_pages)
			pages = max_pages;
		
		this.set('pages', pages);
		
		return this;
	},
	
	
	loadColor: function(){
		
		var self = this;
		
		this.visibleColors.reset(this.colors.filter(function(color){ return color.get('type') == self.get('coverType'); }) );
	
		
		this.set('lastCloth', this.colors.find( function(el){ return el.get('name') == self.get('lastCloth'); } ) , { silent: true });
		this.set('lastLeather', this.colors.find( function(el){ return el.get('name') == self.get('lastLeather'); } ) , { silent: true });
		
		
		if( typeof( this.get('color') ) == 'number' ){
			this.set( 'color', this.visibleColors.at(this.get('color') ) , { silent: true });
			this.set( 'coverType', this.get('color').get('type') );
			this.set(this.get('coverType') == 'cloth' ? 'lastCloth' : 'lastLeather' , this.get('color') );
		} else {
			
			var color = this.get('coverType') == 'cloth' ? this.get('lastCloth') : this.get('coverType') == 'leather' ? this.get('lastLeather') : this.colors.find( function(el){ return el.get('name') == 'photo';} );
			
			this.set('color', color, { silent: true } );
		}
		
		this.views[0].showColors();
		this.trigger('ready:colors', 'ready:colors');
		
	},
	
	loadCover: function(){
		var self = this;
		
		
		
		//Поиск данных о формате (по размеру и типу) и установка
		this.activeCover  = this.covers.find(function(el){  return el.get('format') == self.get('format') && el.get('type') == self.get('coverType'); });
		this.set('cover', this.activeCover, { silent: true });
		
		this.set('pages', this.activeCover.get('minPage') + this.get('pages') );
		
		//Установка страниц и перещет цены
		this.setPages();
		
		//Draw альбома
		this.views[0].showPagesInfo();
		this.trigger('ready:covers','ready:covers');
		
	},
		
	calcPrice: function(extend){
		
		//Начальный рассчет (базовая цена обложки по материалу и формату + цена за доп страницы)
		var wholePrice = this.activeCover.get('basePrice') + ( this.get('pages') -  this.activeCover.get('minPage') )  * this.activeCover.get('pagePrice');
		
		if(extend){
			return wholePrice;
		} else {
			this.set('wholePrice', wholePrice);
			return this;
		}
		
	}
});
