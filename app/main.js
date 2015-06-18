// #1 Define requirejs requirement - application.js file which returns app object
require(['application'], function (app) {

	// #4 app object is returned here, call it's user defined bootstrap function
    app.bootstrap();

});