var fs = require('fs');
var yeoman = require('yeoman-generator');

var Generator = module.exports = yeoman.generators.Base.extend({
  constructor: function(){
    yeoman.generators.Base.apply(this, arguments);
    this.option('skip-install');
  },
  init: function () {
    var done = this.async();

    var ghdownload = require('download-github-repo')
      , execFile = require('child_process').execFile;

    this.log(this.destinationRoot());

    ghdownload("aurelia/skeleton-navigation", this.destinationRoot(), function(err) {
      if(err !== undefined) {
        this.env.error(err);
      } else {
        this.log('Download complete');
      }
      done();
    }.bind(this));
  },

  executeNPMInstall: function () {
    if (!this.options['skip-install']){
      this.log('Executing NPM install');
      this.npmInstall();
    }
    else{
    this.log('NPM install deliberately skipped');
    };
  },

  runJSPM: function() {

    if (!this.options['skip-install']){
      this.log('Executing JSPM install');
      this.spawnCommand('jspm', ['install']);
    }
    else{
      this.log('JSPM install deliberately skipped');
    
    };
  }
});

Generator.name = "Generator Aurelia";
