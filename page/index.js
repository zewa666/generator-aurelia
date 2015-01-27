var generators = require('yeoman-generator');
module.exports = generators.NamedBase.extend({

  generateAureliaVM: function() {
    this.fs.copyTpl(
      this.templatePath('vm.js'),
      this.destinationPath('src/' + this.name + '.js'),
      { PageName: this.name }
    );
  },

  generateAureliaView: function() {
    this.fs.copyTpl(
      this.templatePath('view.html'),
      this.destinationPath('src/' + this.name + '.html'),
      {
        PageName: this.name,
        Hello: '${hello}'
      }
    );
  }
});
