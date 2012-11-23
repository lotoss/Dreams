//Отображение определение обложка
define (['jquery', 'album/base.view'], function ($, BaseView) {
	
	return CoverView = BaseView.extend({
		
		tagName: 'div',

		id:'album_page',

		className: 'page album_page',

		events: {
			'click .color a' : 'controlClick',
			'click .cover a' : 'controlClick',
			'click .format a' : 'controlClick',
			'click .paperType a' : 'controlClick',
			'click .pages a' : 'arrowClick',
			//'click .album_nav a' : 'navClick',
			'click .next_step' : 'nextStep',
			'mousedown  .pages a, selectstart  .pages a' : function() {return false;}
		},
		
		initialize: function(){
			this.name = 'cover';
			
			this.$el.append( $('#album_temp').html() ).append( $('#album_render').html() );
			
			this.colorList = this.$('.color_list');
			this.album = this.$('#album');
			
			var format = this.model.get('format');
			this.$('.format li').eq(format == 'big_square' ? 0 : format == 'small_square' ? 1 : format == 'big_rect' ? 2 : 3 ).addClass('active');
			
			var cover = this.model.get('coverType');
			this.$('.cover li').eq(cover == 'leather' ? 0 : cover == 'cloth' ? 1 : 2 ).addClass('active');
			
		},
		
		
		//Show Colors of Curren Type and show current color
		showColors: function(){
			
			var self = this;
			var output = '';
			
			if(this.model.get('coverType') == 'photo') {
				this.$('.color').hide();
				return this;
			}
			
			
			this.$('.color').show();	
			this.model.visibleColors.forEach(function(element, index, list){
				output += '<li><a href="#" style="background-image: url('+options.colorsFolder + '/'+ element.get('src')+')"></a></li>';
			});
			this.colorList.html(output);
			
			
			var idx = this.model.visibleColors.indexOf(this.model.get('color')); 
			
			this.colorList.find('li').eq(idx).addClass('active');
			
			this.currColor();
			return this;
		},
		
		
		
		//Show current Collor
		currColor: function(){
			var self = this;
			
			var model = this.model.get('color');

			if (model)
				this.$('.color .color_prevu')
					.find('div').css('backgroundImage', 'url('+options.colorsFolder + '/' + model.get('src') + ')')
					.end().find('p').text( model.get('title') );
			
			return this;
				
		},
		
		showPagesInfo: function(){
			//Кол-во страниц
			this.$('.pages input').val( this.model.get('pages') );
			
			//Макс. кол-во страниц
			this.$('.pages .min_pages').text( this.model.activeCover.get('default') );
			
			//Цена за пару страниц
			this.$('.pages .par_price').text( this.model.activeCover.get('pagePrice') * 2 );
			
			//Цена альбома
			this.$('#album_price span').text( this.model.activeCover.get('basePrice') );
			//Цена доп. страниц
			var addPages = this.model.get('pages') - this.model.activeCover.get('default');
			addPages = addPages < 0 ? 0 : addPages;
			this.$('#pages_price span').text( 
				addPages * this.model.activeCover.get('pagePrice')
			);
			return this;
		},
		
		//Event Funtion
		controlClick: function(event){
			event.preventDefault();
			var $this = $(event.currentTarget).parent();
			if(  $this.hasClass('active') || $this.hasClass('disable') )
				return;
			
			$this.addClass('active').siblings('.active').removeClass('active');
			
			if($this.is('.format li') )
				this.model.trigger('changeFormat',$this.index() );
				
			if($this.is('.cover li') )
				this.model.trigger('changeCover', $this.index() );
				
			if($this.is('.color li') )
				this.model.trigger('changeColor', $this.index() );
				
			if($this.is('.paperType li') )
				this.model.trigger('changePaperType', $this.children().attr('data-value') );
			
		},
		
		arrowClick: function(event){
			event.preventDefault();
			var $this = $(event.currentTarget);
			this.model.trigger('changePages', $this.hasClass('inc') ? 2 : -2 );
		}
		
		
		
	});
});


