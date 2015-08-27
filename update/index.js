var generators = require('yeoman-generator');
var Promise = require('bluebird');
var jspm = require('jspm');

var jspmPackages = [];

module.exports = generators.Base.extend({

  getAllAureliaPackages: function() {
    var conf = JSON.parse(this.readFileAsString(this.destinationPath('package.json')));

    Object.keys(conf.jspm.dependencies).forEach( function(pkg) {
      if(pkg.indexOf('aurelia-') === 0) {
        jspmPackages.push(pkg);
      }
    });
  },

  runJSPMUpdate: function() {
    var done = this.async();
    /*var reps = ['aurelia-animator-css', 'aurelia-bootstrapper', 'aurelia-framework', 'aurelia-dependency-injection',
      'aurelia-binding', 'aurelia-http-client', 'aurelia-router', 'aurelia-event-aggregator', 'aurelia-history-browser',
      'aurelia-loader-default', 'aurelia-loader', 'aurelia-metadata', 'aurelia-route-recognizer',
      'aurelia-templating-binding', 'aurelia-templating-resources', 'aurelia-templating-router', 'aurelia-templating',
      'aurelia-logging', 'aurelia-task-queue', 'aurelia-history', 'aurelia-path'];*/

    var allDone = [];

    jspmPackages.forEach( function(repo) {
      allDone.push(jspm.install(repo));
    }.bind(this));

    Promise.all(allDone).then( function() {
      this.log('Update done, enjoy!');
      done();
    }.bind(this));
  }
});
