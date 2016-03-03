var fs = require('fs');
var yeoman = require('yeoman-generator');
var debug = require('debug')('yeoman:environment');
var GitHubApi = require('github');
var exec = require('child_process').exec;

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
        { name: 'EcmaScript 2016', value: 'skeleton-es2016'},
        { name: 'ASP.NET 5 - EcmaScript 2016', value: 'skeleton-es2016-asp.net5/src/skeleton-navigation-es2016-vs'},
        { name: 'TypeScript', value: 'skeleton-typescript'},
        { name: 'ASP.NET 5 - TypeScript', value: 'skeleton-typescript-asp.net5/src/skeleton-navigation-typescript-vs'},
      ],
      message : 'Which Aurelia preset would you like to install?',
    }, function (answers) {
      projectTypeChoice = answers.project;
      done();
    }.bind(this));
  },

  init: function () {
    var done = this.async();

    var ghdownload = require('download-github-repo');

    this.log(this.destinationRoot());


    var githubOptions = {
      // required
      version: '3.0.0',
      debug: false,
      protocol: 'https',
      host: 'api.github.com',
      pathPrefix: '',
      timeout: 30000,
      headers: {
        'user-agent': 'Aurelia-Github-Loader'
      }
    };

    if(this.options['proxy']) {
      this.log.info(this.options['proxy']);
      githubOptions['proxy'] = this.options['proxy'];
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
      this.log.info('Downloading latest available release: ' + result[0].name);

      // Kick off the repo download
      ghdownload('aurelia/skeleton-navigation#' + result[0].name, this.destinationRoot() + '/github_tmp', function(err) {

        if (err !== undefined && err !== null) {
          this.env.error(err);
        } else {
          this.log.ok('Download complete');

          //check platform and customize the exec commands
          var isWin = /^win/.test(process.platform);
          this.log.info('Running ' + (isWin ? '' : 'non-') + 'windows platform (' + process.platform + ')');

          if (isWin) {
            var tempDestination = this.destinationRoot() + '\\github_tmp';
            var mvCommand = 'xcopy "' + tempDestination + '\\*.*" "' + this.destinationRoot() + '" /E /Y';
            var rmCommand = 'del "' + tempDestination + '" /S /Q';
          } else {
            var tempDestination = this.destinationRoot() + '/github_tmp';
            var mvCommand = 'mv -v "' + tempDestination + '/' + projectTypeChoice +'/"* "'+ this.destinationRoot()+'/"';
            var rmCommand = 'rm -rf "' + tempDestination + '"';
          }

          // this.log.info('temp destination = ' + tempDestination);
          // this.log.info('move command = ' + mvCommand);
          // this.log.info('remove command = ' + rmCommand);

          // move all files and sub folders from the selected dir into the destination dir
          mv = exec(mvCommand, function(error, stdout, stderr) {
            if (error !== null) {
              this.env.error(error);
            }

            // remove the left over temporary files
            this.log.ok('Specified skeleton folder moved: ' + projectTypeChoice);
            rm = exec(rmCommand, function(error, stdout, stderr) {
              if (error !== null) {
                this.env.error(error);
              }
              this.log.ok('Temporary github folder removed');

              done();
            }.bind(this));
          }.bind(this));
        }
      }.bind(this));
    }.bind(this));
  },

  executeNPMInstall: function () {
    if (!this.options['skip-install']){
      this.log.info('Executing NPM install');
      this.npmInstall(null);
    } else {
      this.log.skip('NPM install deliberately skipped');
    }
  },

  runJSPM: function() {
    if (!this.options['skip-install']){
      this.log.info('Executing JSPM install');
      this.spawnCommand('jspm', ['install']);
    } else{
      this.log.skip('JSPM install deliberately skipped');
    }
  }
});

Generator.name = 'Generator Aurelia';
