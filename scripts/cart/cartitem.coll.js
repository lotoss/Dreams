define ( ['jquery', 'backbone', 'cart/cartitem.model'], function ($, Backbone, CartElement) {
	//Коллекция альбомов
	return CartColl = Backbone.Collection.extend ({
		model: CartElement,
		url: CartOptions.url,
		
		initialize: function() {
			
			var self = this;
			
			this.on('add', this.syncAdd);
			this.on('remove', this.change);
			
			
			if(option.cart){
				this.reset(option.cart);
				
			} else {
				this.fetch({success: function (){
					self.parent.view.showList();
					this.change();
				}});
			}
			
			
		},
		
		syncAdd: function(model, collection){
			var self = this;
			
			model.save({}, {
				success: function cartCollSave(model, response){
					model.set('id', response.id);
					
				}
			});
		},
		
		change: function() {
			
			var quant = this.parent.get('cards') ? this.models.length - 1 : this.models.length;
			
			var ending = quant == 1 ? '' : (quant > 1 && quant < 5) ? 'а' : 'ов';
			$('#control .cart span').text( quant ? ('('+ quant +' альбом'+ ending +')') : '(пусто)');
		}, 
		
		comparator: function(el1, el2){
			if(el1.get('last') == 1)
				return 1;
			if(el2.get('last') == 1)
				return -1;		
			return 0;
		}
		
	});
});



