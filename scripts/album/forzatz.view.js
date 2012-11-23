//Отображение форзацев
define (['jquery', 'album/base.view'], function ($, BaseView) {
	
	return ForzatzView = BaseView.extend({
		tagName: 'div',

		id:'forzatz',

		className: 'page forzatz',

		events: {
			'click .color a' : 'controlClick',
			//'click .album_nav a' : 'navClick',
			'click .next_step' : 'nextStep'
		},
		
		initialize: function(){
			this.name = 'forzatz';	
			this.$el.append( $('#forzatz_temp').html() ).append( $('#album_render').html() );
		},
		/*render: function(){
			var url = this.model.get('forzatz').get('src');
			this.$('#book .texture').css({
				'background-image' : url === '' ?  'none' : ('url('+options.forzatzFolder + '/'+ url +')' )
			});
			
			this.$('.middle_side .book_price span').text(this.model.get('wholePrice'));
			
			return this;
		},*/
		
		//Event Funtion
		controlClick: function(event){
			
			event.preventDefault();
			var $this = $(event.currentTarget).parent();
			if(  $this.hasClass('active') )
				return;
			
			$this.addClass('active').siblings('.active').removeClass('active');
		
			this.model.trigger('changeForsatz', $this.index() );
				
		},
		
		showForsatzs: function(){
			var self = this;
			var output = '';
			
			this.$('.color').show();	
			this.model.forzatzs.forEach(function(element, index, list){
				if( element.get('src') === '' )
					output += '<li><a href="#" style="background: #fff"></a></li>';
				else
					output += '<li><a href="#" style="background: url(' + options.forzatzFolder + '/'+ element.get('src')+')"></a></li>';
			});
			this.$('.color .color_list').html(output);
			
			var idx = this.model.forzatzs.indexOf( this.model.get('forzatz') ); 
			
			this.$('.color .color_list').find('li').eq(idx).addClass('active');
			
			this.currForsatzs();
			
			return this;
		},
		
		currForsatzs: function(){
			var self = this;
			
			var model = this.model.get('forzatz');
			
			this.$('.color .color_prevu')
				.find('div').css('backgroundImage', 'url('+options.forzatzFolder + '/'+ model.get('src')+')');
			
			
			this.$('#forzatz_price span').text( this.model.get('forzatz').get('price')[this.model.get('format')] );
			
			return this;
				
		}
		
	});

});