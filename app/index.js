var fs = require('fs');
var yeoman = require('yeoman-generator');
var GitHubApi = require('github');

var projectTypeChoice;

var Generator = module.exports = yeoman.generators.Base.extend({
  
  constructor: function(){
    yeoman.generators.Base.apply(this, arguments);
    this.option('skip-install');
  },
  
  prompting: function () {
    var done = this.async();
    this.prompt({
      type    : 'list',
      name    : 'project',
      choices : [
        { name: "EcmaScript 2016", value: "skeleton-es2016"},
        { name: "ASP.NET 5 - EcmaScript 2016", value: "skeleton-es2016-asp.net5/src/skeleton-navigation-es2016-vs"},
        { name: "TypeScript", value: "skeleton-typescript"},
        { name: "ASP.NET 5 - TypeScript", value: "skeleton-typescript-asp.net5/skeleton-navigation-typescript-vs"},
      ],
      message : 'Which Aurelia preset would you like to install?',
    }, function (answers) {
      projectTypeChoice = answers.project;
      done();
    }.bind(this));
  },

  init: function () {
    var done = this.async();

    var ghdownload = require('download-github-repo')
      , execFile = require('child_process').execFile;

    this.log(this.destinationRoot());


    var githubOptions = {
      // required
      version: "3.0.0",
      debug: false,
      protocol: "https",
      host: "api.github.com",
      pathPrefix: "",
      timeout: 30000,
      headers: {
        "user-agent": "Aurelia-Github-Loader"
      }
    };

    if(this.options['proxy']) {
      console.log(this.options['proxy']);
      githubOptions["proxy"] = this.options['proxy'];
    }

    var github = new GitHubApi(githubOptions);

    if (process.env.GITHUB_TOKEN) {
        github.authenticate({
            type: 'oauth',
            token: process.env.GITHUB_TOKEN
        })
    }

    github.repos.getTags({ user: 'aurelia', repo: 'skeleton-navigation', page: 1, per_page: 1 }, function(err, result) {
      if(err !== undefined && err !== null) {
        this.env.error('Failed to get latest release info. Reason: ' + err.message);
        return;
      }

      if(result.length < 1) {
        this.env.error('No Release-Tags available');
        return;
      }
      console.log('Downloading latest available release: ' + result[0].name);

      // Kick off the repo download
      ghdownload("aurelia/skeleton-navigation#" + result[0].name, this.destinationRoot(), function(err) {
        if (err !== undefined && err !== null) {
          this.env.error(err);
        } else {
          this.log('Download complete');
          done();
        }
      }.bind(this));
    }.bind(this));
  },

  executeNPMInstall: function () {
    if (!this.options['skip-install']){
      this.log('Executing NPM install');
      this.npmInstall(null, {cwd: projectTypeChoice});
    } else {
      this.log('NPM install deliberately skipped');
    }
  },

  runJSPM: function() {
    if (!this.options['skip-install']){
      this.log('Executing JSPM install');
      this.spawnCommand('jspm', ['install'], {cwd: projectTypeChoice});
    } else{
      this.log('JSPM install deliberately skipped');
    }
  }
});

Generator.name = "Generator Aurelia";
