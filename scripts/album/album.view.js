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
				console.log(views[key])
				views[key].$el.hide().appendTo(this.$el);
			}

			this.render();


		},

		render: function () {
			console.log(this.$el);
			var status = this.model.get('status');
			var photo = this.model.get('coverType') == 'photo';
			var done = this.model.get('doneStep');
			console.log(this.model.get('coverType'))
			console.log(photo)
			//Album navigation rendering

			var $menu = this.$('.album_nav a');
			$menu.parent().removeClass();
			$menu.filter('[data-value="' + status +'"]').parent().addClass('active');
			$menu.filter('[data-value="' + (photo ? 'stamp' : 'forzatz') +'"]').parent().addClass('hidden');

			//Album View rendering 




		},

		changeStatus: function (event) {
			event.preventDefault();
			$this = $(event.currentTarget);
			this.model.set('status', $this.attr('data-value') );
		}

	});

});









