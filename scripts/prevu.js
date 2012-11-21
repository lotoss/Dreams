define (['jquery', 'backbone'], function ($, Backbone) {
	return PrevuPage = Backbone.View.extend({

		events: {
			'click .app_nav a' : 'setSlide',
			'click .next_step' : 'nextStep'
		},
		
		initialize: function(){
			this.currentSlide = 0;
			this.leftPos = {
				left: '-35%',
				middle: '50%',
				right: '135%'
			};
			
			this.stop = false;
			this.animatioSpeed = 500;
			
			this.slides = $('#prevu_slider li');
			
			this.$('.app_nav li').removeClass('active').eq(0).addClass('active');
			
			this.pos = 0;
			this.css = '';
			
			this.slides.eq(0).css('left', this.leftPos.middle).addClass('active').siblings().css({'left':this.leftPos.right,'opacity':0});
		
		},
		
		render: function(_newIndex){
			var self = this;
			this.stop = true;
			this.$('.app_nav li').removeClass('active').eq(_newIndex).addClass('active');
			
			if( this.currentSlide >  _newIndex){
				$(this.slides).eq(_newIndex).css('left', this.leftPos.left);
				var seconf_pos = this.leftPos.right;
			} else {
				$(this.slides).eq(_newIndex).css('left', this.leftPos.right);
				var seconf_pos = this.leftPos.left;
			}
			
			this.slides.eq(_newIndex).animate({
				left: '50%',
				opacity: 1	
			}, this.animatioSpeed);
			
			this.slides.eq(this.currentSlide).animate({
				left: seconf_pos,
				opacity: 0	
			}, this.animatioSpeed, function(){
				self.currentSlide = _newIndex;
				self.stop = false;
			});
		},
		
		setSlide: function(event){
			
			event.preventDefault();
			
			if( this.stop || $(event.currentTarget).parent().hasClass('active') ) return false;
			
			this.render($(event.currentTarget).parent().index());
			
		},
		
		openPopup: function(event){
		
			event.preventDefault();
			
			
		},
		
		nextStep: function(event) {
			event.preventDefault();
			var $this = $(event.currentTarget);
			this.parent.trigger('openAlbum');
			window.album.setURL();
		}
		
	});
}) ;
