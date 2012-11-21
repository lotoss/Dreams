define(['jquery', 'backbone'], function () {
	//Application View
	return AppView = Backbone.View.extend ({

		initialize: function(options){
			_.bindAll(this);
			this.subviews = options.subviews;
		},
		
		events: {
			'click #control li' : 'controlClick',
			'click #logo' : 'controlClick'
		},
		
		render: function(){
			//Hide all subviews
			_.each(this.subviews, function(el) {
				el.hide();
			});

			//Show new view
			var status = this.model.get('status');
			switch (status) {
				case 'prevu':

					this.subviews[status].show();
					this.$('#control li').removeClass('active');
					this.$('#footer .discount').show();
					
					break;
					
				case 'album':
				case 'cart': 

					this.subviews[status].show();
					this.$('#control li').removeClass('active')
						.eq(status == 'album' ? 0 : 1).addClass('active');
					this.$('#footer .discount').hide();
					
					break;
					
				default: 
					this.model.set('status', 'prevu');	
					
			}
			
			return this;
		},
		
		//On logo or control menu click change application status
		controlClick: function(event){
			event.preventDefault();
			var $this = $(event.currentTarget);
			this.model.set('status', $this.attr('data-value') );
		}
		
		
	});

});