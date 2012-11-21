define(['jquery', 'backbone'], function () {
	AppRoute = Backbone.Router.extend({
		routes: {
			/*'': 'prevu',
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
			'success-:id': 'success'*/
			
		},
		
		initialize: function(){
			//window.popupC = new PopupController();	
			//window.popupC.parent = this;
			
			//window.blockC = new BlockController({ el: $('#middle') });	
			//window.blockC.parent = this;
			
			//window.cart = new Cart({} , {parent: this });	
			
			
			/*window.prevu = new PrevuPage({el: $('#prevu')});
			window.prevu.parent = this;
			
			window.album = new AlbumConst();
			window.album.parent = this;
			
			this.on('openAlbum', this.album);
			this.on('addToCart', this.basket);
			this.on('saveToCart', this.basket);
			this.on('editAlbum', this.editAlbum);*/
			
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
});