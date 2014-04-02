require.config({
    //path mappings for module names not found directly under baseUrl
    paths: {
        jquery:     'lib/jquery-1.7.1.min',
        jqm:     	'lib/jquery.mobile-1.4.2.min', 
        underscore: 'lib/underscore-min',
        backbone:   'lib/backbone',
        text:       'lib/text',
        templates:  'views'
    }

});

//1. load app.js, 
//2. configure jquery mobile to prevent default JQM ajax navigation
//3. bootstrapping application
define(['app','jqm-config'], function(app) {
    $(document).ready(function() {
      // console.log("DOM IS READY");// Handler for .ready() called.
    });    
    app.initialize();
});


