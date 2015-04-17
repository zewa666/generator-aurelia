var fs = require('fs');
var generators = require('yeoman-generator');

var Generator = module.exports = generators.Base.extend({
  init: function () {
    var done = this.async();
    var that = this;

    var ghdownload = require('download-github-repo')
      , execFile = require('child_process').execFile;

    console.log(this.destinationRoot());

    ghdownload("aurelia/skeleton-navigation", this.destinationRoot(), function(err) {
      if(err !== undefined) {
        this.env.error(err);
      } else {
        console.log('Download complete');
      }

      done();
    });
  },

  executeNPMInstall: function () {
    console.log('Executing NPM install');
    this.npmInstall();
  },

  runJSPM: function() {
    console.log('Executing JSPM install');
    this.spawnCommand('jspm', ['install']);
  }
});

Generator.name = "Generator Aurelia";
