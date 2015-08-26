var generators = require('yeoman-generator');
var Promise = require('bluebird');
var jspm = require('jspm');

module.exports = generators.Base.extend({

  runJSPMUpdate: function() {
    var done = this.async();
    var reps = ['aurelia-animator-css', 'aurelia-bootstrapper', 'aurelia-framework', 'aurelia-dependency-injection',
      'aurelia-binding', 'aurelia-http-client', 'aurelia-router', 'aurelia-event-aggregator', 'aurelia-history-browser',
      'aurelia-loader-default', 'aurelia-loader', 'aurelia-metadata', 'aurelia-route-recognizer',
      'aurelia-templating-binding', 'aurelia-templating-resources', 'aurelia-templating-router', 'aurelia-templating',
      'aurelia-logging', 'aurelia-task-queue', 'aurelia-history', 'aurelia-path'];

    var allDone = [];

    reps.forEach( function(repo) {
      allDone.push(jspm.install(repo));
    }.bind(this));

    Promise.all(allDone).then( function() {
      this.log('Update done, enjoy!');
      done();
    }.bind(this));
  }
});
