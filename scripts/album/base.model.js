define ( ['jquery', 'backbone'], function ($, Backbone) {
	return AlbumConst = Backbone.Model.extend({
		
		defaults: {
			status: 'cover', //Can be 'cover', 'stamp', 'forzatz', 'box' and 'boxstamp' 
			open: false,
			activeStep: 0,
			doneStep: 0,
			backSide: false,
			openAlbum: false,
			ready: false
		},
		
		inits: $.Callbacks().add(function() {
			this.views = {};
		}),

		/*inits: [ function(args) {
			
			
			
			
			this.on('navigation', this.navigation);
			
			this.createPage();
		} ],*/
		
		addInits: function(callback){
			return AlbumConst.prototype.inits.add(callback); 
		},

		ready: {
			events : [],
			calbacks: []
		},
		
		addReady: function(_events, _calback){
			if( $.isArray(_events) ){
				for(var i = 0; i < _events.length; i++)
					this.ready.events.push(_events[i]);
			} else {
				this.ready.events.push(_events);
			}
			
			this.ready.calbacks.push(_calback);
			
			return this.ready;
		},
		
		readyCalback: function(event){
			
			this.ready.events.splice( this.ready.events.indexOf(event), 1);
			
			if(this.ready.events.length === 0){
				for(var i = 0; i < this.ready.calbacks.length; i++)
					this.ready.calbacks[i].apply(this);
					
				this.set('ready', true);
				this.view.showNav();	
			}
			
			
		}
		
	});
});