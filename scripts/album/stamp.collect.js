define ( ['jquery', 'backbone'], function ($, Backbone) {
	//Тиснения
	Stamps = Backbone.Model.extend({
		defaults: {
			'name': null,	
			'src': null,
			'price': null
		}
	});

	//Коллекция Тиснений
	return StampsCol = Backbone.Collection.extend({
		model: Stamps,
		
		//url: options.stampsUrl, 
		
		loadData: function(){
			this.reset(this.parent.data.stamps);
			this.parent.trigger('load:stamps');
		}
		
	});
});