# generator-aurelia

This is a Yeoman Generator for the [Skeleton App](https://github.com/aurelia/skeleton-navigation) of the [Aurelia](http://www.aurelia.io/) platform. It sets up a standard navigation-style app using gulp to build your ES6 code with [Babel](http://babeljs.io). Karma/Jasmine testing is configured as well.

For more info please visit the official site: http://www.aurelia.io/

## Running The App

> The recent update will take care of running `npm install` and `jspm install` after downloading the boilerplate app, so this shortens the process to get up and running.

1. Verify that Yeoman is installed

  ```shell
  npm install -g yo
  ```
2. Install this generator

  ```shell
  npm install -g generator-aurelia
  ```

3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g jspm
  ```

5. Create a new project folder and move into it in the terminal

  ```shell
  mkdir YOUR_PROJECT_NAME
  cd YOUR_PROJECT_NAME
  ```
6. Execute the following command

  ```shell
  yo aurelia
  ```

7. To run the app, execute the following command:

  ```shell
  gulp watch
  ```
8. Browse to [http://localhost:9000](http://localhost:9000) to see the app. You can make changes in the code found under `src` and the browser should auto-refresh itself as you save files.

## Update the skeleton jspm dependencies
If you're inside your skeleton folder you can run the following command to update your installation and get the latest versions of the dependencies used:

  ```shell
  yo aurelia:update
  ```

## Command line options
yo aurelia --skip-install will skip the npm and jspm install.

## Creating a new page
In order to create a new Aurelia Page just enter the following command inside your project root:

  ```shell
  yo aurelia:page YOURPAGENAME
  ```

> If you get an error like `Error: spawn git ENOENT` when executing the yo command, you should check whether GIT is installed and accessible from the command line

This will create a View and ViewModel with the given name inside the ```./src``` folder

## Credits
Thanks to Addy Osmani for his awesome [generator-boilerplate](https://github.com/addyosmani/generator-boilerplate) repo.
