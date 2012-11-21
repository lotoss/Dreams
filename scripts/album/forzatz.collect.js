define ( ['jquery', 'backbone'], function ($, Backbone) {
	//Форзацы
	Forzatz = Backbone.Model.extend({
		defaults: {
			'name': null,	
			'src': null,
			'price': null
		}
	});

	//Коллекция Форзацев
	return ForzatzCol = Backbone.Collection.extend({
		model: Forzatz,
		
		//url: options.dataUrl, 
		
		loadData: function(){
			this.reset(this.parent.data.forzatz);
			this.parent.trigger('load:forzatz');
		}
		
	});
});