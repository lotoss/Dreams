
//Popup Model 
PopupModel = Backbone.Model.extend({
	defaults: {
		name: null,
		content: null,
		slider: null
	}
});

//Popups Collection 
PopupWindows = Backbone.Collection.extend({
	
	model: PopupModel,
	
	//url: options.popupCollUrl, 
	initialize: function(){
		var self = this;
		
		this.parent = arguments[0].parent;
		/*this.fetch({
			add: true, 
			success: function(){
				if( self.parent.openFlag === null)
					return;
				
				
				self.parent.show(self.parent.openFlag);
				self.parent.openFlag = null;
				
			}
		});*/
	}
	
});

//Popup View 
PopupView = Backbone.View.extend({
	
	events: {
		'click #overlay' : 'hide',
		'click .close' : 'hide',
		'click .prev' : 'changeSlide',
		'click .next' : 'changeSlide'
	}, 
	
	initialize: function(){
		this.window = this.$('.window');
		this.overlay = this.$('#overlay');
	},
	
	render: function(_toAppend){
		
		this.$('.text').html( this.model.get('content') );
		var slides = this.model.get('slider');
		
		var new_slides = '';
		for(var i = 0; i < slides.length; i++)
			new_slides += '<li><img src="' + slides[i] + '" alt="" /></li>';
		this.$('.slider ul').html( new_slides );
		
		this.currentSlide = 0;
		this.slides = this.$('.slider li');
		
		$(this.slides).hide().eq(0).show();
		this.window.css('top',  $( $.browser.safari? 'body' : 'html' ).scrollTop() + 75 );
		this.overlay.fadeIn(300);
		this.window.fadeIn(300);
	},
	
	show: this.render,
	
	hide: function(event) {
		if(event)
			event.preventDefault();
		
		this.overlay.fadeOut(300);
		this.window.fadeOut(300);
		
		var scrolltop = $( $.browser.safari? 'body' : 'html' ).scrollTop();
		window.route.navigate('');
		$( $.browser.safari? 'body' : 'html' ).scrollTop(scrolltop);
	},
	
	changeSlide: function(event){
		event.preventDefault();
		
		if(this.animationBlock)		
			return;
			
		this.animationBlock = true;
		
		var new_slide = this.currentSlide;
		
		if ( $(event.currentTarget).is('prev') ) {
			new_slide--;
			if(new_slide < 0) 	
				new_slide = this.slides.size() - 1;
		} else {
			new_slide++;
			if(new_slide >= this.slides.length ) 	
				new_slide = 0;
		}
		
		var root = this;
		
		/*$(this.slides).eq(this.currentSlide).fadeOut(200, function(){
			root.currentSlide = new_slide;
			$(root.slides).eq(root.currentSlide).fadeIn(200, function(){
				root.animationBlock = false;
			});
		});*/
		
		var $curSlide =  $(this.slides).eq(this.currentSlide)
		$curSlide.css({position: 'relative', zIndex: 10 })
			.find('img').css({
				position: 'absolute',
				top: '0',
				left: '0'
			}).animate({width: 0, height:0, marginTop: 240,  marginLeft: 240}, 500, function(){
				root.animationBlock = false;
			});
			
		this.currentSlide = new_slide;
		$(this.slides).eq(this.currentSlide).css({zIndex: 9 }).show()
			.find('img').css({width: 'auto', height:'auto', marginTop: 0,  marginLeft: 0});
			
	}
});

//Popups Controller 
PopupController = PopupModel.extend({
	initialize: function(){
		this.openFlag = null;
		this.popups = new PopupWindows({parent: this});
		this.view = new PopupView({ model: this, el: $('#popup') });
		
		this.on('change', this.view.render);
	},
	
	show: function(_index){
	
		var new_popup = this.popups.where({name: 'popup'+_index})[0];
		
		if(new_popup){
			this.view.model = new_popup;
			this.view.render();
		} else {
			this.openFlag = _index;
		}
		
		
		
	},
	
	hide: function(){
		this.view.hide();
	}, 
	
	loadData: function(_popups) {
		this.popups.add(_popups);
		console.error(this.popups);
		if( this.openFlag === null)
			return;
				
				
		this.show(this.openFlag);
		this.openFlag = null;
	}
	
});
