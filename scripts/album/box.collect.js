define ( ['jquery', 'backbone'], function ($, Backbone) {
//Коробки
	Boxes = Backbone.Model.extend({
		defaults: {
			'name': null,	
			'src': null,
			'type': null
		},
		
		initialize:function(){
			this.img = new Image();
			this.img.src = options.boxesFolder + '/' + this.get('src');
		}
	});

	//Коллекция коробок
	return BoxesCol = Backbone.Collection.extend({
		model: Boxes,
		
		//url: options.boxesUrl, 
		
		loadData: function(){
			this.reset(this.parent.data.boxes);
			this.parent.trigger('load:boxes');
		}
	});
});