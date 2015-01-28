var fs = require('fs');
var path = require('path');
var generators = require('yeoman-generator');

var Generator = module.exports = generators.Base.extend({
  installAurelia: function() {
    var prompts = [];
    var files   = this.expandFiles('**/*', { cwd: this.sourceRoot(), dot: true });
    var ignores = [
      '.git',
      'LICENSE',
      'README.md',
    ];

    this.package = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

    this.log.writeln('Generating from ' + 'Aurelia Skeleton App'.cyan + ' v' + this.package.version.cyan + '...');

    files.forEach(function(file) {
      if (ignores.indexOf(file) !== -1) {
        return;
      }

      this.copy(file, file);
    }, this);
  }
});

Generator.name = "Generator Aurelia";
