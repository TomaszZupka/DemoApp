define([
		'jquery',
		'underscore',
		'backbone',
		'text!../../templates/home.html',
		'text!../../templates/navpanel.html'
], function($, _, Backbone, tmpl, navtmpl) {

	var HomeView = Backbone.View.extend({

		//initialize template
		template : _.template(tmpl),
		templateNavtmpl : _.template(navtmpl),

		//render the content into div of view
		render : function() {
			//this.el is the root element of Backbone.View. By default, it is a div.
			//$el is cached jQuery object for the view’s element.
			//append the compiled template into view div container
			
			$(this.el).html(this.template());

			$(this.el).append(this.templateNavtmpl());
			var link = $(this.el).find('a[href="#"]');
			link.addClass("ui-disabled");
			link.parent().attr('data-icon','false');

			//return to enable chained calls
			return this;
		},
		
		events: {
            "pagebeforehide" : "clearData"
        },
        
        clearData: function() {
        	// console.log('CLEAR LOCAL STORAGE');
			localStorage.clear();
		}
	});
	return HomeView;
});