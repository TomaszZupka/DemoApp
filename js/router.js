define([
		'jquery',
		'underscore',
		'backbone',
		'views/home',
		'views/survey/simOrPhone',
		'views/survey/detailOrBusiness',
		'views/survey/agreementTime',
		'views/survey/agreementCosts',
		'views/survey/phoneAmount',
		'views/survey/smsAmount',
		'views/survey/dataAmount',
		'views/endShowAndSendData',
		'views/navpanel',
		'views/test',
		'jqm'
], function($, _, Backbone,
			HomeView,
			SimOrPhoneView, DetailOrBusinessView, AgreementTimeView, AgreementCostsView,
			PhoneAmountView, SmsAmountView, DataAmountView, EndShowAndSendDataView, NavpanelView, TestView) {
	'use strict';
	var Router = Backbone.Router.extend({
		//define routes and mapping route to the function
		routes : {
			'' : 'showHome', //home view
			'home' : 'showHome', //home view as well
			'surveySimOrPhone' : 'showSimOrPhone',
			'surveyDetailOrBusiness' : 'showDetailOrBusiness',
			'surveyAgreementTime' : 'showAgreementTime',
			'surveyAgreementCosts' : 'showAgreementCosts',
			'surveyPhoneAmount' : 'showPhoneAmount',
			'surveySmsAmount' : 'showSmsAmount',
			'surveyDataAmount' : 'showDataAmount',
			'endShowAndSendData' : 'showEndShowAndSendData',
			'test' : 'test',
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
		
		test : function(actions) {
			this.changePage(new TestView());
		},

		showHome : function(actions) {
			// will render home view and navigate to homeView
			this.changePage(new HomeView());
		},
		
		showSimOrPhone : function(actions) {
			this.changePage(new SimOrPhoneView());
		},
		
		showDetailOrBusiness : function(actions) {
			this.changePage(new DetailOrBusinessView());
		},
		
		showAgreementTime : function(actions) {
			this.changePage(new AgreementTimeView());
		},
		
		showAgreementCosts : function(actions) {
			this.changePage(new AgreementCostsView());
		},
		
		showPhoneAmount : function(actions) {
			this.changePage(new PhoneAmountView());
		},
		
		showSmsAmount : function(actions) {
			this.changePage(new SmsAmountView());
		},
		
		showDataAmount : function(actions) {
			this.changePage(new DataAmountView());
		},
		
		showEndShowAndSendData : function(actions) {
			this.changePage(new EndShowAndSendDataView());
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
