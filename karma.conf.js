module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js',
      'js/*.js',
      'app.js',
      'test/unit/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine'
            ]

  });
};
