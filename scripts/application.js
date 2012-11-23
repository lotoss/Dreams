//Application Class

define(['jquery', 'backbone', 'app.view', 'prevu', 'album/album', 'cart/cart'], function ($, Backbone, AppView, PrevuPage, AlbumConst, Cart) {

	return Application = Backbone.Model.extend({
		defaults: {
			status: 'prevu', //Can be 'prevu', 'album' and 'cart'
			'user': null
		},
		
		initialize: function() {
			
			//atach App View
			this.album = new AlbumConst();
			Backbone.emulateHTTP = true;
			window.cart = this.cart = new Cart();	
			
			var subviews = {
				'prevu' : (new PrevuPage({el: $('#prevu')}) ).$el,
				'album' : $('#album_view'),
				'cart' : $('#basket') 
			};

			this.view = new AppView({ model: this, el: $('#mainarea') , subviews: subviews});
			this.on('change:status', this.changeStatus);
			
			
			//atach App Route
			//window.route = new AppRoute();
			//Backbone.history.start();
		}, 

		changeStatus: function (model, value) {
			this.trigger(value + ':open').view.render();
		}
	});

});








//Blocks Controller 
/*BlockController = Backbone.View.extend({
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
		
		
		$('#'+_id).show().siblings('div.page').hide();
		
		self.activeView = _id;
		
		
		
	}
});*/

