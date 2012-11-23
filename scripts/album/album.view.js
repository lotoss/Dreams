define (['jquery', 'backbone'], function ($, Bakcbone) {
	return AlbumView = Backbone.View.extend ({

		events: {
			'click .album_nav a' : 'changeStatus'
		},

		initialize: function () {
			_.bindAll(this);
			var views = this.model.views;
			//Atach all pages to view
			for (var key in views) {
				views[key].$el.appendTo(this.$el);
			}

			this.render();


		},

		render: function () {
			var status = this.model.get('status');
			var photo = this.model.get('coverType') == 'photo';
			var done = this.model.get('doneStep');
			
			//Album navigation rendering
			var $menu = this.$('.album_nav a');
			$menu.parent().removeClass();
			$menu.filter('[data-value="' + status +'"]').parent().addClass('active');
			$menu.filter('[data-value="' + (photo ? 'stamp' : 'forzatz') +'"]').parent().addClass('hidden');
			if (!this.model.get('box') || this.model.get('box').get('type') != 'cofr' )
				$menu.filter('[data-value="boxstamp"]').parent().addClass('hidden');

			//Album View rendering 
			this.$el.children().not('ul').hide();
			this.model.views[status].$el.show();



		},

		changeStatus: function (event) {
			event.preventDefault();
			$this = $(event.currentTarget);
			this.model.set('status', $this.attr('data-value') );
		}

	});

});









