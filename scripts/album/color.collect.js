
define ( ['jquery', 'backbone'], function ($, Backbone) {
	//Цвет
	Color = Backbone.Model.extend({
		defaults: {
			'name': null,	
			'type': null,	
			'src': null,
			'title': null
		},
		
		initialize: function(){
		
			if(this.get('type') != 'stamp' ){
				this.img = new Image();
				this.img.src = options.colorsFolder + '/'+ this.get('src');
			}
			
		}
	});


	//Коллекция цветов
	return ColorCol = Backbone.Collection.extend({
		model: Color,
		
		//url: options.dataUrl, 
		
		loadData: function(){
			this.reset(this.parent.data.colors);
			this.parent.trigger('load:colors');
		}
	}); 
});