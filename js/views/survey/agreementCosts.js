define([
		'jquery',
		'underscore',
		'backbone',
		'text!../../../templates/survey/agreementCosts.html',
		'text!../../../templates/navpanel.html'
], function($, _, Backbone, tmpl, navtmpl) {

	var AgreementCostsView = Backbone.View.extend({

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
			handleRangeSliderSave(event, this.key);
		},
		
		loadFormData: function(event) {
			handleRangeSliderLoad(event, this.key);
		}
	});
	return AgreementCostsView;
});