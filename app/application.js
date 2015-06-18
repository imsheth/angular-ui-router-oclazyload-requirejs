define([], function () {

	// #2 Defining the angular module name and it's dependeny array
    var app = angular.module('parentChild', ['ui.router','oc.lazyLoad']);

    // #5 Enter the config phase and do the specified configurations
    app.config(['$ocLazyLoadProvider','$stateProvider', '$urlRouterProvider',
        function ($ocLazyLoadProvider,$stateProvider, $urlRouterProvider) {

        	// #6 ocLL config, uses requirejs as asyncLoader and loads parentChild module by default
            $ocLazyLoadProvider.config({
                loadedModules: ['parentChild'],
                asyncLoader: require
            });

            // #7 All unmatched urls end up here
            $urlRouterProvider.otherwise('/index');

            // #8 Configuration of application wide states of all modules
            $stateProvider

                .state('index', {
                    url: '/',
                    templateUrl: 'index.html'
                })

                .state('parent', {

					// This is the abstract base layout/template state
					abstract: true,
					templateUrl: "app/parent/base.tpl.html",
                    resolve: {
                        load: function($ocLazyLoad) {

                            return $ocLazyLoad.load ({
                                name: 'parent',
                                files: ['app/parent/base.ctrl.js']

                            });
                        }
                    }
                })

                .state('parent.dashboard', {
                    url: '/parent/dashboard',
                    templateUrl: 'app/parent/dashboard.tpl.html',
                    resolve: {
                        load: function($ocLazyLoad) {

                            return $ocLazyLoad.load ({
                                name: 'parent',
                                files: ['app/parent/dashboard.ctrl.js']
                            });
                        }
                    }
                })

                .state('parent.listing', {
                    url: '/parent/listing',
                    templateUrl: 'app/parent/listing.tpl.html',
                    resolve: {
                        load: function($ocLazyLoad) {

                            return $ocLazyLoad.load ({
                                name: 'parent',
                                files: ['app/parent/listing.ctrl.js']
                            });
                        }
                    }
                });

        }]);

	// #9 User defined function that bootstraps the entire app
    app.bootstrap = function () {

    	// Angular's bootstrap function
    	// Use this function to manually start up angular application
    	// Syntax = angular.bootstrap(element, [modules], [config]);
    	// Here, we have the config block above
        angular.bootstrap(document, ['parentChild']);

    };

    // #3 Return the app object
    return app;
});