//Главная модель конструктора альбома var model = new AlbumConst();
define (['jquery', 'backbone', 'album/album.view', 'album/boxstamp.model'], function ($, Bakcbone, AlbumView, AlbumConst) {
	return AlbumConst = AlbumConst.extend({
		
		//Инициализатор
		initialize: function(){
			//_.bindWith(this);
			var self = this;
			this.inits.fireWith(this);
			//Запуск всех инициализаторов
			/*for(var i = 0; i < this.inits.length; i++ ) {
				this.inits[i].apply(this, arguments);
			}*/
			
			this.view  = new AlbumView({model: this, el: $('#album_view')});
			this.on('change:status', this.view.render);
			//this.view = this.views[this.get('activeStep')];
			
			//Запуск ожидания загрузки
			
			
			/*for(var i = 0; i < this.ready.events.length; i++ ){
				this.on(this.ready.events[i], this.readyCalback);
			}*/
			
			//this.init();
			
			
			//this.on('load:data', function(){  popupC.loadData(this.data.popups); });
			//Подгрузка данных
			$.post(options.dataUrl, function(_data){
				self.data = _data;
				self.trigger('load:data');
			}, 'json');
		},
		
		clearAlbum: function(){
			this.off('change:color', this.validateStamp);
			this.off('change:color', this.validateBox);
			this.off('change:cover', this.validateBox);
			
			this.clear({silent: true }).set(this.defaults, {silent: true });
			
			this.ready.events = ['121', 1212,12,12,1,21,2,1,1,1,21,21,21,2];
			this.loadColor();
			this.loadCover();
			this.loadForzatz();
			this.loadStamps();
			this.loadStampColor();
			this.loadBoxes();
			
			this.ready.events = [];
			this.readyCalback();
			
		},
		
		restore: function(params) {
			this.off('change:color', this.validateStamp);
			this.off('change:color', this.validateBox);
			this.off('change:cover', this.validateBox);
			
			this.clear({silent: true })
				.set(this.defaults, {silent: true })
				.set(this.decode_data(params.url), {silent: true }).set('id', params.id);
				
			this.ready.events = ['121', 1212,12,12,1,21,2,1,1,1,21,21,21,2];
			this.loadColor();
			this.loadCover();
			this.loadForzatz();
			this.loadStamps();
			this.loadStampColor();
			this.loadBoxes();
			
			this.ready.events = [];
			this.readyCalback();
		},
		
		renew: function(){
			
			if(	this.get('ready') === false )
				return;
			
			this.restore({url: location.hash });
			this.set('open', true);
			this.showPage(this.get('activeStep'));
			//this.views[this.get('activeStep')].render();
			this.calcPrice();
			this.view.showNav().render();
		},
		
		//Устанавливает URL соответствующий состоянию альбома
		setURL: function(){
			
			if(this.get('open')){
				
				this.set('url', 'album-' + this.encode_data() );
				route.navigate(this.get('url') );
			}
				
		},
		
		//Шифртор состояния альбома (генерация url)
		encode_data: function(){
			var url = '';
			
			//Установка шага и id
			url += String.fromCharCode( this.get('activeStep') + 65 );
			if( this.get('id') )
				url += this.get('id');
			url += '-';
			
			//Установка типа обложки
			var cover = this.get('coverType');
			cover = cover == 'leather' ? 0 : cover == 'cloth' ? 1 : 2;
			cover += this.get('paperType') ? 3 : 0;
			url += String.fromCharCode(cover + 65);
			
			//Установка формата
			var format = this.get('format');
			format = format == 'big_square' ? 0 : format == 'small_square' ? 1 : format == 'big_rect' ? 2 : 3;
			url += String.fromCharCode(format + 65);
			//Установка цвета
			if(cover != 2){
				var color = this.visibleColors.indexOf(this.get('color'));
				url += String.fromCharCode(color + 65);
			}
			
			//Установка доп страниц
			var pages = this.get('pages');
			if( pages > this.activeCover.get('minPage') ){
				pages -= this.activeCover.get('minPage');
				pages /= 2; 
				url += String.fromCharCode(pages + (pages > 26 ? 70: 64) );
			}
			
			
			//Установка форзаца
			if(cover == 2 && this.get('doneStep') > 0) {
				var forzatz = this.forzatzs.indexOf(this.get('forzatz'));
				url += '-'+String.fromCharCode(forzatz + 65);
			}
			
			//Установка Тиснения и его цвета
			if(cover != 2 && this.get('doneStep') > 0) {
				var stamp = this.stamps.indexOf(this.get('stamp'));
				url += '-' + String.fromCharCode(stamp + (this.get('coverLogo') ?  98 : 66 ) );
				if(stamp > -1){
					var stampColor = this.stampColor.indexOf(this.get('stampColor'));
					
					url += String.fromCharCode(stampColor + 65);
					
				}
				
			}
			
			
			
			//Установка Футляра
			if(this.get('doneStep') > 1) {
				var box = this.get('box');
				box = box ? (this.boxes.indexOf(box)+1) : 0;
				url += String.fromCharCode(box + 65);
			}
			
			
			//Установка тиснения футляра
			if(this.get('doneStep') > 2 && box && this.get('box').get('type') == 'cofr') {
				var boxStamp = this.get('boxStampSet') ? this.stamps.indexOf( this.get('boxStamp') ) : -2;
				url += String.fromCharCode(boxStamp + (this.get('boxLogo') ? 99 : 67) );
				
				//Установка цвета тиснения футляра
				if(boxStamp > -1 || boxStamp == -2){
					var boxStampColor = this.stampColor.indexOf(this.get('boxStampColor'));
					
					
					
					boxStampColor = boxStampColor;
					
					url += String.fromCharCode(boxStampColor + 65);
					
				}
				
			}
			
			return url;
		},
		
		//Дешифратор состояния альбома 
		decode_data: function(_data){
					
			var data = {};
			var parts = _data.split('-');
			
			if(parts[1] === undefined)
				return data;
				
			this.set('activeStep', parts[1].charCodeAt(0) - 65);
			if(parts[1].slice(1) !== '')
				this.set('id', parts[1].slice(1));
			
			//Установка типа обложки
			if(parts[2] === undefined)
				return data;
				
			var cover = parts[2].charCodeAt(0) - 65;
			if (cover > 2) 
				data['paperType'] = true;
			cover = cover % 3;
			cover = cover == 0 ? 'leather' : cover == 1 ? 'cloth' : 'photo';
			data['coverType'] = cover;
			
			//Установка формата
			var format = parts[2].charCodeAt(1) - 65;
			format = format == 0 ? 'big_square' : format == 1 ? 'small_square' : format == 2 ? 'big_rect' : 'small_rect';
			data['format'] = format;
			
			
			//Установка цвета
			if(cover != 'photo'){
				data['color'] =  parts[2].charCodeAt(2) - 65;
			} else  {
				data['color'] = 'photo';
			}
			
			//Установка доп страниц
			var pages  = cover != 'photo' ? parts[2].charCodeAt(3) : parts[2].charCodeAt(2);
			if( !isNaN(pages) ){
				pages -= pages > 96 ? 70 : 64;
				data['pages'] = pages * 2;
			}
			
			if(parts[3] === undefined)
				return data;
				
			data['doneStep'] = 1;
			
			//Установка форзаца
			if(cover == 'photo'){
				var forzatz = parts[3].charCodeAt(0) - 65;
				data['forzatz'] = forzatz;
				
			//Установка тиснения	
			} else {
				var stamp = parts[3].charCodeAt(0);
				if(stamp > 97){
					data['coverLogo'] = true;
					data['coverLogoSet'] = true;
					stamp -= 98;
				} else {
					stamp -= 66;
				}
				
				this.set('stamp', stamp == -1 ? null : stamp);
				
				if(stamp > -1){
					
					var stampColor = parts[3].charCodeAt(1);
					this.set('stampColor', stampColor - 65);
					
				} else {
					this.set('stampColor', 0);
				}
				
			}
			
			//Шаг 3 (Короб)
				
			
			if( stamp === undefined && isNaN(parts[3].charCodeAt(1)) 
				||  isNaN(parts[3].charCodeAt(1)) && stamp == -1 
				|| isNaN(parts[3].charCodeAt(2)) && stamp > -1  )
				return data;
			
				
			
			data['doneStep'] = 2;
			
			if(data['coverType'] == 'photo'){
				var box = parts[3].charCodeAt(1) - 66;
				
			} else {
				var box = parts[3].charCodeAt(stamp == -1 ? 1 : 2) - 66;
			}
			
			data['box'] = box == -1 ? null : box;
			
			//Шаг 4
			if( stamp === undefined && isNaN(parts[3].charCodeAt(2)) 
				||  isNaN(parts[3].charCodeAt(2)) && stamp == -1 
				|| isNaN(parts[3].charCodeAt(3)) && stamp > -1  )
				return data;
				
			
			data['doneStep'] = 3;
			
			var boxStamp = parts[3].charCodeAt(stamp == -1 ? 2 : 3);
			
			if(boxStamp > 96){
				data['boxLogo'] = true;
				data['boxLogoSet'] = true;
				boxStamp -= 99;
			} else {
				boxStamp -= 67;
			}
			
			
			if( boxStamp > -2 ){
				data['boxStampSet'] = true;
			}
			
			data['boxStamp'] = boxStamp > -1 ?  boxStamp : null;
			
			if(boxStamp > -1 || boxStamp == -2) {
				
				var boxStampColor = parts[3].charCodeAt(stamp == -1 ? 3 : 4) - 65;
				
				if (boxStampColor > -1) {
					data['boxStampColor'] = boxStampColor;
					data['boxStampColorSet'] = true;
				}
					
				
			}	
			
			return data;
		},
		
		init: function(){
			this.set(this.decode_data(location.hash));
			
			this.showPage( this.get('activeStep') );
			/*this.view.showNav();*/
			
		},
		
		getColorSprite: function(){
			console.error ('Album.getColorSprite');
			var self = this;
			
			return options.colorsFolder + '/'+ this.get('color').get('src');
		},
		

		navigation: function(_data){
			console.error ('Album.navigation');
			
				var idx = $(_data.context).parent().index();
				idx = idx < 2 ? idx : (idx - 1); 
				this.set('activeStep', idx);
				
				this.showPage(idx);
				
				if(this.get('doneStep')< idx)
					this.set('doneStep', idx);
				
				this.calcPrice();
				this.view.showNav().render();
				if(this.view.showColors) this.view.showColors();
				this.setURL();
			
		},
		
		showPage: function(idx){
			console.error ('Album.showPage');
			/*switch(idx){
					case 0: 
							window.blockC.show('album_page');
							this.view = this.views[0];
						break;
						
					case 1: 
						
							if( this.get('coverType') == 'photo' ){
								window.blockC.show('forzatz');
								this.view = this.views[1];
								
							} else {	
								window.blockC.show('stamp');
								this.view = this.views[2];
								this.set('backSide', false);
							}	
							
						break;
					
					case 2: 
							window.blockC.show('box');
							this.view = this.views[3];
							
						break;
						
					case 3: 
							window.blockC.show('boxstamp');
							this.view = this.views[4];
							
						break;
				}*/
			
		}, 
		
		
		createPage: function(){
			console.error ('Album.createPage');
			var $album = $('#album_page');
			$album.append( $('#album_nav').html() );
			
			var $forzatz = $album.clone(),
				$stamp = $album.clone(),
				$box = $album.clone(),
				$boxstamp = $album.clone();
			
			var middle_html = $('#album_render').html();
			
			$album
				.append( $('#album_temp').html() ).append(middle_html);
				
			$forzatz
				.attr('id', 'forzatz').removeClass('album_page').addClass('forzatz')
				.append( $('#forzatz_temp').html() ).append(middle_html);
				
			$stamp
				.attr('id', 'stamp').removeClass('album_page').addClass('stamp')
				.append( $('#stamp_temp').html() ).append(middle_html);
				
			$box
				.attr('id', 'box').removeClass('album_page').addClass('box')
				.append( $('#box_temp').html() ).append(middle_html);
				
			$boxstamp
				.attr('id', 'boxstamp').removeClass('album_page').addClass('boxstamp')
				.append( $('#boxstamp_temp').html() ).append(middle_html);
			
			$album
				.after($boxstamp)
				.after($box)
				.after($stamp)
				.after($forzatz);
				
			
			
		},
		
		showAlbum: function() {
			console.error ('Album.showAlbum');
			this.showPage(this.get('activeStep') );
		}
		
		
	});
});









