//Базовая вьюшка
BaseView = Backbone.View.extend({
	defaults: {
		name: 'undefined'	
	}, 
	
	showNav: function() {
		var $nav = this.$('.app_nav').not('.cover ul, .app_nav_alt, .paperType ul');
		
		//форзац или тиснение в зависимости от материала
		if(this.model.get('coverType') == 'photo')
			$nav.children('li').eq(1).addClass('hidden').end().eq(2).removeClass('hidden');
		else
			$nav.children('li').eq(1).removeClass('hidden').end().eq(2).addClass('hidden');
			
		//Устанавливаем выбраным активный шаг
		$nav.children('li').not('.hidden').eq(this.model.get('activeStep')).addClass('active').siblings().removeClass('active');
			
		//Устанавливаем доступными какие слешующие шаги
		$nav.children('li').removeClass('disable done').slice( this.model.get('doneStep') + 3 ).addClass('disable')
			.end().slice(0, this.model.get('doneStep') + (this.model.get('doneStep') > 0 ? 2 : 1)).addClass('done');
		
		if(this.model.get('box') == null || this.model.get('box').get('type') == 'box')		
			$nav.children('li').eq(4).hide();
		else
			$nav.children('li').eq(4).show();
		
		
		return this;
	}, 
	
	navClick: function(event){
		event.preventDefault();
		var $this = $(event.currentTarget);
		
		//Делегируем событие конструктору
		if(  $this.parent().is('.active, .disable') )
			return;
		
		this.model.trigger('navigation', { event: event, context: event.currentTarget } );
	
	},
	
	nextStep: function(event){
		event.preventDefault();
		var $this = $(event.currentTarget);
		
		switch( $this.attr('href') ){
		
			case '#album_next':
					this.$('.app_nav li.active').nextAll().not('.hidden, .disable').eq(0).children().click();
				break;
				
			case '#cart':
					this.model.parent.trigger('addToCart', new Backbone.Model( this.model.attributes ) )
				break;
				
			case '#save':
					this.model.parent.trigger('saveToCart', new Backbone.Model( this.model.attributes ) )
				break;
			
		}
	},
	
	render: function(){
		
		//Тиснение альбома
		var stamp = this.model.get('stamp');
		this.$('.stamps li').removeClass('active').eq(stamp == null ? 2 : (stamp.get('name') == 'custom' ? 1 : 0) ).addClass('active');
		
		
		//Цвет альбома
		this.$('#album').css('background-image', 'url(' + this.model.getColorSprite() + ')');
		
		//Формат альбома
		var format = this.model.get('format');
		this.$('.format li').removeClass('active').eq(format == 'big_square' ? 0 : format == 'small_square' ? 1 : format == 'big_rect' ? 2 : 3 ).addClass('active');
		
		var cover = this.model.get('coverType');
		
		this.$('.cover li').removeClass('active').eq(cover == 'leather' ? 0 : cover == 'cloth' ? 1 : 2 ).addClass('active');
		
		//Добавление/удаление формата квадрата
		var format = this.model.get('format');
		switch( format ){
			case 'big_square': 
			case 'small_square': 
				this.$('.middle_side').addClass('square');
				break;
				
			case 'big_rect': 
			case 'small_rect': 
				this.$('.middle_side').removeClass('square');
				break;
		}
		
		
		//Отображение размера формата
		if(this.model.get('activeStep') == 0){
			this.$('#album').find('.width').show().html(options.formatSizes[format][0] + ' см');
			this.$('#album').find('.height').show().html(options.formatSizes[format][1] + ' см');
		} else {
			this.$('#album').find('.width, .height').hide();
		}
		
		//Форзац
		if ( this.model.get('coverType') == 'photo' && this.model.get('activeStep') == 1) {
			
			var url = this.model.get('forzatz').get('src');
			this.$('#book .texture').css({
				'background-image' : url === '' ?  'none' : ('url('+options.forzatzFolder + '/'+ url +')' )
			});
		}
		
		if(this.model.get('activeStep') == 1){
			if( this.model.get('backSide') )
				this.$('#album').addClass('backside');
			else 
				this.$('#album').removeClass('backside');
		}
		
		
		
		//Отображение слайдера тиснений
		
		if( this.model.get('stamp') == undefined || this.model.get('coverType') == 'photo'){
			this.$('.stampcolor').hide();
			this.$('#album').removeClass('custom standart');
		} else {
			
			this.$('.stampcolor').show();
			if( this.model.get('stamp').get('name') == 'custom'){
				this.$('#album').addClass('custom').removeClass('standart');
			} else {
				this.$('#album').addClass('standart').removeClass('custom');
			}
				
		} 
			
		//Отображение тиснения
		
		if( typeof(this.model.get('stamp') ) == 'object' 
			&& this.model.get('stamp') !== null
			&& typeof( this.model.get('stampColor') ) == 'object') {
			
			this.$('.stamp_slider li').css({
				'background-position' : '-'+ 
					(this.model.get('stampColor').get('middle') 
					-this.model.get('stamp').get('width') / 2) +'px' + ' -' 
					+ this.model.get('stamp').get('imgY')+ 'px' ,
				height: this.model.get('stamp').get('height'),
				width: this.model.get('stamp').get('width'),
				'margin-left': -this.model.get('stamp').get('width') / 2,
				'margin-top': -this.model.get('stamp').get('height') / 2
			});
		}
		
		//Отображение Коробки
		var box = this.model.get('box');
		this.$('.middle_side').removeClass('box kofr');
		
		if(box && (this.name == 'box' || this.name == 'boxstamp') ){
			if(box.get('type') == 'box'){
				this.$('.middle_side').addClass('box');
				this.$('.boxtop, .box').not('.middle_side, #album')
					.css('background-image', 'url(' + options.boxesFolder + '/' + box.get('src') +')');
					
			} else {
				this.$('.middle_side').addClass('kofr');
				this.$('#kofr').css('background-image', 'url(' + options.boxesFolder + '/' + box.get('src') +')');
			}
		}
		
		this.$('.middle_side').removeClass('close');
		
		
		if(this.model.get('activeStep') == 3){
		
			if( this.model.get('openAlbum') == false ){
				this.$('.middle_side').addClass('close');
				this.$('.button_revert span').text('Открыть крышку');
				this.$('.boxstampcolor, .boxstamps').show();
			} else {
				this.$('.button_revert span').text('Закрыть крышку');
				this.$('.boxstampcolor, .boxstamps').hide();
			}
		}
		
		
		//Отображение слайдера тиснений
		var stamp = this.model.get('boxStamp');
		this.$('.boxstamps li').removeClass('active').eq(stamp == null ? 2 : (stamp.get('name') == 'custom' ? 1 : 0) ).addClass('active');
		
		if( this.model.get('boxStamp') == undefined){
			//this.$('.stampcolor').hide();
			this.$('#kofr').removeClass('custom standart');
		} else {
			
			//this.$('.stampcolor').show();
			if( this.model.get('boxStamp').get('name') == 'custom'){
				this.$('#kofr').addClass('custom').removeClass('standart');
			} else {
				this.$('#kofr').addClass('standart').removeClass('custom');
			}
				
		}
		
		
		//Отображение тиснения корфа
		this.$('#kofr .stamp_slider').addClass('hidden');
		if( typeof(this.model.get('boxStamp') ) == 'object' &&  this.model.get('boxStamp')  !== null 
			&& typeof( this.model.get('stampColor') ) == 'object' 
			&& typeof( this.model.get('box') ) == 'object' &&  this.model.get('box')  !== null
			&& this.model.get('box').get('type') == 'cofr' ) 
		{
			
			this.$('#kofr .stamp_slider').removeClass('hidden');
			
			this.$('#kofr .stamp_slider li').css({
				'background-position' : '-'+ 
					(this.model.get(this.model.get('boxStampColorSet') ? 'boxStampColor' : 'stampColor' )
					.get('middle') 
					-this.model.get('boxStamp').get('width') / 2) +'px' + ' -' 
					+ this.model.get('boxStamp').get('imgY')+ 'px' ,
				height: this.model.get('boxStamp').get('height'),
				width: this.model.get('boxStamp').get('width'),
				'margin-left': -this.model.get('boxStamp').get('width') / 2,
				'margin-top': -this.model.get('boxStamp').get('height') / 2
			});
		}
		
		//Отображение общей цены и скидки
		this.$('#album').next().children('span').text(this.model.get('wholePrice'));
		this.$('.free, .pro').children('span').text( parseInt(this.model.get('wholePrice') * CartOptions.dicsPro) );
		
		if( cart.get('user') && cart.get('user').discount ){
			this.$('.middle_side .pro').show();
			this.$('.middle_side .free').hide();
		} else {
			this.$('.middle_side .pro').hide();
			this.$('.middle_side .free').show();
		}
		
		//Цена тиснения
		var stamp_price = this.model.get('stamp') ? + this.model.get('stamp').get('price') : 0;
		this.$('#stamp_price span').text(stamp_price);
		this.$('.boxstamps #stamp_price span').text( (stamp_price == 0 && this.model.get('boxStamp') ) ? + this.model.get('boxStamp').get('price') : 0);
		
		//Кнопка далее
		var next_link = (this.model.get('activeStep') == 1 || this.model.get('activeStep') == 0) ? 0 : 
			(this.model.get('activeStep') == 2 && this.model.get('box') && this.model.get('box').get('type') == 'cofr') ? 0 : 
			this.model.id ? 2 : 1;
		this.$('.next_step').hide().eq( next_link ).show();
		
		return this;
	}
	
	
});