define([
		'jquery',
		'underscore',
		'backbone',
		'text!../../templates/endShowAndSendData.html',
		'text!../../templates/navpanel.html'
], function($, _, Backbone, tmpl, navtmpl) {

	var EndShowAndSendDataView = Backbone.View.extend({

		//initialize template
		template : _.template(tmpl),
		templateNavtmpl : _.template(navtmpl),

		//render the content into div of view
		render : function() {
			//this.$el.empty();
			//this.el is the root element of Backbone.View. By default, it is a div.
			//$el is cached jQuery object for the view's element.
			//append the compiled template into view div container
			$(this.el).append(this.template());
			
			$(this.el).append(this.templateNavtmpl());
			var link = $(this.el).find('a[href="#endShowAndSendData"]');
			link.addClass("ui-disabled");
			link.parent().attr('data-icon','false');
			
			//return to enable chained calls
			return this;
		}
	});
	return EndShowAndSendDataView;
});