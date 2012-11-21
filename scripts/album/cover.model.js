define (['jquery', 'album/base.model', 'album/cover.view', 'album/color.collect', 'album/cover.collect'], 
	function ($, AlbumConst, CoverView, ColorCol, CoverCol) {
	
	return AlbumConst = AlbumConst.extend({
		
		//Разширение параметров по-умолчанию
		defautls: _.extend(AlbumConst.prototype.defaults, {
			coverType: 'cloth',
			lastCloth: 'liloc',
			lastLeather: 'brownl',
			format: 'small_rect',
			pages: 0,
			paperType: false,
			setPages: false
		}),
		
		//Разширение инициализации
		inits: AlbumConst.prototype.addInits( function(args) {
			
			//Создание и сохранение вьюшки
			this.views['cover'] = new CoverView({ model: this });
			
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
			this.on('changePaperType', this.changePaperType);
			
			//Загрузка Коллекций
			this.on('load:colors', this.loadColor);
			this.on('load:covers', this.loadCover);
			
			//Ожидание готовности всех коллекций
			
		}),
				
		ready: AlbumConst.prototype.addReady(['ready:colors','ready:covers'], function () {
			
			this.calcPrice();
			this.views['cover'].render().showNav();
		}),
		
		//Обработчик изменения цвета
		changeColor: function(_index){
			
			var new_color = this.visibleColors.at(_index);
			if(new_color){
				this.set('color', new_color );
					
				//Запоминание цвета для данного материала
				this.set(this.get('coverType') == 'cloth' ? 'lastCloth' : 'lastLeather' , new_color);
				
				//Draw активного цвета и альбома
				this.views['cover'].currColor().render();	
				
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
			this.setActiveCover(this.activeCover);
			
			//Установка страниц и перещет цены
			this.setPages().calcPrice();
			
			//Draw альбома
			this.views['cover'].showPagesInfo().render();
			
			
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
			this.setActiveCover(this.activeCover);
			
			
			//Установка страниц и перещет цены
			this.setPages().calcPrice();

			//Отображение цветов
			this.views['cover'].showColors().showPagesInfo().showNav().render();
			
			//this.views[3].showBoxInfo();
			this.changePaperType();
			this.setURL();
		},
		
		//Обработчик изменения кол-ва страниц
		changePages: function(_diff){
			
			this.setPages(_diff).calcPrice();
			this.views['cover'].render().showPagesInfo();
			this.setURL();
		},
		
		changePaperType: function(value) {
			if (value)
				this.set('paperType', !!parseInt(value));
				
			this.setActiveCover(this.activeCover);
				
			this.setPages().views['cover'].showPagesInfo();
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
			if (_diff !== 0)
				this.set('setPages', true);
			
			return this;
		},
		
		
		loadColor: function(){
			
			var self = this;
			
			this.visibleColors.reset(this.colors.where({'type' : this.get('coverType') }) );
		
			
			this.set('lastCloth', self.colors.where({name: self.get('lastCloth') })[0] , { silent: true });
			this.set('lastLeather', self.colors.where({name: self.get('lastCloth') })[0] , { silent: true });
			
			
			if( typeof( this.get('color') ) == 'number' ){
				this.set( 'color', this.visibleColors.at(this.get('color') ) , { silent: true });
				this.set( 'coverType', this.get('color').get('type') );
				this.set(this.get('coverType') == 'cloth' ? 'lastCloth' : 'lastLeather' , this.get('color') );
			} else {
				
				var color = this.get('coverType') == 'cloth' ? this.get('lastCloth') : this.get('coverType') == 'leather' ? this.get('lastLeather') : this.colors.find( function(el){ return el.get('name') == 'photo';} );
				
				this.set('color', color, { silent: true } );
			}
			
			this.views['cover'].showColors();
			this.trigger('ready:colors', 'ready:colors');
			
		},
		
		loadCover: function(){
			var self = this;
			
			//Поиск данных о формате (по размеру и типу) и установка
			this.activeCover  = this.covers.where ({ format: this.get('format'), type: this.get('coverType') })[0];
			this.setActiveCover(this.activeCover, true);
			
			if (this.activeCover.get('minPage') + this.get('pages') !== this.activeCover.get('default') && this.get('pages') !== 0)
				this.set('setPages', true);
			
			this.set('pages', this.get('setPages') ?  this.activeCover.get('minPage') + this.get('pages') : this.activeCover.get('default') );
			
			//Установка страниц и пересчет цены
			this.setPages();
			
			//Draw альбома
			this.views['cover'].showPagesInfo();
			this.trigger('ready:covers','ready:covers');
			
		},
		
		setActiveCover: function(newCover, presetPages) {
			
			this.set('cover', newCover, { silent: true });
			
			if (!newCover.get('pages')['layflat']) {
				this.set('paperType', false);
				this.views['cover'].$('.paperType li').eq(1).addClass('disable');
			} else {
				this.views['cover'].$('.paperType li').eq(1).removeClass('disable');
			}
			
			var data = newCover.get('pages')[this.get('paperType') ? 'layflat' : 'simple'];
			newCover.set('minPage', data['minPage']);
			newCover.set('maxPage', data['maxPage']);
			newCover.set('default', data['default']);
			newCover.set('pagePrice', data['pagePrice']);
			
			if ( !this.get('setPages') && !presetPages) 
				this.set('pages', newCover.get('default')  );
				
		},
			
		calcPrice: function(extend){
			
			//Начальный рассчет (базовая цена обложки по материалу и формату + цена за доп страницы)
			var addPages = this.get('pages') - this.activeCover.get('default');
			addPages = addPages < 0 ? 0 : addPages;
			
			var wholePrice = this.activeCover.get('basePrice') + addPages  * this.activeCover.get('pagePrice');
			
			if(extend){
				return wholePrice;
			} else {
				this.set('wholePrice', wholePrice);
				return this;
			}
			
		}
	});
});

