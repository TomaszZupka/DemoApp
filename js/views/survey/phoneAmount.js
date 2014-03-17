define([
		'jquery',
		'underscore',
		'backbone',
		'text!../../../templates/survey/phoneAmount.html'
], function($, _, Backbone, tmpl) {

	var PhoneAmountView = Backbone.View.extend({

		//initialize template
		template : _.template(tmpl),

		//render the content into div of view
		render : function() {
			//this.$el.empty();
			//this.el is the root element of Backbone.View. By default, it is a div.
			//$el is cached jQuery object for the view's element.
			//append the compiled template into view div container
			$(this.el).html(this.template());

			//return to enable chained calls
			return this;
		},
		
		events: {
            "change #flip-2" : "search"
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
		}
	});
	return PhoneAmountView;
});