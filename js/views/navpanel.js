define([
		'jquery',
		'underscore',
		'backbone',
		'text!../../templates/navpanel.html'
], function($, _, Backbone, tmpl) {

	var NavpanelView = Backbone.View.extend({

		//initialize template
		template : _.template(tmpl),

		//render the content into div of view
		render : function() {
			//this.el is the root element of Backbone.View. By default, it is a div.
			//$el is cached jQuery object for the view’s element.
			//append the compiled template into view div container
			$(this.el).html(this.template());

			//return to enable chained calls
			return this;
		}
	});
	return NavpanelView;
});