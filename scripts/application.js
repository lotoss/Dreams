//Application Class


Application = Backbone.Model.extend({
	initialize: function(){
		
		//atach App View
		this.view = new AppView({ model: this, el: $('#mainarea') });
		//atach App Route
		window.route = new AppRoute();
		Backbone.history.start();
	}
});

//Application View
AppView = Backbone.View.extend({
	initialize: function(){
		
	},
	
	events: {
		'click #control li' : 'controlClick',
	},
	
	render: function(){
	
		
		return this;
	},
	
	controlClick: function(event){
		var $this = $(event.currentTarget);
		
		
		if( $this.hasClass('cart') ){
			window.route.basket();
		}
		
		if( $this.hasClass('construct') ){
			
			window.album.set('open', true);
			album.showAlbum();
			window.album.setURL();
			$('#control li').removeClass('active').eq(0).addClass('active');
			$('#footer .discount').hide();
		}
			
			
	}
	
	
});


AppRoute = Backbone.Router.extend({
	routes: {
		'': 'prevu',
		'album': 'album',
		'forzatz': 'forzatz',
		'album:album': 'album',
		'popup:id': 'popup',
		'cart' : 'basket',
		'cart:page' : 'basketPage',
		'order' : 'order',
		'done' : 'done',
		'stamp' : 'stamp',
		'box' : 'box',
		'boxstamp' : 'boxstamp',
		'success-:id': 'success'
		
	},
	
	initialize: function(){
		window.popupC = new PopupController();	
		//window.popupC.parent = this;
		
		window.blockC = new BlockController({ el: $('#middle') });	
		//window.blockC.parent = this;
		
		window.cart = new Cart();	
		window.cart.parent = this;
		
		window.prevu = new PrevuPage({el: $('#prevu')});
		window.prevu.parent = this;
		
		window.album = new AlbumConst();
		window.album.parent = this;
		
		this.on('openAlbum', this.album);
		this.on('addToCart', this.basket);
		this.on('saveToCart', this.basket);
		this.on('editAlbum', this.editAlbum);
		
	},
	
	editAlbum: function(params){
		/*params['ready'] = false;*/
		window.album.restore(params);
		album.set('activeStep', 0);
		album.view = album.views[0];
		window.blockC.show('album_page');
		
		album.view.showNav().render();
		window.album.set('open', true);
		$('#control li').removeClass('active').eq(0).addClass('active');
		window.album.setURL();
	},
	
	prevu: function(){
		$('#control li').removeClass('active');
		window.popupC.hide();
		window.blockC.show('prevu');
	},
	
	album: function(param){
		window.album.set('open', true);
		$('#control li').removeClass('active').eq(0).addClass('active');
		$('#footer .discount').hide();
		album.renew();
	},
	
	
	popup: function(_index){
		//this.prevu();
		$('#control li').removeClass('active');
		window.blockC.show('prevu');
		window.popupC.show(_index);
		
	},
	
	basket: function(_input){
		popupC.hide();
		if (_input !== undefined) {
			cart.addAlbum(_input);
			album.clearAlbum();
		}
		
		cart.openCart();
		$('#footer .discount').hide();
		window.route.navigate('#cart');
	},
	
	basketPage: function(page){
		
		cart.openCart();
		switch(page){
			case '-cards':
					window.popupC.show('cards');
					popupC.view.renderCards();
				break
		}
		
		
	},
	
	order: function(){
		window.blockC.show('order');
	},
	
	done: function(){
		window.blockC.show('done');
	},
	
	success: function(id) {
		
		popupC.hide();
		blockC.show('basket');	
		$('#control li').removeClass('active').eq(1).addClass('active');
		cart.set({activeStep: 3, doneStep: 3}).view.render();
		$('#footer .discount').hide();
		
		cart.view.$('section.done .item_title span').text(id);
		cart.view.$('section.done .done').hide();
		cart.view.$('section.done .success').show();
				
		
		window.route.navigate('#success-'+id);
	}
		
});


//Blocks Controller 
BlockController = Backbone.View.extend({
	activeView: 'prevu',
	
	initialize: function(){
		var self = this;
		self.blocks = {};
		
		self.$('div.page').each(function(){
			var obj = {
				el: this,
				$el: $(this),
				height: $(this).height()
			};
			self.blocks[ $(this).attr('id') ] = obj;
			
			$(this).hide();
		});
		
		self.blocks[this.activeView].$el.show();
		
		
	},
	
	
	
	show: function(_id){
		var self = this;
		if(_id == this.activeView ) return;
		
		/*//Высота #middle
		this.$el.animate({height: this.blocks[_id].height }, 800);
		//Отображение следующего блока
		this.blocks[_id].$el.show();
		//Анимация
		this.blocks[this.activeView].$el.animate({marginTop: -this.blocks[this.activeView].height },800, function(){
			self.blocks[self.activeView].$el.hide().css('marginTop', 0);
			self.activeView = _id;
		});*/
		//this.$el.height(this.blocks[_id].height);
		//this.blocks[_id].$el.show();
		
		$('#'+_id).show().siblings('div.page').hide();
		
		//self.blocks[self.activeView].$el.hide();
		self.activeView = _id;
		
		
		
	}
});

