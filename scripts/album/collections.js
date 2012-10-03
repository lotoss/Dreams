

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
ColorCol = Backbone.Collection.extend({
	model: Color,
	
	//url: options.dataUrl, 
	
	loadData: function(){
		this.reset(this.parent.data.colors);
		this.parent.trigger('load:colors');
	}
}); 

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
CoverCol = Backbone.Collection.extend({
	model: Cover,
	
	//url: options.dataUrl, 
	
	loadData: function(){
		this.reset(this.parent.data.covers);
		this.parent.trigger('load:covers');
	}
	
});


//Форзацы
Forzatz = Backbone.Model.extend({
	defaults: {
		'name': null,	
		'src': null,
		'price': null
	}
});

//Коллекция Форзацев
ForzatzCol = Backbone.Collection.extend({
	model: Forzatz,
	
	//url: options.dataUrl, 
	
	loadData: function(){
		this.reset(this.parent.data.forzatz);
		this.parent.trigger('load:forzatz');
	}
	
});

//Тиснения
Stamps = Backbone.Model.extend({
	defaults: {
		'name': null,	
		'src': null,
		'price': null
	}
});

//Коллекция Тиснений
StampsCol = Backbone.Collection.extend({
	model: Stamps,
	
	//url: options.stampsUrl, 
	
	loadData: function(){
		this.reset(this.parent.data.stamps);
		this.parent.trigger('load:stamps');
	}
	
});

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
BoxesCol = Backbone.Collection.extend({
	model: Boxes,
	
	//url: options.boxesUrl, 
	
	loadData: function(){
		this.reset(this.parent.data.boxes);
		this.parent.trigger('load:boxes');
	}
});