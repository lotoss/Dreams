

define ( ['jquery', 'backbone'], function ($, Backbone) {
	//Обложки
	Cover = Backbone.Model.extend({
		defaults: {
			'format': null,	
			'type': null,	
			'stamping': null,
			'basePrice': null,
			'minPage' : null,
			'maxPage' : null,
			'pagePrice' : null
		}
	});

	//Коллекция обложек
	return CoverCol = Backbone.Collection.extend({
		model: Cover,
		
		//url: options.dataUrl, 
		
		loadData: function(){
			this.reset(this.parent.data.covers);
			this.parent.trigger('load:covers');
		}
		
	});
});

