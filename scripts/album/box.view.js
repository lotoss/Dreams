//Отображение коробов
define (['jquery', 'album/base.view'], function ($, BaseView) {
	return BoxView = BaseView.extend({
		events: {
			'click .back_cover a' : 'controlClick',
			'click .color a' : 'controlClick',
			'click .album_nav a' : 'navClick',
			'click .next_step' : 'nextStep'
		},
		
		initialize: function(){
			this.album = this.$('#album');	
			this.name = 'box';
		},
			
		showBoxInfo: function(){
			var self = this;
			
			
			/*if(this.model.get('coverType') == 'photo'){
				this.$('.back_cover li').eq(1).addClass('disable');
				var boxType = this.model.get('box') ? 0 : 2;
			} else {
				this.$('.back_cover li').eq(1).removeClass('disable');
			}*/
			
			var boxType = !this.model.get('box') ? 2 : this.model.get('box').get('type') == 'box' ? 0 : 1;
			
			this.$('.back_cover li').eq(boxType).addClass('active').siblings().removeClass('active');
			
			//Цена короба
			if( !this.model.get('box') ) {
				this.$('#box_price span').text( 0 );
			} else {
				var box = this.model.get('box');
				if (box.get('type') != 'box')
					var boxPrice = box.get('price');
				else if (this.model.get('format') == 'big_square' || this.model.get('format') == 'big_rect')
					var boxPrice = box.get('price').big;
				else 
					var boxPrice = box.get('price').small;
				
				
				this.$('#box_price span').text( boxPrice );
			} 
			
			if( !this.model.get('box') ){
				this.$('.color').hide();
				return this;
			}
			
			this.$('.color').show();
			
			var output = '';
			
			this.model.boxColors.forEach(function(element, index, list){
				output += '<li><a href="#" style="background-image: url('+options.boxesFolder + '/'+ element.get('src')+')"></a></li>';
			});
			this.$('.color_list').html(output);
			
			
			var idx = this.model.boxColors.indexOf(this.model.get('box') );
			
			this.$('.color_list li').eq(idx).addClass('active').siblings().removeClass('active');
			
			//Отображение текущего цвета
			var model = this.model.get('color');
			
			this.$('.color .color_prevu')
				.find('div').css('backgroundImage', 'url('+options.boxesFolder + '/' + this.model.get('box').get('src') + ')')
				.end().find('p').text( this.model.get('box').get('title') );
			
				
			
			
			return this;
		},
		
		
		
		//events
		controlClick: function(event){
			event.preventDefault();
			var $this = $(event.currentTarget).parent();
			
			if($this.is('.active, .disable'))
				return;
				
			
			
			this.model.trigger($this.parent().is('.app_nav') ? 'changeBoxType' : 'changeBoxColor', $this.index() );
		}
	});
});