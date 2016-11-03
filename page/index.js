var generators = require('yeoman-generator');
module.exports = generators.NamedBase.extend({

  generateAureliaVM: function() {
    var pageName = this.name.indexOf("/") > -1 ? this.name.substring(this.name.lastIndexOf("/" + 1)) : this.name;
	
	this.fs.copyTpl(
      this.templatePath('vm.js'),
      this.destinationPath('src/' + this.name + '.js'),
      { PageName: this.name }
    );
  },

  generateAureliaView: function() {
	var pageName = this.name.indexOf("/") > -1 ? this.name.substring(this.name.lastIndexOf("/" + 1)) : this.name;
	
    this.fs.copyTpl(
      this.templatePath('view.html'),
      this.destinationPath('src/' + this.name + '.html'),
      {
        PageName: pageName,
        Hello: '${hello}'
      }
    );
  }
});
