define([
		'jquery',
		'underscore',
		'backbone',
		'text!../../../templates/survey/phoneAmount.html',
		'text!../../../templates/navpanel.html'
], function($, _, Backbone, tmpl, navtmpl) {

	var PhoneAmountView = Backbone.View.extend({

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
            "change #flip-2" : "search",
            "pagehide" : "saveFormData",
            "pagebeforeshow" : "loadFormData"
        },

        search: function (event) {
        	if (event.currentTarget.value == 'yes') {
        		this.enable();
        	} else {
				this.disable();        		
        	}
        },
        
        enable: function() {
		    $("input").closest("div").removeClass("ui-state-disabled");
		},

		disable: function() {
    		$("input").closest("div").addClass("ui-state-disabled");
		},
        
        saveFormData: function(event) {
			handleRangeSliderWithButtonSave(event, this.key);
		},
		
		loadFormData: function(event) {
			handleRangeSliderWithButtonLoad(event, this.key);
		}
	});
	return PhoneAmountView;
});