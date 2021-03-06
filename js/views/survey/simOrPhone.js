define([
		'jquery',
		'underscore',
		'backbone',
		'text!../../../templates/survey/simOrPhone.html',
		'text!../../../templates/navpanel.html',
		'../../tools/tools'
], function($, _, Backbone, tmpl, navtmpl) {

	var SimOrPhoneView = Backbone.View.extend({

		//initialize template
		template : _.template(tmpl),
		templateNavtmpl : _.template(navtmpl),

		//render the content into div of view
		render : function() {
			//this.$el.empty();
			//this.el is the root element of Backbone.View. By default, it is a div.
			//$el is cached jQuery object for the view's element.
			//append the compiled template into view div container
			$(this.el).html(this.template());

			$(this.el).append(this.templateNavtmpl());
			this.key = $(this.el).find("div[data-role='content']").attr('id');
			disableCurrentLink(this.el, this.key);
			
			//return to enable chained calls
			return this;
		},
		
		events: {
            "pagehide" : "saveFormData",
            "pagebeforeshow" : "loadFormData"
        },
        
        saveFormData: function(event) {
        	handleRadioButtonSave(event, this.key);
		},
		
		loadFormData: function(event) {
			handleRadioButtonLoad(event, this.key);
		}
		
	});
	return SimOrPhoneView;
});