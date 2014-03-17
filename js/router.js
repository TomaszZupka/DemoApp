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
		'utils/pageslider',
		'jqm'
], function($, _, Backbone,
			HomeView,
			SimOrPhoneView, DetailOrBusinessView, AgreementTimeView, AgreementCostsView,
			PhoneAmountView, SmsAmountView, DataAmountView, EndShowAndSendData, PageSlider) {
	'use strict';
	//var slider = new PageSlider($('body'));
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
			'*actions' : 'defaultAction' //default action
		},


		initialize : function() {
			// Handle back button throughout the application
			$('.back').live('click', function(event) {
				window.history.back();
				return false;
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
			this.changePage(new EndShowAndSendData());
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
