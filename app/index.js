var fs = require('fs');
var path = require('path');
var generators = require('yeoman-generator');

var Generator = module.exports = generators.Base.extend({
  init: function () {
    var done = this.async();
    var that = this;
    var spawn = require('child_process').spawn;

    var s1 = spawn('git', ['submodule -q foreach git pull -q origin master'], {cwd: this.sourceRoot()});
    s1.on('error', function( err ){ console.log(err); throw err });
    s1.on('close', function () {
      var s2 = spawn('git', ['reset', '--hard'], {cwd: that.sourceRoot()});
      s2.on('close', function () {
        var s3 = spawn('git', ['pull'], {cwd: that.sourceRoot()});
        s3.on('close', function () {
          done();
        });
      });
    });
  },

  installAurelia: function () {
    var prompts = [];
    var files = this.expandFiles('**/*', {cwd: this.sourceRoot(), dot: true});
    var ignores = [
      '.git',
      'LICENSE',
      'README.md',
    ];

    this.package = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

    this.log.writeln('Generating from ' + 'Aurelia Skeleton App'.cyan + ' v' + this.package.version.cyan + '...');

    files.forEach(function (file) {
      if (ignores.indexOf(file) !== -1) {
        return;
      }

      this.copy(file, file);
    }, this);
  },

  executeNPMInstall: function () {
    this.npmInstall();
  },

  runJSPM: function() {
    this.spawnCommand('jspm', ['install']);
  }
});

Generator.name = "Generator Aurelia";
