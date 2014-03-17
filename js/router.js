define([
		'jquery',
		'underscore',
		'backbone',
		'views/home',
		'views/survey/simOrPhone',

		'jqm'
], function($, _, Backbone,
			HomeView,
			SimOrPhoneView) {
	'use strict';
	//var slider = new PageSlider($('body'));
	var Router = Backbone.Router.extend({
		//define routes and mapping route to the function
		routes : {
			'' : 'showHome', //home view
			'home' : 'showHome', //home view as well
			'surveySimOrPhone' : 'showSimOrPhone',
			
			'*actions' : 'defaultAction' //default action
		},


		initialize : function() {
			// Handle back button throughout the application
			$('.back').live('click', function(event) {
				window.history.back();
				return false;
			});

			var defs = $.mobile.changePage.defaults;
			$('a[data-role="button"]').live('click', function(event) {
				var $this = $(this);

				if ($this.attr('data-transition')) {
					$.mobile.changePage.defaults.transition = $this.attr('data-transition');
				} else {
					$.mobile.changePage.defaults.transition = defs.transition;
				}

				if ($this.attr('data-direction')) {
					$.mobile.changePage.defaults.reverse = $this.attr('data-direction') == 'reverse';
				} else {
					$.mobile.changePage.defaults.reverse = false;
				}

				if ($this.attr('data-rel') === 'back') {
					window.history.back();
					return false;
				}
			});

			this.firstPage = true;
		},

		defaultAction : function(actions) {
			this.showHome();
		},

		showHome : function(actions) {
			// will render home view and navigate to homeView
			console.log('HOME');
			this.changePage(new HomeView());
		},
		
		showSimOrPhone : function(actions) {
			this.changePage(new SimOrPhoneView());
		},
		
	

		changePage : function(view) {
			//add the attribute ‘data-role=”page” ‘ for each view’s div
			$(view.el).attr('data-role', 'page');
			//append to dom
			view.render();
			$('body').append($(view.el));

			//var transition = $.mobile.defaultPageTransition;
			var transition = $.mobile.changePage.defaults.transition;
			if (this.firstPage) {
				transition = 'none';
				this.firstPage = false;
			}

			$.mobile.changePage($(view.el), {
				changeHash : false,
				transition : transition
			});
		}
	});

	return Router;
});
