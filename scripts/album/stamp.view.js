//Отображение тиснений
StampView = BaseView.extend({
	
	events: {
		'click .stamps a' : 'controlClick',
		'click .color a' : 'controlClick',
		'click .stamp_slider a' : 'arrowClick',
		'mousedown  .stamp_slider a, selectstart  .stamp_slider a' : function() {return false;},
		'click .button_revert' : 'revertBook',
		'click .back_cover li a' : 'setLogo',
		'click .album_nav a' : 'navClick',
		'click .next_step' : 'nextStep'
	},
	
	initialize: function(){
		this.album = this.$('#album');
		this.name = 'stamp';	
		
	},
	
	showColors: function(){
		
		var self = this;
		var output = '';
		
		this.$('.color').hide();	
		
		
		if(this.model.get('coverType') == 'photo' || !this.model.get('stamp') )
			return this;
		
		this.$('.color').show();	
		
		var acsepts = this.model.get('color').get('stamp');
		
		var colors = this.model.stampColor.filter(function(el){
			return _.include(acsepts, el.get('name'));
		});
		
		for(var i = 0; i < colors.length; i++){
			
			if(colors[i].get('name') == 'blint'){
				var src_url = options.colorsFolder + '/'+ this.model.get('color').get('src');
				output += '<li><a href="#" style="background-image: url('+ src_url +') "></a></li>';
			} else {
				var src_url = options.stampsImgSrc + '/'+ colors[i].get('src');
				output += '<li><a href="#" style="background: url('+ src_url +') -'
					+ colors[i].get('position')[0] +'px -'+ colors[i].get('position')[1] +'px"></a></li>';
			}
				
		}
		
		this.$('.color .color_list').html(output);
		
		
		//Установка активного цвета тиснения
		if( _.include(colors, this.model.get('stampColor') ) ){
			this.$('.color li').eq( colors.indexOf(this.model.get('stampColor')) ).addClass('active');
		} else {
			
			this.model.set('stampColor', colors[0]);
			this.$('.color li').eq(0).addClass('active');
		}
		
		
		return this;
	},
	
	showLogoInfo: function(){
		
		if( this.model.get('coverLogoSet') ){
			this.$('.back_cover p, .button_revert, .back_cover li:last').show();
		} else {
			this.$('.back_cover p, .button_revert, .back_cover li:last').hide();
		}
		
		if(this.model.get('coverLogo') ){
			this.$('.back_cover li').removeClass('active').eq(0).addClass('active');
		} else{
			this.$('.back_cover li').removeClass('active').eq(1).addClass('active');
		} 
		
		if( this.model.get('coverLogo') ){
			this.album.addClass('coverlogo');
		} else {
			this.album.removeClass('coverlogo');
		}
		
		this.$('#cover_logo_price span').text( this.model.get('coverLogo') ? this.model.stamps.where({name: 'logo'})[0].get('price') : 0);
		
		return this;
	},
	
	controlClick: function(event){
		event.preventDefault();
		var $this = $(event.currentTarget).parent();
		
		$this.addClass('active').siblings().removeClass('active');
		
		if($this.parent().parent().is('.stamps'))
			this.model.trigger('changeStamptype', { index: $this.index(), type: 'type' } );
			
		if($this.parent().parent().is('.color'))
			this.model.trigger('changeStampcolor', { index: $this.index(), type: 'color' } );
			
		
			
	},
	
	arrowClick: function(event){
		event.preventDefault();
		
		var $this = $(event.currentTarget);
		if($this.hasClass('prev'))
			this.model.trigger('changeStamp', { index: $this.index(), type: 'stamp', dir: -1 } );
		else
			this.model.trigger('changeStamp', { index: $this.index(), type: 'stamp', dir: 1 } );
	},
	
	revertBook: function(event){
		if(event)
			event.preventDefault();
			
		if( this.model.get('backSide') )
			this.model.set('backSide', false);
		else 
			this.model.set('backSide', true);
			
		this.$('#album').toggleClass('backside');
		
		return this;
	},
	
	setLogo: function(event){
		event.preventDefault();
		this.model.trigger('setLogo', $(event.currentTarget).parent().index() );
		return this;
	},
	
	drawLogo: function(){
		var logo = this.model.stamps.find(function(el){ return el.get('name') == 'logo'; });
		var color = this.model.stampColor.find(function (el) { return el.get('name') == 'blint'; });
		if(logo != undefined && color != undefined) {
			this.$('.backstamp').css({
				'background-position' : '-'+ 
				(color.get('middle') - 
				
				
				logo.get('width') / 2) +'px' + ' -'
				
				 + logo.get('imgY')+ 'px' ,
				height: logo.get('height'),
				width: logo.get('width'),
				'margin-left': -logo.get('width') / 2,
				'margin-top': -logo.get('height') / 2
				});
			}
		
	
		return this;
	}
	
	
});